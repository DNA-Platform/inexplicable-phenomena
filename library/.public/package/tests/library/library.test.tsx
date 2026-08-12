import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $LibraryCard, LibraryCard } from '@/../app/src/sections/book/library/the-team/librarycard';

// A LIBRARY IS COMPUTED OFF CARDS, and it is the demo's law rather than the
// framework's — $Book carries no `library` member any more. The recursion
// terminates at the subject that is its own subject, and nothing opens a book.
describe('the library — computed recursively, terminating at the self-cataloguing subject', () => {
    const card = (name: string): $LibraryCard => $(<LibraryCard name={name} title={name} />) as $LibraryCard;

    it('the self-cataloguing subject answers its own card', () => {
        const shelf = card('The Shelf');
        shelf.$subject = shelf;

        expect(shelf.library).toBe(shelf);
    });

    it('every card arrives at the same library', () => {
        const shelf = card('The Shelf');
        const algebra = card('The Algebra of Perspective');
        shelf.$subject = shelf;
        algebra.$subject = shelf;

        expect(algebra.library).toBe(shelf);
        expect(shelf.library).toBe(algebra.library);
    });

    it('a card with no subject computes no library', () => {
        expect(card('Stray').library).toBeUndefined();
    });

    it('the recursion climbs a chain of subjects to the summit', () => {
        const shelf = card('The Shelf');
        const middle = card('A Middle Subject');
        const leaf = card('A Leaf');
        shelf.$subject = shelf;
        middle.$subject = shelf;
        leaf.$subject = middle;

        expect(leaf.library).toBe(shelf);
    });
});
