import { pathToFileURL } from 'node:url';
import { walk } from './walk.ts';
import { read } from './read.ts';
import { resolve } from './resolve.ts';

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('dump.ts <corpus>');
        process.exit(1);
    }
    const library = resolve(read(walk(at)));

    console.log(`LIBRARY ${library.root}\n`);
    for (const e of library.entries) {
        const depth = e.path.split('/').length - 1;
        const lead = '  '.repeat(depth);
        console.log(`${lead}${(e.route + '  ').padEnd(34)}${e.path}`);
        if (e.holds.length) console.log(`${lead}    holds  ${e.holds.join(', ')}`);
        for (const f of e.files) console.log(`${lead}    ${f.name.padEnd(20)}${f.role.padEnd(10)}${f.declares || '—'}`);
    }

    console.log('\nBOOKS\n');
    for (const b of library.books) {
        console.log(b.route);
        console.log(`    cover     ${b.cover.name.padEnd(16)}${b.cover.declares || '—'}`);
        console.log(`    synopsis  ${b.synopsis.name.padEnd(16)}${b.synopsis.declares || '—'}`);
        console.log(`    chapters  ${b.chapters.map(c => `${c.name} → ${c.declares || '—'}`).join('  ·  ') || '—'}`);
    }

    const files = library.entries.reduce((n, e) => n + e.files.length, 0);
    console.log(`\n${library.entries.length} folders · ${files} files · ${library.books.length} books · ${library.diagnostics.length} diagnostics`);
    for (const d of library.diagnostics) console.log(`  ${d.at} — ${d.says}`);
}
