import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $LibraryCard, LibraryCard } from '@/../app/src/sections/book/library/the-team/librarycard';
import { $CardCatalogue } from '@/library/CardCatalogue';
import { type $Book } from '@/book/Book';

const catalogued = (): { catalogue: $CardCatalogue<$Book>; shelf: $LibraryCard; team: $LibraryCard; manifold: $LibraryCard } => {
    const catalogue = new $CardCatalogue<$Book>(
        $(<LibraryCard name="The Shelf" title="The Shelf" />) as $LibraryCard,
        $(<LibraryCard name="The Team" title="The Team" />) as $LibraryCard,
        $(<LibraryCard name="The Manifold" title="The Manifold" />) as $LibraryCard,
    );
    for (const card of catalogue.cards as $LibraryCard[]) catalogue.file('title', card.title, card);
    return {
        catalogue,
        shelf: catalogue.card('The Shelf') as $LibraryCard,
        team: catalogue.card('The Team') as $LibraryCard,
        manifold: catalogue.card('The Manifold') as $LibraryCard,
    };
};

describe('the finder — find answers a library card, three ways and extensible', () => {
    it('files every card under its title when initialized', () => {
        const { catalogue, manifold } = catalogued();

        expect(catalogue.find('title: The Manifold')).toBe(manifold);
    });

    it('answers an author lookup once the author is registered', () => {
        const { catalogue, team } = catalogued();
        catalogue.file('author', 'The Team', team);

        expect(catalogue.find('author: The Team')).toBe(team);
    });

    it('answers a subject lookup once the subject is registered', () => {
        const { catalogue, shelf } = catalogued();
        catalogue.file('subject', 'Demonstration', shelf);

        expect(catalogue.find('subject: Demonstration')).toBe(shelf);
    });

    it('throws for a query it files nothing under, naming the query', () => {
        const { catalogue } = catalogued();

        expect(() => catalogue.find('title: The Missing Book')).toThrow(/title: The Missing Book/);
        expect(() => catalogue.find('genre: poetry')).toThrow(/genre: poetry/);
    });

    it('extends by a new key — an index call, not a rework', () => {
        const { catalogue, team } = catalogued();
        catalogue.file('kind', 'autobiography', team);

        expect(catalogue.find('kind: autobiography')).toBe(team);
    });

    it('a later filing under the same way and keyword replaces the earlier one', () => {
        const { catalogue, shelf, team } = catalogued();
        catalogue.file('subject', 'Demonstration', team);
        catalogue.file('subject', 'Demonstration', shelf);

        expect(catalogue.find('subject: Demonstration')).toBe(shelf);
    });
});
