import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Word, $TypeOfWord } from '@/writing/Word';
import { $Composition } from '@/writing/Composition';
import { $Letter } from '@/writing/Letter';
import { reflection } from '@/utilities/Reflection';
import { built, chain, declares, drawn, letter, word, Word , shown } from './written';

const three = () => built<$Word>(word(chain.Letter('a'), chain.Letter('b'), chain.Letter('c')));

describe('$Word composes $Letter', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Letter)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfWord);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('affords the four from composition, narrowed, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Word, member)).toBe(false);
        }
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Word composes the same', () => {
        const { writing } = drawn(chain.Letter('h'), chain.Letter('i'), <Type>Word</Type>);
        expect(reflection.stands(writing, 'Word')).toBe(true);
        expect(writing.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('$Word divides prose into its letters', () => {
    it('makes a letter for each grapheme, in written order', () => {
        expect(built<$Word>(<Word>hi</Word>).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and a written letter stands among divided ones, in order', () => {
        const one = built<$Word>(<Word>{['h', letter('\u{1F642}'), 'i']}</Word>);
        expect(one.parts().map(part => part.copy)).toEqual(['h', '\u{1F642}', 'i']);
        expect(one.parts().map(part => (part as $Letter).kind)).toEqual(['alphabetical', 'symbolic', 'alphabetical']);
    });

    it('the CANONICAL word has a letter or a number in it', () => {
        expect(built<$Word>(<Word>hi</Word>).canonical).toBe(true);
        expect(built<$Word>(<Word>7</Word>).canonical).toBe(true);
        expect(built<$Word>(<Word>...</Word>).canonical).toBe(false);
        expect(built<$Word>(<Word>{'   '}</Word>).canonical).toBe(false);
    });

    it('and every letter it divides answers as a letter', () => {
        expect(built<$Word>(<Word>hi</Word>).parts().every(one => one instanceof $Letter)).toBe(true);
    });
});

describe('what a word is allowed to be', () => {
    it('a writing told it is a Word must be one unbroken stretch', () => {
        const { writing } = drawn('Hey Jim!', <Type>Word</Type>);
        expect(() => writing.specify()).toThrow(/one unbroken stretch/);
    });

    it('and an unbroken one passes, whether or not it is canonical', () => {
        expect(() => drawn('Jim', <Type>Word</Type>).writing.specify()).not.toThrow();
        expect(() => drawn('!', <Type>Word</Type>).writing.specify()).not.toThrow();
    });
});

describe('the type specifies, where the word would have drawn', () => {
    it('an unbroken stretch draws, and a broken one says why it does not', () => {
        expect(shown(<Word>Jim</Word>)).toBe('Jim');
        expect(() => built<$Word>(<Word>Hey Jim!</Word>).specify()).toThrow(/a word is one unbroken stretch/);
    });

    it('and a non-canonical word still draws — validity and canonical are different questions', () => {
        expect(shown(<Word>!</Word>)).toBe('!');
        expect(built<$Word>(<Word>!</Word>).canonical).toBe(false);
    });
});
