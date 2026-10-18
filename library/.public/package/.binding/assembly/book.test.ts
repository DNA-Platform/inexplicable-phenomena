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
        expect(text).not.toContain('Append');
    });

    // Doug, 2026-10-17: "Why can't we have 027-2? We might want to use sequential numbering to order chapters."
    // The file keeps its name; the symbol the module imports it by begins with a letter.
    it('imports a chapter whose name after its number opens with a digit by a symbol that opens with a letter', () => {
        const numbered = paper === undefined ? undefined : { ...paper, files: [...paper.files, 'o27-2-semantic-frames.tsx'] };
        const written = numbered === undefined ? '' : assembled(numbered, '../paper');
        expect(written).toContain("import Chapter2SemanticFrameso27 from '../paper/o27-2-semantic-frames';");
        expect(written).toContain('        {Chapter2SemanticFrameso27()}');
        const symbols = [...written.matchAll(/^import (\w+) from/gmu)].map(declared => declared[1]);
        expect(symbols.every(symbol => /^[A-Za-z_$]/u.test(symbol))).toBe(true);
    });

    // Found 2026-10-18 binding every conversation of his: an artifact titled in Russian made a version chapter
    // `o1-объединенная-карта-северной-онтарио-v1.tsx`, and `\w` being ASCII left its dashes in the symbol.
    it('imports a chapter named in any alphabet by a symbol that is an identifier', () => {
        const files = ['o1-объединенная-карта-северной-онтарио-v1.tsx', '2-mc²-and-energy.tsx', '3-²-alone.tsx', '4-हिन्दी-भाषा.tsx'];
        const named = paper === undefined ? undefined : { ...paper, files: [...paper.files, ...files] };
        const written = named === undefined ? '' : assembled(named, '../paper');
        expect(written).toContain("import ОбъединеннаяКартаСевернойОнтариоV1o1 from '../paper/o1-объединенная-карта-северной-онтарио-v1';");
        expect(written).toContain("import McAndEnergy2 from '../paper/2-mc²-and-energy';");
        expect(written).toContain("import Alone3 from '../paper/3-²-alone';");
        for (const declared of written.matchAll(/^import (\S+) from/gmu))
            expect(() => new Function(`let ${declared[1]};`), declared[1]).not.toThrow();
    });

    // THE BINDER APPENDS NOTHING — Sprint 92, Doug, 2026-09-28: "append is the authors. You remove the
    // flexibility if you have the binder do it." A file beside a chapter reaches the page through the literal
    // the transform inserts, or an Append the author writes; the module knows only the chapters.
    it('appends nothing to a chapter, however many files stand beside it', () => {
        const manual = found.books.find(book => book.folder === 'manual');
        const written = manual === undefined ? '' : assembled(manual, '../manual');
        expect(manual?.resources.size).toBeGreaterThan(0);
        expect(written).not.toContain('?raw');
        expect(written).not.toContain('Append');
        expect(written).not.toContain('cloneElement');
        expect(written).not.toMatch(/import [^\n]*\.(png|svg|html)/u);
        expect(written).toContain('        {TheMastheadAndTheByline3()}');
    });
});
