import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';
import type { Book } from '../inventory/library';

// THE SHARED RULES FOR READING A BOOK'S SOURCE: JSX's own whitespace, the entities prose reaches
// for, and the framework's elements read by what their tags are bound to. Two passes ask these, and
// a rule with two homes disagrees with itself.
//
// `specification/reading.ts` reads the same facts off a RUNNING book, for the specify phase; this
// reads them off the source, for the catalogue. Both names are PROXIES, flagged for Doug.

// ---- JSX's own whitespace rule, which is not optional to replicate ----

// A KEY IS WHAT THE RUNTIME SEES, AND THE RUNTIME SEES WHAT JSX MADE. Found 2026-09-18 in Doug's
// library: `<Book>Semantic Reference\n                        Theory</Book>` — a mention wrapped
// over a line. Nothing in the framework normalises it; `html.text` joins strings and `trim()` only
// strips the ends. Yet the graph records `Semantic Reference Theory` with one space, because the
// JSX compiler had already collapsed the newline and its indentation before any value existed.
//
// So a reader of SOURCE that takes JsxText literally invents a key the runtime never produces, the
// mention refuses, and the prose it refuses is correct — a failure with nothing wrong to look at.
// This is babel's own algorithm rather than an approximation of it.
const said = (text: string): string => {
    const lines = text.split(/\r\n|\n|\r/u);
    let lastSpoken = 0;
    for (let at = 0; at < lines.length; at++) if (/[^ \t]/u.test(lines[at])) lastSpoken = at;

    let answer = '';
    for (let at = 0; at < lines.length; at++) {
        let line = lines[at].replace(/\t/gu, ' ');
        if (at !== 0) line = line.replace(/^ +/u, '');
        if (at !== lines.length - 1) line = line.replace(/ +$/u, '');
        if (line === '') continue;
        answer += at === lastSpoken ? line : `${line} `;
    }

    return answer;
};

// AND THE ENTITIES, because an author writes `Dougs Library` and the catalogue holds
// `Dougs Library`. Only the ones a person writing prose reaches for; an unknown entity is left
// alone rather than guessed at, so a miss is visible in the key instead of silently becoming
// something else.
const entities: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
    mdash: '—', ndash: '–', hellip: '…',
};

const spelled = (text: string): string =>
    text.replace(/&(#x?[0-9a-f]+|[a-z]+);/giu, (whole, held: string) => {
        if (held.startsWith('#')) {
            const at = held[1] === 'x' || held[1] === 'X' ? Number.parseInt(held.slice(2), 16) : Number.parseInt(held.slice(1), 10);
            return Number.isFinite(at) ? String.fromCodePoint(at) : whole;
        }
        return entities[held.toLowerCase()] ?? whole;
    });

// WHAT A RUN OF JsxText SAYS ONCE THE COMPILER HAS HAD IT — the two rules above, in the order they
// happen, exported because TWO passes ask this question and a rule with two homes will eventually
// disagree with itself. It already did: the reference transform read raw text, so its key was
// `Dougs Library` where this file's key was `Dougs Library`, and a title that was written
// correctly did not resolve. One home, both callers.
export const reads = (text: string): string => spelled(said(text));

// ---- reading the markup ----

// THE TAG'S NAME, WITHOUT ASKING THE NODE WHERE IT CAME FROM. `getText()` walks up to its source
// file through parent pointers, and this parse is made WITHOUT them — `setParentNodes: false` is
// the one cheap trim a full parse allows and it costs nothing to stay inside. An element we read is
// named by a plain identifier, so reading the identifier is the whole of it.
const named = (tag: ts.JsxTagNameExpression): string => (ts.isIdentifier(tag) ? tag.text : '');

// WHAT AN ELEMENT SAYS, which is its JsxText and nothing else. An expression inside it is NOT read:
// the whole soundness of this pass is that it sees prose and only prose, so `{this.$about}` is
// silence here rather than a guess at what it will hold.
// AND A BOOKMARK IS NOT PART OF A NAME. `<BookMention><Bookmark>srt</Bookmark>Semantic Reference
// Theory</BookMention>` mentions one book and labels it with three letters — the bookmark is what a
// reader flips to it by, not what it is called. Reading the text of everything inside gave
// `srtSemantic Reference Theory`, a name nothing answers to, and the compiler reported Doug's
// correct prose as a broken reference. A name is the writing's own words and not its furniture.
const annotates = ['Bookmark'];

const inside = (element: ts.JsxElement): string => {
    let held = '';
    for (const child of element.children) {
        if (ts.isJsxText(child)) held += child.text;
        else if (ts.isJsxElement(child) && !annotates.includes(named(child.openingElement.tagName))) held += inside(child);
    }

    return reads(held).trim();
};

// ---- what a tag is bound to ----

