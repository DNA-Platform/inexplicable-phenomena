import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, sep } from 'node:path';
import { build, type InlineConfig, type Plugin, type Rollup, type UserConfig } from 'vite';
import type { Configuration } from '../configuration/configuration';
import type { Library } from '../inventory/library';
import type { Graph } from '../manifest/graph';
import type { App, Chunk, Manifest, Shared } from '../manifest/manifest';
import { addressed } from '../assembly/books';
import { identifier } from '@dna-platform/public';

// THE BUNDLE, KEPT BY BOOK. Until 2026-10-19 the bundle was one Vite build of the whole library on
// every bind, unchanged binds included: at 1,019 books, 393 s alone and 1,101 s beside a browser, with
// every page already kept. Doug: "We can't have an every build cost of 19 min." So the bundle is three
// builds and a record, and a bind builds only what its record does not already hold:
//
//   the app     — the entry, its routes and its book index, which names every book's chunk by its
//                 address; built when the app's own sources or any chunk's name changed;
//   the books   — one Vite build with one input per STALE book, stale by the digest specify keeps,
//                 each chunk named by its content; a chunk two books of one build share is kept as
//                 long as any book's record names it; a book whose digest holds keeps its chunk;
//   the shared  — one entry per package a book or the app imports bare, React, chemistry, the
//                 package and the rest, built when the packages or the set of names changed.
//
// EVERY PACKAGE IS EXTERNAL TO A BOOK'S CHUNK AND TO THE APP, and the shell resolves the bare names
// with an import map to the shared entries, so one React and one chemistry stand on a page however
// many chunks it loads. A change to a manual's code stales every book through the graph's bases, as
// before, so a chunk never outlives the code it imports by a stable name. The shell, the import map
// and the app's script are this phase's to write; the render reads the shell it left.
//
// `bundling/bundling.ts` is a PROXY NAME, flagged for Doug.

const forward = (path: string): string => path.split(sep).join('/');
const digestOf = (parts: (string | Buffer)[]): string => {
    const hash = createHash('sha256');
    for (const part of parts) hash.update(part);
    return hash.digest('hex').slice(0, 16);
};

// WHAT IS BARE: a package, imported by a name that is no path. A stylesheet or a picture a package
// ships is bundled with whoever imports it, since an import map carries modules only.
const assets = /\.(css|scss|svg|png|jpe?g|gif|webp|woff2?|ttf|json|txt|md)(\?.*)?$/u;
export const bare = (id: string): boolean =>
    !id.startsWith('.') && !id.startsWith('/') && !/^[A-Za-z]:[\\/]/u.test(id) && !id.startsWith('\0') && !id.startsWith('virtual:') && !id.startsWith('vite/') && !assets.test(id);

const outputs = (built: Awaited<ReturnType<typeof build>>): Rollup.OutputChunk[] => {
    const all = Array.isArray(built) ? built : 'output' in built ? [built] : [];
    return all.flatMap(one => (one as Rollup.RollupOutput).output).filter((one): one is Rollup.OutputChunk => one.type === 'chunk');
};
const files = (built: Awaited<ReturnType<typeof build>>): string[] => {
    const all = Array.isArray(built) ? built : 'output' in built ? [built] : [];
    return all.flatMap(one => (one as Rollup.RollupOutput).output.map(file => file.fileName)).filter(name => name !== 'index.html').sort();
};

// THE CHUNKS A CHUNK NEEDS, walked through what each imports within the build, so a book's record
// names every file its page will load.
const needed = (chunks: Rollup.OutputChunk[], entry: Rollup.OutputChunk): string[] => {
    const byName = new Map(chunks.map(one => [one.fileName, one]));
    const seen = new Set<string>();
    const visit = (one: Rollup.OutputChunk): void => {
        if (seen.has(one.fileName)) return;
        seen.add(one.fileName);
        for (const name of [...one.imports, ...one.dynamicImports]) { const next = byName.get(name); if (next !== undefined) visit(next); }
    };
    visit(entry);
    return [...seen].sort();
};
// WHAT A CHUNK IMPORTS BARE, BINDING BY BINDING: a chunk's imports name both the packages it imports and
// the other chunks of its own build, so a chunk of the build is never a package, whatever its name looks
// like; and what is imported from a package is kept by name, since a shared entry must export exactly
// those. React is a CommonJS package whose index hands everything to a required file, so an entry that is
// the package itself exports nothing by name, and the page said so: "'react' does not provide an export
// named 'lazy'", 2026-10-19. A facade that names the bindings lets Rollup find each one.
const bareBindings = (chunks: Rollup.OutputChunk[], all: Rollup.OutputChunk[] = chunks): Record<string, string[]> => {
    const own = new Set(all.map(one => one.fileName));
    const held = new Map<string, Set<string>>();
    for (const one of chunks)
        for (const [id, names] of Object.entries(one.importedBindings)) {
            if (own.has(id) || !bare(id)) continue;
            const set = held.get(id) ?? new Set<string>();
            for (const name of names) set.add(name);
            held.set(id, set);
        }
    return Object.fromEntries([...held.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([id, names]) => [id, [...names].sort()]));
};
const merged = (all: Record<string, string[]>[]): Record<string, string[]> => {
    const held = new Map<string, Set<string>>();
    for (const one of all)
        for (const [id, names] of Object.entries(one)) {
            const set = held.get(id) ?? new Set<string>();
            for (const name of names) set.add(name);
            held.set(id, set);
        }
    return Object.fromEntries([...held.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([id, names]) => [id, [...names].sort()]));
};

