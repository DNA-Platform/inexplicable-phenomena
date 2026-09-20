import { defineConfig } from 'vitest/config';

// THE BINDER'S OWN SUITE, run WITHOUT the binder's plugins.
//
// Doug, 2026-09-18: ".binder should ship with a test suite of its components."
//
// IT DOES NOT LOAD `vite.config.ts`, and that is the whole point of the file existing. Those plugins
// hold the LIBRARY to its specification at `buildStart` — which is right for a build and absurd for a
// unit suite: the parser's promises do not depend on Doug's library being well-formed, and running
// them through a compiler that refuses to start unless it is means a broken library hides every
// broken component. Measured the day it was written: a suite for the language could not run because
// a table of contents three folders away was missing a chapter.
//
// THREE PROJECTS, BECAUSE THEY ARE THREE KINDS OF TEST. Doug, 2026-09-19: "don't confuse unit /
// regression / performance." A unit test is a promise about a component and runs in milliseconds; a
// regression test binds the test library end to end and reads the pages back; a performance test
// duplicates that library and reports what the compiler costs over it. `npm test` is the first;
// the other two are their own scripts, because a suite that takes a minute stops being run.
export default defineConfig({
    test: {
        // AND NEVER A STAGED COPY. A regression or performance test stands the test library up under
        // `.test/.staged/` with a copy of this binder beside it, suites and all; a project that
        // walked into one would run every promise twice and the second time against a copy.
        projects: [
            { test: { name: 'unit', include: ['**/*.test.ts'], exclude: ['node_modules/**', 'application/**', '.test/.staged/**'] } },
            { test: { name: 'regression', include: ['.test/*.regression.ts'], testTimeout: 600000, hookTimeout: 60000 } },
            { test: { name: 'performance', include: ['.test/*.performance.ts'], testTimeout: 600000, hookTimeout: 60000 } },
        ],
    },
});
