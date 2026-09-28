import { basename } from 'node:path';
import type { Plugin } from 'vite';
import type { Catalogue } from '../catalogue/catalogue';
import type { Inventory } from '../inventory/retaken';
import { reads } from '../catalogue/reading';
import { sourceOf } from '../catalogue/structure';
import { form, key, name as parsed, notation, spelling, titled, whole, type Name } from '../catalogue/language';

// THE REFERENCE TRANSFORM. The notation in, ordinary markup out.
//
// `reference/transform.ts` is a PROXY NAME, flagged for Doug.
//
// EVERY FORM COMPILES TO `[ words ]( identifier )`, AND THE COMPILER NAMES NO COMPONENT. Doug,
// 2026-09-24: "The compiler ALWAYS should give: `[text](identifier)`. It doesn't know about specific
// components. To generate any is to break polymorphism. It spits out `[]()`." So this file has one
// job and no judgement — resolve the identifier, write both halves — and every decision about what
// is DRAWN belongs to the element the writer put the words in: a Mention reads an id and answers to
// it, a Means reads a url and links to it, and words put in nothing print as they were written.
//
// THE FORMS ARE [the language](../catalogue/language.ts)'s, written down there once, and ANY OF
// THEM MAY BE `[ words ]( X )` — the bracket is what is shown, the paren is X.
//
// WHAT THE IDENTIFIER IS: THE URL THE CATALOGUE HOLDS, ON EVERY FORM. Doug, the same day: "I want
// the urls coming from the compiler." The mention is the one form that CREATES an address rather
// than spending one, and until 2026-09-26 it was given an id for that reason; now an element makes
// its own id from its name — "Title should use the name to create the fragment with the Identifier
// utility. The url should be completely arbitrary" — so a mention is given the url of the place it
// makes, like everything else, and a heading written as one links to itself with it.
//
// IT RUNS `pre` and splices by absolute offset, so the file is byte-identical either side of a
// match and what @vitejs/plugin-react compiles is markup that never heard of a sigil.

// THE SPELLING IS THE LANGUAGE'S, constructed here with a cursor of its own — never a second copy.
const notating = new RegExp(notation.source, 'gu');

export type Missing = { key: string; file: string; line: number };

// WHAT AN AUTHOR CAN ACT ON: which chapter asked, where in it, and what it asked for.
//
// AND NEVER THE ROSTER. An earlier writing printed every key in the library after every failure —
// three faults, three copies of fifty-one keys, and the one thing a reader needed was the first
// eight words. [The Order of a Class](../../../.lib/the-coding-style/02-the-order-of-a-class.md)
// rules it: an exception message may never enumerate a roster. What is NEAR the name is worth
// saying, because a name that differs by an apostrophe is the commonest way to be wrong.
const near = (key: string, keys: string[]): string[] => {
    const loose = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/gu, '');

    return keys.filter(k => loose(k) === loose(key));
};

export const missing = (missing: Missing, keys: string[]): string => {
    const close = near(missing.key, keys);

    return `${basename(missing.file)} line ${missing.line} names "${missing.key}", and the library holds no such thing${close.length ? ` — did it mean "${close[0]}"?` : ''}`;
};

// WHAT A FILE COMES OUT AS: its source with every form written out, and every name it asked for
// that the library does not hold.
export type Found = { text: string; missing: Missing[] };

