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
        fs: { allow: [searchForWorkspaceRoot(binding), resolve(binding, '..', '..')] },
    },
    // ONE COPY OF EACH, THE BINDING'S. A book outside .binding resolves a package by walking up its own
    // folders, which in a repository holding the workspace reaches a checkout before the binding's
    // node_modules; dedupe pins these to the binding, so a library runs off what it installed.
    resolve: {
        dedupe: ['react', 'react-dom', 'styled-components', '@dna-platform/chemistry', '@dna-platform/public'],
    },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});

export default configuration;
