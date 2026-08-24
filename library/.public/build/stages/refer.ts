import { join, relative, dirname, sep } from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';
import type { Node, SourceFile } from 'ts-morph';
import type { Complaint, Entry, Library, Reference } from '../library.ts';

// THE REFERENCES. One book names another by importing its cover under whatever
// alias reads well and writing that alias as a child — so the ALIAS is the
// display name and the IMPORT is the link, and one construct does both jobs.
//
//     import { Cover as Math } from '../.mathematics/.subject/.cover';
//     <Subject>{Math}</Subject>          both forms are read
//     <Subject><Math /></Subject>
//
// A cover's location is its book's location, so resolving the import to a file
// and dropping the filename gives the book that was named.

const forward = (p: string): string => p.split(sep).join('/');

const kinds = new Set(['Author', 'Subject', 'Canonical']);

// Files are added BY COMPUTED PATH. ts-morph's own glob does not match a
// dot-prefixed name and silently loads nothing at all.
const open = (paths: string[]): Project => {
    const project = new Project({
        compilerOptions: { jsx: 4, target: 99, module: 99, moduleResolution: 100, noEmit: true, allowJs: true },
        skipAddingFilesFromTsConfig: true,
    });
    for (const at of paths) project.addSourceFileAtPath(at);
    return project;
};

const holder = (node: Node): string => {
    const element = node.getFirstAncestorByKind(SyntaxKind.JsxElement);
    return element?.getOpeningElement().getTagNameNode().getText() ?? '';
};

const declared = (id: Node): string => {
    const symbol = id.getSymbol();
    const at = (symbol?.getAliasedSymbol?.() ?? symbol)?.getDeclarations?.()[0];
    return at?.getSourceFile?.().getFilePath() ?? '';
};

// WHAT A FILE EXPORTS, and it is not derivable from the filename: `.cover.tsx`
// exports `TestLibraryCover` in one book and `HardProblemCover` in another.
// Anything that composes a book needs the name, so it is read once, here.
const declaredBy = (source: SourceFile): string => {
    for (const statement of source.getVariableStatements()) {
        if (!statement.isExported()) continue;
        const named = statement.getDeclarations()[0]?.getName();
        if (named) return named;
    }
    return '';
};

export const refer = (library: Library): Library => {
    const every = library.entries.flatMap(entry =>
        entry.files.map(file => ({ entry, file, at: join(library.root, entry.path, file.name) })));
    const covers = every.filter(f => f.file.role === 'cover');
    if (!every.length) return library;

    // Every content file is opened, because every one declares a name a book
    // module has to import. References are still read from COVERS ONLY — a
    // subject or an author is a book's claim about itself and belongs on its
    // face, so a `<Subject>` written inside a chapter is deliberately not a link.
    const project = open(every.map(f => f.at));
    const complaints: Complaint[] = [...library.complaints];
    const entries: Entry[] = library.entries.map(e => ({ ...e, references: [], files: e.files.map(f => ({ ...f })) }));
    const byPath = new Map(entries.map(e => [e.path, e]));

    for (const { entry, file, at } of every) {
        const source = project.getSourceFile(at);
        if (!source) continue;
        const held = byPath.get(entry.path)!.files.find(f => f.name === file.name)!;
        held.declares = declaredBy(source);
        if (!held.declares) complaints.push({ at: entry.path, says: `${file.name} exports nothing a book can compose` });
    }

    for (const cover of covers) {
        const source = project.getSourceFile(cover.at);
        if (!source) continue;
        const entry = byPath.get(cover.entry.path)!;

        // Every Author, Subject and Canonical on the cover is a reference, whether
        // or not it points. An IMPORT makes it followable; a bare name is still
        // what the author said, and resolving is what turns one into the other —
        // so both are read here and told apart by whether `at` is empty.
        for (const element of source.getDescendantsOfKind(SyntaxKind.JsxElement)) {
            const as = element.getOpeningElement().getTagNameNode().getText();
            if (!kinds.has(as)) continue;

            const braced = element.getJsxChildren().find(c => c.getKind() === SyntaxKind.JsxExpression);
            const inner = braced?.asKind(SyntaxKind.JsxExpression)?.getExpression();
            const self = element.getJsxChildren().find(c => c.getKind() === SyntaxKind.JsxSelfClosingElement);
            const id: Node | undefined = inner?.getKind() === SyntaxKind.Identifier
                ? inner
                : self?.asKind(SyntaxKind.JsxSelfClosingElement)?.getTagNameNode();

            // No identifier at all — the author wrote a name and nothing more.
            if (!id) {
                const said = element.getJsxChildren()
                    .filter(c => c.getKind() === SyntaxKind.JsxText)
                    .map(c => c.getText().trim()).join('').trim();
                if (said) entry.references.push({ as: as.toLowerCase(), display: said, at: '', book: '' });
                continue;
            }

            const display = id.getText();
            const file = declared(id);
            if (!file) {
                complaints.push({ at: entry.path, says: `the ${as.toLowerCase()} ${JSON.stringify(display)} names nothing that resolves` });
                continue;
            }
            const at = forward(relative(library.root, file));
            const book = forward(dirname(at));
            const reference: Reference = { as: as.toLowerCase(), display, at, book };
            entry.references.push(reference);
            if (!byPath.has(book)) {
                complaints.push({ at: entry.path, says: `the ${reference.as} ${JSON.stringify(display)} points outside the library, at ${at}` });
            }
        }
    }

    return { ...library, entries, complaints };
};