// EVERY SIGIL IN ONE FILE, SPLICED BACK TO FRONT so an offset taken before an edit is still true
// after it.
//
// IT COLLECTS WHAT IT COULD NOT RESOLVE RATHER THAN THROWING ON THE FIRST, because two things ask
// and they want different answers. The PLUGIN stops the file it is compiling, which is the feedback
// an author wants while typing; the BATCH reads every file and names every failure at once. A gate
// that reports the first fault sends someone back six times for six faults.
export const transforming = (code: string, file: string, catalogue: Catalogue): Found => {
    // WHERE THIS FILE STANDS, because `$[ ./The Sheet ]` means the chapter of the book it is written
    // in. The scope is the one thing a reference cannot carry and the place it stands always knows.
    const within = catalogue.scope(file);
    const cover = basename(file) === '.cover.tsx';
    const synopsis = basename(file) === '.synopsis.tsx';
    // THE SAME READING THE STRUCTURE TOOK, when it read this very text — one parse per version of a
    // file across both passes, and the same runs, so the catalogue and the page cannot disagree about
    // what a file says. Sprint 90.
    const held = sourceOf(file, code);
    const edits: { from: number; to: number; said: string }[] = [];
    const missed: Missing[] = [];

    // ONE SCAN FOR PROSE AND FOR STRINGS. Doug, 2026-09-19: "You haven't done anything to change the
    // language. Evaluating the ()[] was never the job of this framework." So a sigil in a string —
    // a prop, a literal in a helper — compiles to exactly what it compiles to in prose, and PROSE IS
    // READ THE WAY JSX READS IT — whitespace collapsed, entities spelled — while a string is read as
    // written, because that is what its element will receive.
    const scan = (text: string, from: number, prose: boolean): void => {
        notating.lastIndex = 0;
        for (let match = notating.exec(text); match !== null; match = notating.exec(text)) {
            const read = spelling(match, prose ? reads : t => t);
            const at = from + match.index;
            const to = at + match[0].length;

            // A BRACKET RUN THAT DOES NOT BALANCE IS LEFT ALONE. `catalogue/wellformed.ts`
            // refuses it by name, and rewriting something the compiler does not understand is
            // how a fault becomes invisible.
            if (!read.balanced) continue;

            // EVERY FORM IS VERIFIED AND GIVEN ITS URL — Doug, 2026-09-19: "There should not be
            // anymore dynamic link generation." What is shown is the thing and never the scope:
            // `$[ ./The books ]` reads "The books". A title form names the writing its file is — in
            // a cover its book, anywhere else a chapter of its book — and a mention names the place
            // it makes, within the book it stands in, by its whole name: `[[[ The First Shelf ]]]`
            // is `./The First Shelf`, and its url is that place's, fragment and all.
            const said = parsed(read.name);
            const spelled = read.refers ? undefined : form(read.prefix, read.brackets, read.postfix);
            const meant: Name = spelled?.is === 'mention' ? { of: 'chapter', within: true, chapter: whole(read.name) }
                : spelled?.is === 'title' ? titled(said, cover) : said;
            const shown = read.named ? read.words : meant.of === 'book' ? meant.book : meant.chapter;
            const url = catalogue.where(key(meant, within));
            if (url === undefined) {
                missed.push({ key: key(meant, within), file, line: held.line(at) });
                continue;
            }

            // THE SAME URL WHEREVER IT STANDS — Doug, 2026-09-25: "I don't like the special case. Just
            // give the same urls everywhere." A link to the page it stands on is a self-reference and
            // carries that page's url like any other; the `#` written here since C13 is gone.
            //
            // AND A SYNOPSIS'S TITLE GOES TO ITS BOOK — Doug, 2026-09-26: "we want the title of a
            // synopsis chapter to go to the book it is a synopsis of! Most titles are self-links." The
            // compiler knows the synopsis by its file, as it knows the cover, so the title form there is
            // verified as the chapter it names and given the book's url; a reference to the chapter is
            // given the chapter's own, so the synopsis is still reached where it stands.
            const address = spelled?.is === 'title' && synopsis && within !== undefined ? catalogue.where(within) ?? url : url;
            edits.push({ from: at, to, said: `[${shown}](${address})` });
        }
    };

    // THE RUNS THE PARSER LOCATED — prose between tags, and a string wherever it stands, quotes
    // stripped — and nothing else in the file: never a comment, an import's path or a tag's name.
    for (const run of held.runs) scan(run.text, run.from, run.kind === 'prose');

    let said = code;
    for (const edit of [...edits].sort((a, b) => b.from - a.from))
        said = said.slice(0, edit.from) + edit.said + said.slice(edit.to);

    return { text: said, missing: missed };
};

// A RAW MODULE IS A LITERAL AND IS LEFT AS WRITTEN. The assembly imports each file accompanying a
// chapter with `?raw` so its text becomes an Append's, and that text is the file exactly — Doug,
// 2026-09-28: "it is the version written that is used not the version modified." The same file
// imported as a module still compiles. Sprint 90.
export const literal = (query: string | undefined): boolean => query !== undefined && query.split('&').includes('raw');

// THE PLUGIN — the incremental half. It holds no catalogue of its own: the catalogue is the
// library's, and a plugin is only where the library is asked.
//
// AND IT IS ASKED ON EVERY TRANSFORM RATHER THAN ONCE. The sentence above was true of the design
// and false of the code: a catalogue passed in at construction is a catalogue held, and while the
// dev server was open it was the one built before the author had written anything. A reference to
// a chapter added since would be refused by a compiler that was simply looking at yesterday.
export const references = (inventory: Inventory): Plugin => ({
    name: 'binding:references',
    enforce: 'pre',
    transform(code: string, id: string) {
        const [file, query] = id.split('?');
        if (!file.endsWith('.tsx') || literal(query)) return null;

        const catalogue = inventory.catalogue();
        const found = transforming(code, file, catalogue);
        if (found.missing.length > 0) throw new Error(found.missing.map(m => missing(m, catalogue.keys())).join('\n'));

        return found.text === code ? null : found.text;
    },
});
