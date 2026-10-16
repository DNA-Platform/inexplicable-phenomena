import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import type { Book, Diagnostic, Library } from '../inventory/library';
import { bases, graph, type Entry, type Graph } from '../manifest/graph';
import type { Answer } from './specify';
import { atOnce, lastLine, opened } from '../children';

export type Verdict = { held: Graph; loaded: string[]; unchanged: string[]; failures: Diagnostic[]; walked: number; children: number; atOnce: number; peak: number };

// WHAT ONE CHILD ANSWERS: each book of its batch, and its peak resident set in megabytes.
type Heard = { answers: Answer[]; peak: number };

// A BATCH READ IN A CHILD. A child that found failures exits with them and still answers; one that
// closed before it could answer is the fault reported here.
const read = async (binding: string, entry: string, batch: Book[]): Promise<Heard> => {
    const { status, out } = await opened(binding, [entry, ...batch.map(book => book.folder)], { NODE_ENV: 'development' });
    const said = lastLine(out);
    if (status !== 0 && said === '')
        throw new Error(`reading ${batch.map(book => book.folder).join(', ')} failed before it could answer (exit ${status ?? 'signal'})`);

    return JSON.parse(said) as Heard;
};

// WHAT THE BINDING ITSELF IS, AS BYTES: the two packages every book is written against, read where
// this binding resolves them. A published bump — or an edit to a checkout a binding is linked to —
// changes them, and every book is read again.
const fixed = (binding: string): string[] => {
    const asked = createRequire(join(binding, 'package.json'));

    return ['@dna-platform/public', '@dna-platform/chemistry'].map(name => {
        try {
            return createHash('sha256').update(readFileSync(asked.resolve(name))).digest('hex').slice(0, 16);
        } catch {
            return name;
        }
    });
};

const batched = (books: Book[], size: number): Book[][] => {
    const answer: Book[][] = [];
    for (let at = 0; at < books.length; at += size) answer.push(books.slice(at, at + size));

    return answer;
};

// WHAT IS STALE IS READ; WHAT IS UNCHANGED IS CARRIED. The decision is made here, before a process
// is opened, so a library of any size costs a build only what changed in it.
export const specifying = async (binding: string, found: Library, folders: string[], previous: Graph, chosen: Configuration): Promise<Verdict> => {
    // EVERY LOOKUP IS A MAP OR A SET. At a thousand books a list searched inside a loop is a million
    // comparisons, and a base read inside a loop is a million file reads.
    const entry = join(binding, 'specification', 'specify.mjs');
    const known = new Map(previous.books.map(one => [one.folder, one]));
    const inputs = [...fixed(binding), bases(found)];
    const asked = new Set(folders);
    const wanted = found.books.filter(book => asked.has(book.folder));
    const digests = new Map(wanted.map(book => [book.folder, graph.digest(book, inputs)]));
    const unchanged = wanted.filter(book => known.get(book.folder)?.digest === digests.get(book.folder));
    const kept = new Set(unchanged.map(book => book.folder));
    const stale = wanted.filter(book => !kept.has(book.folder));

    const batches = batched(stale, chosen.specification.batch);
    const heard = await atOnce(batches, chosen.specification.parallel, batch => read(binding, entry, batch));
    const answers = heard.flatMap(one => one.answers);

    // A BOOK OUT OF SCOPE KEEPS WHAT IT LAST ANSWERED, and a book that failed keeps nothing, so the
    // next build reads it again rather than resolving against a record that never held.
    const asking = new Set(wanted.map(book => book.folder));
    const standing = new Set(found.books.map(book => book.folder));
    const books: Entry[] = previous.books.filter(one => !asking.has(one.folder) && standing.has(one.folder));
    for (const one of unchanged) books.push(known.get(one.folder) as Entry);

    const at = new Map(found.books.map(book => [book.folder, book]));
    const failures: Diagnostic[] = [];
    for (const answer of answers) {
        const book = at.get(answer.folder);
        for (const said of answer.failures) {
            const [file, ...rest] = said.split(' › ');
            failures.push({ at: answer.folder, file: join(book?.path ?? found.root, file), says: rest.join(' › ') });
        }
        if (answer.failures.length === 0)
            books.push({ folder: answer.folder, digest: digests.get(answer.folder) ?? '', walked: answer.walked });
    }

    return {
        held: { books },
        loaded: stale.map(book => book.folder),
        unchanged: unchanged.map(book => book.folder),
        failures,
        walked: answers.reduce((total, one) => total + one.walked, 0),
        children: batches.length,
        atOnce: Math.min(chosen.specification.parallel, batches.length),
        peak: Math.max(0, ...heard.map(one => one.peak)),
    };
};
