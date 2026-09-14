import { describe, it, expect } from 'vitest';
import { binding, chosen, found, shipping } from './environment';
import { specifying } from './specifying';
import { LibrarySpecification } from './library';

// WHAT IT MEANS TO BE A LIBRARY, RUN AS A SUITE. Every book is read once — never from the record,
// because a suite that trusts the record cannot catch the record — and then every rule of the
// library is one promise, named by what the rule says. A library adds a rule by extending
// LibrarySpecification, and this suite lists it without being edited.
describe.skipIf(shipping)('the library', () => {
    const verdict = specifying(binding, found, found.books.map(book => book.folder), { books: [] }, chosen);
    const held = new LibrarySpecification();

    for (const book of found.books)
        it(`${book.folder} specifies itself, to the letter`, () => {
            expect(verdict.failures.filter(one => one.at === book.folder).map(one => one.says)).toEqual([]);
            expect(verdict.held.books.find(one => one.folder === book.folder)?.walked).toBeGreaterThan(0);
        });

    for (const [name, rule] of held.rules())
        it((rule as { description?: string }).description ?? name, () => {
            expect(() => rule.call(held, verdict.held)).not.toThrow();
        });
});
