import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Book, Library } from '../inventory/library';
import { dotChapters } from '../inventory/filenames';
import { annotating, type Reading } from './annotations';
import { bare, itself, key, last, name as parsed, separator, tidy, type End, type Name, type Relation } from './language';
import { elements, type Element } from './reading';

// THE LIBRARY COMPILED INTO SOMETHING THAT CAN BE CHECKED.
//
// `catalogue/structure.ts` is a PROXY NAME, flagged for Doug.
//
// EVERY ANNOTATION IS HALF OF AN EDGE, AND BOTH SPELLINGS NORMALISE TO THE SAME EDGE. `*[[ X ]]`
// written in A and `[[ A ]]*` written in X are one edge asserted twice, so the structure is a map
// keyed by the edge and holding every assertion that produced it. That one move answers three
// questions at once:
//
//   two ends   the edge is WHOLE — both sides agree
//   one end    a CLAIM NOTHING CORROBORATES, reportable at the end that made it and the end owed
//   two out    a CONTRADICTION — one writing claiming two parents in a relation that is a tree
//
// A SPOT IS KEYED BY WHERE IT STANDS AND NEVER BY ITS NAME. Doug: "the name is not an identifier for
// the book." So a book renames without a single edge moving, and every check compares ids rather
// than text — which retires the whole apostrophe, entity and casing family of fault in one decision.
// Strings live at the boundary of the parse and nowhere after it.
//
// NAMES ARE A MULTIMAP ON PURPOSE. An earlier writing keyed cards by title in a plain Map and six
// books silently became five: the collision was ABSORBED by the data structure and surfaced three
// files away as a table complaining about a book that was standing right there.
//
// AND EVERY FILE IS READ ONCE. One text read, one TypeScript parse, one element scan, cached — and
// then six passes over what was gathered. The passes cannot be collapsed, because a chapter's name
// is scoped by its book's and a book's name may be written in the last file walked; what CAN be
// collapsed is the reading, and it is.

export type SpotId = string;
export type Where = { file: string; line: number };
export type { Relation };

// AND WHETHER A CHAPTER PRINTS ITS TITLE, because that decides whether the page has a place for it.
// A book always does: its cover's title is the page's heading.
export type Spot = { id: SpotId; at: string; file: string; kind: 'book' | 'chapter'; book: SpotId; prints: boolean };
export type Half = { by: SpotId; end: End; at: Where };
export type Edge = { relation: Relation; from: SpotId; to: SpotId; ends: Half[] };
export type Naming = { spot: SpotId; at: Where };
export type Listing = { of: SpotId; kind: 'chapter' | 'book'; canonical: boolean; synopsis: boolean; at: Where };

// EVERY PLACE THE LIBRARY NAMES SOMETHING AND MEANS IT. A reference written in prose and a mention
// written as an element are the same act — one names a thing and expects the library to hold it —
// and until this existed only the prose kind was checked. Measured on Doug's library: 104 element
// mentions, three naming things that are not there, and the specification said WELL-FORMED.
export type Mention = { by: SpotId; book: SpotId; name: Name; said: string; kind: 'reference' | 'book' | 'chapter' | 'for'; at: Where };

export type Structure = {
    spots: Map<SpotId, Spot>;
    names: Map<string, Naming[]>;
    named: Map<SpotId, string>;
    of(said: string): SpotId | undefined;
    // WHAT A NAME REACHES FROM WHERE IT STANDS, and the only resolver anything should use. It
    // carries the scoping rule and the one exception a library has — a cover is a chapter too,
    // titled with the book's name, so a table naming its own cover reaches the BOOK.
    reaches(held: Name, book: SpotId): SpotId | undefined;
    spells(held: Name, book: SpotId): string;
    edges: Map<string, Edge>;
    authorOf: Map<SpotId, SpotId>;
    subjectOf: Map<SpotId, SpotId>;
    topicsOf: Map<SpotId, Set<SpotId>>;
    lists: Map<SpotId, Map<SpotId, Listing>>;
    // THE COLOURING. Doug: "it referentially colors the tree in an interesting way, including the
    // tree that contains the authors."
    origin?: SpotId;
    authors: Set<SpotId>;
    mentions: Mention[];
    refused: { by: SpotId; said: string; at: Where }[];
    strays: { by: SpotId; said: string; tag: string; at: Where }[];
    untitled: { at: string; file: string }[];
};

