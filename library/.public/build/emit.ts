import { mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';
import type { Book, Path, Resolved } from './library.ts';

// EMITTING. A library becomes a program: the writing carried to where it is
// served, a module per book composing it, and a catalogue of cards importing no
// book at all.
//
// WHERE any of it lands is a POLICY of this phase and not a phase of its own.
// Move the output and a decision here changes; nobody's work does.

const forward = (p: string): string => p.split(sep).join('/');

// An alias cannot hold a space, so a display name taken verbatim could never be
// more than one word — which makes splitting it FORCED rather than chosen.
// `ATestLibrary` is how an author must spell "A Test Library" in an import.
export const spaced = (alias: string): string =>
    alias.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

const titled = (folder: string): string =>
    folder.replace(/^\.+/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// The specifier a book module uses to reach a file — relative, extensionless,
// and always beginning with a dot so it is never mistaken for a package.
const specifier = (from: Path, to: Path): string => {
    const at = forward(relative(from || '.', to)).replace(/\.tsx?$/, '');
    // `.cover` begins with a dot and is still a bare specifier — only `../`
    // already says where it starts from.
    return at.startsWith('..') ? at : './' + at;
};

// ─── CARRYING ────────────────────────────────────────────────────────────────
//
// Fourteen of eighteen files are copied unchanged. What changes is the COVER,
// and only where a reference was written as an import or left unsaid — the
// edits are computed from ts-morph node positions and spliced back to front, so
// everything the compiler has no opinion about survives byte for byte.

type Edit = { at: number; to: number; text: string };

const rewritten = (source: string, path: string, book: Book, project: Project, cards?: Cards): string => {
    const file = project.getSourceFile(path);
    if (!file) return source;
    const edits: Edit[] = [];
    const kinds = new Set(['Author', 'Subject', 'Canonical']);
    const linked = new Set<string>();
    const wanted = new Set<string>();

    // WHICH CARD A REFERENCE CARRIES. An author, a subject and a canonical each
    // point at a book, and the resolved link is what says which — so the card is
    // looked up by that and never by the word a reader sees.
    const held = (as: string): string => {
        const to = as === 'author' ? book.author : as === 'subject' ? book.subject : book.canonical;
        const named = to?.book ? cards?.get(to.book) : undefined;
        if (named) wanted.add(named);
        return named ?? '';
    };

    for (const element of file.getDescendantsOfKind(SyntaxKind.JsxElement)) {
        const as = element.getOpeningElement().getTagNameNode().getText();
        if (!kinds.has(as)) continue;

        // A REFERENCE IS GIVEN ITS CARD, which is what makes it followable with
        // nothing loaded. Without this the emitted cover carries a name, and a
        // name has to be repaired into a link after the book arrives.
        const card = held(as.toLowerCase());
        if (card) {
            const open = element.getOpeningElement();
            edits.push({ at: open.getEnd() - 1, to: open.getEnd() - 1, text: ` for={${card}}` });
        }

        const braced = element.getJsxChildren().find(c => c.getKind() === SyntaxKind.JsxExpression);
        const self = element.getJsxChildren().find(c => c.getKind() === SyntaxKind.JsxSelfClosingElement);
        const carrier = braced ?? self;
        if (!carrier) continue;
        const alias = braced
            ? braced.asKind(SyntaxKind.JsxExpression)?.getExpression()?.getText() ?? ''
            : self!.asKind(SyntaxKind.JsxSelfClosingElement)?.getTagNameNode().getText() ?? '';
        if (!alias) continue;
        linked.add(alias);
        edits.push({ at: carrier.getStart(), to: carrier.getEnd(), text: spaced(alias) });
    }

    // An import that existed only to name another book has nothing left to do
    // once the name is written out, and leaving it would drag that whole book
    // onto the page — which is the one thing the card exists to prevent.
    for (const declaration of file.getImportDeclarations()) {
        const named = declaration.getNamedImports();
        if (!named.length || !named.every(n => linked.has(n.getAliasNode()?.getText() ?? n.getName()))) continue;
        const start = declaration.getStart();
        const line = source.lastIndexOf('\n', start) + 1;
        const next = source.indexOf('\n', declaration.getEnd());
        edits.push({ at: line, to: next === -1 ? declaration.getEnd() : next + 1, text: '' });
    }

    // A SILENCE IS FILLED HERE AND NEVER IN THE FILE ITS AUTHOR LEFT. What gains
    // the answer is this copy, which is generated code and not their writing.
    const carries = (as: string) => { const c = held(as); return c ? ` for={${c}}` : ''; };
    const supplied: string[] = [];
    // A SUPPLIED DISPLAY IS AN ALIAS TOO. It was read off the library's own cover,
    // where an author is named by importing a book — so it arrives spelled as an
    // identifier and has to be split exactly as an authored one is.
    if (book.author?.from === 'supplied') supplied.push(`<Author${carries('author')}>${spaced(book.author.display)}</Author>`);
    if (book.subject?.from === 'supplied') supplied.push(`<Subject${carries('subject')}>${titled(book.subject.book.split('/')[0])}</Subject>`);
    if (supplied.length) {
        const section = file.getDescendantsOfKind(SyntaxKind.JsxElement)
            .find(e => e.getOpeningElement().getTagNameNode().getText() === 'Section');
        const last = section?.getJsxChildren().filter(c => c.getKind() !== SyntaxKind.JsxText).at(-1);
        if (last) {
            const line = source.lastIndexOf('\n', last.getStart()) + 1;
            const indent = source.slice(line).match(/^[ \t]*/)?.[0] ?? '';
            const eol = source.includes('\r\n') ? '\r\n' : '\n';
            const written = supplied.map(s => `${eol}${indent}{'\\n\\n'}${s}`).join('');
            edits.push({ at: last.getEnd(), to: last.getEnd(), text: written });
        }
    }

    // The cards the cover now names have to arrive from somewhere, and the one
    // place they can is the generated catalogue — which imports no book, so this
    // brings nothing else with it.
    if (wanted.size) {
        const first = file.getImportDeclarations()[0];
        const eol = source.includes('\r\n') ? '\r\n' : '\n';
        const line = `import { ${[...wanted].sort().join(', ')} } from '${specifier(book.path, 'cards')}';${eol}`;
        const at = first ? source.lastIndexOf('\n', first.getStart()) + 1 : 0;
        edits.push({ at, to: at, text: line });
    }

    let out = source;
    for (const edit of edits.sort((a, b) => b.at - a.at)) out = out.slice(0, edit.at) + edit.text + out.slice(edit.to);
    return out;
};

// ─── ASSEMBLING ──────────────────────────────────────────────────────────────
//
// A book module is derivable from its folder in every line but one, and that one
// is the table of contents — the thing a folder cannot say.

const assemble = (book: Book, held: Book[], cards?: Cards): string => {
    const parts = [book.synopsis, ...book.chapters].sort((a, b) => a.order - b.order);
    // A CATALOGUED SYNOPSIS IS GIVEN THE CARD OF THE BOOK IT ACCOUNTS FOR, and
    // that is what makes it read ELSEWHERE — which is in turn what makes this
    // book a catalogue rather than a reader. The same class stands in two books
    // with an honest parent each; only one of them carries a card.
    const carried = held.map(b => (cards?.get(b.path) ?? '')).filter(Boolean);
    const imports = [
        `import React from 'react';`,
        `import { $ } from '@dna-platform/chemistry';`,
        `import { $Book, Book, ${held.length ? '$Synopsis, ' : ''}TableOfContents } from '@dna-platform/lib';`,
        ...(carried.length ? [`import { ${carried.join(', ')} } from '${specifier(book.path, 'cards')}';`] : []),
        `import { ${book.cover.declares} } from '${specifier(book.path, join(book.path, book.cover.name))}';`,
        ...parts.map(f => `import { ${f.declares} } from '${specifier(book.path, join(book.path, f.name))}';`),
        ...held.map(b => `import { ${b.synopsis.declares} } from '${specifier(book.path, join(b.path, b.synopsis.name))}';`),
    ];
    const children = [
        `<${book.cover.declares} />`,
        `<TableOfContents />`,
        ...parts.map(f => `<${f.declares} />`),
        ...held.map(b => {
            const card = cards?.get(b.path);
            return `<${b.synopsis.declares}${card ? ` for={${card}}` : ''} />`;
        }),
    ];
    const entries = held.length
        ? `\n\nexport const entries: $Synopsis[] = book.chapters.filter(\n    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,\n);`
        : '';
    return `${imports.join('\n')}\n\nexport const book: $Book = $(\n    <Book>\n${children.map(c => '        ' + c).join('\n')}\n    </Book>\n) as $Book;${entries}\n`;
};

// ─── THE RUN ─────────────────────────────────────────────────────────────────

const sweep = (dir: string, keep: Set<string>): void => {
    if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return;
    for (const name of readdirSync(dir)) {
        const at = join(dir, name);
        if (statSync(at).isDirectory()) { sweep(at, keep); continue; }
        if (!keep.has(forward(at))) rmSync(at);
    }
};

/** A book's path to the identifier its card is exported under. Absent on the
 *  first pass, because the cards are read off books that do not exist yet. */
export type Cards = Map<string, string>;

export type Emitted = { carried: number; generated: number; removed: string[] };

export const emit = (resolved: Resolved, into: string, cards?: Cards, extra: Record<string, string> = {}): Emitted => {
    const project = new Project({
        compilerOptions: { jsx: 4, target: 99, module: 99, moduleResolution: 100, noEmit: true, allowJs: true },
        skipAddingFilesFromTsConfig: true,
    });
    for (const book of resolved.books) {
        for (const file of [book.cover, book.synopsis, ...book.chapters]) {
            project.addSourceFileAtPath(join(resolved.root, book.path, file.name));
        }
    }

    const written = new Set<string>();
    const put = (at: string, text: string) => {
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, text);
        written.add(forward(at));
    };

    const byPath = new Map(resolved.books.map(b => [b.path, b]));
    let carried = 0;
    let generated = 0;

    for (const book of resolved.books) {
        for (const file of [book.cover, book.synopsis, ...book.chapters]) {
            const from = join(resolved.root, book.path, file.name);
            const source = readFileSync(from, 'utf-8');
            put(join(into, book.path, file.name), file.role === 'cover' ? rewritten(source, from, book, project, cards) : source);
            carried++;
        }
        put(join(into, book.path, 'book.tsx'), assemble(book, book.entries.map(p => byPath.get(p)!), cards));
        generated++;
    }

    // The catalogue and the door into the books. Written last, because the cards
    // on them were read off books that had to exist first.
    for (const [name, text] of Object.entries(extra)) {
        put(join(into, name), text);
        generated++;
    }

    // A FILE THE RUN DID NOT WRITE HAS NO SOURCE, so it goes. This is what makes
    // the output regenerated rather than accumulated — a chapter deleted from the
    // corpus leaves, and nobody has to remember to delete it.
    const before = new Set<string>();
    const gather = (dir: string) => {
        if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return;
        for (const name of readdirSync(dir)) {
            const at = join(dir, name);
            statSync(at).isDirectory() ? gather(at) : before.add(forward(at));
        }
    };
    gather(into);
    const removed = [...before].filter(f => !written.has(f)).map(f => forward(relative(into, f)));
    sweep(into, written);

    return { carried, generated, removed };
};
