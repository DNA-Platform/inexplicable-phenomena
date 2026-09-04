import { defineConfig } from 'vitest/config';

export default defineConfig({
    cacheDir: "C:/Users/dougl/AppData/Local/Temp/binding",
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['specify.test.tsx'],
        deps: { inline: [/chemistry/] },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            "@dna-platform/public": "C:/Source/dna-platform/inexplicable-phenomena/library/.public/package/src/index.ts",
            '@': "C:/Source/dna-platform/inexplicable-phenomena/library/.public/package/src",
        },
    },
    esbuild: { target: 'node14', jsx: 'automatic' },
});
