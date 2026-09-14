import { window } from '../rendering/dom';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';

export type Failure = { at: string; file: string; says: string };
export type Verdict = { book: string; walked: number; failures: Failure[] };

type Writing = { specify(): void; parts?(): Writing[]; constructor: { name: string } };
type Index = { books: Record<string, () => Promise<{ book: Writing }>>; named: string[] };

void window;

const kindOf = (writing: Writing): string => writing.constructor.name.replace(/^_?\$?/, '');
const said = (error: unknown): string => String((error as Error)?.message ?? error).split('\n')[0];

// WHICH FILE A PART CAME FROM. A book's parts stand in the order assembly wrote them — the
// apparatus first, then the chapters — so the index of a book's part is the index of a file,
// and everything beneath that part belongs to that file. That is what lets a failure deep in
// a tree land on the chapter a person can open.
const filesOf = (library: string, folder: string, held: { cover: boolean; synopsis: boolean; contents: boolean; chapters: { file: string }[] }): string[] => [
    ...(held.cover ? ['.cover.tsx'] : []),
    ...(held.synopsis ? ['.synopsis.tsx'] : []),
    ...(held.contents ? ['.table.tsx'] : []),
    ...held.chapters.map(chapter => chapter.file),
].map(file => join(library, folder, file));

export const specifyTree = (writing: Writing, at: string, file: string, files: string[] | undefined, verdict: Verdict): void => {
    verdict.walked += 1;
    try {
        writing.specify();
    } catch (error) {
        verdict.failures.push({ at, file, says: said(error) });
    }
    if (typeof writing.parts !== 'function') return;
    let parts: Writing[] = [];
    try {
        parts = writing.parts();
    } catch (error) {
        verdict.failures.push({ at: `${at}/parts()`, file, says: said(error) });
    }
    parts.forEach((part, index) => specifyTree(part, `${at}/${index}:${kindOf(part)}`, files?.[index] ?? file, undefined, verdict));
};

export const specify = async (server: ViteDevServer, only?: string): Promise<Verdict[]> => {
    const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const library = resolve(binding, '..', '..');
    const found = walk(library, configure(binding));
    const { books, named } = (await server.ssrLoadModule(join(binding, 'application', 'books.ts'))) as Index;
    const verdicts: Verdict[] = [];
    for (const name of named.filter(one => only === undefined || one === only)) {
        const { book } = await books[name]();
        const held = found.books.find(one => one.folder.replace(/^\.+/, '') === name);
        const files = held ? filesOf(library, held.folder, held) : undefined;
        const verdict: Verdict = { book: name, walked: 0, failures: [] };
        specifyTree(book, `${name}:${kindOf(book)}`, held ? join(library, held.folder, '.book.tsx') : join(library, name), files, verdict);
        verdicts.push(verdict);
    }
    return verdicts;
};
