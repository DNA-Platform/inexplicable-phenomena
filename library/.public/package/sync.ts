// ONE DEMO, TWO TREES. Every demo exists twice — `<demo>/` beside the package and `<demo>/.public/`
// which is what vite actually serves — and until now both copies were edited by hand. They had
// already drifted: `.latex/aaronson/book.tsx` named its imports chapter1..chapter3 in one copy and
// introduction/formalIndependence/conclusion in the other.
//
// THE SERVED COPY IS THE SOURCE. It is the one on screen, so an edit there is visible immediately;
// the other is what `tsc -p <demo>/tsconfig.json` reads. Direction is a flag because Doug's end
// state is to work in `.public` and compile inward, and the interim he offered is the reverse.
//
//   npx tsx sync.ts            copy .public -> package, report every file written
//   npx tsx sync.ts --outward  the other way
//   npx tsx sync.ts --check    write nothing; list what differs and exit 1 if any does
//
// ONLY WHAT EXISTS IN BOTH TREES IS SYNCED, so the app shell (index.html, main.tsx, vite.config.ts,
// build.mjs) stays in `.public` and the tsconfig stays beside the package. That rule needs no list
// of exceptions to maintain, which is the reason it is the rule.
import { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const outward = process.argv.includes('--outward');
const checking = process.argv.includes('--check');
const demos = readdirSync('.', { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('.') && existsSync(join(entry.name, '.public')))
    .map(entry => entry.name);

let differed = 0;
let written = 0;

// THE TREES MEET AT DIRECTORIES, NOT AT FILES. It was file-by-file, so a NEW chapter written on
// one side never reached the other and the build failed on nine missing modules — a mirror that
// cannot add is not a mirror. A directory present in both is mirrored WHOLE: files are created,
// overwritten and removed. A directory present in only one is the app's or the package's own
// (index.html, main.tsx, vite.config.ts on one side, tsconfig.json on the other) and is left alone,
// which is still the rule that needs no list of exceptions.
const walk = (shared: string, published: string, top = false) => {
    const [from, to] = outward ? [shared, published] : [published, shared];
    for (const entry of readdirSync(from, { withFileTypes: true })) {
        const here = join(from, entry.name);
        const there = join(to, entry.name);
        // THE DEMO'S OWN ROOT IS NOT MIRRORED, only the folders inside it: `.public` holds the app
        // shell (index.html, main.tsx, vite.config.ts, build.mjs) and the package side holds the
        // tsconfig, and neither belongs to the other. Mirroring them copied the shell inward and
        // DELETED both tsconfigs on the first run.
        if (top && !entry.isDirectory()) continue;
        if (entry.isDirectory()) {
            if (!existsSync(join(shared, entry.name)) || !existsSync(join(published, entry.name))) continue;
            walk(join(shared, entry.name), join(published, entry.name));
            continue;
        }
        const source = readFileSync(here, 'utf8');
        if (existsSync(there) && readFileSync(there, 'utf8') === source) continue;
        differed += 1;
        console.log(`${checking ? 'DIFFERS' : 'written'}  ${there}`);
        if (!checking) { writeFileSync(there, source); written += 1; }
    }
    for (const entry of readdirSync(to, { withFileTypes: true })) {
        if (top || entry.isDirectory() || existsSync(join(from, entry.name))) continue;
        differed += 1;
        console.log(`${checking ? 'EXTRA  ' : 'removed'}  ${join(to, entry.name)}`);
        if (!checking) { unlinkSync(join(to, entry.name)); written += 1; }
    }
};

for (const demo of demos) walk(demo, join(demo, '.public'), true);

console.log(checking
    ? `${differed} file${differed === 1 ? '' : 's'} differ across ${demos.length} demos: ${demos.join(', ')}`
    : `${written} file${written === 1 ? '' : 's'} synced ${outward ? 'outward to .public' : 'inward from .public'} across ${demos.join(', ')}`);
if (checking && differed > 0) process.exit(1);
