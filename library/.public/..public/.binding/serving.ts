import { createServer } from 'vite';
import { configuration } from './vite.config';

// THE BINDER SERVING ITS OWN LIBRARY, which is the other half of what binding.ts does. `bind` is a
// batch that runs every phase and exits; this is the binder staying open, so an author sees a page
// while they are still typing it.
//
// UNTIL NOW `dev` WAS BARE `vite`, and that is the whole bootstrap problem in one line: the dev
// server served application/books.ts, application/routes.ts and one module per book — artifacts a
// PREVIOUS bind wrote to disk. So dev depended on the batch and could not produce what it served,
// and a library whose generated files were stale or missing served a stale or broken page while
// reporting nothing. Nothing about what is served changes here; what changes is who is serving it,
// and that seam is where the phases move next.
//
// THE CONFIG IS PASSED IN RATHER THAN LOADED AGAIN, the way binding.ts passes it to build(): the
// two entries are the same kind of thing and ask for the config the same way. specification/
// specify.mjs takes the other route — createServer({ configFile }) — because it runs in a spawned
// process that holds nothing yet; here the config is already in hand and loading it twice would
// mean two readings of .pubconfig that could disagree.
//
// NO PORT IS NAMED. Doug, 2026-09-17: "Keep that as build and you have your dev" — `preview` is
// pinned to 4242 because that is the tab he keeps open on the built site, so the dev server takes
// its own and never fights it for the port.
export const serving = async (): Promise<void> => {
    const server = await createServer({ ...configuration({ isPreview: false }), configFile: false });
    await server.listen();
    server.printUrls();
};

await serving();
