import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { Letter, $Word, Word, $Sentence, Sentence, $Paragraph, Paragraph, Permissive, Open, Strict, Closed } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('Word, Sentence and Paragraph are the intermixed levels, 2, 3 and 4, permissive and open', () => {
    it('each stands its level and its pair in $Define', () => {
        for (const [built_, level] of [
            [built<$Word>(<Word />), 2],
            [built<$Sentence>(<Sentence />), 3],
            [built<$Paragraph>(<Paragraph />), 4],
        ] as const) {
            expect(built_.level).toBe(level);
            expect(built_.is(Permissive)).toBe(true);
            expect(built_.is(Open)).toBe(true);
            expect(built_.specify()).toEqual([]);
        }
    });

    it('a paragraph holds sentences, words, letters and prose, and its parts are the compositions at or below it', () => {
        const paragraph = built<$Paragraph>(
            <Paragraph>
                <Sentence>A <Word>word</Word> and <Letter>a letter</Letter>.</Sentence>
                prose between
                <Word>alone</Word>
            </Paragraph>
        );
        expect(paragraph.parts.length).toBe(2);
        expect(paragraph.parts[0]).toBeInstanceOf($Sentence);
        expect(paragraph.parts[1]).toBeInstanceOf($Word);
        expect(paragraph.specify()).toEqual([]);
        const sentence = paragraph.parts[0];
        expect(sentence.parts.length).toBe(2);
        expect(sentence.parts.map(part => part.level)).toEqual([2, 1]);
    });

    it('a sentence in a sentence is spliced, and one deeper', () => {
        const sentence = built<$Sentence>(<Sentence><Sentence><Word>inner</Word></Sentence><Word>outer</Word></Sentence>);
        expect(sentence.parts.length).toBe(2);
        expect(sentence.parts.every(part => part instanceof $Word)).toBe(true);
        expect(sentence.contents.find($Sentence)[0].depth).toBe(1);
    });

    it('permissive refuses a part above the level, and a written Strict or Closed overrides what the class stands', () => {
        expect(built<$Word>(<Word><Sentence /></Word>).specify()).toContain('a permissive composition holds parts at or below its level, and this one holds one above');
        const strict = built<$Paragraph>(<Paragraph><Word /><Strict /></Paragraph>);
        expect(strict.is(Strict)).toBe(true);
        expect(strict.specify()).toContain('a strict composition holds parts at its level or one below, and this one holds another');
        expect(built<$Paragraph>(<Paragraph><Sentence /><Strict /></Paragraph>).specify()).toEqual([]);
        expect(built<$Word>(<Word>prose <Closed /></Word>).specify()).toEqual(['a closed composition holds only writing, and this one holds something else']);
    });
});
