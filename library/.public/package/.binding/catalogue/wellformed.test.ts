import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { Book, Library } from '../inventory/library';
import { structure } from './structure';
import { faults, wellformed } from './wellformed';

// WHAT MAKES A LIBRARY WELL-FORMED, PROVED AGAINST A LIBRARY BUILT TO BREAK.
//
// Doug, 2026-09-18: ".binder should ship with a test suite of its components." This is the one that
// matters most, because every check in `wellformed.ts` is a claim about a shape that cannot be
// exercised by the library we happen to have — Doug's holds together, so running the compiler over
// it proves only that it does not refuse something correct.
//
// EACH CASE IS A LIBRARY THAT IS WRONG IN EXACTLY ONE WAY, and the promise is that the compiler says
// WHICH way. A suite that only asserts "some fault" would pass on a compiler that refused everything.
//
// AND THE FIXTURE IS WRITTEN IN THE FRAMEWORK'S OWN ELEMENTS. An earlier version put its annotations
// inside a `<p>`; the hour the structure started reading `<Title>`, four cases that MUST fail went
// silently green, because the structure found no books and every check passed over nothing. A
// fixture that does not speak the real language tests a reader nobody ships.

type Made = { folder: string; name: string; author: string; catalogue?: string; topics?: string[]; holds?: string[]; lists?: string[]; silent?: boolean; synopsised?: boolean };

const where = mkdtempSync(join(tmpdir(), 'binder-wellformed-'));
let made = 0;

// AND IT IMPORTS WHAT IT USES, the way a real chapter does, because the compiler now reads a tag by
// what it is bound to rather than by its name — an element nobody imported is nobody's element.
// `Book` and `Chapter` here are the MENTIONS, bound the way every table in the library binds them.
const page = (lines: string[]): string =>
    `import { For, Title, book as Book, chapter as Chapter } from '@dna-platform/public';\nimport { Option } from '@dna-platform/public/application';\n\nexport default class C {\n    print() {\n        return (<Writing>\n${lines.map(one => `            ${one}`).join('\n')}\n        </Writing>);\n    }\n}\n`;

const built = (books: Made[]): Library => {
    const root = join(where, String(made++));
    const held: Book[] = [];
    for (const one of books) {
        const path = join(root, one.folder);
        mkdirSync(path, { recursive: true });
        writeFileSync(join(path, '.book.tsx'), 'export default class B {}\n');
        writeFileSync(join(path, '.cover.tsx'), page([
            `<Title>${one.name}</Title>`,
            `<Author>${one.author}</Author>`,
            ...(one.catalogue === undefined ? [] : [`<Subject>${one.catalogue}</Subject>`]),
            ...(one.topics ?? []).map(topic => `<Topic>${topic}</Topic>`),
        ]));
        writeFileSync(join(path, '.synopsis.tsx'), page([
            '<Title>Synopsis</Title>',
            one.silent === true ? '<Synopsis>What this is.</Synopsis>' : `<Synopsis><For>${one.name}</For>What this is.</Synopsis>`,
        ]));
        // A BOOK THIS ONE CATALOGUES, OR HOLDS AS A TOPIC, HAS A SYNOPSIS CHAPTER HERE, and the row
        // that lists the book names it — Doug, 2026-09-19: "the table needs links to its chapters
        // and the books that those chapters are synopses of."
        const synopses = one.synopsised === false ? [] : (one.holds ?? []).filter(held_ => /\*\*$/u.test(held_)).map(held_ => /\[\[\s*(.*?)\s*\]\]/u.exec(held_)?.[1] ?? held_);
        const files = ['.book.tsx', '.cover.tsx', '.synopsis.tsx', '.table.tsx'];
        synopses.forEach((name, at) => {
            const file = `${at + 1}-synopsis.tsx`;
            writeFileSync(join(path, file), page([`<Title>${name}</Title>`, 'What it is.']));
            files.push(file);
        });
        writeFileSync(join(path, '.table.tsx'), page([
            '<Title>Table of Contents</Title>',
            ...(one.lists ?? [one.name, 'Synopsis', 'Table of Contents']).map(held_ => `<Option><Chapter>${held_}</Chapter></Option>`),
            ...(one.holds ?? []).map(held_ => `<Option>${one.synopsised !== false && /\*\*$/u.test(held_) ? `<Chapter>${/\[\[\s*(.*?)\s*\]\]/u.exec(held_)?.[1] ?? held_}</Chapter>` : ''}<Book>${held_}</Book></Option>`),
        ]));
        held.push({ folder: one.folder, path, files, resources: new Map(), unaccounted: [], module: join(path, '.book.tsx') });
    }

    return { root, books: held };
};

