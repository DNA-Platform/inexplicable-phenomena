import type { Plugin } from 'vite';
import type { Configuration } from '../configuration/configuration';
import { around, type Library } from './library';
import { walk } from './walk';
import { catalogue, type Catalogue } from '../catalogue/catalogue';

// WHAT THE LIBRARY IS RIGHT NOW, for a compiler that stays open while somebody is writing. ONE
// INVENTORY, AND EVERY PLUGIN ASKS IT: taken when first asked for, kept while nothing moves, and
// retaken the moment the watcher says a file appeared, vanished or changed — as a NEW object, so
// anything holding a map built from it can compare identity.
//
// `inventory/retaken.ts` is a PROXY NAME, flagged for Doug.
export type Inventory = {
    library(): Library;
    catalogue(): Catalogue;
    again(): void;
};

export const retaking = (binding: string, chosen: Configuration): Inventory => {
    const root = around(binding).library;
    let found: Library | undefined;
    let held: Catalogue | undefined;

    const library = (): Library => (found ??= walk(root, chosen));

    return {
        library,
        catalogue: (): Catalogue => (held ??= catalogue(library(), chosen)),
        again: (): void => { found = undefined; held = undefined; },
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
