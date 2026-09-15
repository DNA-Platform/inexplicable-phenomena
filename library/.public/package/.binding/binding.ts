import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Rollup } from 'vite';
import { configuration } from './vite.config';
import { configure, type Configuration } from './configuration/configuration';
import { walk } from './inventory/walk';
import { around, problem, type Library } from './inventory/library';
import { resolution, type Table } from './resolution/addresses';
import { assemble } from './assembly/book';
import { books } from './assembly/books';
import { routes } from './assembly/routes';
import { stylesheets } from './assembly/stylesheets';
import { specifying } from './specification/specifying';
import { running } from './specification/running';
import { proof } from './specification/proof';
import { graph, type Graph } from './manifest/graph';
import { rendering } from './rendering/rendering';
import { manifest, type Manifest } from './manifest/manifest';
import { removal } from './manifest/removal';

// THE BINDER IS A COMPILER: a sequence of named tasks, each run in order, each saying what it
// did, the sequence stopping at the first that fails. `tsx binding.ts` runs them all;
// `tsx binding.ts assemble specify` runs a subset, in this order, for a person debugging one.
//
// RESOLVE FOLLOWS SPECIFY, because a book is named by its own title and a title is a thing a
// running book answers. So the books are assembled, then read once — which is the expensive step,
// and the one that is kept — and only then are they named, ruled on, and given their addresses.

type State = {
    binding: string;
    face: string;
    library: string;
    scope: string[];
    chosen?: Configuration;
    found?: Library;
    graph?: Graph;
    table?: Table;
    previous?: Manifest;
    assembled: string[];
    written: string[];
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
    { name: 'assemble', run: state => {
        const found = need(state.found, 'assemble');
        state.previous = manifest.read(state.binding);
        state.assembled = found.books.map(book => assemble(state.face, book));
        state.written = [books(state.binding, found), stylesheets(state.binding, need(state.chosen, 'assemble'))];
        return `${plural(state.assembled.length, 'book module')}, the index, the stylesheets`;
    } },
    { name: 'specify', run: async state => {
        const found = need(state.found, 'specify');
        const scope = state.scope.length ? state.scope : found.books.map(book => book.folder);
        const verdict = specifying(state.binding, found, scope, graph.read(state.binding), need(state.chosen, 'specify'));
        state.graph = graph.write(state.binding, verdict.held);
        // EACH BOOK AGAINST ITS OWN SPECIFICATION FIRST, and the library only once every book was read.
        // A library suite over a graph that is missing a book asks nothing and says so — and said so
        // INSTEAD OF the reason the book did not load, because the two were gathered in one expression
        // and the throw came first. A book that does not specify is now reported as itself.
        const wrong = verdict.failures.length ? verdict.failures : await running(state.binding, found, 'specification/library');
        if (wrong.length) {
            for (const one of wrong) console.error(problem(one));
            throw new Error(`the library does not specify — ${plural(wrong.length, 'failure')} in ${[...new Set(wrong.map(one => one.at))].join(', ')}`);
        }
        const kept = state.graph.books.reduce((total, one) => total + one.walked, 0);
        return `${plural(verdict.loaded.length, 'book')} read · ${verdict.unchanged.length} unchanged · ${plural(verdict.walked, 'writing')} specified (${kept} recorded)`;
    } },
    { name: 'resolve', run: state => {
        state.table = resolution(need(state.found, 'resolve'), need(state.graph, 'resolve'), need(state.chosen, 'resolve'));
        state.written.push(routes(state.binding, state.table));
        return state.table.routes.map(route => `${route.name} → ${route.address}`).join(' · ');
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
    { name: 'proof', run: state => {
        // RUNNABLE ON ITS OWN. `tsx binding.ts proof` reads the pages the last binding wrote, so a
        // person checking one page does not pay for a bundle to find out.
        const pages = state.rendered.length ? state.rendered : manifest.read(state.binding).rendered;
        const wrong = proof(state.face, pages);
        if (wrong.length) {
            for (const one of wrong) console.error(problem(one));
            throw new Error(`the pages are not readable — ${plural(wrong.length, 'fault')} in ${[...new Set(wrong.map(one => one.at))].join(', ')}`);
        }
        return `${plural(pages.length, 'page')} read back as the browser will build them`;
    } },
    { name: 'record', run: state => {
        const previous = need(state.previous, 'record');
        const current = manifest.write(state.binding, { assembled: state.assembled, written: state.written, rendered: state.rendered, bundled: state.bundled });
        const gone = removal(state.face, previous, current);
        return `manifest written${gone.length ? ` · removed ${plural(gone.length, 'file')} the source no longer writes` : ''}`;
    } },
];

export const bind = async (binding: string, only: string[] = [], scope: string[] = []): Promise<State> => {
    const { face, library } = around(binding);
    const state: State = { binding, face, library, scope, assembled: [], written: [], bundled: [], rendered: [] };
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
    const said = process.argv.slice(2);
    const names = tasks.map(task => task.name);
    await bind(dirname(fileURLToPath(import.meta.url)), said.filter(one => names.includes(one)), said.filter(one => !names.includes(one)));
}
