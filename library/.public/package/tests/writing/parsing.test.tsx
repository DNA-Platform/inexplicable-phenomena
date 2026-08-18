import { describe, it, expect } from 'vitest';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word, Word } from '@/writing/Word';
import { $Title, Title } from '@/writing/Title';

// A PARSE THROWS NOTHING OUT, and the explicit form is the ground truth.
//
// A system where an author wraps every letter, word and sentence in its own type
// can override anything, because the type is named at every position. The parse
// is a looser way of writing the same thing — so the tests of it are: does the
// shorthand produce the model the explicit form produces, and is the writing
// still recoverable from what it produced.

class $SpecialWord extends $Word {}
const SpecialWord = $($SpecialWord);

class $SpecialParagraph extends $Paragraph {}
const SpecialParagraph = $($SpecialParagraph);

const classes = (parts: any[]): string[] => parts.map(p => p?.constructor?.name ?? String(p));

const shapeOf = (of: { parts(): any[] }, depth = 0): string =>
    of.parts().map((part: any) => {
        const kids = typeof part?.parts === 'function' ? part.parts() : [];
        const name = part?.constructor?.name ?? String(part);
        return kids.length && depth < 3 ? `${name}(${shapeOf(part, depth + 1)})` : name;
    }).join(' ');

describe('NOTHING IS THROWN OUT — the writing is recoverable from the parse', () => {
    it('a paragraph gives its sentences back as the prose that was written', () => {
        for (const prose of ['One. Two.', 'One.  Two.', 'One. Two. Three.', 'No stop at all']) {
            const p: $Paragraph = $(<Paragraph>{prose}</Paragraph>);
            expect(p.parts().map(s => s.copy).join('')).toBe(prose);
        }
    });

    it('and two different pieces of writing are two different models', () => {
        const one: $Paragraph = $(<Paragraph>One. Two.</Paragraph>);
        const two: $Paragraph = $(<Paragraph>{'One.  Two.'}</Paragraph>);
        expect(one.parts().map(s => s.copy)).not.toEqual(two.parts().map(s => s.copy));
    });

    it('THE SEPARATOR GOES TO THE LEFT SENTENCE — the one whose stop it follows', () => {
        const p: $Paragraph = $(<Paragraph>One. Two.</Paragraph>);
        expect(p.parts().map(s => s.copy)).toEqual(['One. ', 'Two.']);
    });

    it('AND IT COMES UP AT THE LETTER LEVEL, a space like any other', () => {
        const p: $Paragraph = $(<Paragraph>One. Two.</Paragraph>);
        const first = p.parts()[0] as $Sentence;
        // The stop and the space that follows it are ONE mentioned mark, and its
        // letters are the period and the space — the same shape as the space
        // between two words, which is also a mentioned mark of its own.
        expect(first.parts().map(w => w.copy)).toEqual(['One', '. ']);
        expect(first.parts().map(w => w.copy).join('')).toBe('One. ');
        expect(first.letters.map(l => l.copy).join('')).toBe('One. ');
        expect(first.letters.map(l => l.copy).slice(-2)).toEqual(['.', ' ']);
    });

    it('A SPACE IS ITS OWN WORD-GRADE PART, and it is MENTIONED, not used', () => {
        const s: $Sentence = $(<Sentence>one two</Sentence>);
        // Its own part at word grade —
        expect(s.parts().map(w => w.copy)).toEqual(['one', ' ', 'two']);
        // — mentioned, so the READING passes over it, which is what makes
        //   `words` two rather than three.
        expect(s.parts().map(w => w.role)).toEqual(['use', 'mention', 'use']);
        expect(s.words.map(w => w.copy)).toEqual(['one', 'two']);
        // — and its letters are spaces like any other letters.
        expect(s.letters.map(l => l.copy).join('')).toBe('one two');
    });

    it('a sentence gives its words back as the prose that was written', () => {
        for (const prose of ['the frame turns', 'a  double space', 'trailing ']) {
            const s: $Sentence = $(<Sentence>{prose}</Sentence>);
            expect(s.parts().map(w => w.copy).join('')).toBe(prose);
        }
    });
});

