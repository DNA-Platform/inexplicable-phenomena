import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Type } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter, $TypeOfChapter } from '@/book/Chapter';
import { $Book, $TypeOfBook } from '@/book/Book';
import { reflection } from '@/utilities/Reflection';
import { built, chain, drawn, letter, paragraph, section, sentence, title, word } from './written';

const Chapter = $($Chapter);
const Book = $($Book);

const chapter = (copy: string) => <Chapter>{chain.Section(copy)}</Chapter>;
const book = (...inside: ReactNode[]) => <Book>{inside}</Book>;

describe('the seven levels end at the book, and the book composes chapters', () => {
    it('a chapter stands as a chapter', () => {
        expect(reflection.stands(built<$Chapter>(chapter('a')), 'Chapter')).toBe(true);
    });

    it('a book stands as a book', () => {
        expect(reflection.stands(built<$Book>(book(chapter('a'))), 'Book')).toBe(true);
    });

    it('a book composes its chapters', () => {
        const one = built<$Book>(book(chapter('a'), chapter('b')));
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $Chapter)).toBe(true);
    });

    it('and the chapter at zero is its first part', () => {
        expect(built<$Book>(book(chapter('a'), chapter('b'))).parts()[0].copy).toBe('a');
    });

    it('AND A PIECE OF WRITING BEHAVES AS A BOOK when it carries the type', () => {
        const { writing } = drawn(chapter('a'), chapter('b'), <Type>Book</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfBook);
        expect(writing instanceof $Book).toBe(false);
        expect(writing.parts().length).toBe(2);
        expect(writing.parts().every(part => part instanceof $Chapter)).toBe(true);
    });
});

describe('the whole ladder specifies, from the top, when everything is right', () => {
    // THE HAPPY PATH AT THE TOP LEVEL, which nothing covered until now — every other
    // level asserts that specify() does not throw on valid writing, and the book did
    // not. Doug, 2026-08-30: "the specification tests should actually cover the top
    // level specify path — when everything is correct. That gives some coverage there."
    it('a well-formed book satisfies its own specification', () => {
        expect(() => built<$Book>(book(chapter('a'), chapter('b'))).specify()).not.toThrow();
    });

    // ONE LEVEL AT A TIME, and each asked separately rather than by descending a
    // whole tree. The section here is built WITH its title on purpose: chain.Section
    // in written.tsx has none, which the `a section opens with its title` rule now
    // refuses — a real finding this test made, recorded rather than papered over by
    // changing a fixture eighteen files depend on.
    it('and so does every level beneath it, asked one at a time', () => {
        const titled = <Chapter>{section(title('t'), paragraph(sentence(word(letter('a')))))}</Chapter>;
        const one = built<$Book>(book(titled));
        expect(() => one.specify()).not.toThrow();
        expect(() => one.parts()[0].specify()).not.toThrow();
        expect(() => (one.parts()[0] as $Composition).parts()[0].specify()).not.toThrow();
    });
});

describe('a book carries only its own type', () => {
    it('carries $TypeOfBook alone', () => {
        const one = built<$Book>(book(chapter('a')));
        expect(one.type).toBeDefined();
        expect(one.type).toBeInstanceOf($TypeOfBook);
    });

    it('and the book constraint refuses a paragraph written where a chapter belongs', () => {
        expect(() => built<$Book>(<Book>{[chain.Paragraph('a')]}</Book>).specify()).toThrow(/a book is written as chapters/);
    });

    it('a chapter likewise carries only $TypeOfChapter, and its constraint still applies', () => {
        const one = built<$Chapter>(chapter('a'));
        expect(one.type).toBeDefined();
        expect(one.type).toBeInstanceOf($TypeOfChapter);
        expect(() => built<$Chapter>(<Chapter>{[word(letter('h'))]}</Chapter>).specify()).toThrow(/is written as sections/);
    });

    it('and a book composes CHAPTERS, standing and instanced alike', () => {
        const one = built<$Book>(book(chapter('a'), chapter('b')));
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $Chapter)).toBe(true);
        expect(one.parts().every(part => reflection.stands(part, 'Chapter'))).toBe(true);
    });
});
