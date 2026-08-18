import { mkdtempSync, readFileSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { walk } from './walk.ts';
import { refer } from './refer.ts';
import { resolve } from './resolve.ts';
import { emit } from './emit.ts';
import { root } from './where.ts';
import type { Library } from './library.ts';

// THE GATE FOR RESOLVING AND EMITTING. It states its scope, it counts, and every
// claim below can go red — the ones that could not be broken were not written.

let failed = 0;
let ran = 0;
const check = (says: string, held: boolean, saw = ''): void => {
    ran++;
    if (!held) { failed++; console.log(`  ${ran}. ${says}${saw ? ` — saw ${saw}` : ''}`); }
};

const workspace = root();
const corpus = join(workspace, 'library/.test-library');
const read = refer(walk(corpus, workspace));
const resolved = resolve(read);
const at = (path: string) => resolved.books.find(b => b.path === path);

// --- what position answers, and what a cover answers ------------------------

check('a book with a silent cover is given the subject it sits in',
    at('.physics/gauge-theory')?.subject?.book === '.physics/.subject' && at('.physics/gauge-theory')?.subject?.from === 'supplied',
    String(at('.physics/gauge-theory')?.subject?.from));
// MOVED 2026-08-17, and the reason is that the corpus gained a book that authors
// itself. The library's own author used to be a bare name, so the supplied
// display was already prose; it is now an IMPORT ALIAS, and splitting it is
// emitting's job. The claim worth asserting is where the link points.
check('a book with a silent cover is given the library\'s own author',
    at('.physics/gauge-theory')?.author?.book === 'the-team' && at('.physics/gauge-theory')?.author?.from === 'supplied',
    at('.physics/gauge-theory')?.author?.book);
check('and that author is a book that authors ITSELF, which is what the rule requires',
    at('the-team')?.author?.book === 'the-team' && at('the-team')?.author?.from === 'declared',
    at('the-team')?.author?.book);
check('a declared subject keeps what its author wrote',
    at('.physics/the-standard-model')?.subject?.from === 'declared' && at('.physics/the-standard-model')?.subject?.book === '.physics/.subject');
check('an author naming nobody stands for nobody, and says so',
    at('.physics/.subject')?.author?.from === 'unresolved');

// --- which book speaks, and in what order -----------------------------------

check('a subject that declares a canonical keeps it',
    at('.physics/.subject')?.canonical?.book === '.physics/the-standard-model' && at('.physics/.subject')?.canonical?.from === 'declared');
check('a subject that declares none takes the shortest title',
    at('..the-library')?.canonical?.book === '.physics/.subject' && at('..the-library')?.canonical?.from === 'supplied',
    at('..the-library')?.canonical?.book);
check('the canonical stands first among the entries',
    at('.physics/.subject')?.entries[0] === '.physics/the-standard-model',
    at('.physics/.subject')?.entries[0]);
check('the rest stand alphabetically',
    at('.physics/.subject')?.entries.join() === '.physics/the-standard-model,.physics/gauge-theory',
    at('.physics/.subject')?.entries.join());
check('a book that catalogues nothing holds nothing',
    at('.physics/gauge-theory')?.entries.length === 0);
// MOVED 2026-08-17: the corpus gained `the-team`, a book at the library's top
// level, so the library holds three entries where it held two. The canonical is
// unchanged — /physics is still the shortest route — and it still stands first.
check('a subject holds the BOOKS of the subjects beneath it, never their folders',
    at('..the-library')?.entries.join() === '.physics/.subject,.philosophy/.subject,the-team',
    at('..the-library')?.entries.join());

// --- the one complaint, driven against a tree built to break ----------------

const broken: Library = JSON.parse(JSON.stringify(read));
const physics = broken.entries.find(e => e.path === '.physics/.subject')!;
physics.references = physics.references.map(r =>
    r.as === 'canonical' ? { ...r, book: '.philosophy/the-hard-problem', display: 'The Hard Problem' } : r);
const judged = resolve(broken);
check('a subject naming a book it does not hold is INVALID, and says which',
    judged.complaints.some(c => c.at === '.physics/.subject' && c.says.includes('does not hold it')),
    String(judged.complaints.length));

// --- emitting ---------------------------------------------------------------

const into = mkdtempSync(join(tmpdir(), 'emit-'));
const written = emit(resolved, into);

// MOVED 2026-08-17: three files added to the corpus — a cover, a synopsis and a
// chapter for the book that authors itself.
check('every authored file is carried', written.carried === 21, String(written.carried));
check('one module is generated per book', written.generated === 7, String(written.generated));

const carried = (p: string) => readFileSync(join(into, p), 'utf-8');
const authored = (p: string) => readFileSync(join(corpus, p), 'utf-8');

check('a chapter is carried byte for byte',
    carried('.physics/the-standard-model/symmetry.tsx') === authored('.physics/the-standard-model/symmetry.tsx'));
check('a synopsis is carried byte for byte',
    carried('..the-library/.synopsis.tsx') === authored('..the-library/.synopsis.tsx'));

check('a cover naming another book loses the import that named it',
    !carried('.physics/.subject/.cover.tsx').includes('from \'../../..the-library/.cover\''));
check('and keeps the name a reader sees',
    carried('.physics/.subject/.cover.tsx').includes('<Subject>A Test Library</Subject>'));
check('a silent cover gains what it never said',
    carried('.physics/gauge-theory/.cover.tsx').includes('<Author>The Team</Author>')
    && carried('.physics/gauge-theory/.cover.tsx').includes('<Subject>Physics</Subject>'));
check('AND THE AUTHORED FILE IS UNTOUCHED — a resolution is not an edit',
    !authored('.physics/gauge-theory/.cover.tsx').includes('<Author>'));

const module = carried('.physics/.subject/book.tsx');
check('a book module composes its cover, its contents, its own account, then its chapters',
    module.indexOf('<PhysicsCover />') < module.indexOf('<TableOfContents />')
    && module.indexOf('<TableOfContents />') < module.indexOf('<PhysicsSynopsis />')
    && module.indexOf('<PhysicsSynopsis />') < module.indexOf('<WhatPhysicsIs />'));
check('a subject stands the synopses of the books it holds',
    module.includes('<StandardModelSynopsis />') && module.includes('<GaugeTheorySynopsis />'));
check('and it reaches them by their own folders',
    module.includes("from '../the-standard-model/.synopsis'"));
check('a book that catalogues nothing declares no entries',
    !carried('.physics/gauge-theory/book.tsx').includes('export const entries'));

// --- regeneration, which is what makes the output the machine's -------------

const stray = join(into, '.physics/the-standard-model/left-behind.tsx');
writeFileSync(stray, 'export const LeftBehind = 1;\n');
const again = emit(resolved, into);
check('a file the corpus does not write is REMOVED rather than accumulated',
    !existsSync(stray) && again.removed.includes('.physics/the-standard-model/left-behind.tsx'),
    again.removed.join());

rmSync(into, { recursive: true, force: true });

// --- the catalogue, read off the real emitted program ------------------------
//
// These read what the last compile actually produced. A card is read off a
// LIVING book, so the books must sit where their own imports resolve — which is
// why this half of the gate cannot run in a temporary folder.

const served = join(workspace, 'library/.public/app/src/library');
const emitted = (p: string) => readFileSync(join(served, p), 'utf-8');

const cardsModule = emitted('cards.tsx');
check('THE CATALOGUE IMPORTS NO BOOK — a card is a book present without the book',
    !/from '\.\/[^']*\/book'/.test(cardsModule) && !cardsModule.includes('/book\''));
