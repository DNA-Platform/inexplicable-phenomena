import { describe, it, expect } from 'vitest';
import { $, $Block } from '@dna-platform/chemistry';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Section } from '@/writing/Section';
import { $Chapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';
import { built, declares, chapter, book, letter, paragraph, section, sentence, word } from './written';
import { $Composition } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';

const ladder = [$Letter, $Word, $Sentence, $Paragraph, $Section, $Chapter, $Book];

describe('the ladder, written by hand', () => {
    const whole = () => built<$Book>(book(chapter(section(paragraph(sentence(word(letter('h'), letter('i'))))))));

    it('reads all the way down from a book to its letters', () => {
        const asChapter = whole().parts()[0] as $Composition;
        const asSection = asChapter.parts()[0] as $Composition;
        const asParagraph = asSection.parts()[0] as $Composition;
        const asSentence = asParagraph.parts()[0] as $Composition;
        const asWord = asSentence.parts()[0] as $Composition;
        expect(asChapter).toBeInstanceOf($Chapter);
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
        const one = built<$Book>(book(chapter(section(paragraph(sentence(word(letter('h'))))))));
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

    it('and a sentence divides prose into words — the parser makes all three floors', () => {
        expect(built<$Sentence>(sentence('hello there')).parts().map(one => one.copy)).toEqual(['hello', 'there']);
    });
});

// An untyped composition is a gatherer: it accepts any writing, drops loose
// prose it cannot reduce, and numbers nothing — every part keeps the index it
// arrived with.
class $Gathering extends $Composition {
    $Gathering(block: $Block) {
        super.$Composition(block);
    }
}

const Gathering = $($Gathering);

describe('an untyped composition gathers without numbering', () => {
    it('accepts any writing and leaves every index alone', () => {
        const one = built<$Gathering>(<Gathering>{word('hi')} {word('yo')}</Gathering>);
        const parts = one.parts();
        expect(parts.map(part => part.copy)).toEqual(['hi', 'yo']);
        expect(parts.map(part => (part as $Composition).index)).toEqual([0, 0]);
    });
});
