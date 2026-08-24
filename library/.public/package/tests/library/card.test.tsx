import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { type ReactElement, type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';
import { Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Book, Book } from '@/book/Book';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { TableOfContents } from '@/book/TableOfContents';
import { $$Book, Card as CardOf } from '@/book/Book';
import { $Path } from '@/reference/Path';

const section = (title: string, prose: string, parenthetical = false): ReactNode => {
    const Kind = parenthetical ? Summary : Section;
    return (
    <Kind>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Kind>
);
};

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const book = (title: string): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>{title}</Title>
                {'\n\nA book about reading. '}
                <Author>The Team</Author>{' '}<Subject>Demonstration</Subject>
            </Section>
        </Cover>
        <TableOfContents />
        <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

class $ShelvedCard extends $$Book {
    $synopsis = '';
    $author?: $$Book = undefined;

    get synopsis(): string { return this.$synopsis; }
    get author(): $$Book | undefined { return this.$author; }
}

const ShelvedCard = $($ShelvedCard);

describe('$$Book — a card that prints what is on it', () => {
    // THE CARD IS THE BOOK'S INTERFACE REFLECTED, with references replaced by
    // cards — title, subtitle, chapters, author and subject come from $$Book
    // because a book has them, and `synopsis` is the only thing THIS library
    // adds. A card that had to know every property in advance would be a card
    // for one kind of book, which is not a catalogue.
    it('enumerates its own properties and prints them, without being told what they are', () => {
        const card: $ShelvedCard = $(<ShelvedCard name="The Manifold" synopsis="The reference system, read rather than described." />);

        expect(card.properties()).toEqual(['subject', 'name', 'title', 'subtitle', 'chapters', 'synopsis', 'author']);
        expect(card.copy).toContain('synopsis: The reference system, read rather than described.');
    });

    it('prints a card-valued property as that card, never reaching the thing it stands for', () => {
        const life: $ShelvedCard = $(<ShelvedCard name="The Team" synopsis="How these books came to be." />);
        const card: $ShelvedCard = $(<ShelvedCard name="The Manifold" synopsis="Read rather than described." author={life} />);

        expect(card.written('author')).toBe('The Team');
    });

    it('shows what is on it, and nothing a subclass would have to undo', () => {
        const card: $ShelvedCard = $(<ShelvedCard name="The Manifold" synopsis="Read rather than described." />);
        const C = $(card) as any;
        const { container } = render(<C />);

        expect(container.textContent).toContain('name: The Manifold');
        expect(container.textContent).toContain('synopsis: Read rather than described.');
    });

    it('reads to the thing it stands for', () => {
        const algebra = book('The Algebra of Perspective');
        const card: $$Book = $(<CardOf name="The Algebra of Perspective" of={() => algebra} />);

        expect(card.read()).toBe(algebra);
    });

    it('reaches its referent late, so it can be made before the thing exists', () => {
        let manifold: $Book | undefined = undefined;
        const card: $$Book = $(<CardOf name="The Manifold" of={() => manifold!} />);

        manifold = book('The Manifold');

        expect(card.read()).toBe(manifold);
    });

    it('keeps its name when it has nothing to read', () => {
        const card: $$Book = $(<CardOf name="The Manifold" />);

        expect(card.name).toBe('The Manifold');
        expect(card.valid()).toBe(true);
    });

    it('throws when it never pointed, and names itself', () => {
        const card: $$Book = $(<CardOf name="The Manifold" />);

        expect(() => card.read()).toThrow(/The Manifold/);
        expect(() => card.read()).toThrow(/never pointed/);
    });

    it('composes onward like every other reference', () => {
        const algebra = book('The Algebra of Perspective');
        const card: $$Book = $(<CardOf name="The Algebra of Perspective" of={() => algebra} />);

        expect(card.then(algebra.cover)).toBeInstanceOf($Path);
    });
});
