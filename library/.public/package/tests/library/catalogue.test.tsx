import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $LibraryCard, LibraryCard } from '@/library/LibraryCard';
import { $LibraryCatalogue, LibraryCatalogue } from '@/library/LibraryCatalogue';

const catalogued = (): { catalogue: $LibraryCatalogue; shelf: $LibraryCard; team: $LibraryCard; manifold: $LibraryCard } => {
    const catalogue: $LibraryCatalogue = $(
        <LibraryCatalogue>
            <LibraryCard name="The Shelf" title="The Shelf" />
            <LibraryCard name="The Team" title="The Team" />
            <LibraryCard name="The Manifold" title="The Manifold" />
        </LibraryCatalogue>
    );
    return {
        catalogue,
        shelf: catalogue.card('The Shelf'),
        team: catalogue.card('The Team'),
        manifold: catalogue.card('The Manifold'),
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

    it('refuses a query it files nothing under, naming the query', () => {
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
