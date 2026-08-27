import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';

const Letter = $($Letter);
const Word = $($Word);
const Sentence = $($Sentence);
const Paragraph = $($Paragraph);
const Section = $($Section);
const Document = $($Document);
const File = $($File);

const letter = (c: string) => <Letter>{c}</Letter>;
const word = (...ls: ReactNode[]) => <Word>{ls}</Word>;
const sentence = (...ws: ReactNode[]) => <Sentence>{ws}</Sentence>;
const paragraph = (...ss: ReactNode[]) => <Paragraph>{ss}</Paragraph>;
const section = (...ps: ReactNode[]) => <Section>{ps}</Section>;
const document = (...ss: ReactNode[]) => <Document>{ss}</Document>;
const file = (...ds: ReactNode[]) => <File>{ds}</File>;

const built = <T,>(element: ReactNode): T => $(element as never) as T;

describe('the ladder, written by hand', () => {
    it('a word composes its letters, in the order they were written', () => {
        const one = built<$Word>(word(letter('a'), letter('b'), letter('c')));
        expect(one.parts().map(l => l.copy)).toEqual(['a', 'b', 'c']);
    });

    it('reads all the way down from a file to its letters', () => {
        const whole = built<$File>(file(document(section(paragraph(sentence(word(letter('h'), letter('i'))))))));
        const asDocument = whole.parts()[0];
        const asSection = asDocument.parts()[0];
        const asParagraph = asSection.parts()[0];
        const asSentence = asParagraph.parts()[0];
        const asWord = asSentence.parts()[0];

        expect(whole.parts().length).toBe(1);
        expect(asDocument.parts().length).toBe(1);
        expect(asSection.parts().length).toBe(1);
        expect(asParagraph.parts().length).toBe(1);
        expect(asSentence.parts().length).toBe(1);
        expect(asWord.parts().map(l => l.copy)).toEqual(['h', 'i']);
    });

    it('answers canonical as part zero', () => {
        const one = built<$Word>(word(letter('a'), letter('b')));
        expect(one.canonical().copy).toBe('a');
    });

    it('the floor composes itself, and a descent through it terminates', () => {
        const one = built<$Letter>(letter('a'));
        expect(one.parts()).toEqual([one]);
    });
});

describe('the five that are written once', () => {
    const three = () => built<$Word>(word(letter('a'), letter('b'), letter('c')));

    it('where filters the parts', () => {
        expect(three().where(l => l.copy !== 'b').map(l => l.copy)).toEqual(['a', 'c']);
    });

    it('select maps them', () => {
        expect(three().select(l => l.copy.toUpperCase())).toEqual(['A', 'B', 'C']);
    });

    it('selectMany flattens', () => {
        expect(three().selectMany(l => [l.copy, l.copy])).toEqual(['a', 'a', 'b', 'b', 'c', 'c']);
    });

    it('single takes exactly one, and refuses any other count', () => {
        expect(three().single(l => l.copy === 'b').copy).toBe('b');
        expect(() => three().single(l => l.copy !== 'b')).toThrow();
    });

    it('and NO level declares any of them', () => {
        for (const level of [$Letter, $Word, $Sentence, $Paragraph, $Section, $Document, $File]) {
            for (const member of ['where', 'select', 'selectMany', 'single', 'canonical']) {
                expect(Object.getOwnPropertyNames(level.prototype)).not.toContain(member);
            }
        }
    });
});

describe('inline is assumed and overwritten', () => {
    it('letter, word and sentence arrive inside a block', () => {
        for (const Kind of [$Letter, $Word, $Sentence]) {
            expect(new Kind().inline).toBe(true);
        }
    });

    it('paragraph, section, document and file stand apart', () => {
        for (const Kind of [$Paragraph, $Section, $Document, $File]) {
            expect(new Kind().inline).toBe(false);
        }
    });
});
