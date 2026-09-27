import { describe, expect, it } from 'vitest';
import { read } from '../.test/galleys';
import { name } from './language';
import { structure } from './structure';
import { wellformed } from './wellformed';

// WHAT THE STRUCTURE PROMISES ABOUT A LIBRARY IT HAS READ, asked of the test library where it
// stands. The fault fixture in `wellformed.test.ts` proves what the compiler REFUSES; this proves
// what it SEES when there is nothing to refuse — every book, every chapter, every edge with both its
// ends, every reference — because a structure that quietly saw less than the library said would
// pass every refusal test and still be wrong.
const { found, card } = read();
const made = structure(found);

describe('the test library, read', () => {
    it('is five books, and holds together', () => {
        expect(found.books.map(book => book.folder).sort()).toEqual(['libby', 'paper', 'persona', 'projects', 'the-library']);
        expect(wellformed(made)).toEqual([]);
    });

    it('names every book by its cover and every chapter within its book, each by its title form', () => {
        expect(made.named.get('the-library')).toBe('The Library');
        expect(made.named.get('paper/1-the-argument.tsx')).toBe('The Argument');
        expect(made.of('A Paper / The Evidence')).toBe('paper/2-the-evidence.tsx');
        expect(made.of('The Evidence')).toBeUndefined();
    });

    // A COVER'S SECOND TITLE FORM, NAMING ITS OWN BOOK, IS ITS ABOUT — and a book is a subject another
    // may be filed under only when it is about something. Doug, 2026-09-25: "Any book can be About
    // something, but that allows other books to then be able to use it as a subject catalogue."
    it('reads a cover\'s second title form, naming its book, as what the book is about', () => {
        expect(made.about).toEqual(new Set(['the-library', 'libby', 'persona']));
        expect(made.titledTwice).toEqual([]);
    });

    it('reads a cover that gives its words as naming the book behind them', () => {
        expect(made.authorOf.get('the-library')).toBe('libby');
        expect(made.subjectOf.get('projects')).toBe('the-library');
    });

    // A BOOK THAT IS ITS OWN SUBJECT IS THE ONE CATALOGUE EDGE ASSERTED FROM ONE END. It says so on
    // its cover and lists itself nowhere, because the self-reference IS the type — there is no other
    // end to corroborate it from. And an author edge is said by its By alone since 2026-09-25, when
    // Subject collapsed the author syntax. Every other edge is whole, or it is a fault.
    it('sees every catalogue edge from both of its ends, and every author edge from its By alone', () => {
        const halves: string[] = [];
        for (const edge of made.edges.values()) {
            const ends = new Set(edge.ends.map(end => end.end));
            if (edge.relation === 'author') { expect(ends, `author: ${edge.from} -> ${edge.to}`).toEqual(new Set(['target'])); continue; }
            if (edge.from === edge.to) { halves.push(`${edge.relation}:${edge.from}`); continue; }
            expect(ends, `${edge.relation}: ${edge.from} -> ${edge.to}`).toEqual(new Set(['source', 'target']));
        }
        expect(halves).toEqual(['subject:the-library']);
    });

    it('colours as authors the one book by its own subject and the books it catalogues', () => {
        expect(made.origin).toBe('libby');
        expect(made.authors).toEqual(new Set(['libby', 'persona']));
    });

    it('reaches a relative reference from where it stands and refuses it from elsewhere', () => {
        expect(made.reaches(name('./The Evidence'), 'paper')).toBe('paper/2-the-evidence.tsx');
        expect(made.reaches(name('./The Evidence'), 'libby')).toBeUndefined();
        expect(made.reaches(name('A Paper / The Evidence'), 'libby')).toBe('paper/2-the-evidence.tsx');
    });

    it('collects every reference written in the file, in a string as much as in prose', () => {
        const said = made.mentions.filter(mention => mention.by === 'paper/1-the-argument.tsx').map(mention => mention.said);
        expect(said).toEqual(['./The Evidence', 'The Library', './The Evidence', 'Some Projects / The Work', 'Libby']);
    });

    // A TABLE IS READ OFF THE NOTATION AND OFF NO ELEMENT — Doug, 2026-09-25: "You don't need the
    // compiler to check for anything. You can't! They might subclass them. That's why they are in
    // special files." A chapter is listed by a reference to it, a book by the answer the table gives.
    it('reads a table\'s listings: its chapters by reference, and a book it catalogues by its answer, with its synopsis', () => {
        const listings = [...(made.lists.get('libby')?.values() ?? [])];
        expect(listings.filter(l => l.kind === 'chapter').map(l => l.of).sort())
            .toEqual(['libby/.synopsis.tsx', 'libby/.table.tsx', 'libby/1-who-i-am.tsx']);
        expect(listings.filter(l => l.kind === 'book')).toMatchObject([{ of: 'persona', canonical: true, synopsis: true }]);
    });
});

describe('the catalogue over it', () => {
    // A CHAPTER IS A ROUTE OF ITS BOOK — Doug, 2026-09-26: "The book is a static page returned by
    // github pages, the chapters are routes on a local spa."
    it('answers a book with its page and a chapter with its own page under it', () => {
        expect(card.where('The Library')).toBe('/the-library/');
        expect(card.where('A Paper / The Evidence')).toBe('/a-paper/the-evidence/');
        expect(card.table.routes.find(route => route.name === 'A Paper')?.chapters.map(chapter => chapter.address))
            .toEqual(['/a-paper/synopsis', '/a-paper/table-of-contents', '/a-paper/the-argument', '/a-paper/the-evidence']);
    });

    // EVERY CHAPTER HAS ITS ROUTE, and the compiler never reads whether its title prints — Doug,
    // 2026-09-20: "if you are parsing like that, you have broken polymorphism… The compiler just
    // cares that things are in the right file."
    it('answers a chapter by its route whether or not its title prints', () => {
        expect(made.spots.get('the-library/.synopsis.tsx')?.kind).toBe('chapter');
        expect(card.where('The Library / Synopsis')).toBe('/the-library/synopsis/');
        expect(card.where('The Library / Table of Contents')).toBe('/the-library/table-of-contents/');
    });

    it('and an anchor a chapter allocates is a spot of its book, reached by name and addressed on its chapter\'s page', () => {
        const anchor = made.spots.get('the-library/1-the-shelves.tsx#The First Shelf');
        expect(anchor?.kind).toBe('anchor');
        expect(made.of('The Library / The First Shelf')).toBe(anchor?.id);
        expect(card.where('The Library / The First Shelf')).toBe('/the-library/the-shelves/#the-first-shelf');
    });

    it('refuses by non-membership alone', () => {
        expect(card.where('The Evidence')).toBeUndefined();
        expect(card.where('A Paper / Nowhere')).toBeUndefined();
    });
});
