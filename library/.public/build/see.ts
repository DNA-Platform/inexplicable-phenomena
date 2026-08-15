import { walk } from './walk.ts';
import { refer } from './refer.ts';

const root = process.argv[2];
const library = refer(walk(root, 'c:/Source/dna-platform/inexplicable-phenomena'));
for (const e of library.entries) {
    const depth = e.path.split('/').length - 1;
    const refs = e.references.map(r => `${r.as}=${r.display}→${r.book}`).join('  ');
    console.log(`${'  '.repeat(depth)}${(e.route + '  ').padEnd(34)}${e.path}  [${e.kind}]${refs ? '  ' + refs : ''}`);
}
console.log(`\n${library.entries.length} folders · ${library.entries.reduce((n, e) => n + e.references.length, 0)} references · ${library.complaints.length} complaints`);
for (const c of library.complaints) console.log(`  ${c.at} — ${c.says}`);
