import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Book } from '@/book/Book';
import { type $LibraryCard, LibraryCard } from '@/library/LibraryCard';
import { $LibraryCatalogue, LibraryCatalogue } from '@/library/LibraryCatalogue';
import { algebra } from '../algebra/book';
import { manifold } from '../the-manifold/book';
import { shelf } from '../the-shelf/book';

let written: $Book | undefined = undefined;

export const shelve = (book: $Book) => { written = book; };

const titles = (book: $Book): string[] => book.chapters.map(c => c.title?.copy ?? '');

export const libraryCatalogue: $LibraryCatalogue = $(
    <LibraryCatalogue>
        <LibraryCard
            name="The Team"
            of={() => written!}
            title="The Team"
            subtitle="An Account of Four Books, One of Them This One"
            synopsis="Synopsis"
            chapters={['The Team', 'Synopsis', 'The First Sheet', 'Night Work', 'The Shelf Was Already a Catalogue', 'The Decision', 'The Author, In Code', 'The Card, In Code']}
        />
        <LibraryCard
            name="The Algebra of Perspective"
            of={() => algebra}
            title="The Algebra of Perspective"
            subtitle="A Study in Reading"
            synopsis="Synopsis"
            chapters={titles(algebra)}
        />
        <LibraryCard
            name="The Manifold"
            of={() => manifold}
            title="The Manifold"
            synopsis="Synopsis"
            chapters={titles(manifold)}
        />
        <LibraryCard
            name="The Shelf"
            of={() => shelf}
            title="The Shelf"
            synopsis="Synopsis"
            chapters={titles(shelf)}
        />
    </LibraryCatalogue>
);

export const theTeam: $LibraryCard = libraryCatalogue.card('The Team');
export const theAlgebra: $LibraryCard = libraryCatalogue.card('The Algebra of Perspective');
export const theManifold: $LibraryCard = libraryCatalogue.card('The Manifold');
export const theShelf: $LibraryCard = libraryCatalogue.card('The Shelf');

for (const card of libraryCatalogue.cards) card.$author = theTeam;
