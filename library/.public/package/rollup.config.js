const path = require('path');
const { existsSync } = require('fs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const tsPlugin = () => typescript({ tsconfig: './tsconfig.build.json' });

// `@/` is how src reaches itself. tsc reads it from tsconfig paths; rollup does
// not, and would resolve nothing without being told — so the one rule lives here
// rather than as a dependency.
const at = () => ({
    name: 'at-src',
    resolveId(source) {
        if (!source.startsWith('@/')) return null;
        const base = path.resolve(__dirname, 'src', source.slice(2));
        for (const ext of ['.tsx', '.ts', '/index.tsx', '/index.ts']) {
            if (existsSync(base + ext)) return base + ext;
        }
        return null;
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
    'src/writing/Composition.tsx -> src/reference/Catalogue.tsx -> src/writing/Composition.tsx'
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

module.exports = [
    // ONE BUILD, THREE DOORS. The three surfaces were three separate builds, and a
    // separate build DEFINES ITS OWN COPY of everything it reaches — $BodyFormat,
    // $ContentFormat and $Theme each stood twice, once in lib and once in
    // encyclopedia, with encyclopedia importing nothing from lib. DI keys on the
    // component object, so a demo registering encyclopedia's copy could never match
    // the one $Book fetched from lib's: the registration was silently dead and the
    // portal drew in the wrong dress. Code splitting is the fix — the shared modules
    // are emitted ONCE into a chunk and every door imports it, which keeps the
    // surfaces apart without letting a class stand twice.
    {
        input: {
            lib: 'src/index.ts',
            encyclopedia: 'src/encyclopedia/index.ts',
            utilities: 'src/utilities/index.ts'
        },
        output: [
            { dir: 'dist', format: 'es',  entryFileNames: '[name].js',  chunkFileNames: 'chunks/[name]-[hash].js',  sourcemap: true },
            { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs', chunkFileNames: 'chunks/[name]-[hash].cjs', sourcemap: true }
        ],
        plugins: [at(), tsPlugin()],
        external: externalDeps,
        onwarn
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/lib.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })],
        onwarn
    },
    {
        input: 'src/encyclopedia/index.ts',
        output: { file: 'dist/encyclopedia.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })],
        onwarn
    },
    {
        input: 'src/utilities/index.ts',
        output: { file: 'dist/utilities.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })],
        onwarn
    }
];
