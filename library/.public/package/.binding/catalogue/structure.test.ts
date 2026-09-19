import { describe, expect, it } from 'vitest';
import { read } from '../.test/staging';
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
        expect(found.books.map(book => book.folder).sort()).toEqual(['paper', 'persona', 'projects', 'the-library', 'the-log']);
        expect(wellformed(made)).toEqual([]);
    });

    it('names every book by its cover and every chapter within its book', () => {
        expect(made.named.get('the-library')).toBe('The Library');
        expect(made.named.get('paper/1-the-argument.tsx')).toBe('The Argument');
        expect(made.of('A Paper / The Evidence')).toBe('paper/2-the-evidence.tsx');
        expect(made.of('The Evidence')).toBeUndefined();
    });

    it('reads a cover that gives its words as naming the book behind them', () => {
        expect(made.authorOf.get('the-library')).toBe('the-log');
        expect(made.subjectOf.get('projects')).toBe('the-library');
    });

    // THE TWO SPINES ARE THE ONLY EDGES ASSERTED FROM ONE END. A book that is its own subject says
    // so on its cover and lists itself nowhere, because the self-reference IS the type — there is
    // no other end to corroborate it from. Every other edge is whole, or it is a fault.
    it('sees every edge from both of its ends, except the two that a book asserts of itself', () => {
        const halves: string[] = [];
        for (const edge of made.edges.values()) {
            const ends = new Set(edge.ends.map(end => end.end));
            if (edge.from === edge.to) { halves.push(`${edge.relation}:${edge.from}`); continue; }
            expect(ends, `${edge.relation}: ${edge.from} -> ${edge.to}`).toEqual(new Set(['source', 'target']));
        }
        expect(halves.sort()).toEqual(['author:the-log', 'subject:the-library']);
    });

    it('colours the tree from the one book that authors itself', () => {
        expect(made.origin).toBe('the-log');
        expect(made.authors).toEqual(new Set(['the-log', 'persona']));
    });

    it('reaches a relative reference from where it stands and refuses it from elsewhere', () => {
        expect(made.reaches(name('./The Evidence'), 'paper')).toBe('paper/2-the-evidence.tsx');
        expect(made.reaches(name('./The Evidence'), 'the-log')).toBeUndefined();
        expect(made.reaches(name('A Paper / The Evidence'), 'the-log')).toBe('paper/2-the-evidence.tsx');
    });

    it('collects every reference written in the file, in a string as much as in prose', () => {
        const said = made.mentions.filter(one => one.kind === 'reference' && one.by === 'paper/1-the-argument.tsx').map(one => one.said);
        expect(said).toEqual(['./The Evidence', 'The Library', './The Evidence', 'Some Projects / The Work', 'The Log']);
    });

    // A TABLE THAT BINDS THE MENTION THROUGH A LOCAL — `const Book = $(book)` — is read as
    // mentioning, and a chapter that composed a `<Book>` would not be. The name is not the thing.
    it('reads a mention by what its tag is bound to, not by what the file called it', () => {
        const listed = [...(made.lists.get('the-log')?.values() ?? [])].filter(one => one.kind === 'book');
        expect(listed.map(one => one.of).sort()).toEqual(['persona', 'projects', 'the-library']);
        expect(listed.find(one => one.of === 'persona')?.canonical).toBe(true);
        expect(listed.find(one => one.of === 'projects')?.canonical).toBe(false);
    });
});

describe('the catalogue over it', () => {
    it('answers a book with its page and a chapter with its page and a fragment', () => {
        expect(card.where('The Library')).toBe('/the-library/');
        expect(card.where('A Paper / The Evidence')).toBe('/a-paper/#the-evidence');
    });

    // A CHAPTER WHOSE TITLE DOES NOT PRINT HAS NO HEADING ON THE PAGE AND SO NO ID; its address is
    // the page it is part of. Doug: "Shouldn't it just be the url?"
    it('answers a chapter whose title does not print with its page alone', () => {
        expect(made.spots.get('the-library/.synopsis.tsx')?.prints).toBe(false);
        expect(made.spots.get('the-library/1-the-shelves.tsx')?.prints).toBe(true);
        expect(card.where('The Library / What This Is')).toBe('/the-library/');
        expect(card.where('The Library / Table of Contents')).toBe('/the-library/');
    });

    it('refuses by non-membership alone', () => {
        expect(card.where('The Evidence')).toBeUndefined();
        expect(card.where('A Paper / Nowhere')).toBeUndefined();
    });
});
