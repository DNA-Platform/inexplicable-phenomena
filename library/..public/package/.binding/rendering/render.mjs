import { createServer } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const binding = dirname(dirname(fileURLToPath(import.meta.url)));

// NO HOT MODULE REPLACEMENT IN A PRERENDER. A server that draws one page and exits has nobody to
// push an update to, and with several of these running at once each would try to open the same
// websocket port and log an error about it — measured 2026-09-19, "Port 24678 is already in use",
// once per child after the first.
const server = await createServer({
    configFile: join(binding, 'vite.config.ts'),
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
    ssr: { external: true },
});

try {
    await server.ssrLoadModule(join(binding, 'rendering', 'dom.ts'));
    const { draw } = await server.ssrLoadModule(join(binding, 'rendering', 'draw.ts'));
    const pages = await draw(server, process.argv[2]);
    process.stdout.write(JSON.stringify(pages) + '\n');
} finally {
    await server.close();
}
