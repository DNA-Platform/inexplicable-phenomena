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

    get synopsis(): string { return this.$synopsis; }
}

const ShelvedCard = $($ShelvedCard);

describe('$$Book — a card that prints what is on it', () => {
    // THE CARD IS THE BOOK'S INTERFACE REFLECTED, with references replaced by
    // cards — title, subtitle, chapters, author and subject come from $$Book
    // because a book has them, and `synopsis` is the only thing THIS library
    // adds. A card that had to know every property in advance would be a card
    // for one kind of book, which is not a catalogue.
    // A CARD WRITES ITSELF. This promised a REFLECTION — a card enumerating its
    // own fields and printing them as `name: value` — and that mechanism is
    // deliberately gone: a card is a chapter now, one grade below the book it
    // stands for, so what it says is writing rather than a record of fields.
    it('writes a title and an account of the thing it stands for', () => {
        const card: $ShelvedCard = $(<ShelvedCard name="/the-manifold" title="The Manifold" synopsis="The reference system, read rather than described." />);

        expect(card.title?.copy).toBe('The Manifold');
        // THE ACCOUNT IS PARENTHETICAL, which is what a summary is — present in
        // the writing, absent from the reading. So the card's copy is its title
        // and the account is asked for by name.
        expect(card.summary?.copy).toContain('The reference system, read rather than described.');
        expect(card.copy).toBe('The Manifold');
    });

    it('names its author as a card, never reaching the thing that card stands for', () => {
        const life: $ShelvedCard = $(<ShelvedCard name="/the-team" title="The Team" synopsis="How these books came to be." />);
        const card: $ShelvedCard = $(<ShelvedCard name="/the-manifold" title="The Manifold" synopsis="Read rather than described." />);
        card.$author = life;

        expect(card.author?.title?.copy).toBe('The Team');
        expect(() => card.author!.read()).toThrow();
    });

    it('draws as writing rather than as a record of its fields', () => {
        const card: $ShelvedCard = $(<ShelvedCard name="/the-manifold" title="The Manifold" synopsis="Read rather than described." />);
        const C = $(card) as any;
        const { container } = render(<C />);

        expect(container.textContent).toContain('The Manifold');
        // AND NOTHING PRINTS ITS OWN FIELD NAMES. A card used to draw
        // `name: The Manifold` by reflecting over how the class happened to be
        // written; it is a chapter now and says what a chapter says.
        expect(container.textContent).not.toContain('name:');
        expect(container.textContent).not.toContain('synopsis:');
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

        expect(card.follow(algebra.cover)).toBeInstanceOf($Path);
    });
});
