import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { imageTypes } from '../inventory/filenames';
import { notation } from '../catalogue/language';
import { source } from '../catalogue/source';
import { structure } from '../catalogue/structure';
import { wellformed } from '../catalogue/wellformed';
import { catalogue } from '../catalogue/catalogue';
import { holds } from '../catalogue/holds';
import { duplicated, pulled } from './galleys';

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
const galley = pulled();
afterAll(() => { galley.remove(); });

// THE PARSER IS COUNTED AS WELL AS TIMED. Sprint 90: a file is parsed once per version of itself —
// every file on a cold structure, none on a warm one — and the count is read off the module's own
// door rather than a counter kept inside it.
vi.mock('../catalogue/source', async importOriginal => {
    const actual = await importOriginal<typeof import('../catalogue/source')>();

    return { ...actual, source: vi.fn(actual.source) };
});
const parses = (): number => vi.mocked(source).mock.calls.length;

const timed = <T,>(said: string, run: () => T): T => {
    const at = performance.now();
    const made = run();
    console.log(`   ${said.padEnd(48)} ${(performance.now() - at).toFixed(0).padStart(6)}ms`);

    return made;
};

describe(`the catalogue over ${6 + scale} real books`, () => {
    it('is still a library, and every reference in it still resolves', () => {
        duplicated(galley, { of: 'paper', name: 'A Paper', subject: 'library' }, scale);
        const chosen = configure(galley.binding);

        for (const pass of ['cold', 'warm']) {
            console.log(`\n${pass}`);
            const found = timed('walk', () => walk(galley.library, chosen));
            // THE PARSER AGAINST THE REGEX IT REPLACED, over the same files in the same run — Doug,
            // 2026-09-28: "We'll need to performance test the typescript parser." The numbers are the
            // finding; Reading TSX with the Compiler API holds the first of them.
            // EVERY FILE THE STRUCTURE READS: the chapters, and the text files accompanying them.
            const files = found.books.flatMap(book => [
                ...book.files,
                ...[...book.resources.values()].flat().filter(one => !imageTypes.includes(one.type)).map(one => one.file),
            ].map(file => join(book.path, file)));
            const codes = files.map(path => readFileSync(path, 'utf8'));
            timed(`parse (${files.length} files)`, () => codes.forEach((code, i) => source(files[i], code)));
            timed('regex over raw source', () => codes.forEach(code => { const re = new RegExp(notation.source, 'gu'); while (re.exec(code) !== null) { /* found */ } }));
            vi.mocked(source).mockClear();
            const made = timed(`structure (${found.books.length} books)`, () => structure(found));
            console.log(`   ${'parses in the structure'.padEnd(48)} ${String(parses()).padStart(6)}`);
            expect(parses()).toBe(pass === 'cold' ? files.length : 0);
            const wrong = timed(`wellformed (${made.spots.size} spots, ${made.mentions.length} mentions)`, () => wellformed(made));
            const card = timed('catalogue (structure + addresses)', () => catalogue(found, chosen));
            const unresolved = timed(`holds (${card.keys().length} keys)`, () => holds(found, card));

            expect(wrong).toEqual([]);
            expect(unresolved).toEqual([]);
            expect(found.books).toHaveLength(6 + scale);
        }
    });
});
