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
import { Subject } from '@/book/Subject';
import { TableOfContents } from '@/book/TableOfContents';
import { type $LibraryCard, LibraryCard } from '@/../app/src/sections/book/library/the-team/librarycard';
import { $CardCatalogue } from '@/library/CardCatalogue';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const authored = (title: string, by?: $LibraryCard): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>{title}</Title>
                {'\n\nA book about reading. '}{by ? <Author for={by}>The Team</Author> : <Author>The Team</Author>}{' '}<Subject>Demonstration</Subject>
            </Section>
        </Cover>
        <TableOfContents />
        {synopsis()}
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

const rejection = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

const shown = (node: ReactElement): string => render(node).container.textContent ?? '';

describe('$Author — a book reference that holds a library card', () => {
    it('reads to its book through the card it holds, never through the book', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);
        team = authored('The Team', card);

        expect(team.author!.read()).toBe(team);
    });

    it('prints the name it was written with', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);
        team = authored('The Team', card);
        const A = $(team.author!) as any;

        expect(team.author!.name).toBe('The Team');
        expect(shown(<A />)).toBe('The Team');
    });

    it('still renders its name when it holds no card', () => {
        const orphan: $Author = $(<Author>Nobody At All</Author>);
        const A = $(orphan) as any;

        expect(orphan.valid()).toBe(true);
        expect(shown(<A />)).toBe('Nobody At All');
    });

    it('throws when it holds no card, and names whose', () => {
        const orphan: $Author = $(<Author>Nobody At All</Author>);

        expect(() => orphan.read()).toThrow(/Nobody At All/);
    });

    it('is not valid when it carries neither a name nor a card', () => {
        const empty: $Author = $(<Author>{'   '}</Author>);

        expect(empty.valid()).toBe(false);
    });
});

describe('a book reaches its author through its cover', () => {
    it('answers the author standing in its cover', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);
        team = authored('The Team', card);

        expect(team.author).toBeDefined();
        expect(team.author!.name).toBe('The Team');
    });

    it('a book whose cover names no author does not bind, and the error says so', () => {
        const plain: $Book = $(
            <Book>
                <Cover>
                    <Section>
                        <Title>The Algebra of Perspective</Title>
                        {'\n\nA book about reading. '}<Subject>Demonstration</Subject>
                    </Section>
                </Cover>
                <TableOfContents />
                {synopsis()}
                {chapter('Coordinates', 'Prose.')}
            </Book>
        );

        expect(rejection(plain)).toMatch(/author/);
    });
});

describe('the loop — a book whose author is itself', () => {
    it('closes: the autobiography authors itself, and every other book arrives at it', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);

        team = authored('The Team', card);
        const shelf = authored('The Shelf', card);
        const algebra = authored('The Algebra of Perspective', card);

        expect(team.author!.read()).toBe(team);
        expect(shelf.author!.read()).toBe(team);
        expect(algebra.author!.read()).toBe(team);
    });

    it('is closed in the model — following the destination and then its author arrives back', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);
        team = authored('The Team', card);

        expect(team.author!.read().author!.read()).toBe(team);
    });

    it('closes because the card is made before the book, which is what the loop needed', () => {
        let team: $Book | undefined = undefined;
        const card: $LibraryCard = $(<LibraryCard name="The Team" of={() => team!} title="The Team" />);

        expect(() => card.read()).toThrow();

        team = authored('The Team', card);

        expect(card.read()).toBe(team);
        expect(team.author!.card).toBe(card);
    });
});

describe('$CardCatalogue<$Book> — a catalogue of books, through library cards', () => {
    it('holds a card for each book and answers it by name', () => {
        let team: $Book | undefined = undefined;
        const catalogue = new $CardCatalogue<$Book>(
            $(<LibraryCard name="The Team" of={() => team!} title="The Team" />) as $LibraryCard,
        );
        team = authored('The Team');

        expect(catalogue.holds('The Team')).toBe(true);
        expect(catalogue.card('The Team').read()).toBe(team);
        expect(catalogue.cards).toHaveLength(1);
    });

    it('throws for a lookup it has no card for, naming what was asked', () => {
        const catalogue = new $CardCatalogue<$Book>();

        expect(() => catalogue.card('The Manifold')).toThrow(/The Manifold/);
    });

    // A CARD CATALOGUE IS NOT WRITING and no longer implements $Catalogue$ —
    // catalogues in this library are books. It holds cards, and following what a
    // card stands for is the card's own job.
    it('a card stands for its book, and the holder holds rather than catalogues', () => {
        let team: $Book | undefined = undefined;
        const catalogue = new $CardCatalogue<$Book>(
            $(<LibraryCard name="The Team" of={() => team!} title="The Team" />) as $LibraryCard,
        );
        team = authored('The Team');

        expect(catalogue.cards.map(c => c.read())).toEqual([team]);
        expect('follow' in catalogue).toBe(false);
    });
});
