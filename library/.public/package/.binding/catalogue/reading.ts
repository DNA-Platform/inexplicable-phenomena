import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';
import type { Book } from '../inventory/library';

// WHAT A BOOK ANSWERS ABOUT ITSELF, READ OFF ITS SOURCE RATHER THAN OFF A RUNNING COPY.
//
// `catalogue/reading.ts` IS DELIBERATELY NAMED FOR `specification/reading.ts`, which answers the
// same facts by loading the book and asking it. They are one question with two mechanisms, and the
// second one is being replaced — so the names say that, rather than hiding it behind a word that
// makes them look unrelated. Both names are PROXIES, flagged for Doug.
//
// WHY IT IS WORTH REPLACING: loading a book costs three seconds of vite and a DOM before a word is
// read, then 6.7s for the first book and a fraction for each after — measured 2026-09-15. Parsing
// one costs 2.07ms. And the loading is why `resolve` waits for `specify`: a title was a thing a
// running book answered. Read here, it is a thing the source says.

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

// WHAT THIS FILE IS NOW. It began as a second reader of the library — it built a CARD per book by
// parsing covers, and `catalogue/catalogue.ts` keyed fifty-one addresses off it while
// `catalogue/structure.ts` validated six names off its own reading. Two readers of one library, in
// the middle of a compiler written against rules with two homes.
//
// WHAT SURVIVED IS THE PART THAT WAS ALWAYS SHARED: JSX's whitespace rule, the entities a person
// writing prose reaches for, and reading the framework's own elements. Everything that made a
// judgement about what a book IS moved to `catalogue/structure.ts`.

// ---- the framework's own elements, read with their offsets ----

// WHAT THE ELEMENTS OF ONE FILE SAY, WITH WHERE EACH STANDS. The framework already has elements that
// carry a relation — `<Title>` names a writing, `<Chapter>` and `<Book>` inside a table of contents
// are that book answering for what it holds — so a reader that only scans PROSE is reading half the
// library. `catalogue/structure.ts` asks this, and it is the reason the table of contents finally
// does something: the listings were there the whole time, in elements, while the structure looked
// for them in text and found none.
export type Element = { tag: string; says: string; at: number; to: number };

export const elements = (file: string, code: string, tags: string[]): Element[] => {
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const held: Element[] = [];
    const walk = (node: ts.Node): void => {
        // IT DOES NOT STOP AT A MATCH. An `<Option>` is the row a listing stands in and the listing
        // is INSIDE it, so a scan that returned on the first match found the row and never the
        // `<Chapter>` it was holding — every table read as naming nothing.
        if (ts.isJsxElement(node) && tags.includes(named(node.openingElement.tagName)))
            held.push({ tag: named(node.openingElement.tagName), says: inside(node), at: node.getStart(source), to: node.end });
        ts.forEachChild(node, walk);
    };
    walk(source);

    return held;
};
