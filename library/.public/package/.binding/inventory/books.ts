import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { files } from './chapters';
import { bindingOf, type Book } from './library';

export const isBook = (folder: string): boolean => existsSync(join(folder, '.book.tsx'));

// A MODULE'S FILE NAME IS NOT ITS FOLDER. A book's folder may open with dots — `.encyclopedia`, or a
// library catalogue `..dougs-library` — and a bundler reads a chunk name opening with `..` as a
// relative path and refuses to emit it. The folder stays the book's key; only the file it is
// assembled into is spelled without them, the way `local` already spells its class.
const spelled = (folder: string): string => folder.split('/').map(part => part.replace(/^\.+/u, '')).join('/');

export const book = (library: string, folder: string): Book => {
    const path = join(library, folder);

    return { folder, path, files: files(path), module: join(bindingOf(library), 'application', 'books', `${spelled(folder)}.tsx`) };
};
