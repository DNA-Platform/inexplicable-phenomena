import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { enclose } from '@/tools/html';
import { $Paragraph, Paragraph } from '@/text/Paragraph';
import { $Section, Section } from '@/text/Section';
import { $Chapter, Chapter } from '@/book/Chapter';
import { $Cover, Cover } from '@/book/Cover';
import { $Synopsis, Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';

const section = (title: string, prose: string): ReactNode => {
    const t = $<$Paragraph>(<Paragraph>{title}</Paragraph>).block!;
    const p = $(React.createElement('string', { value: '\n\n' + prose })) as any;
    const B = $(enclose([t as any, p]) as any);
    return <Section><B /></Section>;
};

const chapter = (title: string, prose: string): ReactNode => <Chapter>{section(title, prose)}</Chapter>;

const cover = (): ReactNode => <Cover>{section('The Algebra of Perspective', 'A book about reading.')}</Cover>;

const synopsis = (): ReactNode => <Synopsis>{section('Synopsis', 'One object, many renderings.')}</Synopsis>;

const refusal = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

describe('$Book — a composition of chapters, of which cover and synopsis are two', () => {
    it('a chapter receives its sections DI-style — authored nested, bound as typed arguments', () => {
        const c = $<$Chapter>(<Chapter>{section('Coordinates', 'Every act of reading is a change of coordinates.')}</Chapter>);
        expect(c).toBeInstanceOf($Chapter);
        expect(c.parts.length).toBe(1);
        expect(c.parts[0]).toBeInstanceOf($Section);
        expect(c.title).toBe('Coordinates');
    });

    it('a book receives its chapters DI-style; cover and synopsis are chapters among them', () => {
        const b = $<$Book>(
            <Book>
                {cover()}
                {synopsis()}
                {chapter('Coordinates', 'Reading is a change of coordinates.')}
            </Book>
        );
        expect(b).toBeInstanceOf($Book);
        expect(b.parts.length).toBe(3);
        expect(b.cover).toBeInstanceOf($Cover);
        expect(b.synopsis).toBeInstanceOf($Synopsis);
    });

    it('the cover is the canonical, and it sits at position zero', () => {
        const b = $<$Book>(<Book>{cover()}{synopsis()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(b.canonical).toBe(b.parts[0]);
        expect(b.canonical).toBeInstanceOf($Cover);
        expect(b.title).toBe('The Algebra of Perspective');
    });

    it('a cover away from position zero refuses at the door', () => {
        const b = $<$Book>(<Book>{synopsis()}{cover()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(refusal(b)).toMatch(/position zero/);
    });

    it('a book without a cover refuses at the door', () => {
        const b = $<$Book>(<Book>{synopsis()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(refusal(b)).toMatch(/cover/);
    });

    it('a book without a synopsis refuses at the door — a book is indexable', () => {
        const b = $<$Book>(<Book>{cover()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(refusal(b)).toMatch(/synopsis/);
    });

    it('$Indexable — the book holds its own synopsis as readable writing', () => {
        const b = $<$Book>(<Book>{cover()}{synopsis()}{chapter('Coordinates', 'Prose.')}</Book>);
        expect(b.synopsis.copy).toContain('One object, many renderings.');
    });

    it('every piece of writing carries an assignable index — decimals allowed', () => {
        const c = $<$Chapter>(<Chapter>{section('Coordinates', 'Prose.')}</Chapter>);
        expect(c.index).toBe(0);
        c.index = 1.5;
        expect(c.index).toBe(1.5);
        const s = c.parts[0];
        s.index = 2.25;
        expect(s.index).toBe(2.25);
    });

    it('every piece of writing carries parenthetical — assignable and authorable', () => {
        const t = $<$Paragraph>(<Paragraph>Summary</Paragraph>).block!;
        const B = $(enclose([t as any]) as any);
        const c = $<$Chapter>(<Chapter><Section parenthetical><B /></Section></Chapter>);
        expect(c.parts[0].parenthetical).toBe(true);
        const p = $<$Paragraph>(<Paragraph>Plain prose.</Paragraph>);
        expect(p.parenthetical).toBe(false);
        p.parenthetical = true;
        expect(p.parenthetical).toBe(true);
    });

    it('readings flatten through one parts level — sections, paragraphs, words', () => {
        const b = $<$Book>(<Book>{cover()}{synopsis()}{chapter('Coordinates', 'Reading is a change of coordinates.')}</Book>);
        expect(b.sections.length).toBe(3);
        expect(b.paragraphs.length).toBeGreaterThan(0);
        expect(b.words.length).toBeGreaterThan(0);
    });

    it('a book renders whole — its chapters in order', () => {
        const b = $<$Book>(<Book>{cover()}{synopsis()}{chapter('Coordinates', 'Reading is a change of coordinates.')}</Book>);
        const B = $(b as any);
        const { container } = render(<B />);
        expect(container.textContent).toContain('The Algebra of Perspective');
        expect(container.textContent).toContain('change of coordinates');
    });
});
