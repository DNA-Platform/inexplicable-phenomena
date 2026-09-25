import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Book, Library } from '../inventory/library';
import { dotChapters } from '../inventory/filenames';
import { annotating, type Reading, type Said } from './annotations';
import { itself, key, last, separator, tidy, titled, type End, type Name, type Relation } from './language';

// THE LIBRARY COMPILED INTO SOMETHING THAT CAN BE CHECKED.
//
// `catalogue/structure.ts` is a PROXY NAME, flagged for Doug.
//
// EVERY ANNOTATION IS HALF OF AN EDGE, AND BOTH SPELLINGS NORMALISE TO THE SAME EDGE — two ends is
// whole, one end is a claim nothing corroborates, two out of a tree relation is a contradiction. A
// SPOT IS KEYED BY WHERE IT STANDS AND NEVER BY ITS NAME, so every check compares ids and strings
// stop at the boundary of the parse. NAMES ARE A MULTIMAP ON PURPOSE, so a collision is reported
// rather than absorbed. And every file is read once, cached, then six passes that cannot collapse.

export type SpotId = string;
export type Where = { file: string; line: number };
export type { Relation };

// AN ANCHOR IS A SPOT TOO: `[[[ X ]]]` — "this is named X, here" — names the writing it stands in,
// within its book, and a reference reaches it as it reaches a chapter. `anchor` is a PROXY NAME,
// flagged for Doug; the language calls the form a mention.
export type Spot = { id: SpotId; at: string; file: string; kind: 'book' | 'chapter' | 'anchor'; book: SpotId };
export type Half = { by: SpotId; end: End; at: Where };
export type Edge = { relation: Relation; from: SpotId; to: SpotId; ends: Half[] };
export type Naming = { spot: SpotId; at: Where };
export type Listing = { of: SpotId; kind: 'chapter' | 'book'; canonical: boolean; synopsis: boolean; at: Where };

// EVERY PLACE THE LIBRARY NAMES SOMETHING AND MEANS IT: a reference, `$[ X ]`, wherever it is written,
// or an edge whose other end the library does not hold. Since Sprint 82 nothing is read off an
// element — Doug: "You don't need the compiler to check for anything. You can't! They might
// subclass them. That's why they are in special files."
export type Mention = { by: SpotId; book: SpotId; name: Name; said: string; at: Where };

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
    untitled: { at: string; file: string }[];
    // THE BOOKS ABOUT SOMETHING — a cover carrying a second title form, its About, which names its
    // own book — and so the books another may be filed under. `about` is a PROXY NAME.
    about: Set<SpotId>;
    // AND EVERY TITLE FORM THAT NAMES SOMETHING OTHER THAN THE WRITING ITS FILE TITLES. A PROXY NAME.
    titledTwice: { by: SpotId; said: string; at: Where }[];
    // EVERY SPOT SOMETHING IN THE LIBRARY REFERS TO, so a name nobody spends can be refused.
    referred: Set<SpotId>;
    // AND EVERY NAME A RESOURCE TRIED TO MAKE, which a resource may not.
    resourceNames: { by: SpotId; said: string; at: Where }[];
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

// WHAT A TITLE FORM NAMES, as the name it gives: its book in a cover, and a chapter of its book
// anywhere else, by [the language](./language.ts)'s one rule. A name that says another book gives
// nothing, since a file titles what it is.
const titleOf = (name: Name, cover: boolean): string => {
    const named = titled(name, cover);

    return named.of === 'book' ? named.book : 'within' in named ? named.chapter : '';
};

// AND WHETHER A FILE IS A RESOURCE — code beside a chapter, shared by the pages that draw it. A
// resource is read for what it REFERS TO and never for what it names: the masthead's reference to
// the plate is spent from a resource, and the structure said nothing referred to the plate
// (2026-09-20) because it read chapters alone while the transform compiled the resource fine.
type Held = { book: Book; file: string; path: string; resource: boolean; code: string; on: (at: number) => number; reading: Reading };

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
const kept = new Map<string, { at: number; size: number; code: string; on: (at: number) => number; reading: Reading }>();

const looked = (path: string): { code: string; on: (at: number) => number; reading: Reading } => {
    const said = statSync(path);
    const before = kept.get(path);
    if (before !== undefined && before.at === said.mtimeMs && before.size === said.size) return before;

    const code = readFileSync(path, 'utf8');
    const on = lines(code);
    const held = { at: said.mtimeMs, size: said.size, code, on, reading: annotating(code, on) };
    kept.set(path, held);

    return held;
};

