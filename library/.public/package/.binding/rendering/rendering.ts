import { spawnSync } from 'node:child_process';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

// A TEMPLATE IS AN INPUT AND A PAGE IS AN OUTPUT, AND THEY WERE THE SAME FILE. The bundle writes the
// shell to the face's index.html, and the ROOT book's page is written there too — so every page
// drawn after the root was built from the root's own page, and the injection kept it silently,
// because it matches an EMPTY `<div id="root"></div>` and there was none left to match. Measured
// 2026-09-15: five books, four identical pages, none holding its own book. The shell is taken aside
// once, before any page is drawn, and every child reads that instead.
export const shellOf = (binding: string): string => join(binding, '.shell.html');

export const rendering = (binding: string, names: string[]): string[] => {
    const entry = join(binding, 'rendering', 'render.mjs');
    const pages: string[] = [];
    copyFileSync(join(binding, '..', 'index.html'), shellOf(binding));
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
