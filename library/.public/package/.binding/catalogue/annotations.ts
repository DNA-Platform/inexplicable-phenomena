import { form, literal, name, notation, spelling, wellSpelt, type Form, type Literal, type Name } from './language';
import { reads } from './reading';
import type { Source } from './source';

// THE SCANNER. One pass over the text runs the parser located, one regex, and every decision taken by
// looking a row up in [the language](./language.ts) rather than by knowing a spelling.
//
// `catalogue/annotations.ts` is a PROXY NAME, flagged for Doug.
//
// IT READS RUNS AND NEVER A FILE. Until Sprint 90 it ran the regex over a file's whole source, so a
// form in a comment or an import's path was catalogued as a title while the transform, which already
// parsed, never saw it. Now [the source](./source.ts) says where writing stands and this reads only
// there — the same runs the transform edits, so the two cannot disagree about what a file says.
//
// AND IT IS TOTAL: every match either becomes a form, a reference, a literal, or a refusal that says
// why, and nothing falls through. A NAME IS PARSED HERE, ONCE. Every caller holds a `Name` or a
// `Literal` and asks it what it means.

// THE SPELLING IS THE LANGUAGE'S, CONSTRUCTED HERE WITH ITS OWN CURSOR — a shared global regex would
// carry its `lastIndex` from one caller into the next.
const scanning = new RegExp(notation.source, 'gu');

// PROSE IS READ AS JSX READS IT — whitespace collapsed, entities spelled — and a string as written,
// because that is what its element will receive. The transform reads by the same rule.
const asWritten = (said: string): string => said;

// `said` IS WHAT THE LIBRARY WAS ASKED FOR AND `words` IS WHAT THE PAGE WILL SHOW. They are the same
// string unless the writer gave a paren, and nothing in the structure ever keys on the words.
export type Said = { form: Form; name: Name; said: string; words: string; at: number; line: number };
export type Referring = { name: Name; said: string; words: string; at: number; line: number };
// A LITERAL, `![[ this ]]` or `![[ identifier.type ]]`, read in prose only: it inserts a file where it
// stands, and a file spliced into a quoted string would have to be escaped for the quote it stands in.
export type Inserting = { name: Literal; said: string; at: number; to: number; line: number };
export type Refused = { said: string; at: number; line: number; why?: string };

export type Reading = { annotations: Said[]; references: Referring[]; literals: Inserting[]; refused: Refused[] };

export const annotating = (source: Source): Reading => {
    const held: Reading = { annotations: [], references: [], literals: [], refused: [] };

    for (const run of source.runs) {
        scanning.lastIndex = 0;
        for (let found = scanning.exec(run.text); found !== null; found = scanning.exec(run.text)) {
            const at = run.from + found.index;
            const line = source.line(at);
            const read = spelling(found, run.kind === 'prose' ? reads : asWritten);

            // `![[ X ]]` INSERTS A FILE, in prose, by a name of the chapter's own — and every other
            // way of writing it is refused with the reason, so an author is told what to write.
            if (read.inserts) {
                const named = literal(read.name);
                const why = !read.balanced || read.brackets !== 2 ? 'a literal is written ![[ this ]] or ![[ identifier.type ]], with two brackets'
                    : read.named ? 'a literal has one slot, the file, and carries no words — it inserts the file itself'
                    : run.kind !== 'prose' ? 'a literal stands in prose, between tags, and never inside a string'
                    : named === undefined ? 'a literal names the chapter\'s own file, this, or a file beside it by identifier and type — never a path, and never another chapter\'s'
                    : undefined;
                if (why !== undefined || named === undefined) { held.refused.push({ said: read.name, at, line, why }); continue; }
                held.literals.push({ name: named, said: read.name, at, to: at + found[0].length, line });
                continue;
            }

            // `$[[ X ]]` ONLY EVER REFERS. It allocates nothing, so there is no form to look up and no
            // way for it to be spelled wrong but its brackets — only for it to name something the
            // library does not hold.
            if (read.refers) {
                if (!wellSpelt(read)) { held.refused.push({ said: read.name, at, line, why: 'a reference is written $[[ X ]], with two brackets' }); continue; }
                held.references.push({ name: name(read.name), said: read.name, words: read.words, at, line });
                continue;
            }

            const one = wellSpelt(read) ? form(read.prefix, read.brackets, read.postfix) : undefined;
            if (one === undefined) { held.refused.push({ said: read.name, at, line }); continue; }
            held.annotations.push({ form: one, name: name(read.name), said: read.name, words: read.words, at, line });
        }
    }

    return held;
};
