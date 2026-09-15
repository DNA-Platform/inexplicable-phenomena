import { searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from './configuration/configuration';
import { template } from './rendering/page';

const binding = dirname(fileURLToPath(import.meta.url));
const chosen = configure(binding);
const installed = Object.keys((JSON.parse(readFileSync(join(binding, 'package.json'), 'utf8')) as { dependencies?: Record<string, string> }).dependencies ?? {});

export const configuration = (env: Pick<ConfigEnv, 'isPreview'>): UserConfig => ({
    root: binding,
    base: chosen.resolution.base,
    publicDir: existsSync(resolve(binding, 'public')) ? resolve(binding, 'public') : false,
    appType: env.isPreview ? 'mpa' : 'spa',
    plugins: [
        react({ babel: { parserOpts: { plugins: ['decorators-legacy'] } } }),
        { name: 'binding:template', transformIndexHtml: html => template(html, chosen) },
        // A BOOK'S ADDRESS IS ITS PAGE. GitHub Pages answers /turing with a redirect to /turing/, where
        // the page stands; the preview does the same, so a link that works there works here.
        {
            name: 'binding:addresses',
            configurePreviewServer: server => {
                server.middlewares.use((request, response, next) => {
                    const path = (request.url ?? '').split('?')[0];
                    if (path.endsWith('/') || path.includes('.') || !existsSync(resolve(binding, '..', path.slice(1), 'index.html'))) return next();
                    response.statusCode = 301;
                    response.setHeader('Location', `${path}/`);
                    response.end();
                });
            },
        },
    ],
    build: {
        outDir: resolve(binding, '..'),
        emptyOutDir: false,
        // THE BUNDLE IS ONE CHUNK AND THAT IS THE RIGHT SHAPE FOR A BOOK. Measured 2026-09-15: the
        // entry is 911.5 kB by vite's own metric, 282 kB over the wire, and katex is roughly 269 kB
        // of it. A split IS available — manualChunks on katex and react-dom would do it — and for a
        // page a reader navigates within it would be worth taking. These pages are PRERENDERED and
        // a reader moves between them by loading another page, so a second request buys nothing and
        // the warning is measuring an application it is not looking at. The limit is set above what
        // we ship rather than at it, so it stays quiet until something genuinely grows.
        chunkSizeWarningLimit: 1000,
    },
    server: {
        fs: { allow: [searchForWorkspaceRoot(binding), resolve(binding, '..', '..')] },
    },
    // ONE COPY OF EACH, THE BINDING'S. A book outside .binding resolves a package by walking up its own
    // folders, which in a repository holding the workspace reaches a checkout before the binding's
    // node_modules; dedupe pins these to the binding, so a library runs off what it installed.
    //
    // AND IT IS EVERYTHING THE BINDING INSTALLED, NOT A LIST WRITTEN OUT BY HAND. A book is a source
    // file OUTSIDE node_modules, so it resolves nothing at all unless the binding says where — and a
    // hand-written list only ever names what the master anticipated. Measured 2026-09-15: a book
    // reaching for `chroma-js` to mix a palette failed the bundle with "Rollup failed to resolve
    // import", because the binding had installed it and this list had never heard of it. What a
    // library installs is exactly what its books may reach for, and package.json already says so.
    resolve: {
        dedupe: installed,
    },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});

export default configuration;
