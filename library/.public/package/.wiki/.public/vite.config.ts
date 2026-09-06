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
            '@dna-platform/public/encyclopedia': path.resolve(__dirname, '../../src/encyclopedia/index.ts'),
            '@dna-platform/public': path.resolve(__dirname, '../../src/index.ts'),
            '@dna-platform/chemistry': path.resolve(__dirname, '../../../../chemistry/package/src/index.ts'),
            '@': path.resolve(__dirname, '../../src'),
        },
        dedupe: ['react', 'react-dom', 'styled-components'],
    },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});
