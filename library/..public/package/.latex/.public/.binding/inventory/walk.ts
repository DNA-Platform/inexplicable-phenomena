import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import { excluded } from '../configuration/excludes';
import { isBook, book } from './books';
import type { Book, Library } from './library';

// EVERY BOOK IN THE LIBRARY, AT EVERY DEPTH. A folder whose NAME is excluded is never entered,
// wherever it stands — which is how .public is kept out of a library that holds its own face. A
// folder carrying .book.tsx is a book, and the walk goes on beneath it, because a book inside a
// book is a book of its own and keeps its own route. The library's own .book.tsx is the base its
// books are written with and is never a book.
const beneath = (library: string, at: string, chosen: Configuration, found: Book[]): void => {
    for (const entry of readdirSync(at === '' ? library : join(library, at), { withFileTypes: true }).sort((one, two) => one.name.localeCompare(two.name))) {
        if (!entry.isDirectory() || excluded(entry.name, chosen)) continue;
        const folder = at === '' ? entry.name : `${at}/${entry.name}`;
        if (isBook(join(library, folder))) found.push(book(library, folder));
        beneath(library, folder, chosen, found);
    }
};

export const walk = (library: string, chosen: Configuration): Library => {
    const books: Book[] = [];
    beneath(library, '', chosen, books);

    return { root: library, books };
};
