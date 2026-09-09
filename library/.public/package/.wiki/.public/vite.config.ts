import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const decorators = () => react({
    babel: { parserOpts: { plugins: ['decorators-legacy'] } },
});

export default defineConfig({
    plugins: [decorators()],
    root: __dirname,
    server: {
        port: 5200,
        strictPort: true,
        fs: { allow: [path.resolve(__dirname, '../../../../..')] },
    },
    // DIST IS NOT A DEPENDENCY, IT IS THE BUILD. Vite pre-bundles anything it resolves into
    // node_modules-shaped territory and then serves that CACHE, so a fresh `npm run build` was read
    // as a stale module four separate times — always the same symptom, "does not provide an export
    // named '$Book'", against a dist that plainly had it. Excluding these makes vite serve the
    // built files directly, which is what a demo reading its own package through the front door
    // should have been doing all along.
    optimizeDeps: {
        exclude: [
            '@dna-platform/public',
            '@dna-platform/public/library',
            '@dna-platform/public/article',
            '@dna-platform/public/markdown',
            '@dna-platform/public/encyclopedia',
            '@dna-platform/chemistry',
        ],
    },
    resolve: {
        alias: {
            // THROUGH THE FRONT DOOR. The demo reads the package by its published
            // name, against dist, exactly as a consumer does — so rollup owns the
            // module graph and the cycles it has already resolved stay resolved.
            // Reaching into src would put vite's dev module runner in charge of an
            // order the ES module spec fixes and no bundler is asked to fix there.
            '@dna-platform/public/library': path.resolve(__dirname, '../../dist/library.js'),
            '@dna-platform/public/article': path.resolve(__dirname, '../../dist/article.js'),
            '@dna-platform/public/markdown': path.resolve(__dirname, '../../dist/markdown.js'),
            '@dna-platform/public/encyclopedia': path.resolve(__dirname, '../../dist/encyclopedia.js'),
            '@dna-platform/public': path.resolve(__dirname, '../../dist/lib.js'),
            '@dna-platform/chemistry': path.resolve(__dirname, '../../../../chemistry/package/src/index.ts'),
        },
        dedupe: ['react', 'react-dom', 'styled-components'],
    },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});
