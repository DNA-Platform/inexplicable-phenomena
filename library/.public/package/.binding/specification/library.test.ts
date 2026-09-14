import { describe, it, expect } from 'vitest';
import { held, shipping } from './environment';
import { nameOf } from '../resolution/names';

// WHAT IT MEANS TO BE A LIBRARY. A book specifies ITSELF through the framework, at specify — that is
// a writing's own machinery and it stays there. What holds ACROSS books is a claim about what the
// compiler read, and that is what a test framework is for: one test per claim, over the graph the
// read answered. The build runs exactly what `npm test` runs, so a library adds a rule by adding a
// test and gets it in both places at once. A test says which book it is about in its own metadata,
// and the build lands the failure on that book's file.
// EVERY BOOK OF A NAME, GATHERED ONCE. A thousand books each searching the thousand is a million
// comparisons; grouped first it is one pass, and each book then asks about its own name alone.
const sharing = new Map<string, string[]>();
for (const entry of held.books)
    sharing.set(nameOf(entry), [...(sharing.get(nameOf(entry)) ?? []), `${entry.folder} (titled "${entry.book.title}")`]);

describe.skipIf(shipping)('the library', () => {
    it('holds books that have been read', () => {
        expect(held.books.length, 'no graph — run `npm run build` first').toBeGreaterThan(0);
    });

    for (const entry of held.books)
        describe(entry.folder, () => {
            it('is named by its title', ({ task }) => {
                task.meta.book = entry.folder;
                expect(nameOf(entry), `the book titled "${entry.book.title}" makes no name, and a book is named by its title`).not.toBe('');
            });

            it('is the only book of its name', ({ task }) => {
                task.meta.book = entry.folder;
                const taken = (sharing.get(nameOf(entry)) ?? []).filter(one => !one.startsWith(`${entry.folder} (`));
                expect(taken, `named "${nameOf(entry)}", which another book already is`).toEqual([]);
            });

            it('specified every writing it holds', ({ task }) => {
                task.meta.book = entry.folder;
                expect(entry.walked, 'nothing in it was specified').toBeGreaterThan(0);
            });
        });
});
