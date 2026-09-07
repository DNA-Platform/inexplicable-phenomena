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
    resolve: {
        alias: {
            // THROUGH THE FRONT DOOR. The demo reads the package by its published
            // name, against dist, exactly as a consumer does — so rollup owns the
            // module graph and the cycles it has already resolved stay resolved.
            // Reaching into src would put vite's dev module runner in charge of an
            // order the ES module spec fixes and no bundler is asked to fix there.
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