const edgeKey = (relation: Relation, from: SpotId, to: SpotId): string => `${relation}:${from}:${to}`;

// WHICH SPOT A FILE'S `<Title>` NAMES. A cover's title is the BOOK's; every other file titles
// itself. That is the convention the library already runs on, and it is why a table of contents can
// be a chapter with a name of its own while still being where its book answers from.
const titles = (book: Book, file: string): SpotId => (file === '.cover.tsx' ? book.folder : `${book.folder}/${file}`);

// AND WHICH SPOT ITS ANNOTATIONS ARE ABOUT, which is a different question. The apparatus is the
// book's own voice; a numbered chapter speaks for itself. Found by building the fixture: with only
// the cover speaking for the book, a catalogue's answering half written in its table was attributed
// to the table-as-a-writing and every edge in the library came out a claim nothing corroborated.
const speaks = (book: Book, file: string): SpotId =>
    dotChapters.includes(file) || file === '.book.tsx' ? book.folder : `${book.folder}/${file}`;

const lines = (code: string): ((at: number) => number) => {
    const breaks: number[] = [];
    for (let at = code.indexOf('\n'); at !== -1; at = code.indexOf('\n', at + 1)) breaks.push(at);

    return (at: number): number => {
        let low = 0;
        let high = breaks.length;
        while (low < high) { const mid = (low + high) >> 1; if (breaks[mid] < at) low = mid + 1; else high = mid; }

        return low + 1;
    };
};

// THE ELEMENTS THAT NAME SOMETHING, and what each one means by naming it. `<Book>` and
// `<BookMention>` mention a book, `<For>` says what a synopsis is for, `<Chapter>` names a chapter
// of the book it stands in — so a chapter mention is read as `./X`, which is the same shape a
// reference writes by hand.
//
// NAMED AS THE FRAMEWORK EXPORTS THEM — `book` and `chapter` are the mentions, `Book` and `Chapter`
// the compositions — because `elements()` reports a tag under what it is bound to, not what the
// file called it. A table that writes `<Book>` after `const Book = $(bookMention)` is read as
// mentioning; a chapter that composes a `<Book>` is not.
const mentioning: Record<string, Mention['kind']> = { book: 'book', For: 'for', chapter: 'chapter' };
const wanted = ['Title', 'Option', ...Object.keys(mentioning)];

type Held = { book: Book; file: string; path: string; code: string; on: (at: number) => number; elements: Element[]; reading: Reading };

// WHAT A FILE SAID LAST TIME, KEPT UNTIL THE FILE CHANGES.
//
// THE TYPESCRIPT PARSE IS THE WHOLE COST. Measured on Doug's library 2026-09-19: 51 files, 270 KB —
// 10ms to read them off the disk, 2ms to scan for sigils, and 73ms to parse. At a thousand books it
// is three and a half seconds, and the dev server asks for it again every time a cover is saved.
//
// SO THE READING IS CACHED AND THE REST IS NOT. An edit re-parses ONE file and the other ten
// thousand are handed back; the passes that put the library together still run in full, because a
// name written in the last file walked can change what the first one meant, and that is the part
// that must not be cached.
//
// KEYED ON WHAT THE FILE IS RATHER THAN WHEN WE LOOKED. Modified time and size together: a rewrite
// that lands in the same millisecond almost always changes the length, and a `stat` of eleven
// thousand files is milliseconds against seconds of parsing.
const kept = new Map<string, { at: number; size: number; code: string; on: (at: number) => number; elements: Element[]; reading: Reading }>();

const looked = (path: string): { code: string; on: (at: number) => number; elements: Element[]; reading: Reading } => {
    const said = statSync(path);
    const before = kept.get(path);
    if (before !== undefined && before.at === said.mtimeMs && before.size === said.size) return before;

    const code = readFileSync(path, 'utf8');
    const on = lines(code);
    const held = { at: said.mtimeMs, size: said.size, code, on, elements: elements(path, code, wanted), reading: annotating(code, on) };
    kept.set(path, held);

    return held;
};

