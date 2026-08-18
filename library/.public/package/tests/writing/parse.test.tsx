import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $Title, Title } from '@/writing/Title';
import { $Author, Author } from '@/book/Author';

// EVERY LEVEL READS ITS OWN CONTENTS, and this is its specification.
//
// It used to be ONE generic walk taking the levels it accepts, with the rule:
// too high a level throws, too low is ASSUMED TO BE TEXT and its copy pulled,
// and at the right level the element itself is used. The middle clause is the
// defect this replaced — a custom element written below the level being composed
// was dissolved into prose, so the model was not a representation of the writing.
//
// The rule now is two lines and asks no level of anything:
//
//   a string   → my own boundary rule, applied to THAT RUN ALONE; accumulate
//   an element → one of my parts? it stands. otherwise it rides down inside
//                the piece it sits in, and is met again one level lower.

// A paragraph that stands rather than sits — so it is a part of a section.
class $Plate extends $Paragraph {
    view(): React.ReactNode { return <div className="plate">plate</div>; }
    valid(): boolean { return true; }
}
const Plate = $($Plate);

// A sentence that is used rather than parenthetical, so its copy is read.
class $Named extends $Sentence { }
const Named = $($Named);

describe('the title stands at position zero', () => {
    it('a section\'s title IS its part zero — the written object, not a paragraph built from its text', () => {
        const section: $Section = $(<Section><Title>The Fold</Title>{'\n\nProse follows.'}</Section>);
        const first = section.parts()[0];
        expect(first).toBeInstanceOf($Title);
        expect(first.copy).toBe('The Fold');
    });

    it('and the canonical is that same part — the special first, at every level', () => {
        const section: $Section = $(<Section><Title>The Fold</Title>{'\n\nProse follows.'}</Section>);
        expect(section.canonical).toBe(section.parts()[0]);
    });

    it('a title is a PARAGRAPH — that is what makes it one of a section\'s parts', () => {
        const section: $Section = $(<Section><Title>The Fold</Title>{'\n\nProse follows.'}</Section>);
        expect(section.parts()[0]).toBeInstanceOf($Paragraph);
    });

    it('the prose after it counts from one', () => {
        const section: $Section = $(<Section><Title>The Fold</Title>{'\n\nProse follows.'}</Section>);
        expect(section.parts()[1].copy).toBe('Prose follows.');
    });
});

describe('a written element stands, or rides down to the level that holds it', () => {
    it('AT MY LEVEL IT IS THE PART — the very object in the block, not a copy of it', () => {
        const section: $Section = $(
            <Section><Title>Standing</Title>{'\n\nBefore it.\n\n'}<Plate />{'\n\nAfter it.'}</Section>
        );
        const parts = section.parts();
        const stood = parts.find(p => p instanceof $Plate);
        expect(stood).toBeDefined();
        expect(parts.filter(p => p === stood).length).toBe(1);
    });

    it('BELOW MY LEVEL IT RIDES DOWN and lands where it belongs — it is NOT turned into text', () => {
        const section: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Named>Doug</Named>{' in the margin.'}</Section>
        );
        // A sentence is not one of a section's parts, so it is not standing here —
        const parts = section.parts();
        expect(parts.some(p => p instanceof $Named)).toBe(false);
        // — it is inside the paragraph it was written into, as one of its sentences.
        const inside = parts.flatMap(p => p.parts());
        expect(inside.some(s => s instanceof $Named)).toBe(true);
        // And the writing still reads as it was written.
        expect(parts.map(p => p.copy).join(' ')).toContain('Doug');
    });

    it('a PARENTHETICAL part is in the model and out of the reading', () => {
        const section: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Author>Doug</Author>{' in the margin.'}</Section>
        );
        // Present: the author is a WORD, and it rode down to the sentence holding it.
        const words = section.parts().flatMap(p => p.parts()).flatMap(s => s.parts());
        expect(words.some(w => w instanceof $Author)).toBe(true);
        // Absent from the reading: it is mentioned, so the copy passes over it.
        expect(section.parts().map(p => p.copy).join(' ')).not.toContain('Doug');
    });

    it('and it is the object that was written, carrying what was written in it', () => {
        const section: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Author>Doug</Author>{' in the margin.'}</Section>
        );
        const author = section.parts()
            .flatMap(p => p.parts()).flatMap(s => s.parts())
            .find(w => w instanceof $Author) as $Author;
        expect(author.copy).toBe('Doug');
        expect(author).toBeInstanceOf($Word);
    });
});

describe('what each level composes, and where the descent stops', () => {
    it('a section composes paragraphs and a paragraph composes sentences — by type, not by a name', () => {
        const section: $Section = $(<Section><Title>Levels</Title>{'\n\nOne. Two.'}</Section>);
        expect(section.parts().every(p => p instanceof $Paragraph)).toBe(true);
        const paragraph = section.parts()[1] as $Paragraph;
        expect(paragraph.parts().every(s => s instanceof $Sentence)).toBe(true);
    });

    it('A LETTER COMPOSES NOTHING — it is the floor of the descent', () => {
        const section: $Section = $(<Section><Title>Floor</Title>{'\n\nA word.'}</Section>);
        const letter = section.parts()[1].parts()[0].parts()[0].parts()[0];
        expect(letter.parts()).toEqual([]);
    });

    it('prose alone reads exactly as it did — the shape changed, not the reading', () => {
        const section: $Section = $(
            <Section><Title>Plain</Title>{'\n\nFirst paragraph here.'}{'\n\nSecond paragraph here.'}</Section>
        );
        const parts = section.parts();
        expect(parts.length).toBe(3);
        expect(parts.every(p => p instanceof $Writing)).toBe(true);
        expect(parts[1].copy).toBe('First paragraph here.');
        expect(parts[2].copy).toBe('Second paragraph here.');
    });
});
