import { describe, it, expect } from 'vitest';
import { $Section } from '@/writing/Section';
import { $Letter } from '@/writing/Letter';
import { $Chapter } from '@/book/Chapter';
import { $Paragraph } from '@/writing/Paragraph';
import { $TypeOfLetter } from '@/writing/Letter';
import { $Composition } from '@/writing/Composition';
import { built, chapter, paragraph, section, sentence, heading, word, letter, specificationOf } from './written';

// A PERFORMANCE TEST, kept apart from the ones that say what writing IS.
// Doug, 2026-08-30: "Maybe run tests one level at a time. Don't test a huge tree
// all the way down. Save things like that for performance tests."
//
// It asks one question the ordinary tests cannot: HOW FAR DOWN does asking for
// parts actually go? If a parse is one level, the cost of a section's parts is
// flat in the depth beneath it. If it cascades, the cost compounds and the
// model does not scale to a real chapter.
//
// Thresholds are deliberately loose — this is a shape test, not a stopwatch.
// It fails when something becomes ORDERS slower, never when a machine is busy.

const took = (work: () => void): number => {
    const at = performance.now();
    work();
    return performance.now() - at;
};

const prose = (n: number) => Array.from({ length: n }, (_, i) =>
    paragraph(sentence(word(letter(String.fromCharCode(97 + (i % 26)))))));

describe('asking for parts goes ONE level, and the cost is flat in the depth below', () => {
    it('a section of many paragraphs answers its parts without descending', () => {
        const one = built<$Section>(section(heading('t'), ...prose(40)));
        const first = took(() => one.parts());
        expect(one.parts().length).toBe(41);
        expect(first).toBeLessThan(400);
    });

    it('and asking twice costs almost nothing, because the parse is kept', () => {
        const one = built<$Section>(section(heading('t'), ...prose(40)));
        const first = took(() => one.parts());
        const again = took(() => one.parts());
        expect(again).toBeLessThan(Math.max(first, 1));
    });

    it('a document of many sections is not more than linear in its sections', () => {
        const small = built<$Chapter>(chapter(...Array.from({ length: 4 },
            () => section(heading('t'), ...prose(4)))));
        const large = built<$Chapter>(chapter(...Array.from({ length: 16 },
            () => section(heading('t'), ...prose(4)))));
        const one = took(() => small.parts());
        const four = took(() => large.parts());
        expect(large.parts().length).toBe(16);
        expect(four).toBeLessThan(Math.max(one, 1) * 40);
    });

    it('and descending a level at a time stays cheap at each step', () => {
        const one = built<$Chapter>(chapter(section(heading('t'), ...prose(8))));
        const sections = took(() => one.parts());
        const paragraphs = took(() => (one.parts()[0] as $Composition).parts());
        const sentences = took(() => ((one.parts()[0] as $Composition).parts()[1] as $Paragraph).parts());
        for (const step of [sections, paragraphs, sentences])
            expect(step).toBeLessThan(400);
    });
});

describe('specifying is cheap because the specification is held, not remade', () => {
    it('a type answers the SAME specification every time it is asked', () => {
        const one = built<$Letter>(letter('a'));
        const type = one.type as unknown as $TypeOfLetter;
        expect(specificationOf(type)).toBe(specificationOf(type));
    });

    it('and every letter of a kind shares one specification, so one segmenter serves all', () => {
        const a = built<$Letter>(letter('a'));
        const b = built<$Letter>(letter('b'));
        expect(specificationOf(a.type)).toBe(specificationOf(b.type));
    });

    it('so specifying two thousand letters stays flat', () => {
        const many = Array.from({ length: 2000 }, (_, i) =>
            built<$Letter>(letter(String.fromCharCode(97 + (i % 26)))));
        const spent = took(() => { for (const one of many) one.specify(); });
        expect(spent).toBeLessThan(2000);
    });
});
