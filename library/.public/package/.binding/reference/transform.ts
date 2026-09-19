import { basename } from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';
import type { Catalogue } from '../catalogue/catalogue';
import type { Inventory } from '../inventory/retaken';
import { reads } from '../catalogue/reading';
import { key, name as parsed, notation, spelling } from '../catalogue/language';

// THE REFERENCE TRANSFORM. The notation in, ordinary markup out.
//
// `reference/transform.ts` is a PROXY NAME, flagged for Doug.
//
// EVERYTHING COMPILES TO `[ name ]( url )` EXCEPT THE MENTION. Doug, 2026-09-18: "Everything
// supports [] or (). Everything compiles to []() except the mention." So this file has one job and
// no judgement — resolve the identifier, write the address — and every decision about what is DRAWN
// belongs to the element that receives it. A title not drawing itself as a link is `$Title`'s
// ruling, not the resolver's.
//
//   [[ X ]]        [[ X ]]*       [[ X ]]**      [[ X ]]***     annotations, about this writing
//     *[[ X ]]    **[[ X ]]     ***[[ X ]]                      annotations, about X
//      $[ X ]                                                   a reference
//      [[[ X ]]]                                                a mention — allocates HERE
//
//   AND ANY OF THEM MAY BE `[ words ]( X )` — the bracket is what is shown, the paren is X.
//
// THE MENTION IS THE ONE EXCEPTION because it is the only form that CREATES an address rather than
// spending one. It has to plant an id at the spot it stands in, and there is no writing kind in the
// framework that does that yet — so for now its copy stands and the planting is owed. Nothing in
// `.me` writes one, which is its own finding: the primitive of the language has never been used.
//
// IT RUNS `pre` and splices by absolute offset, so the file is byte-identical either side of a
// match and what @vitejs/plugin-react compiles is markup that never heard of a sigil.

// THE TWO SHAPES, matched over one pass so their offsets interleave correctly — and the spelling is
// THE LANGUAGE'S, constructed here with a cursor of its own. This file held a second copy of the
// regex for a day, which is a rule with two homes: when `( name )` was put back into the language
// the scanner learned it and this did not, and every cover would have compiled its words as a name.
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
    // drawn. An annotation with words also writes `[words](name)`, and that is read by the element
    // around it — so "does an edit start with a bracket" stopped being the question the moment
    // annotations could carry words, and this is asked at the one place a reference is written.
    let referred = false;

    // ONE SCAN FOR PROSE AND FOR STRINGS. Doug, 2026-09-19: "You haven't done anything to change the
    // language. Evaluating the ()[] was never the job of this framework." So a sigil in a string —
    // a prop, a literal in a helper — compiles to exactly what it compiles to in prose: a reference
    // to `[words](url)`, an annotation to its name, a mention to its words. The one difference is
    // that prose gets a `<Ref>` around a reference, because `Parser.link` is anchored and JSX text
    // needs an element to parse one, and a string is handed to whatever element receives it.
    //
    // AND PROSE IS READ THE WAY JSX READS IT — whitespace collapsed, entities spelled — while a
    // string is read as written, because that is what its element will receive.
    const scan = (text: string, from: number, prose: boolean): void => {
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

            // AN ANNOTATION IS VERIFIED AND THEN WRITES ITS NAME. The address it resolves to is
            // the COMPILER's — it goes into the card and into the route table the pages load —
            // and what stands in the prose is the name, because the ELEMENT around it already
            // carries the relation. `<Author>`, `<Subject>` and `<Book>` each resolve a name
            // through that table, which is how this library worked before the notation existed.
            //
            // AN EARLIER WRITING SUBSTITUTED THE URL and broke every one of them. The runtime
            // reads the parenthesised part as a NAME and looks it up; handed `/my-library-log/`
            // it found nothing and slugged what it was given, so `#my-library-log` appeared on
            // five pages pointing at an anchor no page answered to. Measured: thirteen faults
            // from the compiler helpfully resolving something twice.
            //
            // AND A TITLE IS THE SAME MOVE FOR A DIFFERENT REASON — D10: "a title must not draw
            // itself as a link." Its address is the page it is standing on.
            //
            // THE REFUSAL IS UNCHANGED, which is the whole point: the name is still resolved
            // here, and a name the library does not hold still stops the compile by file and
            // line. What moved is only what gets written down.
            //
            // WHAT A REFERENCE SHOWS IS THE THING, NOT THE SCOPE. `$[ &gt; The books ]` names a
            // chapter of the book it stands in and reads "The books" — the `>` is how the scope
            // is written, not part of the name. An earlier writing put the raw text back and
            // emitted `[> The books](...)`, and esbuild refused the file: "the character > is
            // not valid inside a JSX element."
            //
            // AND WHEN THE WRITER GAVE THE WORDS, THE WORDS ARE WHAT IS SHOWN. `[[ Author: Doug ]]( My
            // Library Log )` asks the library for the log and shows "Author: Doug" — the bracket is
            // display and the paren is the identifier, on every form. An annotation with words
            // compiles to the `[words](name)` the runtime has always read (`$Author`: "`[Doug](
            // dougs-library-log)` draws Doug and names the log"), and a reference with words puts
            // them in the anchor. Without a paren the words ARE the name and nothing changes.
            const meant = parsed(name);
            const shown = read.named ? words : meant.of === 'book' ? meant.book : meant.chapter;
            const url = catalogue.where(key(meant, within));
            if (url === undefined) {
                missed.push({ key: key(meant, within), file, line: source.getLineAndCharacterOfPosition(at).line + 1 });
                continue;
            }

            if (!reference) { declared.push(name); edits.push({ from: at, to, said: read.named ? `[${words}](${name})` : shown }); continue; }

            if (prose) referred = true;
            edits.push({ from: at, to, said: prose && draws ? `<Ref>[${shown}](${url})</Ref>` : `[${shown}](${url})` });
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
        if (!file.endsWith('.tsx') || !/\[\[|\$\[/u.test(code)) return null;

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
