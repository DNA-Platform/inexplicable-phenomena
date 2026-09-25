import { basename } from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';
import type { Catalogue } from '../catalogue/catalogue';
import type { Inventory } from '../inventory/retaken';
import { reads } from '../catalogue/reading';
import { key, name as parsed, notation, spelling, whole } from '../catalogue/language';
import { slug } from '../resolution/addresses';

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
//   [[ X ]]        [[ X ]]*       [[ X ]]**      [[ X ]]***     annotations, about this writing
//     *[[ X ]]    **[[ X ]]     ***[[ X ]]                      annotations, about X
//      $[ X ]                                                   a reference
//      [[[ X ]]]                                                a mention — allocates HERE
//
//   AND ANY OF THEM MAY BE `[ words ]( X )` — the bracket is what is shown, the paren is X.
//
// WHAT THE IDENTIFIER IS. Doug, the same day: "An id should be given so that an id can be placed.
// Otherwise urls should be given so anchors can be made… I want the urls coming from the compiler."
// The mention is the one form that CREATES an address rather than spending one, so it is given an
// id — the fragment a reference to it is handed — and every other form is given the url the
// catalogue holds.
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
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const edits: { from: number; to: number; said: string }[] = [];
    const missed: Missing[] = [];

    // A FILE SHARED BY EVERY PAGE IS NEVER "HERE". The masthead is a resource of one book and is
    // drawn on all of them; compiled once, its mention of the book it lives in keeps its address.
    const shared = catalogue.shared(file);

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

            // THE MENTION ALLOCATES, SO ITS IDENTIFIER IS AN ID: `[[[ The First Shelf ]]]` becomes
            // `[The First Shelf](the-first-shelf)`, the slug of its whole name — the fragment the
            // catalogue hands a reference to it, so what a mention answers to is what is reached.
            if (!read.refers && read.brackets === 3) {
                edits.push({ from: at, to, said: `[${read.words}](${slug(whole(read.name))})` });
                continue;
            }

            // EVERY OTHER FORM IS VERIFIED AND GIVEN ITS URL — Doug, 2026-09-19: "There should not be
            // anymore dynamic link generation." What is shown is the thing and never the scope:
            // `$[ ./The books ]` reads "The books".
            const meant = parsed(read.name);
            const shown = read.named ? read.words : meant.of === 'book' ? meant.book : meant.chapter;
            const url = catalogue.where(key(meant, within));
            if (url === undefined) {
                missed.push({ key: key(meant, within), file, line: source.getLineAndCharacterOfPosition(at).line + 1 });
                continue;
            }

            // A LINK THAT LEADS WHERE YOU ALREADY ARE IS A SELF-REFERENCE, written with the self url,
            // `[words](#)`. Doug, 2026-09-24: "I like self-referential anchors, and we want to capture
            // that in what the compiler returns." Sprint 73 (a23a3b9) wrote such a link as its words
            // alone, and C12 as `[words]()`; what receives `#` decides how a self-reference is drawn.
            const here = !shared && url === catalogue.standing(file);
            edits.push({ from: at, to, said: `[${shown}](${here ? '#' : url})` });
        }
    };

    const walk = (node: ts.Node): void => {
        if (ts.isJsxText(node)) {
            const from = node.getStart(source);
            scan(code.slice(from, node.end), from, true);

            return;
        }
        // A STRING, WHEREVER IT STANDS — a prop, a literal in a helper, a template with nothing
        // substituted. Scanned as the source spells it, quotes stripped, so every offset is exact
        // even where the string carries an escape.
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const raw = node.getText(source);
            scan(raw.slice(1, -1), node.getStart(source) + 1, false);

            return;
        }
        ts.forEachChild(node, walk);
    };
    walk(source);

    let said = code;
    for (const edit of [...edits].sort((a, b) => b.from - a.from))
        said = said.slice(0, edit.from) + edit.said + said.slice(edit.to);

    return { text: said, missing: missed };
};

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
        const file = id.split('?')[0];
        if (!file.endsWith('.tsx')) return null;

        const catalogue = inventory.catalogue();
        const found = transforming(code, file, catalogue);
        if (found.missing.length > 0) throw new Error(found.missing.map(m => missing(m, catalogue.keys())).join('\n'));

        return found.text === code ? null : found.text;
    },
});
