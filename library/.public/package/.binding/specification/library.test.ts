import { describe, it, expect } from 'vitest';
import { specifying } from './specifying';
import { resolve } from 'node:path';
import { binding, found, library, shipping } from './environment';

describe.skipIf(shipping)('library', () => {
    const chosen = process.env.SCOPE ? [resolve(process.env.SCOPE)] : [library];
    for (const folder of found.books.map(book => resolve(book.path)).filter(path => chosen.includes(library) || chosen.includes(path))) {
        it(`${folder} specifies itself, to the letter`, () => {
            const [verdict] = specifying(binding, [folder]);
            expect(verdict.walked).toBeGreaterThan(0);
            expect(verdict.failures).toEqual([]);
        });
    }
});
