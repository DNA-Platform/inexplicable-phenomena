import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

export const rendering = (binding: string, names: string[]): string[] => {
    const entry = join(binding, 'rendering', 'render.mjs');
    const pages: string[] = [];
    for (const name of names) {
        const ran = spawnSync(process.execPath, [entry, name], {
            cwd: binding,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'inherit'],
            // THE PRERENDER IS A PRODUCTION ARTIFACT: the specification ran in the specify task and runs
            // nowhere here, so the child renders the way a reader's browser will.
            env: { ...process.env, NODE_ENV: 'production' },
        });
        if (ran.status !== 0) throw new Error(`rendering ${name} failed (exit ${ran.status ?? 'signal'})`);
        pages.push(...(JSON.parse(lastLine(ran.stdout)) as string[]));
    }
    return pages;
};
