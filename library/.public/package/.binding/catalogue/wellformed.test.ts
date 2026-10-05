import type { Accompanying } from '../inventory/filenames';
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
    // A FILE BESIDE THE FIRST EXTRA CHAPTER, by identifier and type, and the literals that chapter
    // writes — so a file nobody names and a name nobody has can each be a library wrong in one way.
    appendix?: string;
    inserts?: string[];
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
        // THE SYNOPSIS IMPORTS ITS SHARED RESOURCE, as a chapter imports a tool beside it, so the
        // resource counts as used and the case is about what the resource writes, not whether it is there.
        writeFileSync(join(path, '.synopsis.tsx'), (one.shared === undefined ? '' : `import './.synopsis.tsx.tsx';\n`) + page([
            '<Synopsis />',
            '<Title>[[ Synopsis ]]</Title>',
            '<Paragraph>What this is.</Paragraph>',
            ...(one.anchors ?? []).map(anchor => `<Paragraph><Mention>[[[ ${anchor} ]]]</Mention> stands here.</Paragraph>`),
        ]));
        const files = ['.book.tsx', '.cover.tsx', '.synopsis.tsx', '.table.tsx'];
        // AND ANY FURTHER CHAPTER A CASE ASKS FOR, titled as the case says, so a title can be made to
        // answer twice in one book — in the element the case names, the framework's by default.
        const element = one.titledIn ?? 'Title';
        const resources = new Map<string, Accompanying[]>();
        (one.chapters ?? []).forEach((name, at) => {
            const file = `${9 + at}-chapter.tsx`;
            const inserts = at === 0 ? (one.inserts ?? []).map(form => `<Paragraph>${form}</Paragraph>`) : [];
            writeFileSync(join(path, file), page([`<${element}>[[ ${name} ]]</${element}>`, '<Paragraph>What it says.</Paragraph>', ...inserts]));
            files.push(file);
            if (at === 0 && one.appendix !== undefined) {
                const beside = `${9 + at}-chapter.${one.appendix}`;
                writeFileSync(join(path, beside), 'export const beside = true;\n');
                const dot = one.appendix.lastIndexOf('.');
                resources.set(file, [{ file: beside, identifier: one.appendix.slice(0, dot), type: one.appendix.slice(dot) }]);
            }
        });
        // A TABLE REFERS TO EVERY CHAPTER OF ITS BOOK AND ANSWERS FOR WHAT IT CATALOGUES — the two things
        // the compiler asks of it. Beside each answer it refers to that book's own synopsis unless a case
        // says not, as a catalogue may and as the compiler asked until Sprint 99.
        const listed = one.lists ?? [one.name, 'Synopsis', 'Table of Contents', ...(one.chapters ?? [])];
        writeFileSync(join(path, '.table.tsx'), page([
            '<TableOfContents />',
            '<Title>[[ Table of Contents ]]</Title>',
            ...listed.map(name => `<Paragraph><Means>$[[ ${name === one.name ? name : `./${name}`} ]]</Means></Paragraph>`),
            ...(one.holds ?? []).map(answer => {
                const of = /\[\[\s*(.*?)\s*\]\]/u.exec(answer)?.[1] ?? answer;
                const synopsis = one.synopsised === false ? '' : ` <Means>$[[ ${of} / Synopsis ]]</Means>`;
                return `<Paragraph><Means>${answer}</Means>${synopsis}</Paragraph>`;
            }),
        ]));
        // AND A RESOURCE BESIDE THE SYNOPSIS, holding whatever lines the case gives it.
        if (one.shared !== undefined) {
            writeFileSync(join(path, '.synopsis.tsx.tsx'), page(one.shared));
            resources.set('.synopsis.tsx', [{ file: '.synopsis.tsx.tsx', identifier: 'tsx', type: '.tsx' }]);
        }
        library.push({ folder: one.folder, path, files, resources, unaccounted: [], clashing: [], module: join(path, '.book.tsx') });
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

    // A COVER'S SECOND TITLE FORM NAMES THE SUBJECT ITS BOOK REPRESENTS, which need not be its title.
    // Doug, 2026-09-27: "YES a book that represents a subject is not necessarily named a subject. The
    // Encyclopedia of Math might represent the subject of Math!" — and 2026-10-02, initializing his own
    // library: "Dougs Library will be <About> The Library. The autobiography, to be named, will be
    // <About> The Librarian." So `**[[ A Library ]]` files under the book about A Library, whatever it
    // is called, and `*[[ A Log ]]` is the book about A Log.
    it('files books under the name a cover says its book is about, which need not be the book\'s title', () => {
        const books = whole();
        books[0].name = 'Dougs Library';
        books[0].about = false;
        books[0].retitled = '[[ A Library ]]';

        expect(faultsOf(books)).toEqual([]);
    });

    it('grounds the library in an autobiography whose author is the name its cover says it is about', () => {
        const books = whole();
        books[1].name = 'The Autobiography';
        books[1].about = false;
        books[1].retitled = '[[ A Log ]]';
        books[0].holds = ['[[ The Autobiography ]]**', '[[ Some Projects ]]**', '[[ A Paper ]]**'];

        expect(faultsOf(books)).toEqual([]);
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


    // Doug, 2026-09-20: "it should also refuse when nothing references a mention in the whole
    // library. It is unnecessary in that case and we want a compact library."
    it('raises a mention that nothing in the library refers to', () => {
        const books = whole();
        books[2].anchors = ['A Shelf'];

        expect(faultsOf(books)).toEqual([faults.unreferencedMention]);
    });

    it('raises a table that lists what its book does not hold, as a reference to nothing', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Synopsis', 'Table of Contents', 'Nowhere'];

        expect(faultsOf(books)).toEqual([faults.unknownReference]);
    });
});

