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
// it proves only that it raises nothing over something correct.
//
// EACH CASE IS A LIBRARY THAT IS WRONG IN EXACTLY ONE WAY, and the promise is that the compiler says
// WHICH way. A suite that only asserts "some fault" would pass on a compiler that raised everything.
//
// AND THE FIXTURE IS WRITTEN IN THIS CODE'S SPELLING — a chapter a function returning its Chapter,
// every title a title form, every listing a reference. The compiler reads the notation and no tag,
// so the elements are there for a reader; one case titles its chapters in a library's own element to
// prove it. A fixture that does not speak the real language tests a reader nobody ships.

type Made = {
    folder: string;
    name: string;
    author: string;
    catalogue?: string;
    about?: boolean;
    retitled?: string;
    topics?: string[];
    holds?: string[];
    lists?: string[];
    synopsised?: boolean;
    anchors?: string[];
    chapters?: string[];
    titledIn?: string;
    shared?: string[];
};

const where = mkdtempSync(join(tmpdir(), 'binder-wellformed-'));
let made = 0;

const page = (lines: string[]): string =>
    `export default () => (\n    <Chapter>\n${lines.map(line => `        ${line}`).join('\n')}\n    </Chapter>\n);\n`;

const built = (books: Made[]): Library => {
    const root = join(where, String(made++));
    const library: Book[] = [];
    for (const one of books) {
        const path = join(root, one.folder);
        mkdirSync(path, { recursive: true });
        writeFileSync(join(path, '.book.tsx'), 'export default class B {}\n');
        writeFileSync(join(path, '.cover.tsx'), page([
            '<Cover />',
            `<Title>[[ ${one.name} ]]</Title>`,
            `<Author>${one.author}</Author>`,
            ...(one.catalogue === undefined ? [] : [`<Subject>${one.catalogue}</Subject>`]),
            ...(one.topics ?? []).map(topic => `<Paragraph>${topic}</Paragraph>`),
            ...(one.about === true ? [`<About>[[ ${one.name} ]]</About>`] : []),
            ...(one.retitled === undefined ? [] : [`<About>${one.retitled}</About>`]),
        ]));
        writeFileSync(join(path, '.synopsis.tsx'), page([
            '<Synopsis />',
            '<Title>[[ Synopsis ]]</Title>',
            '<Paragraph>What this is.</Paragraph>',
            ...(one.anchors ?? []).map(anchor => `<Paragraph><Mention>[[[ ${anchor} ]]]</Mention> stands here.</Paragraph>`),
        ]));
        const files = ['.book.tsx', '.cover.tsx', '.synopsis.tsx', '.table.tsx'];
        // AND ANY FURTHER CHAPTER A CASE ASKS FOR, titled as the case says, so a title can be made to
        // answer twice in one book — in the element the case names, the framework's by default.
        const element = one.titledIn ?? 'Title';
        (one.chapters ?? []).forEach((name, at) => {
            const file = `${9 + at}-chapter.tsx`;
            writeFileSync(join(path, file), page([`<${element}>[[ ${name} ]]</${element}>`, '<Paragraph>What it says.</Paragraph>']));
            files.push(file);
        });
        // A TABLE REFERS TO EVERY CHAPTER OF ITS BOOK AND ANSWERS FOR WHAT IT CATALOGUES, referring
        // beside each answer to that book's own synopsis — Doug, 2026-09-20: "In the book. It has a
        // .synopsis file literally."
        const listed = one.lists ?? [one.name, 'Synopsis', 'Table of Contents', ...(one.chapters ?? [])];
        writeFileSync(join(path, '.table.tsx'), page([
            '<TableOfContents />',
            '<Title>[[ Table of Contents ]]</Title>',
            ...listed.map(name => `<Paragraph><Means>$[ ${name === one.name ? name : `./${name}`} ]</Means></Paragraph>`),
            ...(one.holds ?? []).map(answer => {
                const of = /\[\[\s*(.*?)\s*\]\]/u.exec(answer)?.[1] ?? answer;
                const synopsis = one.synopsised === false ? '' : ` <Means>$[ ${of} / Synopsis ]</Means>`;
                return `<Paragraph><Means>${answer}</Means>${synopsis}</Paragraph>`;
            }),
        ]));
        // AND A RESOURCE BESIDE THE SYNOPSIS, holding whatever lines the case gives it.
        const resources = new Map<string, string[]>();
        if (one.shared !== undefined) {
            writeFileSync(join(path, '.synopsis.tsx.tsx'), page(one.shared));
            resources.set('.synopsis.tsx', ['.synopsis.tsx.tsx']);
        }
        library.push({ folder: one.folder, path, files, resources, unaccounted: [], module: join(path, '.book.tsx') });
    }

    return { root, books: library };
};

