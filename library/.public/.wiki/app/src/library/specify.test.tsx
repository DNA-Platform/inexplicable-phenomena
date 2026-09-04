import { describe, expect, it } from 'vitest';
import type { $Book } from '@dna-platform/lib';

const books: [string, () => Promise<{ book: $Book }>][] = [
    ["/wikimedia", () => import('./..wikimedia/book')],
    ["/chemistry", () => import('./chemistry/book')],
    ["/consciousness", () => import('./consciousness/book')],
    ["/gauge-theory", () => import('./gauge-theory/book')],
];

describe('every book stands', () => {
    for (const [route, open] of books) {
        it(route + ' stands', async () => {
            const { book } = await open();
            expect(() => book.specify()).not.toThrow();
        });
    }
});
