import type { Plugin } from 'vite';
import type { Configuration } from '../configuration/configuration';
import { around, type Library } from './library';
import { walk } from './walk';
import { catalogue, type Catalogue } from '../catalogue/catalogue';

// WHAT THE LIBRARY IS RIGHT NOW, for a compiler that stays open while somebody is writing.
//
// `inventory/retaken.ts` is a PROXY NAME, flagged for Doug.
//
// THE BATCH WALKS ONCE AND IS RIGHT FOREVER, because it exits. The dev server walked once at
// startup and was then wrong for the rest of the afternoon: `vite.config.ts` took an inventory and
// a catalogue at module load and handed the same two objects to every plugin, so a chapter added
// after the server booted did not exist, and a book renamed after it booted went on answering to
// its old name. The one plugin that was right — `catalogue/holds.ts` — was right because it walked
// the whole library again on every single transform, which is the same fact from the other side.
//
// SO THERE IS ONE INVENTORY AND EVERY PLUGIN ASKS IT. It is taken when first asked for, kept while
// nothing moves, and RETAKEN the moment the watcher says a file appeared, vanished or changed. That
// collapses two faults at once: the plugins that captured a stale library stop being stale, and the
// plugin that re-walked on every keystroke stops paying for what has not moved.
//
// AND THE INVENTORY IS A NEW OBJECT EACH TIME IT IS RETAKEN, never one mutated in place. Anything
// holding a map built from it can compare identity and rebuild only when the library it was built
// from is genuinely a different reading.
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

// AND THE WATCHER THAT KEEPS IT TRUE, which is this file's whole second half.
//
// VITE WATCHES ITS ROOT, AND THE ROOT IS THE BINDING. The library stands one folder above it, so
// the only library files vite watches on its own are the ones already loaded into the module graph
// — which is exactly the set that cannot contain a file nobody has imported yet. A NEW CHAPTER IS
// INVISIBLE TO AN UNEXTENDED WATCHER, so the library root is added to it explicitly.
//
// THE FACE IS EXCLUDED, and that is not a detail: the face is where the binder writes pages, and a
// watcher that retook the inventory every time a page was written would retake it forever.
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