export const structure = (found: Library): Structure => {
    // ---- the one reading ----
    const read: Held[] = [];
    for (const book of found.books) {
        for (const file of book.files) {
            const path = join(book.path, file);
            read.push({ book, file, path, resource: false, ...looked(path) });
        }
        for (const file of [...book.resources.values()].flat()) {
            const path = join(book.path, file);
            read.push({ book, file, path, resource: true, ...looked(path) });
        }
    }

    const spots = new Map<SpotId, Spot>();
    const names = new Map<string, Naming[]>();
    const named = new Map<SpotId, string>();
    const edges = new Map<string, Edge>();
    const mentions: Mention[] = [];
    const refused: Structure['refused'] = [];
    const untitled: Structure['untitled'] = [];
    const about: Structure['about'] = new Set();
    const titledTwice: Structure['titledTwice'] = [];
    const resourceNames: Structure['resourceNames'] = [];

    const titling = (one: Held): Said[] => one.reading.annotations.filter(said => said.form.is === 'title');
    const calls = (said: string, spot: SpotId, at: Where): void => {
        names.set(said, [...(names.get(said) ?? []), { spot, at }]);
        named.set(spot, last(said));
    };

    // ---- the books, named by their covers ----
    //
    // FIRST, because a chapter's name is scoped by its book's and cannot be formed until the book
    // has one. A book is named by the title form its cover holds, whatever element holds it; a
    // second one naming the same book is its About, and one naming anything else titles it twice.
    for (const one of read) {
        if (one.file !== '.cover.tsx') continue;
        const [title, ...others] = titling(one);
        const said = title === undefined ? '' : titleOf(title.name, true);
        if (said === '') { untitled.push({ at: one.book.folder, file: one.path }); continue; }
        spots.set(one.book.folder, { id: one.book.folder, at: one.book.folder, file: one.path, kind: 'book', book: one.book.folder });
        calls(said, one.book.folder, { file: one.path, line: title.line });
        for (const other of others)
            if (titleOf(other.name, true) === said)
                about.add(one.book.folder);
            else
                titledTwice.push({ by: one.book.folder, said: other.said, at: { file: one.path, line: other.line } });
    }

    // ---- the chapters, named within their books ----
    for (const one of read) {
        if (one.resource || one.file === '.cover.tsx' || one.file === '.book.tsx') continue;
        const within = named.get(one.book.folder);
        if (within === undefined) continue;
        const [title, ...others] = titling(one);
        const said = title === undefined ? '' : titleOf(title.name, false);
        if (said === '') { untitled.push({ at: one.book.folder, file: one.path }); continue; }
        // A CHAPTER TITLED WITH ITS BOOK'S NAME IS A CHAPTER LIKE ANY OTHER, and its address is the
        // cover's, which `wellformed` raises. It was skipped here in silence, and a silent skip is
        // a chapter nobody lists, nobody reaches and nobody checks.
        const id = titles(one.book, one.file);
        spots.set(id, { id, at: one.book.folder, file: one.path, kind: 'chapter', book: one.book.folder });
        calls(`${within}${separator}${said}`, id, { file: one.path, line: title.line });
        for (const other of others)
            if (titleOf(other.name, false) !== said)
                titledTwice.push({ by: id, said: other.said, at: { file: one.path, line: other.line } });
    }

    // ---- the anchors, named within their books ----
    //
    // `[[[ X ]]]` allocates an address where it stands, so it is a spot of its book with a name of
    // its own — a reference `$[ ./X ]` reaches it exactly as it reaches a chapter, and a name that
    // answers twice in one book is what `wellformed` refuses.
    for (const one of read) {
        // A RESOURCE MAY NOT NAME ANYTHING: it is drawn on every page that wears it, and a name
        // stands in one place. What it tries to name is kept for `wellformed` to refuse.
        if (one.resource) {
            for (const said of one.reading.annotations)
                if (said.form.is === 'mention' && said.name.of === 'book' && said.name.book !== '')
                    resourceNames.push({ by: one.book.folder, said: said.name.book, at: { file: one.path, line: said.line } });
            for (const title of titling(one))
                resourceNames.push({ by: one.book.folder, said: title.said, at: { file: one.path, line: title.line } });
            continue;
        }
        const within = named.get(one.book.folder);
        if (within === undefined) continue;
        const by = speaks(one.book, one.file);
        for (const said of one.reading.annotations) {
            if (said.form.is !== 'mention' || said.name.of !== 'book' || said.name.book === '') continue;
            const id = `${by}#${said.name.book}`;
            spots.set(id, { id, at: one.book.folder, file: one.path, kind: 'anchor', book: one.book.folder });
            calls(`${within}${separator}${said.name.book}`, id, { file: one.path, line: said.line });
        }
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
        for (const said of one.reading.references) mentions.push({ by, book: one.book.folder, name: said.name, said: said.said, at: { file: one.path, line: said.line } });
        for (const said of one.reading.annotations) {
            if (said.form.is !== 'edge') continue;
            const other = reaches(said.name, one.book.folder);
            if (other === undefined) {
                mentions.push({ by, book: one.book.folder, name: said.name, said: said.said, at: { file: one.path, line: said.line } });
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

    // ---- what is referred to, from anywhere in the library ----
    //
    // Doug, 2026-09-20: "it should also refuse when nothing references a mention in the whole
    // library. It is unnecessary in that case and we want a compact library." So the structure says
    // which spots a reference reaches, and `wellformed` raises a name nobody spends.
    const referred = new Set<SpotId>();
    for (const one of mentions) {
        const spot = reaches(one.name, one.book);
        if (spot !== undefined) referred.add(spot);
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
    // A TABLE LISTS WHAT IT REFERS TO AND ANSWERS FOR, read off the notation in `.table.tsx` and off
    // no element: a chapter of its own book is listed by a reference to it, `$[ ./The Shelves ]`, and a
    // book it catalogues by its answer, `[[ The Log ]]**`, canonical when that answer is a subject's.
    //
    // AND A TABLE THAT ANSWERS FOR A BOOK REFERS TO THAT BOOK'S OWN SYNOPSIS — Doug, 2026-09-19: "the
    // table needs links to its chapters and the books that those chapters are synopses of"; and
    // 2026-09-20: "In the book. It has a .synopsis file literally." Read per table, since the row an
    // element once drew is a runtime's business and the compiler reads no tag.
    const lists = new Map<SpotId, Map<SpotId, Listing>>();
    for (const one of read) {
        if (one.resource || one.file !== '.table.tsx') continue;
        const listings = new Map<SpotId, Listing>();
        const referredHere = new Set<SpotId>();
        for (const referring of one.reading.references) {
            const spot = reaches(referring.name, one.book.folder);
            if (spot === undefined || spot === one.book.folder) continue;
            referredHere.add(spot);
            if (spots.get(spot)?.kind === 'chapter' && spots.get(spot)?.book === one.book.folder)
                listings.set(spot, { of: spot, kind: 'chapter', canonical: false, synopsis: false, at: { file: one.path, line: referring.line } });
        }
        for (const said of one.reading.annotations) {
            if (said.form.is !== 'edge' || said.form.end !== 'source') continue;
            const spot = reaches(said.name, one.book.folder);
            if (spot === undefined || spot === one.book.folder) continue;
            listings.set(spot, {
                of: spot,
                kind: 'book',
                canonical: said.form.relation === 'subject',
                synopsis: referredHere.has(`${spot}/.synopsis.tsx`),
                at: { file: one.path, line: said.line },
            });
        }
        lists.set(one.book.folder, listings);
    }

    // ---- who may author ----
    //
    // Doug, 2026-09-25, and it is the whole rule: "1. A book that is by its subject — There can be
    // only one of those. 2. Any book catalogued by one that is a subject." So the origin is the one
    // book by its own subject, the autobiography, and the others are the books whose subject —
    // their singular catalogue, never a topic — is the origin. One step, not a walk down the tree.
    const alone = [...spots.keys()].filter(id => authorOf.get(id) === id);
    const origin = alone.length === 1 ? alone[0] : undefined;
    const authors = new Set<SpotId>();
    if (origin !== undefined) {
        authors.add(origin);
        for (const [book, subject] of subjectOf)
            if (subject === origin)
                authors.add(book);
    }

    return { spots, names, named, of, reaches, spells, edges, authorOf, subjectOf, topicsOf, lists, origin, authors, mentions, refused, untitled, about, titledTwice, referred, resourceNames };
};
