// THE CHECKING RUNTIME — a browser-less reader that opens every book and asks
// the model whether it stands.
//
// It invents no rules. Construction happens at import: the bond constructors
// refuse a book with no cover, with two, with no account of itself, with a
// duplicated contents, or with a cover naming neither author nor subject. What
// `valid()` adds is the softer answer — every part asked, every failure carrying
// a reason rather than a throw.
//
// It runs in bare Node because CONSTRUCTING IS NOT DRAWING. Nothing here paints.
//
// And it enters through the generated door, never a pattern: every cover and
// synopsis in this library begins with a dot, and a glob would find none of them.

import { books } from './src/catalogue';
import type { $Book } from '@dna-platform/lib';

type Verdict = { path: string; parts: number; valid: boolean; refused?: string };

const walk = (book: $Book): number =>
    1 + book.chapters.length + book.sections.length + book.paragraphs.length;

const verdicts: Verdict[] = [];

for (const [path, open] of Object.entries(books)) {
    try {
        const { book } = await open();
        verdicts.push({ path, parts: walk(book), valid: book.valid() });
    } catch (e) {
        verdicts.push({ path, parts: 0, valid: false, refused: (e as Error).message });
    }
}

const stood = verdicts.filter(v => v.valid);
const parts = verdicts.reduce((n, v) => n + v.parts, 0);

console.log(`valid (no browser): ${stood.length}/${verdicts.length} books stand, ${parts} parts constructed and asked.`);

for (const v of verdicts.filter(v => !v.valid)) {
    console.log(`  REFUSED  ${v.path} — ${v.refused ?? 'valid() answered false'}`);
}

process.exit(stood.length === verdicts.length ? 0 : 1);
