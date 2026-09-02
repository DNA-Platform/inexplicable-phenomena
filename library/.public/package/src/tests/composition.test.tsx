import { describe, it, expect } from 'vitest';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';
import { built, declares, document, file, letter, paragraph, section, sentence, word } from './written';
import { $Composition } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';

const ladder = [$Letter, $Word, $Sentence, $Paragraph, $Section, $Document, $File];

describe('the ladder, written by hand', () => {
    const whole = () => built<$File>(file(document(section(paragraph(sentence(word(letter('h'), letter('i'))))))));

    it('reads all the way down from a file to its letters', () => {
        const asDocument = whole().parts()[0];
        const asSection = asDocument.parts()[0];
        const asParagraph = asSection.parts()[0];
        const asSentence = asParagraph.parts()[0];
        const asWord = asSentence.parts()[0];
        expect(asDocument).toBeInstanceOf($Document);
        expect(asSection).toBeInstanceOf($Section);
        expect(asParagraph).toBeInstanceOf($Paragraph);
        expect(asSentence).toBeInstanceOf($Sentence);
        expect(asWord).toBeInstanceOf($Word);
        expect(asWord.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and the copy survives every rung', () => {
        expect(whole().copy).toBe('hi');
    });
});

describe('one bond shape, one block', () => {
    it('every level arrives inside a block, and holds one', () => {
        const one = built<$File>(file(document(section(paragraph(sentence(word(letter('h'))))))));
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
        expect(one.parts()[0].block).toBeDefined();
    });

    it('and every one of the seven is inline', () => {
        for (const Kind of ladder)
            expect(new Kind().inline).toBe(true);
    });
});

describe('the composition surface is declared once and afforded everywhere', () => {
    it('composition declares the surface, and writing implements none of it', () => {
        for (const member of ['parts', 'where', 'select', 'selectMany', 'single']) {
            expect(declares($Composition, member)).toBe(true);
            expect(declares($Writing, member)).toBe(false);
        }
        for (const Kind of ladder) {
            const one = new Kind();
            expect(typeof one.where).toBe('function');
            expect(typeof one.select).toBe('function');
            expect(typeof one.selectMany).toBe('function');
            expect(typeof one.single).toBe('function');
        }
    });
});

describe('what parts reads', () => {
    it('parts answers immediately after construction', () => {
        expect(built<$Word>(word(letter('a'), letter('b'))).parts().length).toBe(2);
    });

    it('a word divides prose into letters, one per grapheme', () => {
        expect(built<$Word>(word('hi')).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and above word nothing is divided yet — the parser is not built there', () => {
        expect(built<$Sentence>(sentence('hello there')).parts()).toEqual([]);
    });
});
