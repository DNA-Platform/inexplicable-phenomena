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
export default defineConfig({
    plugins: [react(), deepLinks()],
    base: '/inexplicable-phenomena/',
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
