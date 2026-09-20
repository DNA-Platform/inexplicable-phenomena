import { join, resolve, sep } from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import type { Configuration } from '../configuration/configuration';
import type { Book, Library } from '../inventory/library';
import { around } from '../inventory/library';
import type { Inventory } from '../inventory/retaken';
import { assembled as assembledBook } from './book';
import { assembled as assembledBooks } from './books';
import { assembled as assembledRoutes } from './routes';
import { assembled as assembledSheets } from './stylesheets';

// THE GENERATED MODULES, SERVED RATHER THAN WRITTEN. Each is generated on the spot from the same
// function the batch uses — one producer, two consumers — and a file a previous bind left on disk
// is never consulted, so the dev server cannot answer for a library that has moved on.
//
// `assembly/serving.ts` is a PROXY NAME, flagged for Doug.
//
// THE IDS ARE THE PATHS THESE MODULES WOULD HAVE HAD, not the `\0` a virtual module usually wears:
// vite decides whether to run TypeScript and JSX over a module by its id, and a `\0` id is skipped.
// And the library is ASKED FOR rather than held, because a chapter appearing on disk changes a
// module this plugin generates.

// A BOOK SERVED HAS NO DIRECTORY, so its chapters are imported by absolute path rather than by one
// relative to a module that does not stand anywhere.
const forward = (path: string): string => path.split(sep).join('/');

