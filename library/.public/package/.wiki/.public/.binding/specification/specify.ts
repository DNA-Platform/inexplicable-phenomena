import { window } from '../rendering/dom';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import { $Writing, Specification } from '@dna-platform/public';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import type { Book } from '../inventory/library';

export type Failure = { at: string; file: string; says: string };
export type Verdict = { book: string; walked: number; failures: Failure[] };

type Index = { books: Record<string, () => Promise<{ book: $Writing }>>; named: string[] };

void window;

const kindOf = (writing: $Writing): string => writing.constructor.name.replace(/^_?\$?/, '');
const said = (error: unknown): string => String((error as Error)?.message ?? error);
const nameOf = (book: Book): string => book.folder.replace(/^\.+/, '');

// WHICH FILE A FAILURE CAME FROM. A book's parts stand in the order assembly wrote them — the
// apparatus first, then the chapters — and the framework prefixes a failure with the index of the
// part it rose through, so the first index names the chapter file a person can open.
const filesOf = (library: string, book: Book): string[] => [
    ...(book.cover ? ['.cover.tsx'] : []),
    ...(book.synopsis ? ['.synopsis.tsx'] : []),
    ...(book.contents ? ['.table.tsx'] : []),
    ...book.chapters.map(chapter => chapter.file),
].map(file => join(library, book.folder, file));

// THE BOOKS A BOOK CATALOGUES — the seam for $$Synopsis, which Doug named as the sense in which a
// book is catalogued and ruled for the sprint after this one. Until it lands, a book catalogues none.
const catalogued = (book: $Writing): string[] => {
    void book;
    return [];
};

// WRITINGS SPECIFIED, COUNTED ONCE EACH, at the specification's check — the one place every rule set
// runs, and not a chemical, so nothing reaches around it. The framework specifies a writing at its
// bond and again from each ancestor's descent; the count a person reads is distinct writings.
const counting = (): { reached: () => number } => {
    const seen = new WeakSet<object>();
    let reached = 0;
    const check = Specification.prototype.check;
    Specification.prototype.check = function (this: Specification<object>, writing: object) {
        if (!seen.has(writing)) { seen.add(writing); reached += 1; }
        return check.call(this, writing);
    };
    return { reached: () => reached };
};

// ONE CALL PER BOOK. specify() descends by itself — Doug: "The goal here is to have it right in the
// code and your thing just have to confirm it for each book." — and the harness confirms each book
// under the folder pointed to, then the books it catalogues.
export const specify = async (server: ViteDevServer, folder?: string): Promise<Verdict[]> => {
    const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const library = resolve(binding, '..', '..');
    const found = walk(library, configure(binding));
    const { books, named } = (await server.ssrLoadModule(join(binding, 'application', 'books.ts'))) as Index;

    const pointed = folder === undefined ? library : resolve(folder);
    const scoped = pointed === library ? found.books
        : found.books.filter(book => resolve(book.path) === pointed);
    if (scoped.length === 0) throw new Error(`${pointed} is neither the library (${library}) nor a book in it (${found.books.map(nameOf).join(', ')})`);

    const verdicts: Verdict[] = [];
    const done = new Set<string>();
    const queue = scoped.map(nameOf).filter(name => named.includes(name));
    for (let name = queue.shift(); name !== undefined; name = queue.shift()) {
        if (done.has(name)) continue;
        done.add(name);
        const held = found.books.find(book => nameOf(book) === name);
        const files = held ? filesOf(library, held) : [];
        const own = held ? join(library, held.folder, '.book.tsx') : join(library, name);
        const count = counting();
        const { book } = await books[name]();
        const verdict: Verdict = { book: name, walked: 0, failures: [] };
        try {
            book.specify();
        } catch (error) {
            const message = said(error);
            const first = Number(/^(\d+):/.exec(message)?.[1]);
            verdict.failures.push({ at: `${name}:${kindOf(book)}`, file: files[first] ?? own, says: message });
        }
        verdict.walked = count.reached();
        verdicts.push(verdict);
        queue.push(...catalogued(book));
    }
    return verdicts;
};
