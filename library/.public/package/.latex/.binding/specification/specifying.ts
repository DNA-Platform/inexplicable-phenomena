import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import type { Verdict } from './specify';

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

// FAILURES IN THE COMPILER'S OWN SHAPE — `file(line,col): error TAG: message` — which is
// what an editor's problem matcher reads, so a writing that does not specify is a red line
// under the chapter it came from, the way a type error is.
export const problem = (book: string, failure: { at: string; file: string; says: string }): string =>
    `${failure.file}(1,1): error SPEC: ${failure.at} — ${failure.says}`;

export const specifying = (binding: string, names: string[]): Verdict[] => {
    const entry = join(binding, 'specification', 'specify.mjs');
    const verdicts: Verdict[] = [];
    for (const name of names) {
        const ran = spawnSync(process.execPath, [entry, name], {
            cwd: binding,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'inherit'],
            env: { ...process.env, NODE_ENV: 'development' },
            maxBuffer: 64 * 1024 * 1024,
        });
        if (ran.status !== 0 && !ran.stdout.trim()) throw new Error(`specifying ${name} failed before it could answer (exit ${ran.status ?? 'signal'})`);
        verdicts.push(...(JSON.parse(lastLine(ran.stdout)) as Verdict[]));
    }
    const failed = verdicts.filter(one => one.failures.length > 0);
    if (failed.length > 0) {
        for (const one of failed) for (const failure of one.failures) console.error(problem(one.book, failure));
        throw new Error(`the library does not specify — ${failed.reduce((n, one) => n + one.failures.length, 0)} failure(s) in ${failed.map(one => one.book).join(', ')}`);
    }
    return verdicts;
};