const faultsOf = (books: Made[]): string[] => wellformed(structure(built(books))).map(one => one.fault ?? 'SPEC');

// A LIBRARY THAT HOLDS TOGETHER, AND A PERSONA WHO WRITES INSIDE IT. Every case below is this one
// with a single thing taken away, so a fault names what was taken rather than the shape of the test.
const whole = (): Made[] => [
    { folder: 'the-library', name: 'A Library', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]', holds: ['[[ A Log ]]**', '[[ Some Projects ]]**', '[[ A Paper ]]**'] },
    { folder: 'log', name: 'A Log', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]', holds: ['[[ A Library ]]*', '[[ Some Projects ]]*', '[[ A Persona ]]*', '[[ A Persona ]]**'] },
    { folder: 'projects', name: 'Some Projects', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]' },
    { folder: 'persona', name: 'A Persona', author: '*[[ A Log ]]', catalogue: '**[[ A Log ]]', holds: ['[[ A Paper ]]*'] },
    { folder: 'paper', name: 'A Paper', author: '*[[ A Persona ]]', catalogue: '**[[ A Library ]]' },
];

afterAll(() => { rmSync(where, { recursive: true, force: true }); });

describe('a well-formed library', () => {
    it('holds together when a persona writes a paper', () => {
        expect(faultsOf(whole())).toEqual([]);
    });

    it('lets two books catalogue each other topically, which is not a cycle to be afraid of', () => {
        const books = whole();
        books[2].topics = ['***[[ A Paper ]]'];
        books[4].topics = ['***[[ Some Projects ]]'];
        books[2].holds = ['[[ A Paper ]]***'];
        books[4].holds = ['[[ Some Projects ]]***'];

        expect(faultsOf(books)).toEqual([]);
    });
});

describe('authorship', () => {
    it('refuses a persona nobody vouched for', () => {
        const books = whole();
        books[3].catalogue = '**[[ A Library ]]';
        books[1].holds = ['[[ A Library ]]*', '[[ Some Projects ]]*', '[[ A Persona ]]*'];
        books[0].holds = [...(books[0].holds ?? []), '[[ A Persona ]]**'];

        expect(faultsOf(books)).toEqual([faults.mayNotAuthor]);
    });

    it('refuses a second book that authors itself, because the self-delegation happens once', () => {
        const books = whole();
        books[2].author = '*[[ Some Projects ]]';

        expect(faultsOf(books)).toContain(faults.twoSelfAuthors);
    });
});

describe('the catalogue', () => {
    it('refuses a catalogue that does not answer for a book standing under it', () => {
        const books = whole();
        books[0].holds = ['[[ A Log ]]**', '[[ A Paper ]]**'];

        expect(faultsOf(books)).toEqual([faults.notListed]);
    });

    // Doug, 2026-09-19: "the table needs links to its chapters and the books that those chapters
    // are synopses of."
    it('refuses a row that catalogues a book without naming the chapter that is its synopsis', () => {
        const books = whole();
        books[0].synopsised = false;

        expect(faultsOf(books)).toEqual([faults.noSynopsis, faults.noSynopsis, faults.noSynopsis]);
    });

    it('refuses a chapter its own book does not list', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Table of Contents'];

        expect(faultsOf(books)).toEqual([faults.chapterNotListed]);
    });
});

describe('names', () => {
    it('refuses two books answering to one name', () => {
        const books = whole();
        books[2].name = 'A Paper';

        expect(new Set(faultsOf(books))).toEqual(new Set([faults.duplicateTitle]));
    });

    it('refuses a form the notation does not have', () => {
        const books = whole();
        books[4].author = '*[[ A Persona ]]**';

        expect(faultsOf(books)).toEqual([faults.malformed]);
    });
});

describe('a synopsis', () => {
    it('refuses one that does not say what it is for', () => {
        const books = whole();
        books[2].silent = true;

        expect(faultsOf(books)).toEqual([faults.noBookReference]);
    });
});

// THE ONE THAT CAUGHT A REAL REGRESSION. When the structure changed to reading elements, four of the
// cases above went silently green — it found no books at all, and every check passed over nothing.
describe('a library the compiler could not read', () => {
    it('is a fault and never a pass', () => {
        expect(faultsOf([])).toEqual([faults.noLibrary]);
    });
});
