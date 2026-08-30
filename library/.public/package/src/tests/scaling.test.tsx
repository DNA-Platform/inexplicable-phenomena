import { describe, it, expect } from 'vitest';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $Paragraph } from '@/writing/Paragraph';
import { built, chain, document, paragraph, section, sentence, title, word, letter } from './written';

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
        const one = built<$Section>(section(title('t'), ...prose(40)));
        const first = took(() => one.parts());
        expect(one.parts().length).toBe(41);
        expect(first).toBeLessThan(400);
    });

    it('and asking twice costs almost nothing, because the parse is kept', () => {
        const one = built<$Section>(section(title('t'), ...prose(40)));
        const first = took(() => one.parts());
        const again = took(() => one.parts());
        expect(again).toBeLessThan(Math.max(first, 1));
    });

    it('a document of many sections is not more than linear in its sections', () => {
        const small = built<$Document>(document(...Array.from({ length: 4 },
            () => section(title('t'), ...prose(4)))));
        const large = built<$Document>(document(...Array.from({ length: 16 },
            () => section(title('t'), ...prose(4)))));
        const one = took(() => small.parts());
        const four = took(() => large.parts());
        expect(large.parts().length).toBe(16);
        expect(four).toBeLessThan(Math.max(one, 1) * 40);
    });

    it('and descending a level at a time stays cheap at each step', () => {
        const one = built<$Document>(document(section(title('t'), ...prose(8))));
        const sections = took(() => one.parts());
        const paragraphs = took(() => one.parts()[0].parts());
        const sentences = took(() => (one.parts()[0].parts()[1] as $Paragraph).parts());
        for (const step of [sections, paragraphs, sentences])
            expect(step).toBeLessThan(400);
    });
});
