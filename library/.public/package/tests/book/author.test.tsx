import { describe, it, expect, beforeEach } from 'vitest';
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
import { LibraryCard } from '@/library/LibraryCard';
import { $LibraryCatalogue, LibraryCatalogue } from '@/library/LibraryCatalogue';

const section = (title: string, prose: string, parenthetical = false): ReactNode => (
    <Section parenthetical={parenthetical}>
        <Title>{title}</Title>
        {'\n\n' + prose}
    </Section>
);

const summary = (gist: string): ReactNode => section('Summary', gist, true);

const chapter = (title: string, prose: string): ReactElement => <Chapter>{section(title, prose)}{summary('In brief.')}</Chapter>;

const synopsis = (): ReactElement => <Synopsis>{section('Synopsis', 'One object, many renderings.')}{summary('In brief.')}</Synopsis>;

const authored = (title: string, by?: string): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>{title}</Title>
                {'\n\nA book about reading. '}{by ? <Author>{by}</Author> : null}
            </Section>
        </Cover>
        {synopsis()}
        {chapter('Coordinates', 'Reading is a change of coordinates.')}
    </Book>
);

const shown = (node: ReactElement): string => render(node).container.textContent ?? '';

describe('$Author — a book reference that resolves through the catalogue', () => {
    let team: $Book;

    beforeEach(() => {
        team = authored('The Team');
        $(<LibraryCatalogue>
            <LibraryCard name="The Team" of={() => team} title="The Team" />
        </LibraryCatalogue>);
    });

    it('reads to its book through the catalogue, holding no book itself', () => {
        const shelf = authored('The Shelf', 'The Team');

        expect(shelf.author!.read()).toBe(team);
    });

    it('finds its card by the name it prints, which is the name the card is filed under', () => {
        const shelf = authored('The Shelf', 'The Team');

        expect(shelf.author!.name).toBe('The Team');
        expect(shelf.author!.card!.name).toBe('The Team');
    });

    it('renders the name and nothing announcing that it is a reference', () => {
        const shelf = authored('The Shelf', 'The Team');
        const A = $(shelf.author!) as any;

        expect(shown(<A />)).toBe('The Team');
    });

    it('still renders its name when the catalogue holds no card for it', () => {
        const orphan: $Author = $(<Author>Nobody At All</Author>);
        const A = $(orphan) as any;

        expect(orphan.valid()).toBe(true);
        expect(shown(<A />)).toBe('Nobody At All');
    });

    it('refuses to read when the catalogue holds no card for it, and says whose', () => {
        const orphan: $Author = $(<Author>Nobody At All</Author>);

        expect(() => orphan.read()).toThrow(/Nobody At All/);
    });

    it('is refused when it carries neither a name nor a card', () => {
        const empty: $Author = $(<Author>{'   '}</Author>);

        expect(empty.valid()).toBe(false);
    });
});

describe('a book reaches its author through its cover', () => {
    it('answers the author standing in its cover', () => {
        const shelf = authored('The Shelf', 'The Team');

        expect(shelf.author).toBeDefined();
        expect(shelf.author!.name).toBe('The Team');
    });

    it('answers undefined when no author stands in the cover', () => {
        const plain = authored('The Algebra of Perspective');

        expect(plain.author).toBeUndefined();
    });
});

describe('the loop — a book whose author is itself', () => {
    it('closes: the autobiography authors itself, and every other book arrives at it', () => {
        const team = authored('The Team', 'The Team');
        const shelf = authored('The Shelf', 'The Team');
        const algebra = authored('The Algebra of Perspective', 'The Team');

        $(<LibraryCatalogue>
            <LibraryCard name="The Team" of={() => team} title="The Team" />
            <LibraryCard name="The Shelf" of={() => shelf} title="The Shelf" />
            <LibraryCard name="The Algebra of Perspective" of={() => algebra} title="The Algebra of Perspective" />
        </LibraryCatalogue>);

        expect(team.author!.read()).toBe(team);
        expect(shelf.author!.read()).toBe(team);
        expect(algebra.author!.read()).toBe(team);
    });

    it('is closed in the model — following the destination and then its author arrives back', () => {
        const team = authored('The Team', 'The Team');

        $(<LibraryCatalogue>
            <LibraryCard name="The Team" of={() => team} title="The Team" />
        </LibraryCatalogue>);

        expect(team.author!.read().author!.read()).toBe(team);
    });
});

describe('$LibraryCatalogue', () => {
    it('holds a card for each book and answers it by name', () => {
        const team = authored('The Team');
        const catalogue: $LibraryCatalogue = $(
            <LibraryCatalogue>
                <LibraryCard name="The Team" of={() => team} title="The Team" />
            </LibraryCatalogue>
        );

        expect(catalogue.holds('The Team')).toBe(true);
        expect(catalogue.card('The Team').read()).toBe(team);
        expect(catalogue.parts()).toHaveLength(1);
    });

    it('refuses a lookup it has no card for, naming what was asked', () => {
        const catalogue: $LibraryCatalogue = $(<LibraryCatalogue>{null}</LibraryCatalogue>);

        expect(() => catalogue.card('The Manifold')).toThrow(/The Manifold/);
    });
});
