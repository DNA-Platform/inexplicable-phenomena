import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Book, Library } from '../inventory/library';

// WHAT A SPECIFIED BOOK LEAVES BEHIND. Loading a book is the expensive thing the binder does —
// measured 2026-09-15 at seconds each — so a book that specified is written down beside the
// manifest with the digest of what it was read from, and the next build loads it again only when
// that changes. Nothing a running book answers about itself is kept: a name, a title and an author
// are the source's, read by the catalogue with nothing loaded.
export type Entry = {
    folder: string;
    digest: string;
    walked: number;
};

export type Graph = { books: Entry[] };

const empty = (): Graph => ({ books: [] });

const bytes = (file: string): Buffer | string => (existsSync(file) ? readFileSync(file) : 'gone');

// THE CODE A BOOK MAY IMPORT: a file beside a chapter whose type is code. Never read for the
// notation, only hashed, since a resource is never interpreted (B39); hashed because a book's own
// file imports its library's manual, and the manual's code is a resource of the manual's chapters.
const codeTypes = ['.ts', '.tsx', '.js', '.mjs'];

const codeFiles = (book: Book): string[] =>
    [...book.resources.values()].flat().filter(resource => codeTypes.includes(resource.type)).map(resource => join(book.path, resource.file));

const resourceFiles = (book: Book): string[] =>
    [...book.resources.values()].flat().map(resource => join(book.path, resource.file));

// EVERY BASE IN THE LIBRARY, HASHED ONCE, AND EVERY CODE FILE WITH THEM. A book may extend any other
// book's .book.tsx — turing extends the article's — and a book file imports the library's manual, whose
// types are the code beside its chapters, so every one of them is an input to every book. Read per
// book that is a thousand books reading a thousand files each; read once it is a thousand reads and a
// string. Sprint 109: the manual's code joined the bases, since a change to a type read no book.
export const bases = (found: Library): string => {
    const hash = createHash('sha256');
    const files = [join(found.root, '.book.tsx'), ...found.books.flatMap(one => [join(one.path, '.book.tsx'), ...codeFiles(one)])];
    for (const file of files.sort())
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

    // WHAT A BOOK IS MADE OF, AS BYTES: its own files, the files beside its chapters, and whatever the
    // caller names as fixed — every base in the library, hashed once above, and the packages it is
    // written against. A book whose digest still holds is not read again. Delete the file to read
    // everything.
    digest(book: Book, fixed: string[]): string {
        const hash = createHash('sha256');
        const files = [...book.files.map(name => join(book.path, name)), ...resourceFiles(book)];
        for (const file of files.sort())
            hash.update(file).update(bytes(file));
        for (const one of fixed) hash.update(one);

        return hash.digest('hex').slice(0, 16);
    },
};
