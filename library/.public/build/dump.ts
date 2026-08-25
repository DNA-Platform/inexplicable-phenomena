import { walk } from './stages/walk.ts';
import { refer } from './stages/refer.ts';
import { resolve } from './stages/resolve.ts';
import { root } from './utilities/where.ts';
import type { Link } from './library.ts';

// THE COMPILER HAS NO SCREEN. It has this: a dump of the intermediate
// representation between passes — what the folders say, and what that turns out
// to mean. Reading first, then resolving, each printed as it stands.
//
// It was called `see`, and the name claimed a reader where there is a compiler.
// A dump is what a compiler calls this, and what it dumps is its own internals.
//
//   npx tsx dump.ts ../../.test-library

const at = process.argv[2];
if (!at) {
    console.error('dump.ts <library-folder>');
    process.exit(1);
}

const library = refer(walk(at, root()));

console.log('READING\n');
for (const e of library.entries) {
    const depth = e.path.split('/').length - 1;
    const refs = e.references.map(r => `${r.as}=${r.display}${r.book ? '→' + r.book : ''}`).join('  ');
    console.log(`${'  '.repeat(depth)}${(e.route + '  ').padEnd(34)}${e.path}  [${e.kind}]${refs ? '  ' + refs : ''}`);
}
console.log(`\n${library.entries.length} folders · ${library.entries.reduce((n, e) => n + e.files.length, 0)} files · ${library.entries.reduce((n, e) => n + e.references.length, 0)} references · ${library.diagnostics.length} diagnostics`);
for (const d of library.diagnostics) console.log(`  ${d.at} — ${d.says}`);

const resolved = resolve(library);

// WHAT A LINK CAN BE ASKED, and nothing more. This printed `declared` /
// `SUPPLIED` / `unresolved` off a `from` field the seam once carried and
// deliberately dropped — so every row said `declared` while the summary
// underneath said none of them did. A dump may only print what the shape holds.
const mark = (link?: Link): string => (!link ? '' : link.book ? 'points' : 'stands for a name');
const shown = (link?: Link): string => (!link ? '—' : link.book || JSON.stringify(link.display));

console.log('\nRESOLVING\n');
for (const b of resolved.books) {
    console.log(`${b.route}`);
    console.log(`    subject    ${shown(b.subject).padEnd(32)}${mark(b.subject)}`);
    console.log(`    author     ${shown(b.author).padEnd(32)}${mark(b.author)}`);
    if (b.canonical) console.log(`    canonical  ${shown(b.canonical).padEnd(32)}${mark(b.canonical)}`);
    if (b.entries.length) console.log(`    holds      ${b.entries.join(', ')}`);
}

const links = resolved.books.flatMap(b => [b.subject, b.author, b.canonical].filter((l): l is Link => l !== undefined));
const pointing = links.filter(l => l.book).length;
console.log(`\n${resolved.books.length} books · ${links.length} links · ${pointing} pointing · ${links.length - pointing} standing for a name · ${resolved.diagnostics.length - library.diagnostics.length} invalid`);
for (const d of resolved.diagnostics.slice(library.diagnostics.length)) console.log(`  ${d.at} — ${d.says}`);