describe('THE SHORTHAND PRODUCES THE MODEL THE EXPLICIT FORM PRODUCES', () => {
    it('A — a sentence of plain words', () => {
        const shorthand: $Sentence = $(<Sentence>the frame turns</Sentence>);
        const explicit: $Sentence = $(
            <Sentence><Word>the</Word>{' '}<Word>frame</Word>{' '}<Word>turns</Word></Sentence>
        );
        expect(classes(shorthand.parts())).toEqual(classes(explicit.parts()));
    });

    it('B — a custom word among prose', () => {
        const shorthand: $Paragraph = $(
            <Paragraph>Blah blah <SpecialWord>BLAH</SpecialWord> blah</Paragraph>
        );
        const explicit: $Paragraph = $(
            <Paragraph>
                <Sentence>
                    <Word>Blah</Word>{' '}<Word>blah</Word>{' '}
                    <SpecialWord>BLAH</SpecialWord>{' '}<Word>blah</Word>
                </Sentence>
            </Paragraph>
        );
        expect(shapeOf(shorthand)).toBe(shapeOf(explicit));
    });

    it('B1 — and the custom word IS one of the sentence’s words', () => {
        const p: $Paragraph = $(
            <Paragraph>Blah blah <SpecialWord>BLAH</SpecialWord> blah</Paragraph>
        );
        expect(p.parts().length).toBe(1);
        expect((p.parts()[0] as $Sentence).parts().some(w => w instanceof $SpecialWord)).toBe(true);
    });

    it('C — a custom PARAGRAPH among prose', () => {
        const shorthand: $Section = $(
            <Section>{'One.\n\n'}<SpecialParagraph>Two.</SpecialParagraph>{'\n\nThree.'}</Section>
        );
        const explicit: $Section = $(
            <Section>
                <Paragraph>One.</Paragraph>
                <SpecialParagraph>Two.</SpecialParagraph>
                <Paragraph>Three.</Paragraph>
            </Section>
        );
        expect(classes(shorthand.parts())).toEqual(classes(explicit.parts()));
    });

    it('D — A CHEMICAL IS ATOMIC: its own text may not open a paragraph', () => {
        const s: $Section = $(
            <Section>{'One. '}<SpecialWord>{'A.\n\nB'}</SpecialWord>{' more.'}</Section>
        );
        expect(s.parts().length).toBe(1);
    });

    it('E — a title still stands where it was written, beside prose', () => {
        const shorthand: $Section = $(
            <Section><Title>Physics</Title>{'\n\nProse here.'}</Section>
        );
        expect(classes(shorthand.parts())).toEqual(['$Title', '$Paragraph']);
    });

    it('F — two custom words in one sentence, in written order', () => {
        const p: $Paragraph = $(
            <Paragraph>a <SpecialWord>ONE</SpecialWord> b <SpecialWord>TWO</SpecialWord> c</Paragraph>
        );
        const words = (p.parts()[0] as $Sentence).parts();
        expect(words.filter(w => w instanceof $SpecialWord).map(w => w.copy)).toEqual(['ONE', 'TWO']);
    });

    it('G — a custom word at the very start and at the very end', () => {
        const p: $Paragraph = $(
            <Paragraph><SpecialWord>FIRST</SpecialWord> middle <SpecialWord>LAST</SpecialWord></Paragraph>
        );
        const words = (p.parts()[0] as $Sentence).parts();
        expect(words[0]).toBeInstanceOf($SpecialWord);
        expect(words[words.length - 1]).toBeInstanceOf($SpecialWord);
    });

    it('H — a sentence spanning a written element is ONE sentence, and keeps its stops', () => {
        const p: $Paragraph = $(
            <Paragraph>One. Two <SpecialWord>WORD</SpecialWord> three. Four.</Paragraph>
        );
        expect(p.parts().length).toBe(3);
        expect((p.parts()[1] as $Sentence).parts().some(w => w instanceof $SpecialWord)).toBe(true);
    });

    it('I — the writing reads as it was written, element and all', () => {
        const p: $Paragraph = $(
            <Paragraph>Blah blah <SpecialWord>BLAH</SpecialWord> blah</Paragraph>
        );
        expect(p.copy).toBe('Blah blah BLAH blah');
    });
});
