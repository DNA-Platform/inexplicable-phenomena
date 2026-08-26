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
    babel: { plugins: [['@babel/plugin-proposal-decorators', { version: 'legacy' }]] },
});

export default defineConfig({
    plugins: [decorators()],
    root: __dirname,
    // THE PORT IS DECLARED, because the drivers already expect it and nothing
    // else made them agree. Vite defaults to 5173, `verify-demo.mjs` and
    // `verify-book.mjs` default to 5199, and every document in the library says
    // 5199 — so the two met only when a person remembered a flag, and a driver
    // that cannot connect stalls rather than saying so.
    server: { port: 5199, strictPort: true },
    preview: { port: 5199, strictPort: true },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    // A BOND CONSTRUCTOR IS FOUND BY THE CLASS'S NAME — $Book declares a method
    // called $Book — so a minifier that renames the class makes the constructor
    // unreachable and every chemical comes back undefined with nothing thrown.
    // The sibling application has carried this line for a sprint; this one did
    // not, and nothing ships the demonstration, so nobody found out: built and
    // served, its landing page threw on the first card it tried to read.
    esbuild: { keepNames: true },
});
