import { basename } from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';
import type { Catalogue } from '../catalogue/catalogue';
import type { Inventory } from '../inventory/retaken';
import { frameworks, mentions, named, origins, prints, reads } from '../catalogue/reading';
import { bare, itself, key, name as parsed, notation, spelling } from '../catalogue/language';

// THE REFERENCE TRANSFORM. The notation in, ordinary markup out.
//
// `reference/transform.ts` is a PROXY NAME, flagged for Doug.
//
// EVERYTHING COMPILES TO `[ words ]( url )` EXCEPT THE MENTION. Doug, 2026-09-18: "Everything
// supports [] or (). Everything compiles to []() except the mention." So this file has one job and
// no judgement — resolve the identifier, write the address — and every decision about what is DRAWN
// belongs to the element that receives it. A title not drawing itself as a link is `$Title`'s
// ruling, not the resolver's. Three outcomes: inside an element that reads a link, `[words](url)`,
// or `[words]()` for the page it stands on; anywhere else, the words alone.
//
//   [[ X ]]        [[ X ]]*       [[ X ]]**      [[ X ]]***     annotations, about this writing
//     *[[ X ]]    **[[ X ]]     ***[[ X ]]                      annotations, about X
//      $[ X ]                                                   a reference
//      [[[ X ]]]                                                a mention — allocates HERE
//
//   AND ANY OF THEM MAY BE `[ words ]( X )` — the bracket is what is shown, the paren is X.
//
// THE MENTION IS THE ONE EXCEPTION because it is the only form that CREATES an address rather than
// spending one. There is no writing kind in the framework that plants an id yet, so its copy stands
// and the planting is owed.
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
    const loose = (one: string): string => one.toLowerCase().replace(/[^a-z0-9]+/gu, '');

    return keys.filter(one => loose(one) === loose(key));
};

export const missing = (one: Missing, keys: string[]): string => {
    const close = near(one.key, keys);

    return `${basename(one.file)} line ${one.line} names "${one.key}", and the library holds no such thing${close.length ? ` — did it mean "${close[0]}"?` : ''}`;
};

export type Found = { text: string; declared: string[]; missing: Missing[]; owes: boolean };

// WHETHER A FILE CAN DRAW AN INLINE REFERENCE AT ALL. `Parser.link` is ANCHORED — it matches only
// when the whole of a mention is a link — so `[text](url)` spliced into a paragraph is never parsed
// and renders as the characters themselves. Measured 2026-09-18 on three references written into
// Doug's library: all three compiled correctly, all three came out as literal text, and `proof` was
// silent because there is no broken link, there is no link.
//
// `<Ref>` IS THE ELEMENT THAT DOES PARSE ONE, and the tables have used it all along. So a reference
// in prose compiles to a `<Ref>`, and a file that writes one has to import it — which is a thing the
// compiler can see and say, instead of a page that quietly prints its own source.
const imports = /import\s*\{([^}]*)\}\s*from\s*'@dna-platform\/public'/u;

const drawn = (code: string): boolean => (imports.exec(code)?.[1] ?? '').split(',').some(one => one.trim() === 'Ref');

