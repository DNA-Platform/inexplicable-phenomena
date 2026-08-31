import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Sentence, $TypeOfSentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $$ } from '@/utilities/Lib';
import { built, chain, declares, drawn, sentence, shown, Sentence } from './written';

const three = () => built<$Sentence>(sentence(chain.Word('a'), chain.Word('b'), chain.Word('c')));

describe('$Sentence composes $Word', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Word)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfSentence);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('declares the four itself, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single'])
            expect(!declares($Sentence, member)).toBe(false);
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Sentence composes the same', () => {
        const { writing } = drawn(chain.Word('h'), chain.Word('i'), <Type>Sentence</Type>);
        expect($$(writing)($Sentence)).toBe(true);
        expect($$(writing, $Sentence).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('a sentence stops once, at its end', () => {
    it('refuses prose that stops before its end, and says why', () => {
        expect(() => built<$Sentence>(<Sentence>{'One. Two.'}</Sentence>).specify()).toThrow(/stops once, at its end/);
    });

    it('and accepts prose that stops at its end, or not at all', () => {
        expect(() => built<$Sentence>(<Sentence>{'One two.'}</Sentence>).specify()).not.toThrow();
        expect(() => built<$Sentence>(<Sentence>{'One two'}</Sentence>).specify()).not.toThrow();
    });
});
