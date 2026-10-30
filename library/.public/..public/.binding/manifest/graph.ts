import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
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

// WHAT A FILE IMPORTS, AS VITE READS IT: every source named by an import or an export-from, in the
// order written, but never a type-only one, which the compiler erases and no page loads. Read once
// per file and kept for the bind, since a thousand books import the same few hundred files.
const sourcePattern = /^\s*(?:import(?!\s+type\b)|export(?!\s+type\b))\b[^'"]*?from\s*['"]([^'"]+)['"]|^\s*import\s*['"]([^'"]+)['"]/gmu;

// A FILE AS IT STANDS: its path with its modification time and size, so what is kept for a file is
// kept only while the file is that file, and a reader that outlives a change reads it again.
const stamped = (file: string): string => {
    if (!existsSync(file)) return `${file}:gone`;
    const stat = statSync(file);
    return `${file}:${stat.mtimeMs}:${stat.size}`;
};

const importsOf = new Map<string, string[]>();
export const imports = (file: string): string[] => {
    const key = stamped(file);
    const known = importsOf.get(key);
    if (known !== undefined) return known;
    const text = existsSync(file) ? readFileSync(file, 'utf8') : '';
    const found = [...text.matchAll(sourcePattern)].map(match => match[1] ?? match[2]).filter((source): source is string => source !== undefined);
    importsOf.set(key, found);
    return found;
};

// A RELATIVE SOURCE RESOLVED TO ITS FILE: as written when the file stands, else with each code
// extension tried, as Vite tries them; a bare source is a package and resolves to nothing here,
// since the packages are hashed among the fixed inputs.
const isFile = (at: string): boolean => existsSync(at) && statSync(at).isFile();
const resolved = (from: string, source: string): string | undefined => {
    if (!source.startsWith('.')) return undefined;
    const at = resolve(dirname(from), source);
    if (isFile(at)) return at;
    return codeTypes.map(type => at + type).find(isFile);
};

// THE CLOSURE OF A FILE'S IMPORTS, the file itself among them, memoized per file for the bind. Sprint
// 117, D1, on Doug's "You can't edit anything on the pages without a 40 minute run?": a book's digest
// had held one hash of every code file in the library since Sprint 109, so any change to a type staled
// every book; now it holds the files its own files reach, so a change reaches the books that import it.
const closures = new Map<string, Set<string>>();
export const closure = (file: string): Set<string> => {
    const key = stamped(file);
    const known = closures.get(key);
    if (known !== undefined) return known;
    const reached = new Set<string>([file]);
    closures.set(key, reached);
    for (const source of imports(file)) {
        const next = resolved(file, source);
        if (next === undefined) continue;
        for (const one of closure(next)) reached.add(one);
    }
    return reached;
};

const digests = new Map<string, string>();
const digestOf = (file: string): string => {
    const key = stamped(file);
    const known = digests.get(key);
    if (known !== undefined) return known;
    const digest = createHash('sha256').update(bytes(file)).digest('hex').slice(0, 16);
    digests.set(key, digest);
    return digest;
};

export const graph = {
    at: (binding: string): string => join(binding, '.graph.json'),
    // NOTHING KEPT, which is what a bind told `fresh` starts from. Sprint 110.
    empty,

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

    // WHAT A BOOK IS MADE OF, AS BYTES: its book file, which the inventory lists among no chapters and
    // which is where a book extends its manual, its chapters, the files beside its chapters, every file
    // its code reaches by its imports — another book's cover, its library's manual, the manual's own
    // imports — and whatever the caller names as fixed, the packages it is written against. A book
    // whose digest still holds is not read again. Delete the file to read everything.
    digest(book: Book, fixed: string[]): string {
        const own = [join(book.path, '.book.tsx'), ...book.files.map(name => join(book.path, name)), ...resourceFiles(book)];
        const reached = new Set<string>(own);
        for (const file of [...own, ...codeFiles(book)])
            if (codeTypes.some(type => file.endsWith(type)))
                for (const one of closure(file)) reached.add(one);
        const hash = createHash('sha256');
        for (const file of [...reached].sort())
            hash.update(file).update(digestOf(file));
        for (const one of fixed) hash.update(one);

        return hash.digest('hex').slice(0, 16);
    },
};

// THE FILES EVERY BOOK STANDS ON, FOR A CALLER THAT WANTS THEM COUNTED: the closures of every book
// file, read once, so a bind can say how many files a library's code is. Nothing hashes by it since
// Sprint 117; a book's digest reaches its own imports.
export const reach = (found: Library): number => {
    const all = new Set<string>();
    for (const book of found.books)
        for (const one of closure(join(book.path, '.book.tsx'))) all.add(one);
    return all.size;
};
