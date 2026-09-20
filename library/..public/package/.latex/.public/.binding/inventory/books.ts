import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { files } from './chapters';
import { bindingOf, type Book } from './library';

export const isBook = (folder: string): boolean => existsSync(join(folder, '.book.tsx'));

export const book = (library: string, folder: string): Book => {
    const path = join(library, folder);

    return { folder, path, files: files(path), module: join(bindingOf(library), 'application', 'books', `${folder}.tsx`) };
};