// EVERY SIGIL IN ONE FILE'S PROSE, SPLICED BACK TO FRONT so an offset taken before an edit is still
// true after it.
//
// IT COLLECTS WHAT IT COULD NOT RESOLVE RATHER THAN THROWING ON THE FIRST, because two things ask
// and they want different answers. The PLUGIN stops the file it is compiling, which is the feedback
// an author wants while typing; the BATCH reads every file and names every failure at once. A gate
// that reports the first fault sends someone back six times for six faults.
export const transforming = (code: string, file: string, catalogue: Catalogue): Found => {
    const draws = drawn(code);
    // WHERE THIS FILE STANDS, because `$[ > The Sheet ]` means the chapter of the book it is written
    // in. The scope is the one thing a reference cannot carry and the place it stands always knows.
    const within = catalogue.scope(file);
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const edits: { from: number; to: number; said: string }[] = [];
    const declared: string[] = [];
    const missed: Missing[] = [];
    // WHETHER THIS FILE WROTE AN INLINE REFERENCE, which is the one edit that needs `<Ref>` to be
    // drawn. An annotation also writes `[words](url)`, and that is read by the element around it —
    // so "does an edit start with a bracket" is not the question, and this is asked at the one
    // place a reference is written.
    let referred = false;

    // ONE SCAN FOR PROSE AND FOR STRINGS. Doug, 2026-09-19: "You haven't done anything to change the
    // language. Evaluating the ()[] was never the job of this framework." So a sigil in a string —
    // a prop, a literal in a helper — compiles to exactly what it compiles to in prose: a reference
    // and an annotation to `[words](url)`, a mention to its words. The one difference is that prose
    // gets a `<Ref>` around a reference, because `Parser.link` is anchored and JSX text needs an
    // element to parse one, and a string is handed to whatever element receives it.
    //
    // AND PROSE IS READ THE WAY JSX READS IT — whitespace collapsed, entities spelled — while a
    // string is read as written, because that is what its element will receive.
    // `mentioning` SAYS WHETHER WHAT RECEIVES THE TEXT READS A LINK: the mention kinds do, and so
    // does whatever a string is handed to, since nothing else parses one. Everything else — a
    // title, a paragraph — receives an annotation as its words.
    const scan = (text: string, from: number, prose: boolean, mentioning: boolean): void => {
        notating.lastIndex = 0;
        for (let held = notating.exec(text); held !== null; held = notating.exec(text)) {
            const read = spelling(held, prose ? reads : one => one);
            const { refers: reference, name, words } = read;
            const at = from + held.index;
            const to = at + held[0].length;

            // A BRACKET RUN THAT DOES NOT BALANCE IS LEFT ALONE. `catalogue/wellformed.ts`
            // refuses it by name, and rewriting something the compiler does not understand is
            // how a fault becomes invisible.
            if (!read.balanced) continue;

            // THE MENTION ALLOCATES AND OWES AN ANCHOR. Its copy stands until a writing kind
            // exists that plants an id.
            if (!reference && read.brackets === 3) { declared.push(name); edits.push({ from: at, to, said: words }); continue; }

            // AN ANNOTATION IS VERIFIED AND THEN WRITES ITS ADDRESS, `[words](url)`, into the element
            // that will draw it — Doug, 2026-09-19: "There should not be anymore dynamic link
            // generation." A REFERENCE writes the same. What is shown is the thing and never the
            // scope: `$[ ./The books ]` reads "The books".
            const meant = parsed(name);
            const shown = read.named ? words : meant.of === 'book' ? meant.book : meant.chapter;
            const url = catalogue.where(key(meant, within));
            if (url === undefined) {
                missed.push({ key: key(meant, within), file, line: source.getLineAndCharacterOfPosition(at).line + 1 });
                continue;
            }

            // A LINK THAT LEADS WHERE YOU ALREADY ARE IS NOT A LINK — the branch settled that in
            // Sprint 73 (a23a3b9), and this is where it is decided now: a mention of the page it
            // stands on is written with no address, `[words]()`, and a reference to it is its words.
            const here = url === catalogue.standing(file);

            if (!reference) { declared.push(name); edits.push({ from: at, to, said: mentioning ? `[${shown}](${here ? '' : url})` : shown }); continue; }
            if (here) { edits.push({ from: at, to, said: shown }); continue; }

            if (prose) referred = true;
            edits.push({ from: at, to, said: prose && draws ? `<Ref>[${shown}](${url})</Ref>` : `[${shown}](${url})` });
        }
    };

    const bound = origins(source);
    const walk = (node: ts.Node, mentioning: boolean): void => {
        if (ts.isJsxText(node)) {
            const from = node.getStart(source);
            scan(code.slice(from, node.end), from, true, mentioning);

            return;
        }
        // A STRING, WHEREVER IT STANDS — a prop, a literal in a helper, a template with nothing
        // substituted. Scanned as the source spells it, quotes stripped, so every offset is exact
        // even where the string carries an escape.
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const raw = node.getText(source);
            scan(raw.slice(1, -1), node.getStart(source) + 1, false, true);

            return;
        }
        // A MENTION WRITTEN WITH PLAIN WORDS NAMES WHAT IT SAYS — `<Book>The Log</Book>` — which is
        // how `catalogue/structure.ts` has read it all along. So the words are compiled as though
        // bracketed, and the element receives the address the structure already validated.
        if (ts.isJsxElement(node)) {
            const origin = bound.get(named(node.openingElement.tagName));
            const mention = frameworks(origin) && mentions.includes(origin.name);
            // AND ONE THAT DOES NOT PRINT IS LEFT AS WRITTEN: it draws nothing, so it needs no
            // address — a turn's `<Participant print={false}>Doug</Participant>` names who speaks,
            // for the dialogue, and is not a mention of a book.
            const [text] = node.children;
            if (mention && prints(node) && node.children.length === 1 && ts.isJsxText(text) && !/\[\[|\$\[/u.test(text.text)) {
                const from = text.getStart(source);
                const raw = code.slice(from, text.end).trim();
                const plain = bare(reads(raw));
                if (plain.name === '') return;
                // A TABLE NAMING ITS OWN COVER REACHES THE BOOK, as the structure reads it.
                const said = parsed(origin.name === 'chapter' ? `./${plain.name}` : plain.name);
                const meant = itself(said, within) && within !== undefined ? parsed(within) : said;
                const url = catalogue.where(key(meant, within));
                if (url === undefined) { missed.push({ key: key(meant, within), file, line: source.getLineAndCharacterOfPosition(from).line + 1 }); return; }
                declared.push(plain.name);
                // THE WORDS ARE WRITTEN AS THE SOURCE SPELLS THEM, entities and all, so the element
                // receives what the author typed.
                edits.push({ from, to: text.end, said: `[${bare(raw).words}](${url === catalogue.standing(file) ? '' : url})` });

                return;
            }
            ts.forEachChild(node, child => walk(child, mentioning || mention));

            return;
        }
        ts.forEachChild(node, child => walk(child, mentioning));
    };
    walk(source, false);

    let said = code;
    for (const edit of [...edits].sort((one, two) => two.from - one.from))
        said = said.slice(0, edit.from) + edit.said + said.slice(edit.to);

    return { text: said, declared, missing: missed, owes: !draws && referred };
};

// THE PLUGIN — the incremental half. It holds no catalogue of its own: the catalogue is the
// library's, and a plugin is only where the library is asked.
//
// AND IT IS ASKED ON EVERY TRANSFORM RATHER THAN ONCE. The sentence above was true of the design
// and false of the code: a catalogue passed in at construction is a catalogue held, and while the
// dev server was open it was the one built before the author had written anything. A reference to
// a chapter added since would be refused by a compiler that was simply looking at yesterday.
export const references = (held: Inventory): Plugin => ({
    name: 'binding:references',
    enforce: 'pre',
    transform(code: string, id: string) {
        const file = id.split('?')[0];
        if (!file.endsWith('.tsx')) return null;

        const catalogue = held.catalogue();
        const found = transforming(code, file, catalogue);
        if (found.missing.length > 0) throw new Error(found.missing.map(one => missing(one, catalogue.keys())).join('\n'));
        // AND A FILE THAT WRITES A REFERENCE MUST BE ABLE TO DRAW IT. `owes` was computed for a day
        // and read by nobody, so a chapter that forgot `Ref` printed its reference as the characters
        // themselves and nothing said so — the exact failure the flag was written to name.
        if (found.owes) throw new Error(`${basename(file)} writes a reference in its prose and does not import Ref from '@dna-platform/public', so the reference would print as text`);

        return found.text === code ? null : found.text;
    },
});