const faultsOf = (books: Made[]): string[] => wellformed(structure(built(books))).map(fault => fault.fault ?? 'SPEC');

// A LIBRARY THAT HOLDS TOGETHER, AND A PERSONA WHO WRITES INSIDE IT. Every case below is this one
// with a single thing taken away, so a fault names what was taken rather than the shape of the test.
// The library and the log are about themselves, since books are filed under each.
const whole = (): Made[] => [
    { folder: 'the-library', name: 'A Library', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]', about: true, holds: ['[[ A Log ]]**', '[[ Some Projects ]]**', '[[ A Paper ]]**'] },
    { folder: 'log', name: 'A Log', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]', about: true, holds: ['[[ A Persona ]]**'] },
    { folder: 'projects', name: 'Some Projects', author: '*[[ A Log ]]', catalogue: '**[[ A Library ]]' },
    { folder: 'persona', name: 'A Persona', author: '*[[ A Log ]]', catalogue: '**[[ A Log ]]' },
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

    // THE COMPILER READS THE FORM AND NEVER THE TAG — Doug, 2026-09-25: "You can't! They might
    // subclass them. That's why they are in special files."
    it('reads a chapter titled in a library\'s own element exactly as one titled in the framework\'s', () => {
        const books = whole();
        books[2].chapters = ['The Work'];
        books[2].titledIn = 'MyTitle';

        expect(faultsOf(books)).toEqual([]);
    });
});

// WHO MAY AUTHOR, in Doug's two clauses of 2026-09-25: "1. A book that is by its subject - There
// can be only one of those 2. Any book catalogued by one that is a subject."
describe('authorship', () => {
    it('raises a fault for a persona the library catalogues, since only the autobiography\'s books may author', () => {
        const books = whole();
        books[3].catalogue = '**[[ A Library ]]';
        books[1].holds = [];
        books[0].holds = [...(books[0].holds ?? []), '[[ A Persona ]]**'];

        expect(faultsOf(books)).toEqual([faults.mayNotAuthor]);
    });

    // A second persona under the log writes, though it names the first persona as its own author.
    it('lets a book catalogued by the autobiography write, whoever it names as its own author', () => {
        const books: Made[] = [...whole(), { folder: 'second', name: 'A Second Persona', author: '*[[ A Persona ]]', catalogue: '**[[ A Log ]]' }];
        books[1].holds = [...(books[1].holds ?? []), '[[ A Second Persona ]]**'];
        books[2].author = '*[[ A Second Persona ]]';

        expect(faultsOf(books)).toEqual([]);
    });

    // ONE STEP, NOT A WALK: a diary the persona catalogues stands two steps under the log, so the
    // persona may author and the diary may not.
    it('lets no book write whose subject is not the autobiography, however near it stands', () => {
        const books: Made[] = [...whole(), { folder: 'diary', name: 'A Diary', author: '*[[ A Persona ]]', catalogue: '**[[ A Persona ]]' }];
        books[3].about = true;
        books[3].holds = ['[[ A Diary ]]**'];
        books[4].author = '*[[ A Diary ]]';

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.mayNotAuthor]);
        expect(said[0].says).toContain('"A Diary" is catalogued by "A Persona", which is not the one book by its own subject');
    });

    it('reports an author answered in a table, since the notation has no such form', () => {
        const books = whole();
        books[3].holds = ['[[ A Paper ]]*'];

        expect(faultsOf(books)).toEqual([faults.malformed]);
    });

    it('raises a fault for a second book by its own subject, since there can be only one of those', () => {
        const books = whole();
        books[2].author = '*[[ Some Projects ]]';

        expect(faultsOf(books)).toContain(faults.twoSelfAuthors);
    });
});

