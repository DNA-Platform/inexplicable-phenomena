import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const binding = dirname(dirname(fileURLToPath(import.meta.url)));

// NO HOT MODULE REPLACEMENT IN A PRERENDER. A server that draws its pages and exits has nobody to
// push an update to, and it would open a websocket port a watching server may hold — measured
// 2026-09-19, when a child drew each page, "Port 24678 is already in use", once per child after the first.
const server = await createServer({
    configFile: join(binding, 'vite.config.ts'),
    logLevel: 'error',
    // NO WATCHER EITHER: a prerender child reads the library once and exits, and the watcher cost it
    // 0.95 s of an 8 s draw on 2026-10-16; vite answers `server.watcher` with a no-op when watching is
    // off, so the inventory's retaking plugin, which adds the library to it, loses nothing here.
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    // AND NO DEPENDENCY OPTIMIZER: a child serves no browser and loads its books as the server, which
    // reads node_modules as Node does, so the pre-bundled dependencies under node_modules/.vite are
    // nothing it needs; and two children opening at once wrote and cleared that one cache together,
    // EPERM removing .vite/deps on the first bind of 136 books two at once, 2026-10-17.
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: 'custom',
    ssr: { external: true },
});

// THE ORDERS ARE A FILE: the pages to draw and the pages to write again from what was kept, since a
// thousand kept pages do not fit an argument list (Sprint 109), every order in the one file and this
// child told which is its own, since children run at once and a file each rewrote would be read by
// the wrong one.
const order = JSON.parse(readFileSync(process.argv[2], 'utf8'))[Number(process.argv[3])];

try {
    await server.ssrLoadModule(join(binding, 'rendering', 'dom.ts'));
    const { draw } = await server.ssrLoadModule(join(binding, 'rendering', 'draw.ts'));
    const done = await draw(server, order);
    // AND WHAT IT COST, in its last line: the peak resident set, in megabytes.
    process.stdout.write(JSON.stringify({ ...done, peak: Math.round(process.resourceUsage().maxRSS / 1024) }) + '\n');
} finally {
    await server.close();
}