export const structure = (found: Library): Structure => {
    // ---- the one reading ----
    const read: Held[] = [];
    for (const book of found.books)
        for (const file of book.files) {
            const path = join(book.path, file);
            read.push({ book, file, path, ...looked(path) });
        }

    const spots = new Map<SpotId, Spot>();
    const names = new Map<string, Naming[]>();
    const named = new Map<SpotId, string>();
    const edges = new Map<string, Edge>();
    const mentions: Mention[] = [];
    const refused: Structure['refused'] = [];
    const strays: Structure['strays'] = [];
    const untitled: Structure['untitled'] = [];

    const titled = (one: Held): Element | undefined => one.elements.find(held => held.tag === 'Title');
    const calls = (said: string, spot: SpotId, at: Where): void => {
        names.set(said, [...(names.get(said) ?? []), { spot, at }]);
        named.set(spot, last(said));
    };

    // ---- the books, named by their covers ----
    //
    // FIRST, because a chapter's name is scoped by its book's and cannot be formed until the book
    // has one.
    for (const one of read) {
        if (one.file !== '.cover.tsx') continue;
        const title = titled(one);
        const said = title === undefined ? '' : bare(title.says).name;
        if (said === '') { untitled.push({ at: one.book.folder, file: one.path }); continue; }
        spots.set(one.book.folder, { id: one.book.folder, at: one.book.folder, file: one.path, kind: 'book', book: one.book.folder, prints: true });
        calls(said, one.book.folder, { file: one.path, line: one.on(title!.at) });
    }

    // ---- the chapters, named within their books ----
    for (const one of read) {
        if (one.file === '.cover.tsx' || one.file === '.book.tsx') continue;
        const within = named.get(one.book.folder);
        if (within === undefined) continue;
        const title = titled(one);
        const said = title === undefined ? '' : bare(title.says).name;
        if (said === '') { untitled.push({ at: one.book.folder, file: one.path }); continue; }
        if (said === within) continue;
        const id = titles(one.book, one.file);
        spots.set(id, { id, at: one.book.folder, file: one.path, kind: 'chapter', book: one.book.folder, prints: title!.prints });
        calls(`${within}${separator}${said}`, id, { file: one.path, line: one.on(title!.at) });
    }

    const of = (said: string): SpotId | undefined => {
        const held = names.get(tidy(said));

        return held !== undefined && held.length === 1 ? held[0].spot : undefined;
    };

    const spells = (held: Name, book: SpotId): string => key(held, named.get(book));
    const reaches = (held: Name, book: SpotId): SpotId | undefined =>
        (itself(held, named.get(book)) ? book : of(spells(held, book)));

    // ---- the edges, each normalised from whichever end said it ----
    //
    // An edge runs from the one who does the thing to the one it is done to — an author to what they
    // wrote, a catalogue to what it catalogues — so the end a writing occupies decides which way
    // round its own id goes.
    for (const one of read) {
        const by = speaks(one.book, one.file);
        for (const said of one.reading.refused) refused.push({ by, said: said.said, at: { file: one.path, line: said.line } });
        for (const said of one.reading.references) mentions.push({ by, book: one.book.folder, name: said.name, said: said.said, kind: 'reference', at: { file: one.path, line: said.line } });
        for (const said of one.reading.annotations) {
            if (said.form.is !== 'edge') continue;
            const other = reaches(said.name, one.book.folder);
            if (other === undefined) {
                mentions.push({ by, book: one.book.folder, name: said.name, said: said.said, kind: 'reference', at: { file: one.path, line: said.line } });
                continue;
            }
            const from = said.form.end === 'source' ? by : other;
            const to = said.form.end === 'source' ? other : by;
            const at = edgeKey(said.form.relation, from, to);
            const held = edges.get(at) ?? { relation: said.form.relation, from, to, ends: [] };
            held.ends.push({ by, end: said.form.end, at: { file: one.path, line: said.line } });
            edges.set(at, held);
        }
    }

    // ---- the mentions written as elements, which are references too ----
    for (const one of read) {
        const by = speaks(one.book, one.file);
        for (const held of one.elements) {
            const kind = mentioning[held.tag];
            if (kind === undefined || held.says === '') continue;
            const plain = bare(held.says).name;
            if (plain === '') continue;
            const said = kind === 'chapter' ? `./${plain}` : plain;
            mentions.push({ by, book: one.book.folder, name: parsed(said), said, kind, at: { file: one.path, line: one.on(held.at) } });
        }
    }

    // ---- the relations, each shaped by the check it answers ----
    //
    // An author and a canonical catalogue are functions — one each — and a topic is a relation that
    // may hold many ways and may loop. Giving them different TYPES is what stops a cycle check being
    // run on the one where cycles are fine.
    const authorOf = new Map<SpotId, SpotId>();
    const subjectOf = new Map<SpotId, SpotId>();
    const topicsOf = new Map<SpotId, Set<SpotId>>();
    for (const edge of edges.values()) {
        if (edge.relation === 'author') authorOf.set(edge.to, edge.from);
        if (edge.relation === 'subject') subjectOf.set(edge.to, edge.from);
        if (edge.relation === 'topic') topicsOf.set(edge.to, (topicsOf.get(edge.to) ?? new Set()).add(edge.from));
    }

    // ---- the table of contents, which is where a book answers ----
    //
    // A TABLE LISTS TWO KINDS OF THING and the framework's own elements say which. `<Chapter>` is a
    // book naming a chapter of its own; `<Book>` is a mention of another book, and it is the
    // CANONICAL listing only when it carries `**`. That distinction is needed because the library's
    // table lists every book for a reader to reach, including ones it does not catalogue directly.
    //
    // AND A SYNOPSIS STANDS BESIDE ITS LISTING rather than somewhere in the file. An `<Option>` is
    // the row a listing stands in, so the question is whether a synopsis stands in THAT row — an
    // earlier writing tested the whole table for the word and called every listing in it
    // synopsised, which is a slug's fault in another costume: an answer that is always yes.
    const lists = new Map<SpotId, Map<SpotId, Listing>>();
    for (const one of read) {
        if (one.file !== '.table.tsx') continue;
        const rows = one.elements.filter(held => held.tag === 'Option');
        const beside = (at: number): boolean => rows.some(row => at >= row.at && at < row.to && /<Synopsis/u.test(one.code.slice(row.at, row.to)));
        const held = new Map<SpotId, Listing>();
        for (const element of one.elements) {
            if (element.tag !== 'chapter' && element.tag !== 'book') continue;
            if (element.says === '') continue;
            const plain = bare(element.says);
            const said = parsed(element.tag === 'chapter' ? `./${plain.name}` : plain.name);
            const spot = reaches(said, one.book.folder);
            if (spot === undefined) { strays.push({ by: one.book.folder, said: plain.name, tag: element.tag, at: { file: one.path, line: one.on(element.at) } }); continue; }
            if (spot === one.book.folder) continue;
            held.set(spot, {
                of: spot,
                kind: element.tag === 'chapter' ? 'chapter' : 'book',
                canonical: plain.stars === '**',
                synopsis: beside(element.at),
                at: { file: one.path, line: one.on(element.at) },
            });
        }
        lists.set(one.book.folder, held);
    }

    // ---- the colouring, which is one flood ----
    //
    // Authorship begins in a single act of self-representation and is extended only by delegation —
    // so the origin is the one spot that authors itself, and a spot joins the authors only if its
    // canonical catalogue is an author AND its author is that same catalogue. Both halves: being
    // shelved under an author does not make you one, and naming an author as yours does not either.
    const alone = [...spots.keys()].filter(id => authorOf.get(id) === id);
    const origin = alone.length === 1 ? alone[0] : undefined;
    const authors = new Set<SpotId>();
    if (origin !== undefined) {
        const under = new Map<SpotId, SpotId[]>();
        for (const [child, parent] of subjectOf) under.set(parent, [...(under.get(parent) ?? []), child]);
        const waiting = [origin];
        authors.add(origin);
        while (waiting.length > 0) {
            const here = waiting.pop() as SpotId;
            for (const child of under.get(here) ?? [])
                if (!authors.has(child) && authorOf.get(child) === here) { authors.add(child); waiting.push(child); }
        }
    }

    return { spots, names, named, of, reaches, spells, edges, authorOf, subjectOf, topicsOf, lists, origin, authors, mentions, refused, strays, untitled };
};