// A TAG IS WHAT IT IS BOUND TO, NOT WHAT IT IS CALLED. `<Book>` in a table is a MENTION of a book
// because the file wrote `import { book as bookMention }` and `const Book = $(bookMention)` — and in
// a chapter that imported `Book` itself, the same tag is the whole book composed. A reader that
// matched the name saw a mention in both, and the regression suite read a page back with a `<main>`
// inside a `<p>` to say so. Doug, 2026-09-19: "You should be parsing things with static
// comprehensions like the typescript compiler."
//
// WITHIN THE FILE. An import is followed to the name it imports and the module it imports from; a
// local `const X = Y` or `const X = $(Y)` is followed to Y, and on to the import that names it. That
// is every spelling a table in the library uses today. A binding that reaches another file of the
// library is not followed — the `.public` this reads is being rewritten, and the binder proves the
// design on the version it has rather than resolving a module graph for one.
type Origin = { name: string; from: string };

const origins = (source: ts.SourceFile): Map<string, Origin> => {
    const held = new Map<string, Origin>();
    const locals = new Map<string, string>();
    for (const statement of source.statements) {
        if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
            const bindings = statement.importClause?.namedBindings;
            if (bindings !== undefined && ts.isNamedImports(bindings))
                for (const one of bindings.elements) held.set(one.name.text, { name: (one.propertyName ?? one.name).text, from: statement.moduleSpecifier.text });
        }
        if (ts.isVariableStatement(statement))
            for (const one of statement.declarationList.declarations) {
                if (!ts.isIdentifier(one.name) || one.initializer === undefined) continue;
                const to = ts.isIdentifier(one.initializer) ? one.initializer
                    : ts.isCallExpression(one.initializer) && one.initializer.arguments.length === 1 && ts.isIdentifier(one.initializer.arguments[0]) ? one.initializer.arguments[0]
                        : undefined;
                if (to !== undefined) locals.set(one.name.text, to.text);
            }
    }
    for (const [local, to] of locals) {
        let at: string | undefined = to;
        for (let hop = 0; at !== undefined && !held.has(at) && hop < 8; hop++) at = locals.get(at);
        const origin = at === undefined ? undefined : held.get(at);
        if (origin !== undefined) held.set(local, origin);
    }

    return held;
};

// THE FRAMEWORK'S, by the module it was imported from — `@dna-platform/public` or one of its doors.
const frameworks = (origin: Origin | undefined): origin is Origin => origin !== undefined && /^@dna-platform\/public(\/|$)/u.test(origin.from);

// ---- the framework's own elements, read with their offsets ----

// WHAT THE ELEMENTS OF ONE FILE SAY, WITH WHERE EACH STANDS. The framework already has elements that
// carry a relation — `<Title>` names a writing, `<Chapter>` and `<Book>` inside a table of contents
// are that book answering for what it holds — so a reader that only scans PROSE is reading half the
// library. `catalogue/structure.ts` asks this, and it is the reason the table of contents finally
// does something: the listings were there the whole time, in elements, while the structure looked
// for them in text and found none.
//
// AND WHETHER IT PRINTS. `<Title print={false}>` names a chapter the page draws no heading for, so
// the page draws no id for it either, and an address with a fragment would lead to a place that is
// not there. Doug, 2026-09-19: "Shouldn't it just be the url?" — a chapter that does not print is
// addressed as its book's page. The attribute is read here, where the element is read.
export type Element = { tag: string; says: string; prints: boolean; at: number; to: number };

const prints = (element: ts.JsxElement): boolean =>
    !element.openingElement.attributes.properties.some(one =>
        ts.isJsxAttribute(one) && ts.isIdentifier(one.name) && one.name.text === 'print'
        && one.initializer !== undefined && ts.isJsxExpression(one.initializer)
        && one.initializer.expression !== undefined && one.initializer.expression.kind === ts.SyntaxKind.FalseKeyword);

// `tags` ARE THE FRAMEWORK'S NAMES — `book`, `chapter`, `Title` — and an element is reported under
// the name it is bound to, whatever the file called it.
export const elements = (file: string, code: string, tags: string[]): Element[] => {
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const bound = origins(source);
    const held: Element[] = [];
    const walk = (node: ts.Node): void => {
        // IT DOES NOT STOP AT A MATCH. An `<Option>` is the row a listing stands in and the listing
        // is INSIDE it, so a scan that returned on the first match found the row and never the
        // `<Chapter>` it was holding — every table read as naming nothing.
        if (ts.isJsxElement(node)) {
            const origin = bound.get(named(node.openingElement.tagName));
            if (frameworks(origin) && tags.includes(origin.name))
                held.push({ tag: origin.name, says: inside(node), prints: prints(node), at: node.getStart(source), to: node.end });
        }
        ts.forEachChild(node, walk);
    };
    walk(source);

    return held;
};
