import { realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from '../configuration/configuration';
import { bring, describe, kept, origin } from './origin';

// A COPY SYNCS FROM THE ORIGIN ITS .pubconfig NAMES, and from nowhere else. A .binding that
// names none is a master, and nothing syncs into a master.
const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const configured = configure(here).manifest.origin;
if (configured === undefined) {
    console.log('this .binding names no origin in .pubconfig — it is a master, and nothing syncs into a master');
    process.exit(0);
}

const from = origin(here, configured);
if (from.kind !== 'github' && realpathSync(from.at) === realpathSync(here)) {
    console.log('.pubconfig names this .binding as its own origin — nothing to sync');
    process.exit(0);
}

const { written, current } = await bring(from, here, kept);
for (const path of written) console.log(`synced  ${path}`);
console.log(`${written.length} file${written.length === 1 ? '' : 's'} synced from ${describe(from)} · ${current} current · kept: ${[...kept].join(', ')}`);
