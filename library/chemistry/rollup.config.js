const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const tsPlugin = () => typescript({ tsconfig: './tsconfig.build.json' });
const externalDeps = ['react', 'react-dom', 'react/jsx-runtime'];

module.exports = [
    // Audience 2 — component developers (root entry: @dna-platform/chemistry)
    {
        input: 'src/index.ts',
        output: [
            { file: 'dist/chemistry.js',  format: 'es',  sourcemap: true },
            { file: 'dist/chemistry.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/chemistry.d.ts', format: 'es' },
        plugins: [dts()]
    },
    // Audience 1 — framework developers (@dna-platform/chemistry/symbolic)
    {
        input: 'src/symbolic.ts',
        output: [
            { file: 'dist/symbolic.js',  format: 'es',  sourcemap: true },
            { file: 'dist/symbolic.cjs', format: 'cjs', sourcemap: true }
        ],
        plugins: [tsPlugin()],
        external: externalDeps
    },
    {
        input: 'src/symbolic.ts',
        output: { file: 'dist/symbolic.d.ts', format: 'es' },
        plugins: [dts()]
    }
];
