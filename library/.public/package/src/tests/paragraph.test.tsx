import { describe, it, expect } from 'vitest';
import { Type } from '@/notation/Type';
import { $Paragraph, $TypeOfParagraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $$ } from '@/utilities/Lib';
import { built, chain, declares, drawn, paragraph, shown, Paragraph } from './written';

const three = () => built<$Paragraph>(paragraph(chain.Sentence('a'), chain.Sentence('b'), chain.Sentence('c')));

describe('$Paragraph composes $Sentence', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Sentence)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfParagraph);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('declares the four itself, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single'])
            expect(!declares($Paragraph, member)).toBe(false);
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Paragraph composes the same', () => {
        const { writing } = drawn(chain.Sentence('h'), chain.Sentence('i'), <Type>Paragraph</Type>);
        expect($$(writing)($Paragraph)).toBe(true);
        expect($$(writing, $Paragraph).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('a paragraph is one paragraph', () => {
    it('refuses prose broken by a blank line, and says why', () => {
        expect(() => built<$Paragraph>(<Paragraph>{'one\n\ntwo'}</Paragraph>).specify()).toThrow(/unbroken by a blank line/);
    });

    it('and accepts prose under single newlines', () => {
        expect(() => built<$Paragraph>(<Paragraph>{'one\ntwo'}</Paragraph>).specify()).not.toThrow();
    });
});
