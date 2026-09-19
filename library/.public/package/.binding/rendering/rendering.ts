import { spawnSync } from 'node:child_process';
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '[]';

// A TEMPLATE IS AN INPUT AND A PAGE IS AN OUTPUT, AND THEY WERE THE SAME FILE. The bundle writes the
// shell to the face's index.html, and the ROOT book's page is written there too — so every page
// drawn after the root was built from the root's own page, and the injection kept it silently,
// because it matches an EMPTY `<div id="root"></div>` and there was none left to match. Measured
// 2026-09-15: five books, four identical pages, none holding its own book. The shell is taken aside
// once, before any page is drawn, and every child reads that instead.
export const shellOf = (binding: string): string => join(binding, '.shell.html');

// WHAT STANDS AT `/`, WHICH IS NOT A BOOK. Every book is addressed by what it is — the root book
// included — so nothing occupies `/` by being named in a configuration file, and `/` is free to be
// what it always was: where a reader arrives. Doug, 2026-09-18: "We can have the default point
// there", and then "that better work right in all cases".
//
// ALL CASES IS THE POINT, so this is a redirect rather than a copy. Writing the root book's page
// here as well would put one book at two addresses, which is the same collision a catalogue exists
// to prevent, one floor up. A redirect has one canonical page and one door to it, and it is honest
// in a static host that has no server to ask: the refresh carries a reader who has script, the
// canonical link carries a reader who does not, and the anchor carries anything that reads neither.
const landing = (address: string, title: string): string => [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    `    <meta http-equiv="refresh" content="0; url=${address}" />`,
    `    <link rel="canonical" href="${address}" />`,
    `    <title>${title}</title>`,
    '  </head>',
    `  <body><a href="${address}">${title}</a></body>`,
    '</html>',
    '',
].join('\n');

export const rendering = (binding: string, names: string[], root?: { address: string; name: string }): string[] => {
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
    if (root !== undefined) {
        const at = join(binding, '..', 'index.html');
        // THE ADDRESS IS THE CATALOGUE'S, WRITTEN FROM THE DOMAIN FORWARD. An earlier writing
        // stripped the leading slash to make it relative — and a relative address on the landing
        // page is read from whatever folder the page is served in, so `/some/where/` would send a
        // reader to `/some/where/dougs-library/`. `proof` names it: "addresses dougs-library/, which
        // is read from whatever folder the page is served in."
        writeFileSync(at, landing(root.address, root.name), 'utf8');
        pages.push('index.html');
    }

    return pages;
};
