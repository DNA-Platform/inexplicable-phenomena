import { join } from 'node:path';
import { walk } from '../stages/walk.ts';
import { refer } from '../stages/refer.ts';
import { resolve } from '../stages/resolve.ts';
import { validate } from '../stages/validate.ts';
import { root } from '../utilities/where.ts';

// CHECKING, as a command. The phase itself is validate.ts; this is the script
// that runs it, which is the folder's own convention — see.ts reports, the
// verify-* scripts gate, index.ts compiles, and none of them is also a module.
//
//   npx tsx check.ts ../../.test-library [emitted-folder]

const corpus = process.argv[2];
if (!corpus) {
    console.error('check.ts <library-folder> [emitted-folder]');
    process.exit(1);
}

const workspace = root();
const into = process.argv[3] ?? join(workspace, 'library/.public/app/src/library');

const checked = await validate(resolve(refer(walk(corpus, workspace))), into);
const { levels } = checked;

console.log(`CHECK     ${checked.stood}/${checked.verdicts.length} books stand · ${levels.chapters} chapters · ${levels.sections} sections · ${levels.paragraphs} paragraphs · ${levels.sentences} sentences · ${levels.words} words · ${levels.letters} letters`);

for (const verdict of checked.verdicts.filter(v => !v.stands)) {
    console.error(`  INVALID ${verdict.at}`);
    for (const says of verdict.says) console.error(`          ${says}`);
}

process.exit(checked.stood === checked.verdicts.length ? 0 : 1);
