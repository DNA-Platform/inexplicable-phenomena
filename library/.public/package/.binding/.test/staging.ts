import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure, type Configuration } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import type { Library } from '../inventory/library';
import { catalogue, type Catalogue } from '../catalogue/catalogue';

// THE TEST LIBRARY, AND HOW A TEST GETS ONE IT CAN BIND.
//
// Doug, 2026-09-19: "we need it to be a part of .binder, well groomed, and use for test purposes at
// all levels." The books beside this file ARE the library — five of them, one filed under its own
// subject, one its own author, a persona the log vouches for, and a paper with every kind of
// reference in it. A test that only needs to READ a library reads them where they stand, through
// `walk(fixture, configured())`. A test that needs to BIND one needs the geometry a real library
// has — books, a face, and the binder inside the face — and that is what `staged` puts together:
// these books, this binder's own source beside them, in a folder of their own under `.test/.staged/`.
//
// UNDER THE BINDER AND NOT IN THE MACHINE'S TEMP FOLDER, because of where the packages are. This
// binder installs nothing of its own; `vite`, `tsx` and the framework all resolve by walking UP to
// the repository's `node_modules`, and a copy standing in the temp folder walks up to nothing.
// Measured 2026-09-19: "Cannot find package 'vite'", from a binder that was byte-identical to this
// one. A stage under `.test` walks up through the same folders this file does.
//
// NOTHING HERE IS SYNTHETIC. The books are real files a reader could open, and a staged library is
// bound by the same binder, from the same source, that binds every other library.
export const fixture = resolve(dirname(fileURLToPath(import.meta.url)));
export const home = resolve(fixture, '..');
export const stages = join(fixture, '.staged');

// THE BINDER'S OWN CONFIGURATION WITH ONE EXCLUSION: a stage is not a book of the test library, and
// a walk of `.test` that found one would find its five books twice.
export const configured = (): Configuration => {
    const chosen = configure(home);

    return { ...chosen, inventory: { ...chosen.inventory, exclude: [...chosen.inventory.exclude, '.staged'] } };
};

// THE TEST LIBRARY READ WHERE IT STANDS — what a unit suite starts from.
export const read = (): { chosen: Configuration; found: Library; card: Catalogue } => {
    const chosen = configured();
    const found = walk(fixture, chosen);

    return { chosen, found, card: catalogue(found, chosen) };
};

export type Staged = { root: string; library: string; face: string; binding: string; remove(): void };

// WHAT THE BINDER'S SOURCE IS, as opposed to what a bind leaves behind or a package manager installs
// — and never `.test` itself, so a stage does not carry a stage.
const source = (from: string): boolean =>
    !/[\\/](node_modules|\.test|application[\\/]books)([\\/]|$)|[\\/]\.(graph|manifest)\.json$|[\\/]\.shell\.html$|[\\/]application[\\/](books|routes|stylesheets)\.ts$/u.test(from);

// COPIED FILE BY FILE, because the stage stands inside the binder it is a copy of, and `cpSync`
// refuses a folder whose destination is under its source before it ever asks the filter. A walk
// that never enters `.test` has no self to copy into.
const copied = (from: string, into: string): void => {
    mkdirSync(into, { recursive: true });
    for (const entry of readdirSync(from, { withFileTypes: true })) {
        const at = join(from, entry.name);
        if (!source(at)) continue;
        if (entry.isDirectory()) copied(at, join(into, entry.name));
        else cpSync(at, join(into, entry.name));
    }
};

export const staged = (): Staged => {
    mkdirSync(stages, { recursive: true });
    const root = mkdtempSync(join(stages, 'library-'));
    const library = join(root, 'library');
    const face = join(library, '.public');
    const binding = join(face, '.binding');

    for (const entry of readdirSync(fixture, { withFileTypes: true }))
        if (entry.isDirectory() && entry.name !== '.staged') cpSync(join(fixture, entry.name), join(library, entry.name), { recursive: true });
    copied(home, binding);
    writeFileSync(join(binding, '.pubconfig'), `${JSON.stringify({ inventory: { root: 'The Library' }, rendering: { title: 'The Test Library' } }, null, 2)}\n`);

    return { root, library, face, binding, remove: (): void => rmSync(root, { recursive: true, force: true }) };
};

// A STAGED LIBRARY, BOUND — the whole binder run over it, and what it printed handed back.
//
// WITHOUT THE TEST RUNNER'S `NODE_ENV`. Vitest sets it to `test`; a bind decides for itself what
// each phase runs as, and the prerender's children insist on `production`.
export const bound = (held: Staged): string => {
    const { NODE_ENV: _, ...environment } = process.env;

    return execFileSync('npx', ['tsx', 'binding.ts'], { cwd: held.binding, encoding: 'utf8', shell: true, stdio: ['ignore', 'pipe', 'pipe'], env: environment });
};

// THE SAME LIBRARY, LARGER: one of its books copied N times under N names, each listed where the
// specification requires. Doug: "we need scale." A duplicated book keeps its chapters, its
// references and its shape, so what is measured over a thousand of them is the compiler over a
// thousand real books rather than over a thousand stubs.
export type Copies = { of: string; name: string; subject: string; author: string };

export const duplicated = (held: Staged, copies: Copies, count: number): string[] => {
    const named: string[] = [];
    const at = (folder: string): string => join(held.library, folder);
    const listing = (table: string, after: string, rows: string[]): void => {
        const code = readFileSync(table, 'utf8');
        if (!code.includes(after)) throw new Error(`${table} does not list ${after}, so there is nowhere to list its copies after`);
        writeFileSync(table, code.replace(after, `${after}\n${rows.join('\n')}`));
    };

    const canonical: string[] = [];
    const authored: string[] = [];
    for (let k = 1; k <= count; k++) {
        const name = `${copies.name} ${k}`;
        const folder = `${copies.of}-${k}`;
        cpSync(at(copies.of), at(folder), { recursive: true });
        for (const file of ['.cover.tsx', '.synopsis.tsx', '.table.tsx'])
            writeFileSync(join(at(folder), file), readFileSync(join(at(folder), file), 'utf8').split(copies.name).join(name));
        canonical.push(`                    <Option><Book>[[ ${name} ]]**</Book></Option>`);
        authored.push(`                    <Option><Book>[[ ${name} ]]*</Book></Option>`);
        named.push(name);
    }
    listing(join(at(copies.subject), '.table.tsx'), `                    <Option><Book>[[ ${copies.name} ]]**</Book></Option>`, canonical);
    listing(join(at(copies.author), '.table.tsx'), `                    <Option><Book>[[ ${copies.name} ]]*</Book></Option>`, authored);

    return named;
};
