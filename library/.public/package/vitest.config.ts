const path = require('path');

// ONE PROJECT, ONE FOLDER, ONE DOOR. v1 is deleted — source and promises both —
// on Doug's ruling, 2026-09-07: "Kill v1, move tests out to .tests, kill .archive".
// It is recoverable from git history and nothing here knows about it any more.
//
// The promises read the package by its PUBLISHED NAME, against dist, the way a
// consumer does — so rollup owns the module graph and the cycles it has already
// resolved stay resolved. There is no `@` alias on purpose: reaching into src put
// vite's dev module runner in charge of an evaluation order the ES module spec
// fixes, which is why a kind could not live in its own file until this changed.

const shared = {
    globals: true,
    environment: 'happy-dom',
    deps: { inline: [/chemistry/] }
};

const esbuild = { target: 'node14', jsx: 'automatic' };
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

const src = {
    test: { ...shared, name: 'src', include: ['.tests/**/*.test.{ts,tsx}'] },
    resolve: { extensions, alias: {
        // THROUGH THE FRONT DOOR, AGAINST dist. A promise reads the package by its
        // published name, the way a consumer does, so rollup owns the module graph
        // and the cycles it has already resolved stay resolved. Reaching into src
        // put vite's dev module runner in charge of an evaluation order the ES module
        // spec fixes and no bundler is asked to fix there — which is why a kind could
        // not live in its own file until this changed. There is no `@` here on purpose.
        '@dna-platform/public/encyclopedia': path.resolve(__dirname, './dist/encyclopedia.js'),
        '@dna-platform/public': path.resolve(__dirname, './dist/lib.js')
    } },
    esbuild
};

module.exports = { test: { projects: [src] } };