export const serving = (binding: string, chosen: Configuration, held: Inventory): Plugin => {
    const application = forward(join(binding, 'application'));
    const { face, library } = around(binding);

    // THE ID KEEPS ITS EXTENSION, and that is not decoration. Vite decides whether to run TypeScript
    // over a module by looking at the id, so `\0binding:routes` arrived at the parser as JavaScript
    // with an `import type` still in it and the whole bind died on a `type` keyword. Named
    // `\0binding:routes.ts` it is transformed like anything else. A book module is `.tsx`, because
    // it is markup.
    const artifacts: Record<string, () => string> = {
        [`${application}/books.ts`]: () => assembledBooks(binding, held.library()),
        [`${application}/routes.ts`]: () => assembledRoutes(held.catalogue().table),
        [`${application}/stylesheets.ts`]: () => assembledSheets(chosen),
    };

    // THE BOOKS BY THE ID EACH ONE ANSWERS TO, REBUILT WHEN THE LIBRARY IS A DIFFERENT READING AND
    // NEVER OTHERWISE. A retaken inventory is a new object, so its identity is the whole test — and
    // building a thousand-entry map on every `resolveId` would be the cost of keeping up paid over
    // and over for a shelf that has not moved.
    let shelf: { of: Library; books: Map<string, Book>; byModule: Map<string, string> } | undefined;
    const shelved = (): { of: Library; books: Map<string, Book>; byModule: Map<string, string> } => {
        const found = held.library();
        if (shelf?.of !== found)
            shelf = {
                of: found,
                books: new Map(found.books.map(book => [forward(resolve(book.module)), book])),
                byModule: new Map(found.books.map(book => [forward(resolve(book.module)).replace(/\.tsx$/u, ''), forward(resolve(book.module))])),
            };

        return shelf;
    };

    // WHICH OF OURS A REQUEST NAMES, whoever asked and however they spelled it. Three callers ask
    // three ways: the entry writes `./routes`, a generated module writes `./books/<one>`, and
    // `specification/specify.ts` names `application/books.ts` by its ABSOLUTE PATH, because it
    // reaches the library through the one door rather than through an import. All three are the
    // same question.
    const ours = (source: string, importer: string | undefined): string | null => {
        const at = forward(resolve(importer === undefined ? application : `${forward(importer)}/..`, source)).replace(/\.(ts|tsx)$/u, '');

        return artifacts[`${at}.ts`] !== undefined ? `${at}.ts` : shelved().byModule.get(at) ?? null;
    };

    // AND THE ONE PLACE AN ORDINARY ID IS THE WRONG ANSWER: THE DEPENDENCY SCANNER.
    //
    // Vite scans the entry before serving anything, to find which packages to pre-bundle. The
    // scanner runs on esbuild, and esbuild reads a module's text OFF THE DISK — it asks plugins
    // where a module is and never asks them what it says. So a module that exists only because we
    // answer for it is a path esbuild opens and does not find, and the scan dies on the first one:
    // measured with nothing generated, `ENOENT ... application\routes.ts`, a page of red, and no
    // pre-bundling at all. Nobody had seen it because a file a previous bind wrote was always lying
    // there to be read.
    //
    // VITE ALREADY HAS THE RULE FOR THIS AND WE ONLY HAVE TO SPEAK IT: the scanner sets aside any
    // id carrying a `\0`, which is the mark a virtual module conventionally wears. Ours do not wear
    // it, for the reason written above — it would turn the JSX and TypeScript off. So they wear it
    // HERE ALONE, where the question being asked is not "compile this" but "what does it import",
    // and the honest answer for a module that is not on disk is: do not go looking.
    const asked = (source: string, importer: string | undefined, scanning: boolean): string | null => {
        const id = ours(source, importer);

        return id === null || !scanning ? id : `\0${id}`;
    };

    // A FILE APPEARING IS A MODULE CHANGING, and nothing in vite can know that on its own. A chapter
    // is not a dependency of the book module that imports it until it EXISTS — so the graph vite
    // walks to decide what to reload is a graph that has never heard of the file just written.
    //
    // WHAT CHANGED IS THE BOOK THE FILE LANDED IN — and only sometimes the list of books and the
    // route table. They are asked for by id and reloaded if the browser is holding them; a module
    // nobody has loaded needs no telling.
    //
    // THE LIST AND THE TABLE ARE RELOADED ONLY WHEN THE SET OF BOOKS ACTUALLY CHANGED, and that is
    // not an optimisation. Neither takes its own hot update — they are generated lists, not
    // components — so reloading one propagates to the entry, which has no importer to propagate to,
    // and vite reloads the page. Measured 2026-09-19: adding a chapter tore the page down for a
    // list that had not changed a character. A chapter appearing changes ONE book's module; a BOOK
    // appearing changes all three, and then a reload is the honest answer.
    //
    // `reloadModule` RATHER THAN `invalidateModule` — the second marks a module stale and waits for
    // somebody to ask again, which for a generated module nobody imports on a timer means never.
    // The first is that plus the update, and it is what this hook exists for.
    const sameBooks = (was: Library | undefined, now: Library): boolean =>
        was !== undefined && was.books.length === now.books.length && was.books.every((book, at) => book.folder === now.books[at].folder);
    const told = async (server: ViteDevServer, path: string): Promise<void> => {
        const at = forward(path);
        const was = shelf?.of;
        const mine = shelved();
        const ids: string[] = [];
        if (!sameBooks(was, mine.of)) ids.push(`${application}/books.ts`, `${application}/routes.ts`);
        for (const [id, book] of mine.books) if (at.startsWith(`${forward(book.path)}/`)) ids.push(id);
        for (const id of ids) {
            const module = server.moduleGraph.getModuleById(id);
            if (module != null) await server.reloadModule(module);
        }
    };

    return {
        name: 'binding:assembly',
        enforce: 'pre',
        configureServer(server) {
            server.watcher.add(library);
            for (const event of ['add', 'unlink', 'addDir', 'unlinkDir'] as const)
                server.watcher.on(event, (path: string) => {
                    const at = forward(path);
                    if (!at.startsWith(`${forward(library)}/`) || at.startsWith(`${forward(face)}/`)) return;
                    void told(server, path);
                });
        },
        // THE OPTIONS ARE ROLLUP'S SHAPE WITH ONE MORE FIELD ON IT, and that is written out rather
        // than asserted. `scan` is vite's own addition and is absent from rollup's type, so naming
        // the whole shape here — every field rollup declares, plus the one vite adds — is what lets
        // the flag be read without a cast claiming something the type system was not told.
        resolveId(source: string, importer: string | undefined, options: { attributes: Record<string, string>; custom?: unknown; ssr?: boolean; isEntry: boolean; scan?: boolean }) {
            return asked(source, importer, options.scan === true);
        },
        load(id: string) {
            const artifact = artifacts[id];
            if (artifact !== undefined) return artifact();
            const book = shelved().books.get(id);

            return book === undefined ? null : assembledBook(book);
        },
    };
};
