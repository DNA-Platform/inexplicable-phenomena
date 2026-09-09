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
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const outward = process.argv.includes('--outward');
const checking = process.argv.includes('--check');
const demos = readdirSync('.', { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('.') && existsSync(join(entry.name, '.public')))
    .map(entry => entry.name);

let differed = 0;
let written = 0;

const walk = (shared: string, published: string) => {
    const [from, to] = outward ? [shared, published] : [published, shared];
    for (const entry of readdirSync(from, { withFileTypes: true })) {
        const here = join(from, entry.name);
        const there = join(to, entry.name);
        // The two trees meet only where they already agree on what exists.
        if (!existsSync(there) && !existsSync(join(outward ? published : shared, entry.name))) continue;
        if (entry.isDirectory()) {
            if (!existsSync(there)) { if (!checking) mkdirSync(there); else continue; }
            walk(outward ? here : there, outward ? there : here);
            continue;
        }
        const source = readFileSync(here, 'utf8');
        if (existsSync(there) && readFileSync(there, 'utf8') === source) continue;
        differed += 1;
        console.log(`${checking ? 'DIFFERS' : 'written'}  ${there}`);
        if (!checking) { writeFileSync(there, source); written += 1; }
    }
};

for (const demo of demos) walk(demo, join(demo, '.public'));

console.log(checking
    ? `${differed} file${differed === 1 ? '' : 's'} differ across ${demos.length} demos: ${demos.join(', ')}`
    : `${written} file${written === 1 ? '' : 's'} synced ${outward ? 'outward to .public' : 'inward from .public'} across ${demos.join(', ')}`);
if (checking && differed > 0) process.exit(1);
