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
    const { specify } = await server.ssrLoadModule(join(binding, 'specification', 'specify.ts'));
    const answers = await specify(server, process.argv.slice(2));
    process.stdout.write(JSON.stringify(answers) + '\n');
    process.exitCode = answers.some(one => one.failures.length > 0) ? 1 : 0;
} finally {
    await server.close();
}
