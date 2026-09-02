import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Composition } from '@/writing/Composition';
import { $Paragraph } from '@/writing/Paragraph';
import { $$ } from '@/utilities/Lib';
import { built, chain, declares, drawn, section, shown, word, letter, title, Section } from './written';

const three = () => built<$Section>(section(title('t'), chain.Paragraph('a'), chain.Paragraph('b'), chain.Paragraph('c')));

describe('$Section composes $Paragraph', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['t', 'a', 'b', 'c']);
        expect(three().parts().every(one => $$(one)($Paragraph))).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('t');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfSection);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('affords the four from composition, narrowed, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Section, member)).toBe(false);
        }
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['t', 'a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['t', 'a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(8);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Section composes the same', () => {
        const { writing } = drawn(title('t'), chain.Paragraph('h'), chain.Paragraph('i'), <Type>Section</Type>);
        expect($$(writing)($Section)).toBe(true);
        expect($$(writing, $Section).parts().map(one => one.copy)).toEqual(['t', 'h', 'i']);
    });
});

describe('a section is written as paragraphs', () => {
    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('refuses a word written where a paragraph belongs, and says why', () => {
        expect(() => built<$Section>(<Section>{[word(letter('h'))]}</Section>).specify()).toThrow(/a section is written as paragraphs/);
    });

    it('and accepts a section of paragraphs', () => {
        expect(() => three().specify()).not.toThrow();
    });
});

describe('a section may be written as a title and a string of text', () => {
    it('takes the text as ONE paragraph, first character to last', () => {
        const one = built<$Section>(<Section>{[title('A title'), 'some prose here']}</Section>);
        expect(() => one.specify()).not.toThrow();
        expect(one.parts().length).toBe(2);
        expect(one.parts()[1].copy).toBe('some prose here');
    });

    it('and does not divide that text further', () => {
        const one = built<$Section>(<Section>{[title('A title'), 'one. two. three.']}</Section>);
        expect(one.parts().length).toBe(2);
        expect(one.parts()[1].copy).toBe('one. two. three.');
    });
});
