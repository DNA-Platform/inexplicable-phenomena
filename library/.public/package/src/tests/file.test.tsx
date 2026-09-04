import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Book, $TypeOfBook } from '@/book/Book';
import { $Composition } from '@/writing/Composition';
import { reflection } from '@/utilities/Reflection';
import { built, chain, declares, drawn, book, word, letter } from './written';

const three = () => built<$Book>(book(chain.Chapter('a'), chain.Chapter('b'), chain.Chapter('c')));

describe('$Book composes $Chapter', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['Ta', 'Tb', 'Tc']);
        expect(three().parts().every(one => reflection.is(one, 'Chapter'))).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('Ta');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfBook);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('affords the four from composition and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Book, member)).toBe(false);
        }
        const one = three();
        expect(one.where(part => part.copy !== 'Tb').map(part => part.copy)).toEqual(['Ta', 'Tc']);
        expect(one.select(part => part.copy)).toEqual(['Ta', 'Tb', 'Tc']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'Tb').copy).toBe('Tb');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Book composes the same', () => {
        const { writing } = drawn(chain.Chapter('h'), chain.Chapter('i'), <Type>Book</Type>);
        expect(reflection.is(writing, 'Book')).toBe(true);
        expect(writing.parts().map(one => one.copy)).toEqual(['Th', 'Ti']);
    });
});

describe('a book is written as chapters', () => {
    it('refuses a word written where a chapter belongs, and says why', () => {
        expect(() => built<$Book>(book(word(letter('x')))).specify()).toThrow(/a book is written as chapters/);
    });

    it('and accepts a book of chapters', () => {
        expect(() => three().specify()).not.toThrow();
    });
});
