import { describe, it, expect } from 'vitest';
import { held, shipping } from './environment';
import { nameOf } from '../resolution/names';
import type { Entry } from '../manifest/graph';

// WHAT IT MEANS TO BE A LIBRARY. A book specifies ITSELF through the framework, at specify — that is
// a writing's own machinery and it stays there. What holds ACROSS books is a claim about what the
// compiler read, and that is what a test framework is for: one test per claim, over the graph the
// read answered. The build runs exactly what `npm test` runs, so a library adds a rule by adding a
// test and gets it in both places at once. A test says which book it is about in its own metadata,
// and the build lands the failure on that book's file.
//
// AND IT IS READ LIVE, NEVER OFF THE FOLDERS — Doug, 2026-09-15: "there are no conventions. I use
// the dots to order… if you are reading the folders for structure, I think you are doing it wrong."
// A chapter is causal because a book is GIVEN its chapters; a book is given to nothing, so a
// library has no containment to read and its shape is only what its books answered about
// themselves. A folder appears below to say which file an error lands on, and for nothing else.

// EVERY BOOK OF A NAME, GATHERED ONCE. A thousand books each searching the thousand is a million
// comparisons; grouped first it is one pass, and each book then asks about its own name alone.
const sharing = new Map<string, string[]>();
for (const entry of held.books)
    sharing.set(nameOf(entry), [...(sharing.get(nameOf(entry)) ?? []), `${entry.folder} (titled "${entry.book.title as string}")`]);

// A READING THAT IS A LIST ANSWERS A LIST, and an older graph may hold a joined string; both are
// read here so a build against a record written before this does not throw instead of failing.
const listed = (said: string | string[] | undefined): string[] =>
    Array.isArray(said) ? said : (said ?? '').split(' ').filter(Boolean);

const said = (entry: Entry, fact: string): string => (typeof entry.book[fact] === 'string' ? entry.book[fact] : '').trim();
const carries = (entry: Entry, type: string): boolean => listed(entry.book.types).includes(type);

// THE SUBJECT TREE. A book is catalogued by the CATALOGUE of its subject, so the whole tree is two
// groupings over what was read: every catalogue by the name it carries, and every book by the
// subject it declares. A well-formed tree has one catalogue per subject, a catalogue for every
// subject a book declares, and exactly one book whose subject's catalogue is itself — the summit,
// which is the only place the walk upward can stop.
const catalogues = new Map<string, Entry[]>();
for (const entry of held.books)
    if (carries(entry, 'Catalogue')) catalogues.set(nameOf(entry), [...(catalogues.get(nameOf(entry)) ?? []), entry]);

const autobiographies = new Set(held.books.filter(entry => carries(entry, 'Autobiography')).map(entry => nameOf(entry)));
const summits = held.books.filter(entry => carries(entry, 'Catalogue') && said(entry, 'subject') === nameOf(entry));
const named = (names: string[]): string => (names.length === 0 ? 'none' : names.map(one => `"${one}"`).join(', '));

