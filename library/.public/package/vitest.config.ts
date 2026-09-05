const path = require('path');

// ONE PROJECT RUNS. v2 in `src/` is the live library and is what `vitest run`
// executes. v1 in `.archive/` is OFF — Doug, 2026-08-30: "Don't optimize v1!!
// That's a waste. Optimize v2, but turn off v1. In fact, turn off v1! The tests
// are in archive. We will port them. But we don't need them to work."
//
// The v1 tests are not deleted and not lost: they are 32 files and 799 asserts
// sitting in `tests/` and `app/src/`, and the archive project below still knows
// how to run them. `npm run test:archive` runs it deliberately; nothing runs it
// by accident. When they are ported to v2 the project goes.
//
// A suite that does not state which source it ran against is a number without
// its scope, so the two can never share a config — they cannot share the `@`
// alias, and one alias is the whole difference between v1 and v2.
const shared = {
    globals: true,
    environment: 'happy-dom',
    deps: { inline: [/chemistry/] }
};

const esbuild = { target: 'node14', jsx: 'automatic' };
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

const archive = {
    test: { ...shared, name: 'archive', include: ['tests/**/*.test.{ts,tsx}', 'app/src/**/*.test.{ts,tsx}'] },
    resolve: { extensions, alias: { '@': path.resolve(__dirname, './.archive') } },
    esbuild
};

const src = {
    test: { ...shared, name: 'src', include: ['src/**/*.test.{ts,tsx}'] },
    resolve: { extensions, alias: {
        '@': path.resolve(__dirname, './src'),
        // THE BOOKS ARE IN THE SUITE. The four authored books import the package by
        // its published name; pointing that name at src is what lets a promise read
        // the real books rather than a reproduction of them.
        '@dna-platform/public': path.resolve(__dirname, './src')
    } },
    esbuild
};

module.exports = { test: { projects: [src] } };
module.exports.archive = archive;
