import { readFileSync } from 'node:fs';
import type { Plugin } from 'vite';
import type { Configuration } from '../configuration/configuration';
import { around, type Library } from './library';
import { walk } from './walk';
import { catalogue, directory, type Catalogue, type Directory, type Places } from '../catalogue/catalogue';

// WHAT THE LIBRARY IS RIGHT NOW, for a compiler that stays open while somebody is writing. ONE
// INVENTORY, AND EVERY PLUGIN ASKS IT: taken when first asked for, kept while nothing moves, and
// retaken the moment the watcher says a file appeared, vanished or changed — as a NEW object, so
// anything holding a map built from it can compare identity.
//
// `inventory/retaken.ts` is a PROXY NAME, flagged for Doug.
export type Inventory = {
    library(): Library;
    catalogue(): Catalogue;
    // WHERE EVERYTHING STANDS, which is all a reference and a route ask: the catalogue's own answers
    // here, the parent's handed below.
    directory(): Directory;
    again(): void;
};

export const retaking = (binding: string, chosen: Configuration): Inventory => {
    const root = around(binding).library;
    let found: Library | undefined;
    let held: Catalogue | undefined;

    const library = (): Library => (found ??= walk(root, chosen));
    const catalogued = (): Catalogue => (held ??= catalogue(library(), chosen));

    return {
        library,
        catalogue: catalogued,
        directory: catalogued,
        again: (): void => { found = undefined; held = undefined; },
    };
};

// THE INVENTORY OF A CHILD OF A BIND, which reads where everything stands from the file its parent
// wrote and never reads the library through again — Sprint 112, D1. It holds no catalogue: holding
// the library is the parent's, done in its catalogue phase before any child opened, so a child is
// configured without the holding plugin, and asking it for one is a mistake said by name. Nothing
// moves while a child runs, so there is nothing to retake. `handed` is a PROXY name.
export const handed = (binding: string, chosen: Configuration, file: string): Inventory => {
    const root = around(binding).library;
    let found: Library | undefined;
    let read: Directory | undefined;

    return {
        library: (): Library => (found ??= walk(root, chosen)),
        catalogue: (): Catalogue => { throw new Error('a child of a bind holds no catalogue: its parent held the library and handed it where everything stands'); },
        directory: (): Directory => (read ??= directory(JSON.parse(readFileSync(file, 'utf8')) as Places)),
        again: (): void => {},
    };
};

// AND THE WATCHER THAT KEEPS IT TRUE. Vite watches its root and the root is the binding; the
// library stands above it, and a new chapter is invisible to an unextended watcher, so the library
// is added. The face is excluded: it is where pages are written, and a watcher that retook the
// inventory on every page written would retake it forever.
export const retakes = (binding: string, held: Inventory): Plugin => {
    const { face, library } = around(binding);

    return {
        name: 'binding:inventory',
        enforce: 'pre',
        configureServer(server) {
            server.watcher.add(library);
            for (const event of ['add', 'unlink', 'change', 'addDir', 'unlinkDir'] as const)
                server.watcher.on(event, (path: string) => {
                    if (path.startsWith(face)) return;
                    held.again();
                });
        },
    };
};
