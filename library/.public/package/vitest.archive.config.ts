// v1 ONLY, and nothing runs it by accident — `npm run test:archive`.
// Doug, 2026-08-30: "turn off v1! The tests are in archive. We will port them.
// But we don't need them to work." This config is how they stay runnable
// without being run: 32 files and 799 asserts, one command away, off by default.
module.exports = { test: { projects: [require('./vitest.config').archive] } };