check('a card carries a title split from its subtitle at the colon',
    cardsModule.includes('"Physics", "The Study of What There Is"'));
check('a card carries the tagline off its book\'s summary',
    cardsModule.includes('"Two books, one of them canonical."'));
check('a card carries the book\'s own chapters and none it catalogues',
    cardsModule.includes('["Synopsis", "What Physics Is"]'));
check('every book has a card', resolved.books.every(b => cardsModule.includes(`"${b.route}"`)));
check('the subject links are card to card', cardsModule.includes('physics.$subject = library;'));

const doors = emitted('books.tsx');
check('every book is named in the one door into it',
    resolved.books.every(b => doors.includes(`"${b.route}"`)));
check('and each is a dynamic import, so a page loads one book',
    (doors.match(/\(\) => import\(/g) ?? []).length === resolved.books.length);

check('AN EMITTED REFERENCE CARRIES ITS CARD, so nothing is repaired after loading',
    emitted('.physics/.subject/.cover.tsx').includes('<Subject for={library}>A Test Library</Subject>'));
check('a supplied reference carries one too',
    emitted('.physics/gauge-theory/.cover.tsx').includes('<Subject for={physics}>Physics</Subject>'));
check('a catalogued synopsis is handed the card of the book it accounts for',
    emitted('..the-library/book.tsx').includes('<PhysicsSynopsis for={physics} />'));
check('and a book\'s OWN synopsis is handed none — it reads home',
    /<PhysicsSynopsis \/>/.test(emitted('.physics/.subject/book.tsx')));

console.log(`\nresolve + emit (library/.test-library): ${resolved.books.length} books, ${written.carried} carried, ${written.generated} generated — ${ran} checks, ${failed} failed.`);
console.log(failed ? 'FAIL.' : 'PASS.');
process.exit(failed ? 1 : 0);
