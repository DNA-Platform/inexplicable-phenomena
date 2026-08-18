import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word, Word } from '@/writing/Word';
import { $Letter } from '@/writing/Letter';

// NESTED WRITTEN ELEMENTS. An element written inside an element, at every
// combination of grades — because a system whose point is that you can write
// your own types has to let you write one inside another.

class $Special extends $Word {}
const Special = $($Special);

class $Inner extends $Word {}
const Inner = $($Inner);

class $Para extends $Paragraph {}
const Para = $($Para);

class $Sect extends $Section {}
const Sect = $($Sect);

const flat = (of: any): string[] => of.parts().map((p: any) => p.constructor.name);

describe('a written element may hold another written element', () => {
    it('a custom word holding a custom word', () => {
        const outer: $Special = $(<Special>BL<Inner>A</Inner>H</Special>);
        expect(outer.copy).toBe('BLAH');
        expect(outer.parts().some((p: any) => p instanceof $Inner)).toBe(true);
    });

    it('and its letters still read as the writing', () => {
        const outer: $Special = $(<Special>BL<Inner>A</Inner>H</Special>);
        expect(outer.letters.map((l: $Letter) => l.copy).join('')).toBe('BLAH');
    });

    it('a custom PARAGRAPH holding a custom WORD', () => {
        const p: $Para = $(<Para>Blah <Special>X</Special> blah</Para>);
        expect(p.parts().length).toBe(1);
        const words = (p.parts()[0] as $Sentence).parts();
        expect(words.some(w => w instanceof $Special)).toBe(true);
    });

    it('a SECTION holding a custom paragraph that holds a custom word', () => {
        const s: $Sect = $(<Sect><Para>Blah <Special>X</Special> blah.</Para></Sect>);
        expect(flat(s)).toEqual(['$Para']);
        const p = s.parts()[0] as $Paragraph;
        const words = (p.parts()[0] as $Sentence).parts();
        expect(words.some(w => w instanceof $Special)).toBe(true);
    });

    it('a custom word written among prose INSIDE a custom paragraph among prose', () => {
        const s: $Section = $(
            <Section>{'First.\n\n'}<Para>Second <Special>X</Special> more.</Para>{'\n\nThird.'}</Section>
        );
        expect(flat(s)).toEqual(['$Paragraph', '$Para', '$Paragraph']);
        const words = ((s.parts()[1] as $Paragraph).parts()[0] as $Sentence).parts();
        expect(words.some(w => w instanceof $Special)).toBe(true);
    });

    it('THE WRITING IS RECOVERABLE THROUGH THE NESTING', () => {
        const p: $Para = $(<Para>Blah <Special>BL<Inner>A</Inner>H</Special> blah</Para>);
        expect(p.copy).toBe('Blah BLAH blah');
    });

    it('and a nested element is not rebuilt — it is the one that was written', () => {
        const inner: $Inner = $(<Inner>A</Inner>);
        const outer: $Special = $(<Special />, 'BL', inner, 'H');
        expect(outer.parts()).toContain(inner);
        expect(outer.copy).toBe('BLAH');
    });
});
