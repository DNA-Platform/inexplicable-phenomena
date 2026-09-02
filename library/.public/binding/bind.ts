import { pathToFileURL } from 'node:url';
import { config } from './config.ts';
import { walk } from './walk.ts';
import { read } from './read.ts';
import { resolve } from './resolve.ts';
import { emit } from './emit.ts';
import { catalogue } from './catalogue.ts';
import { specify } from './specify.ts';

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('bind.ts <corpus>');
        process.exit(1);
    }
    const bound = config(at);
    const walked = walk(bound.from);
    const library = resolve(read({ ...walked, entries: walked.entries.filter(entry => !`${walked.root}/${entry.path}/`.startsWith(bound.to + '/')) }));
    const files = library.entries.reduce((n, entry) => n + entry.files.length, 0);
    console.log(`READ ${library.entries.length} folders · ${files} files · ${library.books.length} books · ${library.diagnostics.length} diagnostics`);
    for (const one of library.diagnostics) console.error(`  INVALID ${one.at} — ${one.says}`);
    if (library.diagnostics.length) process.exit(1);
    const emitted = emit(library, bound.to, bound.package);
    console.log(`EMIT ${emitted.carried} carried · ${emitted.generated} generated · → ${bound.to}`);
    for (const gone of emitted.removed) console.log(`  removed ${gone} — nothing in the corpus writes it`);
    console.log(`CATALOGUE ${catalogue(library, bound.to)} cards`);
    const { stood, of, said } = specify(library, bound.to, bound.package);
    console.log(`SPECIFY ${stood}/${of} books stand`);
    for (const line of said) console.error(`  ${line}`);
    console.log(`BIND ${library.books.length} books · ${bound.from} → ${bound.to}`);
    process.exit(stood === of ? 0 : 1);
}
