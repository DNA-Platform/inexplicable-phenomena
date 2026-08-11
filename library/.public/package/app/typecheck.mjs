// The app's typecheck gate.
//
// `cd app && tsc --noEmit` exits 0 having typechecked ZERO files, which is how a
// live crash shipped for five sprints. The project form typechecks 46 and finds
// real errors. This runs the project form and reports the number WITH ITS SCOPE.
//
// The debt is baselined BY IDENTITY, not by count: a baseline policed by a number
// is a place a fifth error hides. A new error fails. A swap — one fixed, one
// introduced — fails. Fixing a baselined one fails until the baseline is updated,
// and that is the point.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const project = resolve(here, 'tsconfig.json');

// Known type debt, carried deliberately. Types is a sprint of its own.
// Each entry is `file(line,col): code` normalised — position-free, so a
// harmless line shift does not read as a new error.
const baseline = [
    'src/sections/book/library/the-team/06-the-decision.tsx TS2322',
    'src/sections/book/library/the-team/card.tsx TS2551',
    'src/sections/book/library/the-team/card.tsx TS2551',
    'src/sections/book/library/the-team/card.tsx TS2551',
];

const run = (args) => {
    try {
        return execFileSync('npx', args, { cwd: here, encoding: 'utf-8', shell: true });
    } catch (e) {
        return `${e.stdout ?? ''}${e.stderr ?? ''}`;
    }
};

const out = run(['tsc', '-p', project, '--noEmit', '--pretty', 'false']);
const files = run(['tsc', '-p', project, '--noEmit', '--listFilesOnly'])
    .split('\n')
    .filter(l => l.includes('app') && /\.tsx?$/.test(l.trim())).length;

const found = out
    .split('\n')
    .map(l => l.match(/^(.+?)\((\d+),(\d+)\): error (TS\d+)/))
    .filter(Boolean)
    .map(m => `${m[1].replace(/\\/g, '/').replace(/^.*?app\//, '')} ${m[4]}`);

const remaining = [...baseline];
const unexpected = [];
for (const e of found) {
    const at = remaining.indexOf(e);
    if (at === -1) unexpected.push(e);
    else remaining.splice(at, 1);
}

const named = '$LibraryCard·$IndexCard<$Referent$>; 3× $-backed access on computed type';
console.log(
    `app tsc (app/tsconfig.json): ${files} files typechecked — ` +
    `${baseline.length - remaining.length}/${baseline.length} baselined type-debt errors [${named}], ` +
    `${unexpected.length} unexpected.`
);

if (unexpected.length) {
    console.log('\nUNEXPECTED — not in the baseline:');
    for (const e of unexpected) console.log(`  ${e}`);
}
if (remaining.length) {
    console.log('\nBASELINED BUT NO LONGER PRESENT — fixed? then remove it from the baseline:');
    for (const e of remaining) console.log(`  ${e}`);
}

const pass = unexpected.length === 0 && remaining.length === 0;
console.log(pass ? 'PASS.' : 'FAIL.');
process.exit(pass ? 0 : 1);
