import { readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import { excluded } from '../configuration/excludes';
import { isBook, book } from './books';
import { faceOf, isFace, type Book, type Library } from './library';

// EVERY BOOK IN THE LIBRARY, AT EVERY DEPTH, AND THREE THINGS THE WALK NEVER ENTERS: a folder whose
// name is excluded — the never-set, and whatever `.pubconfig` adds — a folder holding a binding,
// which is a face and is where a library publishes TO rather than part of what it holds, and the
// NAME the library's own face carries, wherever else it stands, so that name is a good utility
// folder anywhere beneath.
//
// A FOLDER NEED NOT BE A BOOK TO BE WALKED THROUGH. Only a folder carrying .book.tsx is a book;
// every other folder is organizational and the walk goes on beneath it, so books may be grouped
// however their library likes. And the walk goes on beneath a BOOK too, because a book inside a
// book is a book of its own and keeps its own route. A library's root is never a book: a .book.tsx
// standing there is a base its books are written with, and a library need not have one.
const beneath = (library: string, at: string, chosen: Configuration, face: string, found: Book[]): void => {
    for (const entry of readdirSync(at === '' ? library : join(library, at), { withFileTypes: true }).sort((one, two) => one.name.localeCompare(two.name))) {
        if (!entry.isDirectory() || entry.name === face || excluded(entry.name, chosen)) continue;
        const folder = at === '' ? entry.name : `${at}/${entry.name}`;
        if (isFace(join(library, folder))) continue;
        if (isBook(join(library, folder))) found.push(book(library, folder));
        beneath(library, folder, chosen, face, found);
    }
};

export const walk = (library: string, chosen: Configuration): Library => {
    const books: Book[] = [];
    beneath(library, '', chosen, basename(faceOf(library)), books);

    return { root: library, books };
};
