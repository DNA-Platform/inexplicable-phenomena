import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const decorators = () => react({
    babel: { plugins: [['@babel/plugin-proposal-decorators', { version: 'legacy' }]] },
});

export default defineConfig({
    plugins: [decorators()],
    root: __dirname,
    server: {
        port: 5199,
        strictPort: true,
        fs: { allow: [path.resolve(__dirname, '../../../..')] },
    },
    preview: { port: 5199, strictPort: true },
    resolve: {
        alias: {
            '@dna-platform/public': path.resolve(__dirname, '../../package/src/index.ts'),
            '@dna-platform/chemistry': path.resolve(__dirname, '../../../chemistry/package/src/index.ts'),
            '@': path.resolve(__dirname, '../../package/src'),
        },
        dedupe: ['react', 'react-dom', 'react-router-dom', 'styled-components'],
    },
    esbuild: { keepNames: true },
});
