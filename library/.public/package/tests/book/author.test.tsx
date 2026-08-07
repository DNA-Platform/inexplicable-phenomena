import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';
import { $Author, Author } from '@/book/Author';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const book = (title: string): $Book => $(
    <Book>
        <Cover>{section(title, 'A book about reading.')}</Cover>
        {synopsis()}
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

const rejection = (c: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(c).find(x => x.description === '$Particle.devError');
    return s ? c[s] : undefined;
};

const shown = (node: ReactElement): string => render(node).container.textContent ?? '';

describe('$Author — a book reference that carries a display name', () => {
    it('reads to its book', () => {
        const life = book('The Making of the Shelf');
        const author: $Author = $(<Author for={life.cover}>Inexplicable Press</Author>);

        expect(author.read()).toBe(life);
    });

    it('carries the written name as its display name', () => {
        const life = book('The Making of the Shelf');
        const author: $Author = $(<Author for={life.cover}>Inexplicable Press</Author>);

        expect(author.name).toBe('Inexplicable Press');
    });

    it('renders the name and nothing announcing that it is a reference', () => {
        const life = book('The Making of the Shelf');
        const author: $Author = $(<Author for={life.cover}>Inexplicable Press</Author>);
        const A = $(author) as any;

        expect(shown(<A />)).toBe('Inexplicable Press');
    });

    it('still renders the name when it has no reference to read', () => {
        const author: $Author = $(<Author>Inexplicable Press</Author>);
        const A = $(author) as any;

        expect(author.valid()).toBe(true);
        expect(shown(<A />)).toBe('Inexplicable Press');
    });

    it('refuses to read when it never pointed', () => {
        const author: $Author = $(<Author>Inexplicable Press</Author>);

        expect(() => author.read()).toThrow(/never pointed/);
    });

    it('is refused when it carries neither a name nor a reference', () => {
        const author: $Author = $(<Author>{'   '}</Author>);

        expect(author.valid()).toBe(false);
    });
});

describe('a book reaches its author through its cover', () => {
    it('answers the author standing in its cover', () => {
        const life = book('The Making of the Shelf');
        const shelf: $Book = $(
            <Book>
                <Cover>
                    <Section>
                        <Title>The Shelf</Title>
                        {'\n\nA shelf is already a catalogue. '}<Author for={life.cover}>Inexplicable Press</Author>
                    </Section>
                </Cover>
                {synopsis()}
                {chapter('Spines', 'A spine is a reference seen edge-on.')}
            </Book>
        );

        expect(shelf.author).toBeDefined();
        expect(shelf.author!.name).toBe('Inexplicable Press');
        expect(shelf.author!.read()).toBe(life);
    });

    it('answers undefined when no author stands in the cover', () => {
        const plain = book('The Algebra of Perspective');

        expect(plain.author).toBeUndefined();
    });
});
