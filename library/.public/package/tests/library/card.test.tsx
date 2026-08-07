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
import { $IndexCard, IndexCard } from '@/library/IndexCard';
import { $Path } from '@/reference/Path';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const book = (title: string): $Book => $(
    <Book>
        <Cover>{section(title, 'A book about reading.')}</Cover>
        <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

class $ShelvedCard extends $IndexCard<$Book> {
    $synopsis = '';
    $author?: $IndexCard<$Book> = undefined;

    get synopsis(): string { return this.$synopsis; }
    get author(): $IndexCard<$Book> | undefined { return this.$author; }
}

const ShelvedCard = $($ShelvedCard);
const Card = IndexCard as any;

describe('$IndexCard — a card that prints what is on it', () => {
    it('enumerates its own properties and prints them, without being told what they are', () => {
        const card: $ShelvedCard = $(<ShelvedCard name="The Manifold" synopsis="The reference system, read rather than described." />);

        expect(card.properties()).toEqual(['name', 'synopsis', 'author']);
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
        const card: $IndexCard<$Book> = $(<Card name="The Algebra of Perspective" of={() => algebra} />);

        expect(card.read()).toBe(algebra);
    });

    it('reaches its referent late, so it can be made before the thing exists', () => {
        let manifold: $Book | undefined = undefined;
        const card: $IndexCard<$Book> = $(<Card name="The Manifold" of={() => manifold!} />);

        manifold = book('The Manifold');

        expect(card.read()).toBe(manifold);
    });

    it('keeps its name when it has nothing to read', () => {
        const card: $IndexCard<$Book> = $(<Card name="The Manifold" />);

        expect(card.name).toBe('The Manifold');
        expect(card.valid()).toBe(true);
    });

    it('refuses to read when it never pointed, and names itself in the refusal', () => {
        const card: $IndexCard<$Book> = $(<Card name="The Manifold" />);

        expect(() => card.read()).toThrow(/The Manifold/);
        expect(() => card.read()).toThrow(/never pointed/);
    });

    it('composes onward like every other reference', () => {
        const algebra = book('The Algebra of Perspective');
        const card: $IndexCard<$Book> = $(<Card name="The Algebra of Perspective" of={() => algebra} />);

        expect(card.then(algebra.cover)).toBeInstanceOf($Path);
    });
});
