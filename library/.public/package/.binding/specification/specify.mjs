import { createServer } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const binding = dirname(dirname(fileURLToPath(import.meta.url)));

const server = await createServer({
    configFile: join(binding, 'vite.config.ts'),
    logLevel: 'error',
    // No hot reload and no watcher in a child that specifies its books once and exits; see render.mjs.
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    appType: 'custom',
    ssr: { external: true },
});

try {
    await server.ssrLoadModule(join(binding, 'rendering', 'dom.ts'));
    const { specify } = await server.ssrLoadModule(join(binding, 'specification', 'specify.ts'));
    const answers = await specify(server, process.argv.slice(2));
    // THE ANSWERS, AND WHAT THEY COST, in the last line: the peak resident set, in megabytes.
    process.stdout.write(JSON.stringify({ answers, peak: Math.round(process.resourceUsage().maxRSS / 1024) }) + '\n');
    process.exitCode = answers.some(one => one.failures.length > 0) ? 1 : 0;
} finally {
    await server.close();
}
