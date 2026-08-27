const path = require('path');

// TWO VERSIONS, TWO PROJECTS, ONE COMMAND. `archive/` is v1 — the library that
// still ships — and `src/` is v2. They cannot share a config because they cannot
// share the `@` alias, and a suite that does not state which source it ran
// against is a number without its scope.
const shared = {
    globals: true,
    environment: 'happy-dom',
    deps: { inline: [/chemistry/] }
};

const esbuild = { target: 'node14', jsx: 'automatic' };
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

module.exports = {
    test: {
        projects: [
            {
                test: { ...shared, name: 'archive', include: ['tests/**/*.test.{ts,tsx}', 'app/src/**/*.test.{ts,tsx}'] },
                resolve: { extensions, alias: { '@': path.resolve(__dirname, './archive') } },
                esbuild
            },
            {
                test: { ...shared, name: 'src', include: ['src/**/*.test.{ts,tsx}'] },
                resolve: { extensions, alias: { '@': path.resolve(__dirname, './src') } },
                esbuild
            }
        ]
    }
};
