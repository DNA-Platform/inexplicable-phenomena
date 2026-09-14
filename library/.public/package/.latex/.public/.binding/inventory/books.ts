import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chapters, apparatus } from './chapters';
import { bindingOf, type Book } from './library';

export const isBook = (folder: string): boolean => existsSync(join(folder, '.book.tsx'));

export const book = (library: string, folder: string): Book => {
    const path = join(library, folder);
    const held = apparatus(path);
    return {
        folder,
        path,
        cover: held.cover,
        synopsis: held.synopsis,
        contents: held.contents,
        chapters: chapters(path),
        module: join(bindingOf(library), 'application', 'books', folder + '.tsx'),
    };
};
