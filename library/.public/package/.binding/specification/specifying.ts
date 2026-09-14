import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import type { Verdict } from './specify';

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

// FAILURES IN THE COMPILER'S OWN SHAPE — `file(line,col): error TAG: message` — which is
// what an editor's problem matcher reads, so a writing that does not specify is a red line
// under the chapter it came from, the way a type error is.
export const problem = (book: string, failure: { at: string; file: string; says: string }): string =>
    `${failure.file}(1,1): error SPEC: ${failure.at} — ${failure.says}`;

// SCOPE POINTS AT A FOLDER — Doug: "Point to a folder." — the library, which is every book in it, or one
// book's folder. Each book is confirmed in its own process.
export const scoped = (binding: string, folders: string[]): string[] => {
    const library = resolve(binding, '..', '..');
    const books = walk(library, configure(binding)).books.map(book => resolve(book.path));
    return folders.flatMap(folder => (resolve(folder) === library ? books : [resolve(folder)]));
};

export const specifying = (binding: string, folders: string[]): Verdict[] => {
    const entry = join(binding, 'specification', 'specify.mjs');
    const verdicts: Verdict[] = [];
    for (const folder of scoped(binding, folders)) {
        const ran = spawnSync(process.execPath, [entry, folder], {
            cwd: binding,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'inherit'],
            env: { ...process.env, NODE_ENV: 'development' },
            maxBuffer: 64 * 1024 * 1024,
        });
        if (ran.status !== 0 && !ran.stdout.trim()) throw new Error(`specifying ${folder} failed before it could answer (exit ${ran.status ?? 'signal'})`);
        verdicts.push(...(JSON.parse(lastLine(ran.stdout)) as Verdict[]));
    }
    const failed = verdicts.filter(one => one.failures.length > 0);
    if (failed.length > 0) {
        for (const one of failed) for (const failure of one.failures) console.error(problem(one.book, failure));
        throw new Error(`the library does not specify — ${failed.reduce((n, one) => n + one.failures.length, 0)} failure(s) in ${failed.map(one => one.book).join(', ')}`);
    }
    return verdicts;
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    for (const verdict of specifying(binding, [process.argv[2] ?? resolve(binding, '..', '..')]))
        console.log(`${verdict.book.padEnd(16)} ${verdict.walked} writings specified`);
}
