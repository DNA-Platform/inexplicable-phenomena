import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $TypeOfBook } from '@/book/Book';
import { $Book } from '@/book/Book';
import { reflection } from '@/utilities/Reflection';
import { built, chain, drawn, book, letter } from './written';

describe('a piece of writing that carries a type BEHAVES as that type', () => {
    it('carries the type it was written with, resolved from the name', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>);
        expect(writing.type).toBeDefined();
        expect(reflection.stands(writing, 'Chapter')).toBe(true);
    });

    it('IS a book, in the sense of the reading, and is not a word', () => {
        const { writing } = drawn(chain.Chapter('a'), <Type>Book</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfBook);
        expect(reflection.stands(writing, 'Book')).toBe(true);
        expect(reflection.stands(writing, 'Word')).toBe(false);
    });

    it('and nothing is built to read it — the writing composes the chapters written inside it', () => {
        const { writing } = drawn(chain.Chapter('a'), chain.Chapter('b'), <Type>Book</Type>);
        expect(writing instanceof $Book).toBe(false);
        expect(writing.parts().length).toBe(2);
    });

    it('a written Book and a writing that behaves as one answer alike', () => {
        const direct = built<$Book>(book(chain.Chapter('a'), chain.Chapter('b')));
        const behaving = drawn(chain.Chapter('a'), chain.Chapter('b'), <Type>Book</Type>).writing;
        expect(behaving.parts().length).toBe(direct.parts().length);
        expect(behaving.copy).toBe(direct.copy);
    });

    it('the same shape at word grade, with letters', () => {
        const behaving = drawn(letter('h'), letter('i'), <Type>Word</Type>).writing;
        expect(behaving.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and it reaches down a real ladder', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Chapter</Type>);
        expect(writing.parts().length).toBe(1);
        const first = writing.parts()[0];
        expect(first).toBeInstanceOf($Composition);
        expect((first as $Composition).parts().length).toBe(1);
    });

    it('a written level and one told what it is BOTH carry the same type', () => {
        const direct = built<$Book>(book(chain.Chapter('a')));
        const { writing } = drawn(chain.Chapter('a'), <Type>Book</Type>);
        expect(direct.type).toBeInstanceOf($TypeOfBook);
        expect(writing.type).toBeInstanceOf($TypeOfBook);
    });
});
