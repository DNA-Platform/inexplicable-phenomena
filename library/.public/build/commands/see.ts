import { walk } from '../stages/walk.ts';
import { refer } from '../stages/refer.ts';
import { resolve } from '../stages/resolve.ts';
import { root } from '../utilities/where.ts';

// THE COMPILER HAS NO SCREEN. It has this: what the folders say, and what that
// turns out to mean. Reading first, then resolving, each printed as it stands.

const at = process.argv[2];
if (!at) {
    console.error('see.ts <library-folder>');
    process.exit(1);
}

const library = refer(walk(at, root()));

console.log('READING\n');
for (const e of library.entries) {
    const depth = e.path.split('/').length - 1;
    const refs = e.references.map(r => `${r.as}=${r.display}${r.book ? '→' + r.book : ''}`).join('  ');
    console.log(`${'  '.repeat(depth)}${(e.route + '  ').padEnd(34)}${e.path}  [${e.kind}]${refs ? '  ' + refs : ''}`);
}
console.log(`\n${library.entries.length} folders · ${library.entries.reduce((n, e) => n + e.files.length, 0)} files · ${library.entries.reduce((n, e) => n + e.references.length, 0)} references · ${library.complaints.length} complaints`);
for (const c of library.complaints) console.log(`  ${c.at} — ${c.says}`);

const resolved = resolve(library);

console.log('\nRESOLVING\n');
const mark = (from?: string) => (from === 'supplied' ? 'SUPPLIED' : from === 'unresolved' ? 'unresolved' : 'declared');
for (const b of resolved.books) {
    console.log(`${b.route}`);
    console.log(`    subject    ${(b.subject?.book || '—').padEnd(32)}${mark(b.subject?.from)}`);
    console.log(`    author     ${(b.author?.book || b.author?.display || '—').padEnd(32)}${mark(b.author?.from)}`);
    if (b.canonical) console.log(`    canonical  ${b.canonical.book.padEnd(32)}${mark(b.canonical.from)}`);
    if (b.entries.length) console.log(`    holds      ${b.entries.join(', ')}`);
}

const counted = (from: string) => resolved.books.filter(b => [b.subject, b.author, b.canonical].some(l => l?.from === from)).length;
console.log(`\n${resolved.books.length} books · ${counted('declared')} declaring · ${counted('supplied')} supplied · ${counted('unresolved')} standing for nobody · ${resolved.complaints.length - library.complaints.length} invalid`);
for (const c of resolved.complaints.slice(library.complaints.length)) console.log(`  ${c.at} — ${c.says}`);
