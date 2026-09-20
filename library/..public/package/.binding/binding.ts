import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Rollup } from 'vite';
import { configuration } from './vite.config';
import { configure, type Configuration } from './configuration/configuration';
import { walk } from './inventory/walk';
import { misaccounted } from './inventory/accounting';
import { around, problem, type Library } from './inventory/library';
import { catalogue, type Catalogue } from './catalogue/catalogue';
import { holds } from './catalogue/holds';
import type { Table } from './resolution/addresses';
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
// RESOLVE NO LONGER FOLLOWS SPECIFY. It used to: a book was named by its own title, and a title was
// a thing a RUNNING book answered, so every book had to be assembled and loaded before any of them
// could be named. `catalogue/reading.ts` answers the same question off the source in a tenth of a
// second, so the catalogue phase names and addresses every book before a line is assembled, and
// `resolve` takes the table rather than rebuilding it — and now runs BEFORE it, which is what the
// change was for: `specify` loads books through vite, and vite cannot scan an entry whose
// `application/routes.ts` has not been written yet. The old order made that file a thing a previous
// bind had left lying there.

type State = {
    binding: string;
    face: string;
    library: string;
    scope: string[];
    chosen?: Configuration;
    found?: Library;
    held?: Catalogue;
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
        const chosen = need(state.chosen, 'inventory');
        state.found = walk(state.library, chosen);
        if (state.found.books.length === 0) throw new Error(`${state.library} holds no book — a folder carrying a .book.tsx`);
        const wrong = misaccounted(state.found, chosen);
        if (wrong !== undefined) throw new Error(wrong);

        return `${plural(state.found.books.length, 'book')}: ${state.found.books.map(book => book.folder).join(', ')}`;
    } },
    // THE LIBRARY HELD TO ITS OWN SPECIFICATION, BEFORE A LINE OF IT IS BUILT. Doug, 2026-09-18:
    // "I want compiled validation on library integrity." So it is a phase and not a probe, and it
    // stands HERE — after the inventory and before anything is assembled — because a library that
    // does not hold together should not cost a bundle to find that out.
    //
    // THE SAME MACHINERY THE DEV SERVER RUNS. `holds` is what the `binding:holds` plugin asks on
    // every dot-chapter transform, and the `references` plugin resolves every file's prose the same
    // way in the bundle as in the dev server. Doug: "We should get errors in the non-incremental
    // part of the compiler which should use machinery for the incremental one, in production."
    //
    // AND IT IS ONE QUESTION WITH ONE ANSWER. `holds` carries both the rules and the order they are
    // asked in, so this task and the `binding:holds` plugin cannot come to differ about what a
    // library is — which is the fault this whole sprint is about.
    { name: 'catalogue', run: state => {
        const found = need(state.found, 'catalogue');
        state.held = catalogue(found, need(state.chosen, 'catalogue'));
        const wrong = holds(found, state.held);
        if (wrong.length) {
            for (const one of wrong) console.error(problem(one));
            throw new Error(`the library does not hold together — ${plural(wrong.length, 'fault')} in ${[...new Set(wrong.map(one => one.at))].join(', ')}`);
        }

        return `${plural(state.held.keys().length, 'key')} · every reference resolves · every book reaches the library and the author`;
    } },
    { name: 'assemble', run: state => {
        const found = need(state.found, 'assemble');
        state.previous = manifest.read(state.binding);
        state.assembled = found.books.map(book => assemble(state.face, book));
        state.written = [books(state.binding, found), stylesheets(state.binding, need(state.chosen, 'assemble'))];
        return `${plural(state.assembled.length, 'book module')}, the index, the stylesheets`;
    } },
    // THE TABLE THE CATALOGUE ALREADY BUILT, rather than one resolved a second time from the graph.
    //
    // THIS IS THE INVERSION AT THE BOTTOM OF SPRINT 77'S FAILURES: the compiler was asking the
    // RUNTIME what the books are called. A book was named by its own title, a title was a thing a
    // running book answered, so `resolve` had to wait for `specify` — and when the reference
    // transform started lowering titles into links, every name the compiler got back was
    // `[Dougs Library](/dougs-library/)` and `.pubconfig` could not find the book it names as root.
    //
    // A NAME IS A THING THE SOURCE SAYS. `catalogue/reading.ts` answers it in a tenth of a second
    // with nothing loaded, and the catalogue phase has already resolved the whole table from it. So
    // this task stopped resolving and started taking, and `resolve` no longer depends on `specify`.
    { name: 'resolve', run: state => {
        state.table = need(state.held, 'resolve').table;
        state.written.push(routes(state.binding, state.table));
        return state.table.routes.map(route => `${route.name} → ${route.address}`).join(' · ');
    } },
    { name: 'specify', run: async state => {
        const found = need(state.found, 'specify');
        const scope = state.scope.length ? state.scope : found.books.map(book => book.folder);
        const verdict = specifying(state.binding, found, scope, graph.read(state.binding), need(state.chosen, 'specify'));
        state.graph = graph.write(state.binding, verdict.held);
        // EACH BOOK AGAINST ITS OWN SPECIFICATION, and nothing here about the library.
        //
        // `specification/library.test.ts` USED TO RUN HERE and has been retired. It asked what makes
        // a library a library — over the GRAPH the last build wrote, after loading every book — and
        // it asked it in terms of TYPES: catalogued by a book carrying `Catalogue`, authored by one
        // carrying `Autobiography`. Doug replaced that model on 2026-09-18: "we don't have types like
        // autobiography at this level." The `catalogue` phase now asks the same question off the
        // SOURCE, in a hundredth of a second, with nothing loaded — and a library with two answers to
        // what makes it a library is the rule-with-two-homes fault at the top of the whole design.
        const wrong = verdict.failures;
        if (wrong.length) {
            for (const one of wrong) console.error(problem(one));
            throw new Error(`the library does not specify — ${plural(wrong.length, 'failure')} in ${[...new Set(wrong.map(one => one.at))].join(', ')}`);
        }
        const kept = state.graph.books.reduce((total, one) => total + one.walked, 0);
        return `${plural(verdict.loaded.length, 'book')} read · ${verdict.unchanged.length} unchanged · ${plural(verdict.walked, 'writing')} specified (${kept} recorded)`;
    } },
    { name: 'bundle', run: async state => {
        const built = await build({ ...configuration({ isPreview: false }), configFile: false, logLevel: 'warn' });
        state.bundled = emitted(built);
        return `${plural(state.bundled.length, 'file')} under assets/`;
    } },
    { name: 'render', run: async state => {
        const table = need(state.table, 'render');
        const held = need(state.held, 'render');
        // THE ROOT'S ADDRESS COMES FROM THE CATALOGUE, which is the one place that knows what a name
        // stands at. The route table holds a path; the catalogue holds the URL a reader arrives at.
        const root = table.root === undefined ? undefined : { name: table.root.name, address: held.where(table.root.name) ?? table.root.address };
        state.rendered = await rendering(state.binding, table.routes.map(route => route.name), root);
        return state.rendered.join(', ');
    } },
    { name: 'proof', run: state => {
        // RUNNABLE ON ITS OWN. `tsx binding.ts proof` reads the pages the last binding wrote, so a
        // person checking one page does not pay for a bundle to find out.
        const pages = state.rendered.length ? state.rendered : manifest.read(state.binding).rendered;
        const wrong = proof(state.face, pages, need(state.chosen, 'proof').resolution.base);
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
