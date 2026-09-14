import { searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from './configuration/configuration';
import { template } from './rendering/page';

const binding = dirname(fileURLToPath(import.meta.url));
const chosen = configure(binding);

export const configuration = (env: Pick<ConfigEnv, 'isPreview'>): UserConfig => ({
    root: binding,
    base: chosen.resolution.base,
    publicDir: existsSync(resolve(binding, 'public')) ? resolve(binding, 'public') : false,
    appType: env.isPreview ? 'mpa' : 'spa',
    plugins: [
        react({ babel: { parserOpts: { plugins: ['decorators-legacy'] } } }),
        { name: 'binding:template', transformIndexHtml: html => template(html, chosen) },
    ],
    build: {
        outDir: resolve(binding, '..'),
        emptyOutDir: false,
    },
    server: {
        fs: { allow: [searchForWorkspaceRoot(binding), resolve(binding, '..')] },
    },
    resolve: {
        dedupe: ['react', 'react-dom', 'styled-components'],
    },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});

export default configuration;
