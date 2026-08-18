import { describe, it, expect } from 'vitest';
import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word, Word } from '@/writing/Word';
import { $Letter } from '@/writing/Letter';
import { $Title, Title } from '@/writing/Title';

// THE END RESULT: a system somebody can plug their own content into.
//
// Three claims, and each is a promise here rather than a description:
//
//   PLUGGABLE   a completely new subclass of content, at any grade, is a part of
//               the model when it is written — not a picture of one, not text.
//   REJECTING   writing that does not stand is NAMED, not silently dropped.
//   PERMISSIVE  given the right things, ordinary prose parses as it always did,
//               and an unfamiliar kind is carried rather than refused a place.

// A completely new kind at every grade. None of these is known to the framework.
class $Marginal extends $Word { }
const Marginal = $($Marginal);

class $Aside extends $Sentence { }
const Aside = $($Aside);

class $Verse extends $Paragraph { }
const Verse = $($Verse);

class $Preface extends $Section { }
const Preface = $($Preface);

// One that does not stand: a word with a space in it is not one word.
class $Broken extends $Word { }
const Broken = $($Broken);

const words = (p: $Paragraph): $Word[] => p.parts().flatMap(s => s.parts());

describe('PLUGGABLE — a new subclass of content is part of the model', () => {
    it('a new WORD, written among prose', () => {
        const p: $Paragraph = $(<Paragraph>a <Marginal>note</Marginal> here.</Paragraph>);
        expect(words(p).some(w => w instanceof $Marginal)).toBe(true);
    });

    it('a new SENTENCE, written among prose', () => {
        const p: $Paragraph = $(<Paragraph>One. <Aside>An aside.</Aside> Three.</Paragraph>);
        expect(p.parts().some(s => s instanceof $Aside)).toBe(true);
    });

    it('a new PARAGRAPH, written among prose', () => {
        const s: $Section = $(<Section>{'One.\n\n'}<Verse>Two.</Verse>{'\n\nThree.'}</Section>);
        expect(s.parts().some(p => p instanceof $Verse)).toBe(true);
    });

    it('a new SECTION is a section, and reads its own contents like any other', () => {
        const s: $Preface = $(<Preface><Title>Before</Title>{'\n\nProse here.'}</Preface>);
        expect(s).toBeInstanceOf($Section);
        expect(s.parts()[0]).toBeInstanceOf($Title);
        expect(s.parts()[1].copy).toBe('Prose here.');
    });

    it('and it is THE OBJECT THAT WAS WRITTEN, not one built from its text', () => {
        const marginal: $Marginal = $(<Marginal>note</Marginal>);
        const p: $Paragraph = $(<Paragraph />, 'a ', marginal, ' here.');
        expect(words(p)).toContain(marginal);
    });

    it('a new kind may hold another new kind, to any depth', () => {
        const s: $Section = $(
            <Section>{'One.\n\n'}<Verse>Two <Marginal>note</Marginal> three.</Verse>{'\n\nFour.'}</Section>
        );
        const verse = s.parts().find(p => p instanceof $Verse) as $Verse;
        expect(verse).toBeDefined();
        expect(words(verse).some(w => w instanceof $Marginal)).toBe(true);
    });

    it('THE FRAMEWORK NAMES NONE OF THESE — it only asks what they ARE', () => {
        // Nothing above was registered, declared, or told to the framework. Each
        // stands because it IS a word, a sentence, a paragraph, a section.
        const p: $Paragraph = $(<Paragraph>a <Marginal>note</Marginal> here.</Paragraph>);
        const found = words(p).find(w => w instanceof $Marginal)!;
        expect(found).toBeInstanceOf($Word);
        expect(found.constructor.name).toBe('$Marginal');
    });
});

describe('REJECTING — writing that does not stand is named', () => {
    it('a word carrying whitespace is not one word, and says so', () => {
        const broken: $Broken = $(<Broken>two words</Broken>);
        expect(broken.valid()).toBe(false);
    });

    it('a letter is one grapheme, and more than one is not a letter', () => {
        const p: $Paragraph = $(<Paragraph>ab</Paragraph>);
        const letters = words(p).flatMap(w => w.parts() as $Letter[]);
        expect(letters.every(l => l.valid())).toBe(true);
        expect(letters.map(l => l.copy)).toEqual(['a', 'b']);
    });

    it('and NOTHING IS SILENTLY DROPPED — an invalid part is still a part', () => {
        // The parse does not judge what it composes. A part that will not stand
        // is kept, so the writing is still recoverable and the failure is
        // visible rather than absent.
        const broken: $Broken = $(<Broken>two words</Broken>);
        const p: $Paragraph = $(<Paragraph />, 'a ', broken, ' here.');
        expect(words(p)).toContain(broken);
        expect(p.copy).toBe('a two words here.');
    });
});

describe('PERMISSIVE — ordinary writing is untouched', () => {
    it('prose alone parses exactly as it always did', () => {
        const s: $Section = $(
            <Section><Title>Plain</Title>{'\n\nFirst here.'}{'\n\nSecond here.'}</Section>
        );
        expect(s.parts().length).toBe(3);
        expect(s.parts()[1].copy).toBe('First here.');
        expect(s.parts()[2].copy).toBe('Second here.');
    });

    it('an unfamiliar kind is CARRIED rather than turned away', () => {
        // A chemical the framework has never heard of and which is not writing
        // at all still rides, because a parse that turns away what it does not
        // recognise cannot be extended.
        class $Unknown extends $Chemical {
            constructor() { super(); this.inline = true; }
            view() { return null; }
        }
        const Unknown = $($Unknown);
        const stranger = $(<Unknown />) as $Chemical;
        const p: $Paragraph = $(<Paragraph />, 'a ', stranger, ' here.');
        expect(p.parts().length).toBeGreaterThan(0);
        expect(p.copy).toContain('a ');
    });

    it('and the writing is still recoverable with a new kind in it', () => {
        const p: $Paragraph = $(<Paragraph>a <Marginal>note</Marginal> here.</Paragraph>);
        expect(p.parts().map(s => s.copy).join('')).toBe('a note here.');
    });
});
