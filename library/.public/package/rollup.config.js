const path = require('path');
const { existsSync } = require('fs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const tsPlugin = () => typescript({ tsconfig: './tsconfig.build.json' });

// TRANSPILE WITHOUT CHECKING, for the test loop only. @rollup/plugin-typescript type-checks the
// whole program while it emits, and `npm run typecheck` already does that — so the check was being
// paid twice and the second time on every test run. Measured 2026-09-10: the quick build was 60s
// with it. The shipped build keeps tsc; only --environment QUICK reaches this.
const esbuild = require('esbuild');
const reached = (base) => {
    for (const ext of ['.tsx', '.ts', '/index.tsx', '/index.ts'])
        if (existsSync(base + ext)) return base + ext;
    return null;
};

// EXTENSIONLESS RELATIVE IMPORTS, which @rollup/plugin-typescript resolved and esbuild does not —
// esbuild TRANSFORMS a file and never looks at the graph. Quick builds only.
const extended = () => ({
    name: 'extended',
    resolveId(source, importer) {
        if (!source.startsWith('.') || importer === undefined) return null;
        return reached(path.resolve(path.dirname(importer), source));
    }
});

const transpiled = () => ({
    name: 'transpiled',
    async transform(source, id) {
        if (!/\.tsx?$/u.test(id)) return null;
        const done = await esbuild.transform(source, {
            loader: id.endsWith('.tsx') ? 'tsx' : 'ts',
            jsx: 'automatic',
            target: 'es2020',
            sourcemap: true,
            tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } }
        });
        return { code: done.code, map: done.map };
    }
});

// `@/` is how src reaches itself. tsc reads it from tsconfig paths; rollup does
// not, and would resolve nothing without being told — so the one rule lives here
// rather than as a dependency.
const at = () => ({
    name: 'at-src',
    resolveId(source) {
        if (!source.startsWith('@/')) return null;
        return reached(path.resolve(__dirname, 'src', source.slice(2)));
    }
});

// @dna-platform/chemistry is the engine lib is built on — a peer runtime, kept
// external so lib does not carry a copy of it. react-router-dom is the same:
// a second copy is a second context, and a reference would route through the
// one nobody is rendering.
// THE TWO CYCLES THAT ARE KNOWN AND HELD. Both are runtime cycles — each side
// asks `instanceof` against the other — so a type-only import cannot break them,
// and tests/loading.test.tsx proves at runtime that neither leaves a class
// extending a half-built base. They are named here so a THIRD one FAILS the
// build rather than joining a list of warnings nobody reads.
const knownCycles = [
    'src/writing/Composition.tsx -> src/reference/Catalogue.tsx -> src/writing/Composition.tsx',
    'src/library/Title.tsx -> src/library/Cover.tsx -> src/library/Title.tsx'
];

const named = warning => (warning.ids || [])
    .map(id => path.relative(__dirname, id).split(path.sep).join('/'))
    .join(' -> ');

const onwarn = (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
        const cycle = named(warning);
        if (knownCycles.includes(cycle)) return;
        throw new Error('A MODULE CYCLE THAT IS NOT DECLARED: ' + (cycle || warning.message)
            + ' — break it, or name it in knownCycles with the reason it cannot be broken.');
    }
    warn(warning);
};

const externalDeps = ['react', 'react-dom', 'react/jsx-runtime', '@dna-platform/chemistry', 'react-router-dom', 'styled-components', 'katex', 'marked'];

// THE TEST LOOP DOES NOT NEED TYPES OR CJS. Six separate .d.ts rollups each run a full type
// program, and the suite imports none of them — vitest.config.ts aliases exactly dist/lib.js and
// dist/encyclopedia.js, both ES. `rollup -c --environment QUICK` emits the ES doors and stops.
const quick = process.env.QUICK !== undefined;

const doors = {
    lib: 'src/index.ts',
    library: 'src/library.ts',
    article: 'src/article.ts',
    markdown: 'src/markdown.ts',
    encyclopedia: 'src/encyclopedia.ts',
    utilities: 'src/utilities.ts'
};

const module_ = { dir: 'dist', format: 'es', entryFileNames: '[name].js', chunkFileNames: 'chunks/[name]-[hash].js', sourcemap: true };
const common = { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs', chunkFileNames: 'chunks/[name]-[hash].cjs', sourcemap: true };

// ONE BUILD, SIX DOORS. The surfaces were separate builds, and a separate build DEFINES ITS OWN
// COPY of everything it reaches — $BodyFormat, $ContentFormat and $Theme each stood twice, once in
// lib and once in encyclopedia, with encyclopedia importing nothing from lib. DI keys on the
// component object, so a demo registering encyclopedia's copy could never match the one $Book
// fetched from lib's: the registration was silently dead and the portal drew in the wrong dress.
// Code splitting is the fix — the shared modules are emitted ONCE into a chunk and every door
// imports it, which keeps the surfaces apart without letting a class stand twice.
const code = {
    input: doors,
    output: quick ? [module_] : [module_, common],
    plugins: quick ? [at(), extended(), transpiled()] : [at(), tsPlugin()],
    external: externalDeps,
    onwarn
};

const typed = (door, name) => ({
    input: door,
    output: { file: `dist/${name}.d.ts`, format: 'es' },
    plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })],
    onwarn
});

module.exports = quick ? [code] : [
    code,
    typed('src/index.ts', 'lib'),
    typed('src/library.ts', 'library'),
    typed('src/article.ts', 'article'),
    typed('src/markdown.ts', 'markdown'),
    typed('src/encyclopedia.ts', 'encyclopedia'),
    typed('src/utilities.ts', 'utilities')
];
