import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Book, Library } from '../inventory/library';

// WHAT THE LOAD ANSWERED, KEPT. Loading a book is the expensive thing the binder does — measured
// 2026-09-15 at seconds each — so what a live book answers about itself is written down once,
// beside the manifest, and read back by every later task and by the next build. `book` holds what
// the readings answered: a reading is a member, so another fact about every book costs a member
// and nothing here.
export type Entry = {
    folder: string;
    book: Record<string, string>;
    digest: string;
    walked: number;
};

export type Graph = { books: Entry[] };

const empty = (): Graph => ({ books: [] });

const bases = (found: Library): string[] => [join(found.root, '.book.tsx'), ...found.books.map(one => join(one.path, '.book.tsx'))];

export const graph = {
    at: (binding: string): string => join(binding, '.graph.json'),

    read(binding: string): Graph {
        const at = graph.at(binding);
        if (!existsSync(at)) return empty();
        try {
            return { ...empty(), ...(JSON.parse(readFileSync(at, 'utf8')) as Partial<Graph>) };
        } catch {
            return empty();
        }
    },

    write(binding: string, held: Graph): Graph {
        const current: Graph = { books: [...held.books].sort((one, two) => one.folder.localeCompare(two.folder)) };
        writeFileSync(graph.at(binding), JSON.stringify(current, null, 2) + '\n', 'utf8');

        return current;
    },

    // WHAT A BOOK IS MADE OF, AS BYTES: its own files, every .book.tsx in the library — any of them
    // may be the base it extends, and there are a handful — and whatever the caller names as fixed,
    // which is the packages it is written against. A book whose digest still holds is not loaded
    // again. Delete the file to load everything.
    digest(found: Library, book: Book, fixed: string[]): string {
        const hash = createHash('sha256');
        for (const file of [...book.files.map(name => join(book.path, name)), ...bases(found)].sort())
            hash.update(file).update(existsSync(file) ? readFileSync(file) : 'gone');
        for (const one of fixed) hash.update(one);

        return hash.digest('hex').slice(0, 16);
    },
};
