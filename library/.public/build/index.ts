import { join } from 'node:path';
import { walk } from './stages/walk.ts';
import { refer } from './stages/refer.ts';
import { resolve } from './stages/resolve.ts';
import { emit } from './stages/emit.ts';
import { spawnSync } from 'node:child_process';
import { read as cardsOf, cards as catalogue, books } from './stages/catalogue.ts';
import { root } from './utilities/where.ts';

// THE COMPILER, one command. Reading, resolving, emitting — and checking, which
// runs the program it just made and is invoked by the app that holds it.
//
//   npx tsx index.ts ../../.test-library
//   npx tsx index.ts ../../.test-library --into <somewhere else>

const at = process.argv[2];
const flag = process.argv.indexOf('--into');
if (!at) {
    console.error('index.ts <library-folder> [--into <target>]');
    process.exit(1);
}

const workspace = root();
const into = flag === -1 ? join(workspace, 'library/.public/app/src/library') : process.argv[flag + 1];

const read = refer(walk(at, workspace));
console.log(`READ      ${read.entries.length} folders · ${read.entries.reduce((n, e) => n + e.files.length, 0)} files · ${read.entries.reduce((n, e) => n + e.references.length, 0)} references · ${read.complaints.length} complaints`);

const resolved = resolve(read);
const links = resolved.books.reduce((n, b) => n + [b.subject, b.author, b.canonical].filter(Boolean).length, 0);
const invalid = resolved.complaints.length - read.complaints.length;
console.log(`RESOLVE   ${resolved.books.length} books · ${links} links · ${invalid} invalid`);

for (const complaint of resolved.complaints) console.error(`  INVALID ${complaint.at} — ${complaint.says}`);
if (resolved.complaints.length) process.exit(1);

// EMITTING RUNS TWICE, and the reason is a real ordering rather than a hedge.
// Cards are READ OFF LIVING BOOKS — a title split at its colon, a summary, the
// chapters' own titles — so the books have to be built before the catalogue can
// be written, and the covers cannot carry their cards until the catalogue is
// there to import them from. First pass builds the books; second wires them.
emit(resolved, into);
// The books are IMPORTED to be asked, so they have to sit where their own
// imports resolve. A target outside the workspace cannot reach the package, and
// that is stated rather than degraded into a compile with no catalogue.
const named = await cardsOf(resolved, into).catch((error: Error) => {
    console.error(`  CANNOT READ THE CARDS — the emitted books could not be opened at ${into}.`);
    console.error(`  A card is read off a living book, so the target must sit where @dna-platform/lib resolves.`);
    console.error(`  ${error.message.split('\n')[0]}`);
    process.exit(1);
});
const cards = new Map(named.map(n => [n.book.path, n.as]));
const written = emit(resolved, into, cards, { 'cards.tsx': catalogue(named), 'books.tsx': books(named) });

console.log(`EMIT      ${written.carried} carried · ${written.generated} generated · ${named.length} cards · → ${into}${written.removed.length ? ` · ${written.removed.length} removed` : ''}`);
for (const gone of written.removed) console.log(`            removed ${gone} — nothing in the corpus writes it`);

const loose = named.filter(n => !n.title || !n.synopsis);
if (loose.length) for (const n of loose) console.error(`  THIN CARD ${n.book.route} — ${!n.title ? 'no title' : 'no synopsis'}`);

// CHECKING, IN ITS OWN PROCESS. This one imported every book to read its cards
// and then rewrote those same files to carry them, so its module cache holds
// the pass-one copies — and a validator running here would judge writing that
// is no longer on disk. The program is checked by something that did not write
// it, which is the whole reason this is a spawn and not a call.
const check = spawnSync(process.execPath, [...process.execArgv, join(import.meta.dirname, 'commands', 'check.ts'), at, into], { stdio: 'inherit' });
if (check.status !== 0) process.exit(check.status ?? 1);
