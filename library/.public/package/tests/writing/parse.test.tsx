import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { parse, $Writing } from '@/writing/Writing';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $Title, Title } from '@/writing/Title';
import { $Author, Author } from '@/book/Author';

// The parse is ONE walk, and this is its specification. Doug's rule, in his own
// words: take a block and the levels it accepts, and if something is too high a
// level throw, if it is too low assume it is text and pull its copy, and if it
// is at the right level literally use that element.

// A paragraph that stands rather than sits — block-level, so it is a part.
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
        // The same object twice — a written part is held, not composed afresh.
        expect(section.parts()[0]).toBe(section.parts()[0]);
        expect(section.title).toBe(first);
    });

    it('and the canonical is that same part — the special first, at every level', () => {
        const section: $Section = $(<Section><Title>The Fold</Title>{'\n\nProse follows.'}</Section>);
        expect(section.canonical).toBe(section.parts()[0]);
        expect(section.at(0).read()).toBe(section.parts()[0]);
        // It used to be built fresh on every ask, which is two populations of one thing.
        expect(section.canonical).toBe(section.canonical);
    });

    it('a title is paragraph grade, because that is the level it stands at', () => {
        const title: $Title = $(<Title>Anything</Title>);
        expect(title.level).toBe('paragraph');
        expect(title).toBeInstanceOf($Paragraph);
    });

    it('the prose after it counts from one, and the heading still splits at its colon', () => {
        const section: $Section = $(
            <Section><Title>The Fold: a first look</Title>{'\n\nOne.'}{'\n\nTwo.'}</Section>
        );
        expect(section.heading).toBe('The Fold');
        expect(section.subtitle?.copy).toBe('a first look');
        expect(section.parts().length).toBe(3);
        expect(section.at(1).read().copy).toBe('One.');
        expect(section.at(2).read().copy).toBe('Two.');
    });
});

describe('the parse — one walk, three answers by level', () => {
    it('at an accepted level, the element itself is the part — the very object in the block', () => {
        const section: $Section = $(
            <Section><Title>Standing</Title>{'\n\nBefore it.'}<Plate />{'\n\nAfter it.'}</Section>
        );
        const written = section.elements.find(e => e instanceof $Plate);
        expect(written).toBeDefined();
        const parts = section.parts();
        // Not a copy of it, not something composed from its text — it.
        expect(parts).toContain(written);
        expect(parts.filter(p => p === written).length).toBe(1);
    });

    it('below the accepted level, it is text — its copy joins the prose around it', () => {
        const section: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Named>Doug</Named>{' in the margin.'}</Section>
        );
        const parts = section.parts();
        // A sentence sits inside a paragraph, so it never stands as one.
        expect(parts.some(p => p instanceof $Named)).toBe(false);
        expect(parts.map(p => p.copy).join(' ')).toContain('Doug');
    });

    it('and a PARENTHETICAL part below the level contributes nothing — present in the writing, absent from the prose', () => {
        const section: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Author>Doug</Author>{' in the margin.'}</Section>
        );
        // The author is parenthetical, so it is in the block and not in the copy.
        expect(section.elements.some(e => e instanceof $Author)).toBe(true);
        expect(section.parts().map(p => p.copy).join(' ')).not.toContain('Doug');
    });

    it('above the accepted level, it throws — and the message names what stood where', () => {
        const paragraph: $Paragraph = $(<Paragraph>{'A paragraph of prose.'}</Paragraph>);
        // A paragraph among sentences is a level too high to stand there.
        expect(() => parse(
            [paragraph as never],
            ['sentence'],
            prose => [prose],
            () => undefined,
        )).toThrow(/paragraph/);
    });

    it('the accepted levels are the walk\'s only knob — the one below by default, and a section widens it', () => {
        const section: $Section = $(<Section><Title>Levels</Title>{'\n\nOne. Two.'}</Section>);
        // A section composes PARAGRAPHS. Depth is a later layer, not the parse's.
        expect(section.accepts).toEqual(['paragraph']);
        const paragraph = section.parts()[1] as $Paragraph;
        expect(paragraph.accepts).toEqual(['sentence']);
        expect(paragraph.parts()[0]).toBeInstanceOf($Sentence);
    });

    it('with nothing accepted there are no parts — the floor composes nothing', () => {
        const section: $Section = $(<Section><Title>Floor</Title>{'\n\nA word.'}</Section>);
        const letter = section.parts()[1].parts()[0].parts()[0].parts()[0];
        expect(letter.accepts).toEqual([]);
        expect(letter.parts()).toEqual([]);
    });

    it('prose alone divides and composes exactly as it did — the walk changed the shape, not the reading', () => {
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
