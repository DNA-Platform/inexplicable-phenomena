import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import { excluded } from '../configuration/excludes';
import { isBook, book } from './books';
import type { Library } from './library';

export const walk = (library: string, chosen: Configuration): Library => {
    const folders = readdirSync(library, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => !excluded(name, chosen))
        .sort();
    const books = folders.filter(name => isBook(join(library, name))).map(name => book(library, name));
    const base = existsSync(join(library, '.book.tsx')) ? '.book.tsx' : undefined;
    return { root: library, base, books };
};
