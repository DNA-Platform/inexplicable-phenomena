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
    book: Record<string, string | string[]>;
    digest: string;
    walked: number;
};

export type Graph = { books: Entry[] };

const empty = (): Graph => ({ books: [] });

const bytes = (file: string): Buffer | string => (existsSync(file) ? readFileSync(file) : 'gone');

// EVERY BASE IN THE LIBRARY, HASHED ONCE. A book may extend any other book's .book.tsx — turing
// extends the article's — so every one of them is an input to every book. Read per book that is a
// thousand books reading a thousand files each; read once it is a thousand reads and a string.
export const bases = (found: Library): string => {
    const hash = createHash('sha256');
    for (const file of [join(found.root, '.book.tsx'), ...found.books.map(one => join(one.path, '.book.tsx'))].sort())
        hash.update(file).update(bytes(file));

    return hash.digest('hex').slice(0, 16);
};

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

    // WHAT A BOOK IS MADE OF, AS BYTES: its own files, and whatever the caller names as fixed —
    // every base in the library, hashed once above, and the packages it is written against. A book
    // whose digest still holds is not read again. Delete the file to read everything.
    digest(book: Book, fixed: string[]): string {
        const hash = createHash('sha256');
        for (const file of book.files.map(name => join(book.path, name)).sort())
            hash.update(file).update(bytes(file));
        for (const one of fixed) hash.update(one);

        return hash.digest('hex').slice(0, 16);
    },
};
