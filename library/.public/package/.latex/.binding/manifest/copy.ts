import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, parse, relative, resolve, sep } from 'node:path';
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
if (!existsSync(pointed) && basename(pointed) !== '.public') {
    console.error(`${pointed} is not a folder`);
    process.exit(1);
}

// WHERE THE FACE IS. A folder that already holds a book, or is named .public, is a library's
// published face and takes the binding directly — .latex and .wiki are faces. Any other folder
// is a library, and its face is a .public made inside it.
const face = basename(pointed) === '.public' || (existsSync(pointed) && readdirSync(pointed).some(name => existsSync(join(pointed, name, '.book.tsx'))));
const site = face ? pointed : join(pointed, '.public');
const into = join(site, '.binding');
if (existsSync(into) && readdirSync(into).length > 0) {
    console.error(`${into} already holds files — it is a copy, and a copy syncs: run npm run sync there`);
    process.exit(1);
}

mkdirSync(into, { recursive: true });
const { written } = await bring({ kind: 'local', at: here }, into, kept);
const origin = named(into);
writeFileSync(join(into, '.pubconfig'), JSON.stringify({ manifest: { origin } }, null, 2) + '\n', 'utf8');
console.log(`${written.length} files copied into ${into}`);
console.log(`.pubconfig names the origin: ${origin}`);
console.log(`next: write a book in ${site} — a folder carrying a .book.tsx — then in ${into}: npm install && npm run build`);
