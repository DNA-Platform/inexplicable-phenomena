import { form, name, notation, spelling, type Form, type Name } from './language';
import { reads } from './reading';

// THE SCANNER. One pass, one regex, and every decision taken by looking a row up in
// [the language](./language.ts) rather than by knowing a spelling.
//
// `catalogue/annotations.ts` is a PROXY NAME, flagged for Doug.
//
// IT IS A SCANNER AND NOT A PARSER, because the language is regular: some stars, some brackets, the
// words, some brackets, perhaps a name in parens, some stars. What earns the separate file is that the scanner must be TOTAL —
// every match either becomes a form or becomes a refusal, and nothing falls through — and an earlier
// writing classified matches with a chain of ifs, which admits whatever it forgets to refuse.
//
// AND A NAME IS PARSED HERE, ONCE. Every caller holds a `Name` and asks it what it means, instead of
// looking for `>` in a string and hoping it is doing the same thing the last caller did.

// THE SPELLING IS THE LANGUAGE'S, CONSTRUCTED HERE WITH ITS OWN CURSOR. The bracket run is captured
// rather than spelled out twice, so `[[ X ]]]` is READ and refused instead of matching the
// two-bracket form and leaving a stray `]` in the prose.
//
// AND THE TWO SHAPES SHARE ONE PASS so their offsets interleave in the order they were written,
// which is what lets a transform splice by offset without sorting two streams together.
const scanning = new RegExp(notation.source, 'gu');

// `said` IS WHAT THE LIBRARY WAS ASKED FOR AND `words` IS WHAT THE PAGE WILL SHOW. They are the same
// string unless the writer gave a paren — `[[ Author: Doug ]]( My Library Log )` asks for the log
// and shows the words — and nothing in the structure ever keys on the words.
export type Said = { form: Form; name: Name; said: string; words: string; at: number; line: number };
export type Referring = { name: Name; said: string; words: string; at: number; line: number };
export type Refused = { said: string; at: number; line: number };

export type Reading = { annotations: Said[]; references: Referring[]; refused: Refused[] };

export const annotating = (code: string, on: (at: number) => number): Reading => {
    const held: Reading = { annotations: [], references: [], refused: [] };

    scanning.lastIndex = 0;
    for (let found = scanning.exec(code); found !== null; found = scanning.exec(code)) {
        const at = found.index;
        const line = on(at);
        const read = spelling(found, reads);

        // `$[ X ]` ONLY EVER REFERS. It allocates nothing, so there is no form to look up and no way
        // for it to be spelled wrong — only for it to name something the library does not hold.
        if (read.refers) {
            held.references.push({ name: name(read.name), said: read.name, words: read.words, at, line });
            continue;
        }

        const one = read.balanced ? form(read.prefix, read.brackets, read.postfix) : undefined;
        if (one === undefined) { held.refused.push({ said: read.name, at, line }); continue; }
        held.annotations.push({ form: one, name: name(read.name), said: read.name, words: read.words, at, line });
    }

    return held;
};
