import { afterAll, describe, expect, it } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { structure } from '../catalogue/structure';
import { wellformed } from '../catalogue/wellformed';
import { catalogue } from '../catalogue/catalogue';
import { holds } from '../catalogue/holds';
import { duplicated, staged } from './staging';

// HOW THE CATALOGUE SCALES, MEASURED OVER REAL BOOKS AND REPORTED AS NUMBERS.
//
// Doug, 2026-09-19: "If it is a performance test, that is different and good, but don't confuse
// unit / regression / performance." So this asserts only what must be TRUE — a library of N copies
// is still well-formed and every reference in it still resolves — and PRINTS what it costs, cold and
// then warm, because a threshold written into a test is a number somebody chose once on one
// machine. The numbers are the finding; a reader compares them with the last run.
//
// THE LEVEL IS THE CATALOGUE'S. It reads files and builds the structure; it never renders a page, so
// a thousand books cost seconds here and the render's own cost is the render's own test.
const scale = Number(process.env.SCALE ?? 200);
const held = staged();
afterAll(() => { held.remove(); });

const timed = <T,>(said: string, run: () => T): T => {
    const at = performance.now();
    const made = run();
    console.log(`   ${said.padEnd(48)} ${(performance.now() - at).toFixed(0).padStart(6)}ms`);

    return made;
};

describe(`the catalogue over ${5 + scale} real books`, () => {
    it('is still a library, and every reference in it still resolves', () => {
        duplicated(held, { of: 'paper', name: 'A Paper', subject: 'the-library', author: 'persona' }, scale);
        const chosen = configure(held.binding);

        for (const pass of ['cold', 'warm']) {
            console.log(`\n${pass}`);
            const found = timed('walk', () => walk(held.library, chosen));
            const made = timed(`structure (${found.books.length} books)`, () => structure(found));
            const wrong = timed(`wellformed (${made.spots.size} spots, ${made.mentions.length} mentions)`, () => wellformed(made));
            const card = timed('catalogue (structure + addresses)', () => catalogue(found, chosen));
            const unresolved = timed(`holds (${card.keys().length} keys)`, () => holds(found, card));

            expect(wrong).toEqual([]);
            expect(unresolved).toEqual([]);
            expect(found.books).toHaveLength(5 + scale);
        }
    });
});
