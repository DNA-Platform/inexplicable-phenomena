import { describe, expect, it } from 'vitest';
import { walk } from '../inventory/walk';
import { configured, fixture } from '../.test/staging';
import { catalogue } from './catalogue';
import { name } from './language';
import { structure } from './structure';
import { wellformed } from './wellformed';

// WHAT THE STRUCTURE PROMISES ABOUT A LIBRARY IT HAS READ, asked of the test library where it
// stands. The fault fixture in `wellformed.test.ts` proves what the compiler REFUSES; this proves
// what it SEES when there is nothing to refuse — every book, every chapter, every edge with both its
// ends, every reference — because a structure that quietly saw less than the library said would
// pass every refusal test and still be wrong.
const chosen = configured();
const found = walk(fixture, chosen);
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

    it('collects every reference written in prose, with the words it was written with', () => {
        const said = made.mentions.filter(one => one.kind === 'reference' && one.by === 'paper/1-the-argument.tsx').map(one => one.said);
        expect(said).toEqual(['The Library', './The Evidence', 'Some Projects / The Work', 'The Log']);
    });
});

describe('the catalogue over it', () => {
    const card = catalogue(found, chosen);

    it('answers a book with its page and a chapter with its page and a fragment', () => {
        expect(card.where('The Library')).toBe('/the-library/');
        expect(card.where('A Paper / The Evidence')).toBe('/a-paper/#the-evidence');
    });

    it('refuses by non-membership alone', () => {
        expect(card.where('The Evidence')).toBeUndefined();
        expect(card.where('A Paper / Nowhere')).toBeUndefined();
    });
});
