import { join } from 'node:path';
import { walk } from './stages/walk.ts';
import { refer } from './stages/refer.ts';
import { resolve } from './stages/resolve.ts';
import { validate } from './stages/validate.ts';
import { root } from './utilities/where.ts';

// It sits at the root beside index.ts because that is what it is — a driver.
//

const corpus = process.argv[2];
if (!corpus) {
    console.error('verify.ts <library-folder> [emitted-folder]');
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