// A SHARED ENTRY IS A FACADE: a module that imports a package by the names the library uses and exports
// them again, so the entry's signature is those names whatever the package's own shape.
const facadeOf = (name: string, bindings: string[]): string => {
    const named = bindings.filter(one => one !== 'default' && one !== '*');
    const lines: string[] = [];
    if (bindings.includes('*')) lines.push(`export * from ${JSON.stringify(name)};`);
    if (named.length > 0) lines.push(`export { ${named.join(', ')} } from ${JSON.stringify(name)};`);
    if (bindings.includes('default')) lines.push(`export { default } from ${JSON.stringify(name)};`);
    if (lines.length === 0) lines.push(`import ${JSON.stringify(name)};`);
    return `${lines.join('\n')}\n`;
};
const facadePrefix = '\0shared:';
const facades = (bindings: Record<string, string[]>): Plugin => ({
    name: 'binding:facades',
    enforce: 'pre',
    resolveId(source: string) { return source.startsWith(facadePrefix) ? source : null; },
    load(id: string) { return id.startsWith(facadePrefix) ? facadeOf(id.slice(facadePrefix.length), bindings[id.slice(facadePrefix.length)] ?? []) : null; },
});

// WHAT THE PACKAGES ARE, AS BYTES: each name resolved where the binding resolves it and its main file
// hashed, so a published bump or a rebuilt checkout rebuilds the shared entries.
const packages = (binding: string, names: string[]): string => {
    const asked = createRequire(join(binding, 'package.json'));
    return digestOf(names.map(name => { try { return readFileSync(asked.resolve(name)); } catch { return name; } }));
};

// THE BUNDLER ITSELF IS AN INPUT TO EVERY RECORD, as the binder is to a page.
const bundlerDigest = (binding: string): string =>
    digestOf(['bundling/bundling.ts', 'vite.config.ts', 'assembly/books.ts'].map(file => { const at = join(binding, file); return existsSync(at) ? readFileSync(at) : 'gone'; }));

const standing = (face: string, named: string[]): boolean => named.length > 0 && named.every(file => existsSync(join(face, file)));

const named = (specifier: string): string => identifier.slug(specifier) || 'package';

// THE APP'S BOOK INDEX BY ADDRESS, answered in the app's build alone: on disk the index imports each
// book's module, which the children and the workbench load; the app loads each book's chunk.
const addressing = (binding: string, text: string): Plugin => {
    const id = forward(join(binding, 'application', 'books.ts'));
    return { name: 'binding:addressing', enforce: 'pre', load(asked: string) { return forward(asked) === id ? text : null; } };
};

const importMap = (shared: Shared, base: string): string =>
    `<script type="importmap">${JSON.stringify({ imports: Object.fromEntries(Object.entries(shared.map).map(([name, file]) => [name, `${base}${file}`])) })}</script>`;

export type Bundled = { chunks: Record<string, Chunk>; shared: Shared; app: App; bundled: string[]; built: string[]; builds: number; keptChunks: number; sharedBuilt: boolean; appBuilt: boolean };

