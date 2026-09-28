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

    // A FILE ACCOMPANYING A CHAPTER IS APPENDED TO IT IN THE MODULE — Sprint 89, Doug, 2026-09-28: "by annotation
    // that has the filename appended to chapter by the binder"; "it's just text that has been appended to the chapter."
    it('appends each file accompanying a chapter to it as an Append, its contents imported raw and its identifier and type as spelled', () => {
        const manual = found.books.find(book => book.folder === 'manual');
        const written = manual === undefined ? '' : assembled(manual, '../manual');
        expect(written).toContain("import appended03themastheadandthebylinecodetsx from '../manual/3-the-masthead-and-the-byline.code.tsx?raw';");
        expect(written).toMatch(/\{appending\(TheMastheadAndTheByline3\(\), <Append identifier="code" type="\.tsx">\{appended03themastheadandthebylinecodetsx\}<\/Append>\)\}/u);
        // A PICTURE IS NEVER IMPORTED: its Append's text is its address beside the book's pages, where the binder copies it.
        expect(written).not.toMatch(/import [^\n]*\.png/u);
        expect(written).toContain(`<Append identifier="" type=".png">{'/manual/6-the-mark-and-the-photograph.png'}</Append>`);
        expect(written).toMatch(/<Append identifier="" type="\.svg">\{appended\d+6themarkandthephotographsvg\}<\/Append>/u);
        expect(written).toContain("import { Append } from '@dna-platform/public';");
        expect(written).toContain('cloneElement(chapter, undefined, ...[chapter.props.children].flat(), ...appends)');
    });
});