// THE TABLE OF CONTENTS IS THE LINK AGGREGATOR — Doug, 2026-10-05: "The table needs to refer to all
// chapters including itself. Might as well be there, though frequently it will be placed in some
// interesting place. And it should refer to all books." And of how it is checked: "We can't have the
// binder validate TSX. It uses its templating language to validate, and the writer can use that
// anywhere." Each case is the library whole with one link taken out of one table.
describe('a table of contents, the link aggregator', () => {
    it('holds when every table refers to every chapter of its book and answers for every book of its subject', () => {
        const books = whole();
        books[2].chapters = ['The Work'];

        expect(faultsOf(books)).toEqual([]);
    });

    it('raises a table that leaves out a chapter of its own book, naming the chapter and the reference it owes', () => {
        const books = whole();
        books[2].chapters = ['The Work'];
        books[2].lists = ['Some Projects', 'Synopsis', 'Table of Contents'];

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.chapterNotListed]);
        expect(said[0].says).toContain('"The Work" is a chapter of "Some Projects" and its table of contents does not refer to it');
        expect(said[0].says).toContain('$[[ ./The Work ]]');
        expect(said[0].file).toMatch(/\.table\.tsx$/u);
    });

    it('raises a table that leaves out its book\'s synopsis', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Table of Contents'];

        expect(faultsOf(books)).toEqual([faults.chapterNotListed]);
    });

    it('raises a table that leaves out itself', () => {
        const books = whole();
        books[2].lists = ['Some Projects', 'Synopsis'];

        expect(faultsOf(books)).toEqual([faults.chapterNotListed]);
    });

    it('does not ask a table to refer to its own book, which its cover names', () => {
        const books = whole();
        books[2].lists = ['Synopsis', 'Table of Contents'];

        expect(faultsOf(books)).toEqual([]);
    });

    it('counts a link where it is written in the table, and not one written in a chapter', () => {
        const books = whole();
        books[2].chapters = ['The Work'];
        books[2].inserts = ['$[[ ./Synopsis ]]'];
        books[2].lists = ['Some Projects', 'Table of Contents', 'The Work'];

        expect(faultsOf(books)).toEqual([faults.chapterNotListed]);
    });

    it('reads the chapters by their title forms, whatever element a library titles them in', () => {
        const titled = whole();
        titled[2].titledIn = 'MyTitle';
        titled[2].chapters = ['The Work'];
        expect(faultsOf(titled)).toEqual([]);

        const left = whole();
        left[2].titledIn = 'MyTitle';
        left[2].chapters = ['The Work'];
        left[2].lists = ['Some Projects', 'Synopsis', 'Table of Contents'];
        expect(faultsOf(left)).toEqual([faults.chapterNotListed]);
    });

    it('does not ask for a place named in a chapter, since a place is not a chapter', () => {
        const books = whole();
        books[2].anchors = ['A Shelf'];
        books[2].chapters = ['The Work'];
        books[2].inserts = ['$[[ ./A Shelf ]]'];

        expect(faultsOf(books)).toEqual([]);
    });

    it('raises a catalogue\'s table that leaves out a book of its subject, naming the book and the answer it owes', () => {
        const books = whole();
        books[0].holds = ['[[ A Log ]]**', '[[ A Paper ]]**'];

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.notListed]);
        expect(said[0].says).toContain('"Some Projects" says its catalogue is "A Library"');
        expect(said[0].says).toContain('[[ Some Projects ]]**');
    });

    it('raises an answer for a book that is written anywhere but the table', () => {
        const books = whole();
        books[0].holds = ['[[ A Log ]]**', '[[ A Paper ]]**'];
        books[0].topics = ['[[ Some Projects ]]**'];

        expect(faultsOf(books)).toEqual([faults.notInTheTable]);
    });

    // THE SYNOPSIS RULE WENT WITH SPRINT 99 — Doug, 2026-10-05: "The synopsis rule can go if the chapter
    // rule is there right because the synopsis will have to be there?" It will: every book holds a
    // synopsis, and its own table refers to it. So a catalogue's row may be a link and nothing more.
    it('asks a catalogue\'s table for a link to each book and for nothing into it', () => {
        const books = whole();
        books[0].synopsised = false;
        books[1].synopsised = false;

        expect(faultsOf(books)).toEqual([]);
        expect(Object.values(faults)).not.toContain('NO-SYNOPSIS');
        expect(Object.values(faults)).toHaveLength(24);
    });

    it('asks a topical catalogue for the same and no more', () => {
        const books = whole();
        books[4].topics = ['***[[ Some Projects ]]'];
        books[2].about = true;
        books[2].holds = ['[[ A Paper ]]***'];
        books[2].synopsised = false;

        expect(faultsOf(books)).toEqual([]);
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

    // AND A SUBJECT IS REPRESENTED BY ONE BOOK. Two covers saying their books are about one name are
    // two books where a reference can reach only one.
    it('raises two covers saying their books are about one name', () => {
        const books = whole();
        books[2].retitled = '[[ A Subject ]]';
        books[4].retitled = '[[ A Subject ]]';

        expect(faultsOf(books)).toEqual([faults.titledTwice, faults.titledTwice]);
    });

    it('raises a form the notation does not have', () => {
        const books = whole();
        books[4].author = '*[[ A Persona ]]**';

        expect(faultsOf(books)).toEqual([faults.malformed]);
    });
});