export const bundling = async (
    binding: string,
    face: string,
    chosen: Configuration,
    found: Library,
    graph: Graph,
    previous: Manifest,
    configured: () => UserConfig,
): Promise<Bundled> => {
    const base = chosen.resolution.base;
    const bundler = bundlerDigest(binding);
    const digests = new Map(graph.books.map(entry => [entry.folder, entry.digest]));
    const common = (): InlineConfig => ({ ...configured(), configFile: false, logLevel: 'warn' });

    // THE BOOKS, STALE ONES BUILT A BATCH AT A TIME, the rest kept.
    const chunks: Record<string, Chunk> = {};
    const stale: Record<string, string> = {};
    for (const book of found.books) {
        const digest = digestOf([digests.get(book.folder) ?? '', bundler]);
        const before = previous.chunks[book.folder];
        if (before !== undefined && before.digest === digest && standing(face, before.files)) chunks[book.folder] = before;
        else stale[named(book.folder)] = forward(book.module);
    }
    const keys = Object.fromEntries(found.books.map(book => [named(book.folder), book.folder]));
    const built: string[] = [];
    const entries = Object.entries(stale);
    for (let at = 0; at < entries.length; at += chosen.bundling.batch) {
        const config = common();
        const output = await build({
            ...config,
            build: { ...config.build, modulePreload: false, rollupOptions: { input: Object.fromEntries(entries.slice(at, at + chosen.bundling.batch)), external: bare, preserveEntrySignatures: 'strict', output: { format: 'es', entryFileNames: 'assets/books/[name]-[hash].js', chunkFileNames: 'assets/books/[name]-[hash].js', assetFileNames: 'assets/books/[name]-[hash][extname]' } } },
        });
        const all = outputs(output);
        for (const one of all) {
            if (!one.isEntry || one.name === undefined) continue;
            const folder = keys[one.name];
            if (folder === undefined) continue;
            const mine = needed(all, one);
            chunks[folder] = { digest: digestOf([digests.get(folder) ?? '', bundler]), entry: one.fileName, files: mine, bindings: bareBindings(all.filter(other => mine.includes(other.fileName)), all) };
            built.push(folder);
        }
    }

    // THE APP, WITH THE INDEX BY ADDRESS; built when its sources, the index or the bundler changed.
    const index = addressed(found, chunks, base);
    const chunkAddresses = `${base.replace(/\/$/u, '')}/assets/books/`;
    const appSources = ['application/main.tsx', 'application/opened.ts', 'application/routes.ts', 'application/stylesheets.ts', 'index.html', '.pubconfig']
        .map(file => { const at = join(binding, file); return existsSync(at) ? readFileSync(at) : 'gone'; });
    const appDigest = digestOf([...appSources, index, bundler]);
    let app: App;
    let appBuilt = false;
    if (previous.app !== undefined && previous.app.digest === appDigest && standing(face, previous.app.files) && existsSync(join(binding, '.shell.html'))) app = previous.app;
    else {
        const config = common();
        const output = await build({
            ...config,
            plugins: [addressing(binding, index), ...(config.plugins ?? [])],
            // A CHUNK'S ADDRESS IS EXTERNAL TO THE APP: a literal in a dynamic import is a module Rollup resolves,
            // whatever a comment says, and an external one is left for the browser to load at that address.
            build: { ...config.build, modulePreload: false, rollupOptions: { input: join(binding, 'index.html'), external: (id: string) => bare(id) || id.startsWith(chunkAddresses), output: { format: 'es' } } },
        });
        app = { digest: appDigest, files: files(output), bindings: bareBindings(outputs(output)), shell: readFileSync(join(face, 'index.html'), 'utf8') };
        appBuilt = true;
    }

    // THE SHARED ENTRIES, one facade per bare name the app or any chunk imports, exporting the bindings the
    // library uses; built when the packages, the names or the bindings changed.
    const bindings = merged([app.bindings, ...Object.values(chunks).map(one => one.bindings)]);
    const names = Object.keys(bindings);
    const sharedDigest = digestOf([JSON.stringify(bindings), packages(binding, names.map(name => name.split('/').slice(0, name.startsWith('@') ? 2 : 1).join('/'))), bundler]);
    let shared: Shared;
    let sharedBuilt = false;
    if (previous.shared !== undefined && previous.shared.digest === sharedDigest && standing(face, previous.shared.files)) shared = previous.shared;
    else {
        const config = common();
        const output = await build({
            ...config,
            plugins: [facades(bindings), ...(config.plugins ?? [])],
            build: { ...config.build, modulePreload: false, rollupOptions: { input: Object.fromEntries(names.map(name => [named(name), `${facadePrefix}${name}`])), preserveEntrySignatures: 'strict', output: { format: 'es', entryFileNames: 'assets/shared/[name]-[hash].js', chunkFileNames: 'assets/shared/[name]-[hash].js', assetFileNames: 'assets/shared/[name]-[hash][extname]' } } },
        });
        const all = outputs(output);
        const map: Record<string, string> = {};
        for (const name of names) {
            const entry = all.find(one => one.isEntry && one.name === named(name));
            if (entry === undefined) throw new Error(`the shared build made no entry for ${name}`);
            map[name] = entry.fileName;
        }
        shared = { digest: sharedDigest, map, files: files(output) };
        sharedBuilt = true;
    }

    // THE SHELL: the app's page with the import map before its script, kept beside the binding for
    // every page to be written onto.
    const shell = app.shell.replace('<script type="module"', () => `${importMap(shared, base)}\n    <script type="module"`);
    writeFileSync(join(binding, '.shell.html'), shell, 'utf8');

    const bundled = [...new Set([...Object.values(chunks).flatMap(one => one.files), ...shared.files, ...app.files])].sort();
    return { chunks, shared, app, bundled, built, builds: Math.ceil(entries.length / chosen.bundling.batch), keptChunks: found.books.length - built.length, sharedBuilt, appBuilt };
};
