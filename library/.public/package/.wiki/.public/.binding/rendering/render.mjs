import { createServer } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const binding = dirname(dirname(fileURLToPath(import.meta.url)));

const server = await createServer({
    configFile: join(binding, 'vite.config.ts'),
    logLevel: 'error',
    server: { middlewareMode: true },
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