// THE LIBRARY'S OWN CATALOGUE IS REQUIRED — Doug, 2026-10-02, initializing his library: "I want you to
// make sure that the compiler enforces that we need to have a library catalogue." The top is filed
// under what it is about, which is itself; a book filed under nothing is not a library, it is a book
// nobody has filed.
describe('the library catalogue', () => {
    it('raises a top filed under nothing, since the library\'s own catalogue stands under itself', () => {
        const books = whole();
        books[0].catalogue = undefined;

        const said = wellformed(structure(built(books)));
        expect(said.map(fault => fault.fault)).toEqual([faults.noLibrary]);
        expect(said[0].says).toContain('does not catalogue itself');
    });

    it('raises a book filed under nothing beside the library, as a second root', () => {
        const books = whole();
        books[2].catalogue = undefined;
        books[0].holds = ['[[ A Log ]]**', '[[ A Paper ]]**'];

        expect(faultsOf(books)).toEqual([faults.twoLibraries, faults.twoLibraries]);
    });
});

// A LITERAL NAMES A FILE BESIDE ITS CHAPTER, AND EVERY FILE BESIDE A CHAPTER IS NAMED. Sprint 92, on
// Doug's ruling: "the compiler can now enforce that all resources are used… every resource file
// (except this, which is optional) must be specified."
describe('the files beside a chapter', () => {
    it('holds together when a chapter inserts the file beside it, and when it inserts its own source', () => {
        const books = whole();
        books[2].chapters = ['A Chapter'];
        books[2].appendix = 'code.ts';
        books[2].inserts = ['![[ code.ts ]]', '![[ this ]]'];

        expect(faultsOf(books)).toEqual([]);
    });

    it('raises a file beside a chapter that nothing in the chapter inserts', () => {
        const books = whole();
        books[2].chapters = ['A Chapter'];
        books[2].appendix = 'code.ts';

        expect(faultsOf(books)).toEqual([faults.unusedFile]);
    });

    it('raises a literal naming a file the chapter does not have', () => {
        const books = whole();
        books[2].chapters = ['A Chapter'];
        books[2].inserts = ['![[ missing.ts ]]'];

        expect(faultsOf(books)).toEqual([faults.unknownFile]);
    });

    it('raises a literal with a words half, one reaching across chapters, and one in a string, each by name', () => {
        const books = whole();
        books[2].chapters = ['A Chapter'];
        books[2].appendix = 'code.ts';
        books[2].inserts = ['![[ words ]]( code.ts )', '![[ ./other.code.ts ]]', "{'![[ code.ts ]]'}"];

        expect(faultsOf(books)).toEqual([faults.malformed, faults.malformed, faults.malformed, faults.unusedFile]);
    });

    it('raises a resource that inserts anything, since a file beside a chapter is a module and not a chapter', () => {
        const books = whole();
        books[2].shared = ['<Paragraph>![[ this ]]</Paragraph>'];

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
