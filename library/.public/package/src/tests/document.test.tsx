import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from '@/book/Chapter';
import { $Composition } from '@/writing/Composition';
import { $Section } from '@/writing/Section';
import { reflection } from '@/utilities/Reflection';
import { built, chain, declares, chapter, drawn, letter, word, Chapter } from './written';

const three = () => built<$Chapter>(chapter(chain.Section('a'), chain.Section('b'), chain.Section('c')));

describe('$Chapter composes $Section', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Section)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfChapter);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('affords the four from composition and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Chapter, member)).toBe(false);
        }
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Chapter composes the same', () => {
        const { writing } = drawn(chain.Section('h'), chain.Section('i'), <Type>Chapter</Type>);
        expect(reflection.stands(writing, 'Chapter')).toBe(true);
        expect(writing.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('a chapter is written as sections, or as a title and paragraphs', () => {
    it('accepts a chapter of sections', () => {
        expect(() => three().specify()).not.toThrow();
    });

    it('accepts a title and paragraphs, and wraps them in ONE section', () => {
        const one = built<$Chapter>(<Chapter>{[chain.Paragraph('a'), chain.Paragraph('b')]}</Chapter>);
        expect(() => one.specify()).not.toThrow();
        expect(one.parts().length).toBe(1);
        const first = one.parts()[0];
        expect(first).toBeInstanceOf($Composition);
        expect((first as $Composition).parts().length).toBe(2);
    });

    it('and refuses a word, which is neither', () => {
        expect(() => built<$Chapter>(<Chapter>{[word(letter('h'))]}</Chapter>).specify()).toThrow(/is written as sections/);
    });
});
