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
const externalDeps = ['react', 'react-dom', 'react/jsx-runtime', '@dna-platform/chemistry', 'react-router-dom', 'styled-components', 'katex', 'marked'];

module.exports = [
    // @dna-platform/public — the base classes a dependent library instantiates against.
    {
        input: 'src/index.ts',
        output: [
            { file: 'dist/lib.js',  format: 'es',  sourcemap: true },
            { file: 'dist/lib.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [at(), tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/lib.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })]
    },
    // @dna-platform/public/encyclopedia — the Wikipedia default dress. Its own
    // surface because its words are the encyclopedia's, not the library's, and
    // a Table there is a different thing from a Table in the writing.
    {
        input: 'src/encyclopedia/index.ts',
        output: [
            { file: 'dist/encyclopedia.js',  format: 'es',  sourcemap: true },
            { file: 'dist/encyclopedia.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [at(), tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/encyclopedia/index.ts',
        output: { file: 'dist/encyclopedia.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })]
    },
    // @dna-platform/public/utilities — the machinery a consumer reaches for
    // deliberately rather than by opening the library.
    {
        input: 'src/utilities/index.ts',
        output: [
            { file: 'dist/utilities.js',  format: 'es',  sourcemap: true },
            { file: 'dist/utilities.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [at(), tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/utilities/index.ts',
        output: { file: 'dist/utilities.d.ts', format: 'es' },
        plugins: [at(), dts({ tsconfig: './tsconfig.build.json' })]
    }
];
