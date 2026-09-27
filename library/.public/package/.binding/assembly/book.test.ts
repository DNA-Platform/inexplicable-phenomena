import { describe, expect, it } from 'vitest';
import { read } from '../.test/galleys';
import { assembled } from './book';

// WHAT THE COMPILER WRITES FOR A BOOK: a module whose `book` is a function calling each chapter
// function once, in the order of its files, inside the class `.book.tsx` declares — Doug, 2026-09-25:
// "We will write them as functions - empty function components - and they will be called when a
// book renders. So too for books."
const { found } = read();
const paper = found.books.find(book => book.folder === 'paper');

describe('the module the compiler writes for a book', () => {
    const text = paper === undefined ? '' : assembled(paper, '../paper');

    it('exports book, a function of the element, taking nothing — the bookmark is set on the instance by whoever draws it', () => {
        expect(text).toContain('export const book = () => (');
    });

    it('calls each chapter function once, in the order of its files, inside the book class', () => {
        const calls = [...text.matchAll(/^\s+\{(\w+)\(\)\}$/gmu)].map(call => call[1]);
        expect(calls).toEqual(['Cover', 'Synopsis', 'Table', 'TheArgument1', 'TheEvidence2']);
        expect(text.indexOf('<Book>')).toBeLessThan(text.indexOf('{Cover()}'));
        expect(text.indexOf('{TheEvidence2()}')).toBeLessThan(text.indexOf('</Book>'));
    });

    it('imports each chapter as the function it is, and lifts only the book class', () => {
        expect(text).toContain("import TheArgument1 from '../paper/1-the-argument';");
        expect(text).toContain("import $Book from '../paper/.book';");
        expect(text).toContain('const Book = $($Book);');
        expect(text).not.toContain('$(TheArgument1)');
    });
});
