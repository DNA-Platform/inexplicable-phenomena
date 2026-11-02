import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// DECORATORS REACH THE BROWSER THROUGH BABEL, NOT THROUGH tsconfig.
// `experimentalDecorators` is read by tsc, by esbuild (so vitest compiles
// `@look` fine) and by the rollup dist build — but @vitejs/plugin-react runs
// BABEL, which ignores it, so a decorator written in an application failed to
// parse in dev and would have failed the Pages build too. The framework has
// shipped @inert and @reactive since long before this; nothing had ever
// written one in an app, so nobody found out.
const decorators = () => react({
    // PARSED by babel, TRANSFORMED by esbuild — the shape the public branch's wiki uses, which
    // is what lets @select stand on a class field: babel only has to read the syntax.
    babel: { parserOpts: { plugins: ['decorators-legacy'] } },
});

export default defineConfig({
    plugins: [decorators()],
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
    root: __dirname,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@specimens': path.resolve(__dirname, '../tests/specimens')
        }
    }
});
