import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// A ROUTE IS A FOLDER PATH AND PAGES SERVES FILES, so every route but the root
// is a path with no file behind it. Pages answers those with 404.html, and the
// application reads the path it was asked for — so the same document standing
// at both names is what makes a deep link work at all. Without this, following
// a card in a fresh tab is a 404 on the open web and correct locally.
const deepLinks = () => ({
    name: 'pages-deep-links',
    closeBundle() {
        const index = join(__dirname, 'dist', 'index.html');
        if (existsSync(index)) copyFileSync(index, join(__dirname, 'dist', '404.html'));
    },
});

// The public view onto the repository — built to GitHub Pages. It depends on
// @dna-platform/lib (the library core, in ./package) to render the library.
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
    plugins: [decorators(), deepLinks()],
    // THE DOMAIN IS THE LIBRARY. Its top book's subject is itself, so it sits at
    // the root and its subjects are the folders below it. A project Pages site
    // cannot serve at a root, so the deploy sets PUBLIC_BASE to the repository
    // name until a domain is pointed here; nothing else in the tree knows.
    base: process.env.PUBLIC_BASE ?? '/',
    // DECLARED, so `npm run dev` and `npm test` meet without a flag — verify-library.mjs
    // already expects this port and vite was serving 5173.
    server: { port: 5299, strictPort: true },
    preview: { port: 5299, strictPort: true },
    // A BOND CONSTRUCTOR IS FOUND BY THE CLASS'S NAME — $Book declares a method
    // called $Book — so a minifier that renames the class makes the constructor
    // unreachable, and every chemical comes back undefined with nothing thrown.
    // Names are structural here rather than cosmetic.
    esbuild: {
        keepNames: true,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
