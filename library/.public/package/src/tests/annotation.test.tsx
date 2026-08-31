import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Annotation, $Writing, $Type, Type } from '@/writing/Writing';
import { $Letter, $TypeOfLetter } from '@/writing/Letter';
import { $Word, $TypeOfWord } from '@/writing/Word';
import { $$ } from '@/utilities/Lib';
import { $Book, $TypeOfBook } from '@/book/Book';
import { $TypeOfChapter, $Chapter } from '@/book/Chapter';
import { $TypeOfFile } from '@/writing/File';
import { Word, built, chain, drawn, letter } from './written';

class $Apart extends $Chemical {
    inline = false;

    override view(): ReactNode { return <span>apart</span>; }
}
const Apart = $($Apart);
const Book = $($Book);
const Chapter = $($Chapter);

describe('an annotation is parenthetical, and that is what the lift reads', () => {
    it('an annotation says it is parenthetical', () => {
        expect(new $Annotation().parenthetical).toBe(true);
        expect(new $Type().parenthetical).toBe(true);
    });

    it('and a level says it is not', () => {
        expect(new $Letter().parenthetical).toBe(false);
        expect(new $Word().parenthetical).toBe(false);
    });
});

describe('the bond lifts what is parenthetical, and leaves it in the block', () => {
    it('writing with prose and one annotation holds both, in two places', () => {
        const { writing } = drawn('abc', <Type>Word</Type>);
        expect(writing.type).toBeDefined();
        expect(writing.type).toBeInstanceOf($TypeOfWord);
        expect((writing.block!.$elements as unknown[]).some(one => one instanceof $TypeOfWord)).toBe(true);
        expect(writing.block).toBeDefined();
    });

    it('and the reading passes over it — the copy is the prose alone', () => {
        expect(drawn('abc', <Type>Word</Type>).writing.copy).toBe('abc');
    });

    it('writing that is ONLY an annotation reads as nothing, and still carries one', () => {
        const { writing } = drawn(<Type>Word</Type>);
        expect(writing.copy).toBe('');
        expect(writing.type).toBeDefined();
    });

    it('writing with no annotation at all carries none, and specify refuses it', () => {
        const { writing } = drawn('abc');
        expect(writing.type).toBeUndefined();
        expect(() => writing.specify()).toThrow(/has a type, and this one has none/);
    });
});

describe('a piece of writing is ONE kind of writing', () => {
    it('carries a level type and a refinement of it, because that is one kind', () => {
        const { writing } = drawn(chain.Document('a'), <Type>Book</Type>);
        expect(() => writing.specify()).not.toThrow();
        expect(writing.type).toBeInstanceOf($TypeOfBook);
    });

    it('and a written Book carries ONE type, the most derived, never its ancestor as well', () => {
        const one = built<$Book>(<Book>{[<Chapter key="a">{chain.Section('a')}</Chapter>]}</Book>);
        expect(one.type).toBeDefined();
        expect(one.type).toBeInstanceOf($TypeOfBook);
        expect(one.type!.constructor).toBe($TypeOfBook);
        expect(one.type).toBeInstanceOf($TypeOfBook);
    });

    it('but it CANNOT be a book and a chapter', () => {
        const { writing } = drawn(chain.Document('a'), <Type>Book</Type>, <Type>Chapter</Type>);
        expect(() => writing.specify()).toThrow(/one kind of writing, and this one is written as two/);
    });

    it('nor a word and a letter', () => {
        const { writing } = drawn(letter('h'), <Type>Word</Type>, <Type>Letter</Type>);
        expect(() => writing.specify()).toThrow(/one kind of writing/);
    });

    it('nor a document and a chapter, though the most derived is still what it answers', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Document</Type>, <Type>Chapter</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfChapter);
        expect(() => writing.specify()).toThrow(/typed once/);
    });
});

describe('writing arrives as ONE block', () => {
    it('and something standing apart from the prose is not one of its parts', () => {
        const one = built<$Word>(<Word>{[letter('h'), <Apart key="a" />]}</Word>);
        expect(one.block).toBeDefined();
        expect(one.parts().map(part => part.copy)).toEqual(['h']);
    });
});

describe('an annotation in the block does not ruin composition', () => {
    it('a word composes its letters and NOT the type written beside them', () => {
        const one = built<$Word>(<Word>{[letter('h'), letter('i'), <Type key="t">Word</Type>]}</Word>);
        expect(one.parts().map(part => part.copy)).toEqual(['h', 'i']);
        expect(one.parts().every(part => !part.parenthetical)).toBe(true);
    });

    it('and the annotation is still in the block, and still in the specification', () => {
        const one = built<$Word>(<Word>{[letter('h'), <Type key="t">Word</Type>]}</Word>);
        expect((one.block!.$elements as unknown[]).some(part => (part as $Writing)?.parenthetical === true)).toBe(true);
        expect((one.block!.$elements as unknown[]).some(part => (part as $Writing)?.parenthetical === true)).toBe(true);
    });

    it('nor is it read — the copy is the letters alone', () => {
        expect(built<$Word>(<Word>{[letter('h'), letter('i'), <Type key="t">Word</Type>]}</Word>).copy).toBe('hi');
    });

    it('and specify does not hurt an annotation asked to specify itself', () => {
        const one = built<$Word>(<Word>{[letter('h'), <Type key="t">Word</Type>]}</Word>);
        const annotation = (one.block!.$elements as unknown[]).find(part => (part as $Writing)?.parenthetical === true) as $Writing;
        expect(annotation.parenthetical).toBe(true);
        expect(() => annotation.specify()).not.toThrow();
    });
});
