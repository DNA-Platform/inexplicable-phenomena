import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import type { Book, Diagnostic, Library } from '../inventory/library';
import { graph, type Entry, type Graph } from '../manifest/graph';
import type { Answer } from './specify';

export type Verdict = { held: Graph; loaded: string[]; unchanged: string[]; failures: Diagnostic[]; walked: number };

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

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
export const specifying = (binding: string, found: Library, folders: string[], previous: Graph, chosen: Configuration): Verdict => {
    const entry = join(binding, 'specification', 'specify.mjs');
    const known = new Map(previous.books.map(one => [one.folder, one]));
    const inputs = fixed(binding);
    const wanted = found.books.filter(book => folders.includes(book.folder));
    const digests = new Map(wanted.map(book => [book.folder, graph.digest(found, book, inputs)]));
    const unchanged = wanted.filter(book => known.get(book.folder)?.digest === digests.get(book.folder));
    const stale = wanted.filter(book => !unchanged.includes(book));

    const answers: Answer[] = [];
    for (const batch of batched(stale, chosen.specification.batch)) {
        const ran = spawnSync(process.execPath, [entry, ...batch.map(book => book.folder)], {
            cwd: binding,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'inherit'],
            env: { ...process.env, NODE_ENV: 'development' },
            maxBuffer: 256 * 1024 * 1024,
        });
        if (ran.status !== 0 && !ran.stdout.trim())
            throw new Error(`reading ${batch.map(book => book.folder).join(', ')} failed before it could answer (exit ${ran.status ?? 'signal'})`);
        answers.push(...(JSON.parse(lastLine(ran.stdout)) as Answer[]));
    }

    // A BOOK OUT OF SCOPE KEEPS WHAT IT LAST ANSWERED, and a book that failed keeps nothing, so the
    // next build reads it again rather than resolving against a record that never held.
    const books: Entry[] = previous.books.filter(one =>
        !wanted.some(book => book.folder === one.folder) && found.books.some(book => book.folder === one.folder));
    for (const one of unchanged) books.push(known.get(one.folder) as Entry);

    const failures: Diagnostic[] = [];
    for (const answer of answers) {
        const book = found.books.find(one => one.folder === answer.folder);
        for (const said of answer.failures) {
            const [file, ...rest] = said.split(' › ');
            failures.push({ at: answer.folder, file: join(book?.path ?? found.root, file), says: rest.join(' › ') });
        }
        if (answer.failures.length === 0)
            books.push({ folder: answer.folder, book: answer.book, digest: digests.get(answer.folder) ?? '', walked: answer.walked });
    }

    return {
        held: { books },
        loaded: stale.map(book => book.folder),
        unchanged: unchanged.map(book => book.folder),
        failures,
        walked: answers.reduce((total, one) => total + one.walked, 0),
    };
};
