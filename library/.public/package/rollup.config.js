const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const tsPlugin = () => typescript({ tsconfig: './tsconfig.build.json' });

// @dna-platform/chemistry is the engine lib is built on — a peer runtime, kept
// external so lib does not carry a copy of it.
const externalDeps = ['react', 'react-dom', 'react/jsx-runtime', '@dna-platform/chemistry'];

module.exports = [
    // @dna-platform/lib — the base classes a dependent library instantiates against.
    {
        input: 'src/index.ts',
        output: [
            { file: 'dist/lib.js',  format: 'es',  sourcemap: true },
            { file: 'dist/lib.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/lib.d.ts', format: 'es' },
        plugins: [dts()]
    }
];
