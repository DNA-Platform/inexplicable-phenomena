import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Rollup } from 'vite';
import { configuration } from './vite.config';
import { configure, type Configuration } from './configuration/configuration';
import { walk } from './inventory/walk';
import type { Library } from './inventory/library';
import { resolution, type Table } from './resolution/addresses';
import { assemble } from './assembly/book';
import { books } from './assembly/books';
import { routes } from './assembly/routes';
import { stylesheets } from './assembly/stylesheets';
import { specifying } from './specification/specifying';
import { rendering } from './rendering/rendering';
import { manifest, type Manifest } from './manifest/manifest';
import { removal } from './manifest/removal';

// THE BINDER IS A COMPILER: a sequence of named tasks, each run in order, each saying what it
// did, the sequence stopping at the first that fails. `tsx binding.ts` runs them all;
// `tsx binding.ts assemble specify` runs a subset, in this order, for a person debugging one.

type State = {
    binding: string;
    library: string;
    chosen?: Configuration;
    found?: Library;
    table?: Table;
    previous?: Manifest;
    assembled: string[];
    written: string[];
    specified: number;
    bundled: string[];
    rendered: string[];
};

type Task = { name: string; run: (state: State) => Promise<string> | string };

const emitted = (built: Awaited<ReturnType<typeof build>>): string[] => {
    const outputs = Array.isArray(built) ? built : 'output' in built ? [built] : [];
    return outputs.flatMap(one => (one as Rollup.RollupOutput).output.map(file => file.fileName)).filter(name => name !== 'index.html').sort();
};

const need = <T,>(held: T | undefined, task: string): T => {
    if (held === undefined) throw new Error(`${task} needs an earlier task to have run first`);
    return held;
};

const plural = (n: number, one: string): string => `${n} ${one}${n === 1 ? '' : 's'}`;

export const tasks: Task[] = [
    { name: 'configure', run: state => { state.chosen = configure(state.binding); return `${plural(Object.keys(state.chosen).length, 'section')} read from .pubconfig`; } },
    { name: 'inventory', run: state => {
        state.found = walk(state.library, need(state.chosen, 'inventory'));
        if (state.found.books.length === 0) throw new Error(`${state.library} holds no book — a folder carrying a .book.tsx`);
        return `${plural(state.found.books.length, 'book')}: ${state.found.books.map(book => book.folder).join(', ')}`;
    } },
    { name: 'resolve', run: state => {
        state.table = resolution(need(state.found, 'resolve'), need(state.chosen, 'resolve'));
        return state.table.routes.map(route => `${route.name} → ${route.address}`).join(' · ');
    } },
    { name: 'assemble', run: state => {
        const found = need(state.found, 'assemble');
        const table = need(state.table, 'assemble');
        state.previous = manifest.read(state.binding);
        state.assembled = found.books.map(book => assemble(state.library, book));
        state.written = [books(state.binding, table), routes(state.binding, table), stylesheets(state.binding, need(state.chosen, 'assemble'))];
        return `${plural(state.assembled.length, 'book module')}, the index, the routes, the stylesheets`;
    } },
    { name: 'specify', run: state => {
        const verdicts = specifying(state.binding, need(state.table, 'specify').routes.map(route => route.name));
        state.specified = verdicts.reduce((n, one) => n + one.walked, 0);
        return `${plural(state.specified, 'writing')} specified across ${plural(verdicts.length, 'book')}`;
    } },
    { name: 'bundle', run: async state => {
        const built = await build({ ...configuration({ isPreview: false }), configFile: false, logLevel: 'warn' });
        state.bundled = emitted(built);
        return `${plural(state.bundled.length, 'file')} under assets/`;
    } },
    { name: 'render', run: state => {
        state.rendered = rendering(state.binding, need(state.table, 'render').routes.map(route => route.name));
        return state.rendered.join(', ');
    } },
    { name: 'record', run: state => {
        const current = manifest.write(state.binding, { assembled: state.assembled, written: state.written, rendered: state.rendered, bundled: state.bundled });
        const gone = removal(state.library, state.previous ?? manifest.read(state.binding), current);
        return `manifest written${gone.length ? ` · removed ${plural(gone.length, 'file')} the source no longer writes` : ''}`;
    } },
];

export const bind = async (binding: string, only: string[] = []): Promise<State> => {
    const state: State = { binding, library: resolve(binding, '..'), assembled: [], written: [], specified: 0, bundled: [], rendered: [] };
    const unknown = only.filter(name => !tasks.some(task => task.name === name));
    if (unknown.length) throw new Error(`no such task: ${unknown.join(', ')} — the tasks are ${tasks.map(task => task.name).join(', ')}`);
    const chosen = only.length ? tasks.filter(task => only.includes(task.name)) : tasks;
    const started = Date.now();
    for (const task of chosen) {
        const at = Date.now();
        process.stdout.write(`${task.name.padEnd(10)} `);
        try {
            const said = await task.run(state);
            console.log(`${said} (${((Date.now() - at) / 1000).toFixed(1)}s)`);
        } catch (error) {
            console.log(`FAILED (${((Date.now() - at) / 1000).toFixed(1)}s)`);
            console.error(String((error as Error).message ?? error));
            process.exitCode = 1;
            return state;
        }
    }
    console.log(`bound ${state.library} in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    return state;
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    await bind(dirname(fileURLToPath(import.meta.url)), process.argv.slice(2));
}
