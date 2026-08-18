import { defineConfig } from 'vitest/config';

// THE COMPILER'S OWN PROMISES. Node, because nothing here draws — the compiler
// never opens a browser and neither does its suite.
//
// These are the unit rung. `verify-walk` and `verify-build` drive the whole
// pipeline against the real corpus; a failure there says the machine broke and
// not where. These say where.
export default defineConfig({
    test: {
        environment: 'node',
        include: ['tests/**/*.test.ts'],
    },
});