describe('the catalogue', () => {
    it('raises a catalogue that does not answer for a book standing under it', () => {
        const books = whole();
        books[0].holds = ['[[ A Log ]]**', '[[ A Paper ]]**'];

        expect(faultsOf(books)).toEqual([faults.notListed]);
    });

    // Doug, 2026-09-25: "Any book can be About something, but that allows other books to then be able
    // to use it as a subject catalogue."
    it('raises a book filed under one that is about nothing', () => {
        const books = whole();
        books[1].about = false;

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.notASubject]);
        expect(said[0].says).toContain('files "A Persona" under "A Log", which is about nothing');
    });

    // AN ANCHOR IS A NAME LIKE A CHAPTER'S, and the rule that raises two chapters called one thing
    // raises an anchor allocated under a chapter's name — once for each of the two namings.
    // Doug, 2026-09-20: "Chapters & mentions per book, book titles across the library. These are hard
    // constraints otherwise the reference can't work."
    it('raises two chapters answering to one name in one book', () => {
        const books = whole();
        books[2].chapters = ['Synopsis'];

        expect(faultsOf(books)).toEqual([faults.duplicateTitle, faults.duplicateTitle]);
    });

    it('raises a name that answers twice in one book — an anchor allocated under a chapter\'s name', () => {
        const books = whole();
        books[2].anchors = ['Synopsis'];

        expect(faultsOf(books)).toEqual([faults.duplicateTitle, faults.duplicateTitle]);
    });

    // Doug, 2026-09-19: "the table needs links to its chapters and the books that those chapters
    // are synopses of."
    it('raises a table that answers for a book without referring to its synopsis', () => {
        const books = whole();
        books[0].synopsised = false;

        expect(faultsOf(books)).toEqual([faults.noSynopsis, faults.noSynopsis, faults.noSynopsis]);
    });

    // Doug, 2026-09-20: "it should also refuse when nothing references a mention in the whole
    // library. It is unnecessary in that case and we want a compact library."
    it('raises a mention that nothing in the library refers to', () => {
        const books = whole();
        books[2].anchors = ['A Shelf'];

        expect(faultsOf(books)).toEqual([faults.unreferencedMention]);
    });

    it('raises a chapter its own book\'s table does not refer to, naming the book and the chapter', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Table of Contents'];

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.chapterNotListed]);
        expect(said[0].says).toContain('"Synopsis" is a chapter of "Some Projects"');
    });

    it('raises a table that lists what its book does not hold, as a reference to nothing', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Synopsis', 'Table of Contents', 'Nowhere'];

        expect(faultsOf(books)).toEqual([faults.unknownReference]);
    });
});

// THE PRINCIPLES OF A URL, EACH AS A SCENARIO THE COMPILER RAISES — Doug, 2026-09-20: "Use
// principles of urls. Do you ever get the same? Then validate that that scenario is impossible."
describe('one address, one thing', () => {
    // NOT `A. Paper`: a title is read through the notation now, where `.` escapes what follows it.
    it('raises two books whose names meet at one path', () => {
        const books = whole();
        books[2].name = 'A-Paper';

        expect(new Set(faultsOf(books))).toEqual(new Set([faults.sameAddress]));
    });

    it('raises two chapters of one book whose names meet at one fragment', () => {
        const books = whole();
        books[2].chapters = ['Table Of Contents'];

        expect(faultsOf(books)).toEqual([faults.sameAddress, faults.sameAddress]);
    });

    it('raises a chapter titled with its own book\'s name, because the cover already answers to it', () => {
        const books = whole();
        books[2].chapters = ['Some Projects'];

        expect(faultsOf(books)).toEqual([faults.sameAddress, faults.sameAddress]);
    });

    it('raises a name that leaves no address', () => {
        const books = whole();
        books[2].chapters = ['???'];

        expect(faultsOf(books)).toEqual([faults.noAddress]);
    });

    it('raises a book that would stand where the binder writes', () => {
        const books = whole();
        books[2].name = 'Assets';

        expect(faultsOf(books)).toContain(faults.reservedAddress);
    });

    it('raises a resource that names anything, because it is drawn on every page that wears it', () => {
        const books = whole();
        books[2].shared = ['<Title>[[ A Shared Title ]]</Title>', '<Paragraph><Mention>[[[ A Shared Spot ]]]</Mention> stands here.</Paragraph>'];

        expect(faultsOf(books)).toEqual([faults.resourceNames, faults.resourceNames]);
    });
});

describe('names', () => {
    it('raises two books answering to one name', () => {
        const books = whole();
        books[2].name = 'A Paper';

        expect(new Set(faultsOf(books))).toEqual(new Set([faults.duplicateTitle]));
    });

    // A FILE TITLES ONE THING. A cover's second title form is its About and names its own book; one
    // naming anything else is a second title.
    it('raises a cover whose second title form names another book', () => {
        const books = whole();
        books[2].retitled = '[[ A Paper ]]';

        expect(faultsOf(books)).toEqual([faults.titledTwice]);
    });

    it('raises a form the notation does not have', () => {
        const books = whole();
        books[4].author = '*[[ A Persona ]]**';

        expect(faultsOf(books)).toEqual([faults.malformed]);
    });
});

// THE ONE THAT CAUGHT A REAL REGRESSION. When the structure changed to reading elements, four of the
// cases above went silently green — it found no books at all, and every check passed over nothing.
describe('a library the compiler could not read', () => {
    it('is a fault and never a pass', () => {
        expect(faultsOf([])).toEqual([faults.noLibrary]);
    });
});
