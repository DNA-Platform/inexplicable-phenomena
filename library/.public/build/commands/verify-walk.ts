import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { walk } from '../stages/walk.ts';
import { refer } from '../stages/refer.ts';
import { root } from '../utilities/where.ts';
import type { Library } from '../library.ts';

// THE WALK'S PROMISES. A gate that cannot fail is not evidence, so every check
// here is an assertion and a miss exits non-zero — and the report states its
// SCOPE, never a bare pass.

// THE WORKSPACE IS CLIMBED FOR, NEVER WRITTEN DOWN. This line was a literal
// absolute path — the defect filed as an artifact that only worked on the
// machine that made it. It was fixed in the report and missed here, so the gate
// that guards the walk was itself a claim about one computer.
const workspace = root();
const fixture = join(workspace, 'library/.test-library');

let reached = 0;
const failures: string[] = [];

const check = (says: string, held: boolean | undefined, saw = ''): void => {
    reached += 1;
    if (held) return;
    failures.push(`  ${reached}. ${says}${saw ? ` — saw ${saw}` : ''}`);
};

const of = (library: Library, path: string) => library.entries.find(e => e.path === path);
const complained = (library: Library, at: string, about: string) =>
    library.complaints.some(c => c.at === at && c.says.includes(about));

// --- a real library, read whole -------------------------------------------

const read = refer(walk(fixture, workspace));

check('the fixture describes without complaint', read.complaints.length === 0, String(read.complaints.length));
// MOVED 2026-08-17: the corpus gained `the-team`, the book that authors itself,
// so the walk describes nine folders where it described eight.
check('every folder is described, including those holding only folders', read.entries.length === 9, String(read.entries.length));
check('a plain folder at the library root is a BOOK, not a subject', of(read, 'the-team')?.kind === 'book', of(read, 'the-team')?.kind);

check('a dotted folder holding books is a subject', of(read, '.physics')?.kind === 'subject', of(read, '.physics')?.kind);
check('the folder wearing most dots speaks for its container', of(read, '.physics')?.own === '.physics/.subject', of(read, '.physics')?.own);
check('a folder that speaks for its container is a BOOK, not a subject', of(read, '.physics/.subject')?.kind === 'book', of(read, '.physics/.subject')?.kind);
check('a plain folder is a book', of(read, '.physics/gauge-theory')?.kind === 'book');
check('the library has one book of its own', of(read, '..the-library')?.kind === 'book');

const model = of(read, '.physics/the-standard-model');
check('a dotted file is named, not ranked — cover', model?.files.some(f => f.name === '.cover.tsx' && f.role === 'cover'));
check('a dotted file is named, not ranked — synopsis', model?.files.some(f => f.name === '.synopsis.tsx' && f.role === 'synopsis'));
check('a plain file is a chapter', model?.files.some(f => f.name === 'symmetry.tsx' && f.role === 'chapter'));
check('there is no resource role — a chapter here is already code, so the pattern has no second half',
    !model?.files.some(f => (f.role as string) === 'resource'));

// --- references: the alias is the name, the import is the link -------------

check('a reference resolves to the book its cover belongs to',
    model?.references.some(r => r.as === 'subject' && r.display === 'Physics' && r.book === '.physics/.subject'));
// A NAME IS A REFERENCE TOO, and this check used to say 2 because only imported
// references were read. A cover saying `<Author>The Team</Author>` has made a
// claim the resolver has to answer, so it is read and told apart by an empty
// target rather than by being skipped.
check('a subject names its author, its library and its canonical book',
    of(read, '.physics/.subject')?.references.length === 3, String(of(read, '.physics/.subject')?.references.length));
check('a reference written as a NAME carries no target',
    of(read, '.physics/.subject')?.references.some(r => r.as === 'author' && r.display === 'The Team' && r.book === ''));
check('every content file declares a name a book can compose',
    read.entries.every(e => e.files.every(f => f.declares !== '')));
check('a canonical points at a book its subject holds',
    of(read, '.physics/.subject')?.references.some(r => r.as === 'canonical' && r.book === '.physics/the-standard-model'));
check('prose that names nobody makes no reference', of(read, '.physics/gauge-theory')?.references.length === 0);

// --- the route, which is not the folder path ------------------------------

check('a route drops the dots, because they are an authoring mark',
    of(read, '.physics')?.route === '/physics', of(read, '.physics')?.route);
check('a subject and its own book share ONE address',
    of(read, '.physics')?.route === of(read, '.physics/.subject')?.route,
    `${of(read, '.physics')?.route} vs ${of(read, '.physics/.subject')?.route}`);
check('the library book is the root route', of(read, '..the-library')?.route === '/', of(read, '..the-library')?.route);
check('a book beneath a subject keeps its own segment',
    of(read, '.physics/the-standard-model')?.route === '/physics/the-standard-model',
    of(read, '.physics/the-standard-model')?.route);

// --- an arrangement that is wrong, in four ways at once --------------------

const bad = join(tmpdir(), 'walk-faults');
rmSync(bad, { recursive: true, force: true });
for (const at of ['.astronomy', '.chemistry/the-bond', '.geology/.subject', '.geology/.also-subject', 'nothing']) {
    mkdirSync(join(bad, at), { recursive: true });
}
writeFileSync(join(bad, '.chemistry/the-bond/valence.tsx'), 'export const x = 1;\n');
writeFileSync(join(bad, '.geology/.subject/.cover.tsx'), 'export const x = 1;\n');
writeFileSync(join(bad, '.geology/.also-subject/.cover.tsx'), 'export const x = 1;\n');

const faulty = refer(walk(bad, workspace));

check('a DOTTED folder holding nothing is INVALID as a subject, not excused as a book',
    complained(faulty, '.astronomy', 'marked a subject and holds nothing'));
check('and it is described as a subject, because a dot is a claim', of(faulty, '.astronomy')?.kind === 'subject', of(faulty, '.astronomy')?.kind);
check('a book with no cover is invalid', complained(faulty, '.chemistry/the-bond', 'no cover'));
check('a container with two claimants and no single speaker is invalid', complained(faulty, '.geology', 'no single folder speaks'));
check('the library itself is judged, not only its contents', complained(faulty, '.', 'speaks for the library'));
check('a folder holding nothing at all is invalid', complained(faulty, 'nothing', 'holds nothing at all'));
check('every fault is reported in ONE pass', faulty.complaints.length >= 5, String(faulty.complaints.length));

rmSync(bad, { recursive: true, force: true });

// --- the report states its scope ------------------------------------------

const files = read.entries.reduce((n, e) => n + e.files.length, 0);
const references = read.entries.reduce((n, e) => n + e.references.length, 0);

console.log(`walk (library/.test-library): ${read.entries.length} folders, ${files} files, ${references} references — ${reached} checks, ${failures.length} failed.`);
if (failures.length) {
    console.log(failures.join('\n'));
    console.log('FAIL.');
    process.exit(1);
}
console.log('PASS.');
