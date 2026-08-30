import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Type } from '@/notation/Type';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';
import { $Chapter } from '@/book/Chapter';
import { $Book, $TypeOfBook } from '@/book/Book';
import { $TypeOfChapter } from '@/book/Chapter';
import { $$ } from '@/utilities/Lib';
import { built, chain, drawn, letter, paragraph, section, sentence, shown, title, word } from './written';

const Chapter = $($Chapter);
const Book = $($Book);

const chapter = (copy: string) => <Chapter>{chain.Section(copy)}</Chapter>;
const book = (...inside: ReactNode[]) => <Book>{inside}</Book>;

describe('a chapter is a document, and a book is a file of them', () => {
    it('a chapter IS a document', () => {
        expect(built<$Chapter>(chapter('a'))).toBeInstanceOf($Document);
    });

    it('a book IS a file', () => {
        expect(built<$Book>(book(chapter('a')))).toBeInstanceOf($File);
    });

    it('a book composes its chapters', () => {
        const one = built<$Book>(book(chapter('a'), chapter('b')));
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $Chapter)).toBe(true);
    });

    it('and the chapter at zero is its first part', () => {
        expect(built<$Book>(book(chapter('a'), chapter('b'))).parts()[0].copy).toBe('a');
    });

    it('a chapter answers to Document, because a chapter IS one', () => {
        const one = built<$Chapter>(chapter('a'));
        expect($$(one)($Document)).toBe(true);
        expect($$(one, $Document)).toBe(one);
    });

    it('AND A PIECE OF WRITING BEHAVES AS A BOOK when it carries the type', () => {
        const { writing } = drawn(chapter('a'), chapter('b'), <Type>Book</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfBook);
        const asBook = $$(writing, $Book);
        expect(asBook).toBeInstanceOf($Book);
        expect(asBook.parts().length).toBe(2);
        expect(asBook.parts().every(part => part instanceof $Chapter)).toBe(true);
    });
});

describe('the whole ladder specifies, from the top, when everything is right', () => {
    // THE HAPPY PATH AT THE TOP LEVEL, which nothing covered until now — every other
    // level asserts that specify() does not throw on valid writing, and the book did
    // not. Doug, 2026-08-30: "the specification tests should actually cover the top
    // level specify path — when everything is correct. That gives some coverage there."
    //
    // It matters more since specification left the bond constructor: nothing runs a
    // rule unless something asks, so the ONLY proof that a correct book satisfies its
    // own type is a test that asks.
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
        expect(() => one.parts()[0].parts()[0].specify()).not.toThrow();
    });
});

describe('a book carries only its own type, and still keeps a file’s constraints', () => {
    it('carries $TypeOfBook alone', () => {
        const one = built<$Book>(book(chapter('a')));
        expect(one.type).toBeDefined();
        expect(one.type).toBeInstanceOf($TypeOfBook);
    });

    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('and a FILE constraint still refuses it, through inheritance rather than a second type', () => {
        expect(() => built<$Book>(<Book>{[chain.Paragraph('a')]}</Book>).specify()).toThrow(/a file is written as documents/);
    });

    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('a chapter likewise carries only $TypeOfChapter, and a DOCUMENT constraint still applies', () => {
        const one = built<$Chapter>(chapter('a'));
        expect(one.type).toBeDefined();
        expect(one.type).toBeInstanceOf($TypeOfChapter);
        expect(() => built<$Chapter>(<Chapter>{[word(letter('h'))]}</Chapter>).specify()).toThrow(/a document is written as sections/);
    });

    it('and a book composes CHAPTERS where a file composes documents', () => {
        const one = built<$Book>(book(chapter('a'), chapter('b')));
        expect(one.parts().length).toBe(2);
        expect(one.parts().every(part => part instanceof $Chapter)).toBe(true);
        expect(one.parts().every(part => part instanceof $Document)).toBe(true);
    });
});

describe('a book is a composition of chapters, and satisfies being a composition of documents', () => {
    it('read AS A FILE it composes documents, and they are the very chapters', () => {
        const one = built<$Book>(book(chapter('a'), chapter('b')));
        const asFile = $$(one, $File);
        expect(asFile).toBe(one);
        expect(asFile.parts().length).toBe(2);
        expect(asFile.parts().every(part => part instanceof $Document)).toBe(true);
        expect(asFile.parts()[0]).toBe(one.parts()[0]);
    });

    it('and a piece of writing told it is a Book answers the same way as a file', () => {
        const { writing } = drawn(chapter('a'), chapter('b'), <Type>Book</Type>);
        expect($$(writing)($File)).toBe(true);
        expect($$(writing, $File).parts().every(part => part instanceof $Document)).toBe(true);
    });
});