describe.skipIf(shipping)('the library', () => {
    it('holds books that have been read', () => {
        expect(held.books.length, 'no graph — run `npm run build` first').toBeGreaterThan(0);
    });

    // EXACTLY ONE BOOK CATALOGUES ITSELF. A library exists to uphold an identity, so its topmost
    // subject is who that identity is — and the catalogue of that subject is the one book with
    // nowhere left to belong but itself. Two summits is two libraries; none is a tree with no root.
    it('holds exactly one book that catalogues itself', () => {
        expect(summits.map(entry => nameOf(entry)),
            'exactly one book is the catalogue of its own subject, and it is the library\'s summit')
            .toHaveLength(1);
    });

    // AUTHORSHIP HOLDS THE NARRATIVE OF THAT IDENTITY. The semantics of an autobiography cannot be
    // enforced — nothing here can know a life was written by the one who lived it — but the SHAPE
    // can: the summit is an autobiography, or it catalogues exactly one.
    it('is summited by an autobiography, or by a catalogue of exactly one', () => {
        const summit = summits[0];
        if (summit === undefined) return;
        const beneath = held.books.filter(entry => said(entry, 'subject') === nameOf(summit) && carries(entry, 'Autobiography'));
        expect(carries(summit, 'Autobiography') || beneath.length === 1,
            `"${nameOf(summit)}" summits the library, and it is neither an autobiography nor the catalogue of exactly one — it catalogues ${named(beneath.map(one => nameOf(one)))}`)
            .toBe(true);
    });

    for (const entry of held.books)
        describe(entry.folder, () => {
            it('is named by its title', ({ task }) => {
                task.meta.book = entry.folder;
                expect(nameOf(entry), `the book titled "${entry.book.title as string}" makes no name, and a book is named by its title`).not.toBe('');
            });

            it('is the only book of its name', ({ task }) => {
                task.meta.book = entry.folder;
                const taken = (sharing.get(nameOf(entry)) ?? []).filter(one => !one.startsWith(`${entry.folder} (`));
                expect(taken, `named "${nameOf(entry)}", which another book already is`).toEqual([]);
            });

            it('specified every writing it holds', ({ task }) => {
                task.meta.book = entry.folder;
                expect(entry.walked, 'nothing in it was specified').toBeGreaterThan(0);
            });

            // A BOOK IS NAMED OFF ITS COVER, AND THE SAME READING IS OWED TO EVERY CHAPTER — Doug,
            // 2026-09-15: "that is why book name can be driven off cover name, but it needs to apply
            // to all chapter documents". A chapter is titled by its document, whose title is the
            // <Title> an author wrote or the heading its first section opens with, recovered where
            // none was written; a chapter titled by nothing answers no name at all.
            it('names every chapter it holds', ({ task }) => {
                task.meta.book = entry.folder;
                expect(listed(entry.book.chapters).filter(one => one === '').length,
                    'a chapter of it is titled by nothing, so it answers no name').toBe(0);
            });

            it('names each chapter once', ({ task }) => {
                task.meta.book = entry.folder;
                const chapters = [...listed(entry.book.chapters)].sort();
                expect(chapters.filter((one, at) => chapters.indexOf(one) !== at), 'two chapters answer the same name').toEqual([]);
            });

            it('has a table of contents', ({ task }) => {
                task.meta.book = entry.folder;
                expect(listed(entry.book.catalogued), 'no table of contents names a chapter of it').not.toEqual([]);
            });

            it('is named chapter by chapter in its table of contents', ({ task }) => {
                task.meta.book = entry.folder;
                expect([...listed(entry.book.catalogued)].sort(),
                    `its table of contents names "${listed(entry.book.catalogued).join(', ')}" where the book holds "${listed(entry.book.chapters).join(', ')}"`)
                    .toEqual([...listed(entry.book.chapters)].sort());
            });

            it('declares a subject', ({ task }) => {
                task.meta.book = entry.folder;
                expect(said(entry, 'subject'), 'a book is about something, and this one declares no subject').not.toBe('');
            });

            it('is catalogued, by another book or by itself', ({ task }) => {
                task.meta.book = entry.folder;
                const subject = said(entry, 'subject');
                if (subject === '') return;
                expect(catalogues.has(subject),
                    `its subject is "${subject}", and no book named that is a catalogue — the catalogues are ${named([...catalogues.keys()])}`)
                    .toBe(true);
            });

            it('shares its subject\'s catalogue with no other', ({ task }) => {
                task.meta.book = entry.folder;
                const subject = said(entry, 'subject');
                expect((catalogues.get(subject) ?? []).map(one => one.folder),
                    `the subject "${subject}" is catalogued more than once, and a subject has one catalogue`)
                    .not.toHaveLength(2);
            });

            it('declares an author', ({ task }) => {
                task.meta.book = entry.folder;
                expect(said(entry, 'author'), 'a book was written by someone, and this one declares no author').not.toBe('');
            });

            // AN AUTHOR IS A BOOK WHOSE AUTHOR ARROW COMES HOME. The author names the account of
            // whoever wrote this, and the only book that can stand at the end of that arrow is an
            // autobiography — every other one leads out again.
            it('is authored by an autobiography', ({ task }) => {
                task.meta.book = entry.folder;
                const author = said(entry, 'author');
                if (author === '') return;
                expect(autobiographies.has(author),
                    `its author is "${author}", and no book named that is an autobiography — the autobiographies are ${named([...autobiographies])}`)
                    .toBe(true);
            });
        });
});
