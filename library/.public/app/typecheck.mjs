// The public app's typecheck gate.
//
// It reports the number WITH ITS SCOPE, never a bare PASS, because a gate that
// exits 0 having checked nothing is how a live crash shipped for five sprints.
//
// AND THE SCOPE IS THE POINT HERE MORE THAN ANYWHERE. Every cover and synopsis
// in this library begins with a dot, and no glob will ever match one — so the
// count below is only honest because the compiler ENTERS THROUGH THE GENERATED
// MODULE and follows its imports. If this number ever falls to the handful of
// undotted files, the door has been closed and half of every book is unchecked.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const project = resolve(here, 'tsconfig.json');

// No type debt is carried. When the first entry arrives it is baselined BY
// IDENTITY — `file TSxxxx` — never by a count, because a baseline policed by a
// number is a place the next error hides.
const baseline = [];

// THE SCOPE HAS A FLOOR, and it is the whole reason this file exists. A count
// that only gets reported is a count nobody checks: closing one door in the
// catalogue took this from 33 files to 28 and the gate still said PASS. Raising
// these is a deliberate edit; falling below them is a door that closed.
// LOWERED ONCE, DELIBERATELY, 2026-08-15: 33/25 → 32/24. The corpus stopped
// importing `symmetry--figures.tsx`, so entering through the module no longer
// reaches it — which is the finding rather than the inconvenience. A RESOURCE IS
// REACHED BY ITS FOLDER, NEVER BY THE IMPORT GRAPH: a chapter need not import
// the code that sits beside it, so anything that carries a library must add
// resources by computed path or leave them behind.
const expected = { files: 32, dotted: 24 };

const run = (args) => {
    try {
        return execFileSync('npx', args, { cwd: here, encoding: 'utf-8', shell: true });
    } catch (e) {
        return `${e.stdout ?? ''}${e.stderr ?? ''}`;
    }
};

const out = run(['tsc', '-p', project, '--noEmit', '--pretty', 'false']);
const seen = run(['tsc', '-p', project, '--noEmit', '--listFilesOnly'])
    .split('\n')
    .map(l => l.trim().replace(/\\/g, '/'))
    .filter(l => l.includes('/.public/app/src/') && /\.tsx?$/.test(l));

// Only the part BELOW src/ counts: the repository path itself runs through
// `.public`, so asking whether the whole string contains a dotted segment says
// yes for every file and the number means nothing.
const dotted = seen.filter(l => (l.split('/.public/app/src/')[1] ?? '').split('/').some(part => part.startsWith('.'))).length;

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

console.log(
    `public app tsc (app/tsconfig.json): ${seen.length} files typechecked — ` +
    `${dotted} of them dot-prefixed and reached only through the module, ` +
    `${baseline.length - remaining.length}/${baseline.length} baselined, ` +
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
const shrank = seen.length < expected.files || dotted < expected.dotted;
if (shrank) {
    console.log(
        `\nSCOPE FELL BELOW ITS FLOOR — expected at least ${expected.files} files and ${expected.dotted} dotted, ` +
        `reached ${seen.length} and ${dotted}. A door into the library closed, and the errors it would have found were not looked for.`
    );
}

const pass = unexpected.length === 0 && remaining.length === 0 && !shrank;
console.log(pass ? 'PASS.' : 'FAIL.');
process.exit(pass ? 0 : 1);
