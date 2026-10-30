import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bring, forward, kept } from './origin';

// THE FIRST COPY. Pointed at a library folder, the master makes .public there — the library's
// published face — and puts a copy of itself inside it as .binding, with a .pubconfig naming
// where the copy came from, so `npm run sync` in the copy knows its origin from then on. A master
// running from inside node_modules names itself by its package; one running from a checkout
// names itself by the path from the copy back to it — relative when the two share a folder,
// absolute when all they share is the drive.
const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const shared = (one: string, other: string): string => {
    const a = one.split(sep), b = other.split(sep);
    let n = 0;
    while (n < a.length && n < b.length && a[n] === b[n]) n += 1;
    return a.slice(0, n).join(sep) + sep;
};

const named = (into: string): string => {
    const parts = here.split(sep);
    const at = parts.lastIndexOf('node_modules');
    if (at >= 0) {
        const [scope, name] = parts.slice(at + 1);
        return scope.startsWith('@') ? `${scope}/${name}` : scope;
    }
    return shared(into, here) === parse(here).root ? forward(here) : forward(relative(into, here));
};

const asked = process.argv[2];
if (!asked) {
    console.error('copy needs a library folder: npm run copy -- <library>');
    process.exit(1);
}
const pointed = resolve(asked);
if (!existsSync(pointed)) {
    console.error(`${pointed} is not a folder`);
    process.exit(1);
}

// THE FACE, MADE INSIDE THE LIBRARY POINTED TO — by ruling the library holds the books and its face
// holds the binding and the built site. Doug, 2026-09-15: "it should have as many periods as is
// needed to be up top" — the FEWEST that put it above everything already standing there, found by
// asking rather than by counting, because a period is not the only thing that orders a name.
// Nothing reads the name afterwards: a face is known by the binding it holds, so this is the only
// place in the binder that spells one.
const standing = readdirSync(pointed);
let face = '.public';
while (!standing.every(one => face < one)) face = `.${face}`;
const site = join(pointed, face);
const into = join(site, '.binding');
if (existsSync(into) && readdirSync(into).length > 0) {
    console.error(`${into} already holds files — it is a copy, and a copy syncs: run npm run sync there`);
    process.exit(1);
}

// A FIRST COPY TAKES THE MANIFEST. `kept` is what a SYNC must not overwrite — a copy's own files,
// its dependencies among them — and a copy that does not exist yet has none of its own, so keeping
// the manifest back leaves it with no package.json and nothing to install from.
const keeping = new Set([...kept].filter(path => path !== 'package.json'));

mkdirSync(into, { recursive: true });
const { written } = await bring({ kind: 'local', at: here }, into, keeping);
const origin = named(into);
writeFileSync(join(into, '.pubconfig'), JSON.stringify({ manifest: { origin } }, null, 2) + '\n', 'utf8');
console.log(`${written.length} files copied into ${into}`);
console.log(`.pubconfig names the origin: ${origin}`);
console.log(`next: write a book in ${pointed} — a folder carrying a .book.tsx — then in ${into}: npm install && npm run build`);
