import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Book } from '@/book/Book';
import { $Canonical } from '@/book/Canonical';
import { type $LibraryCard, LibraryCard } from '@/library/LibraryCard';
import { $LibraryCatalogue, LibraryCatalogue } from '@/library/LibraryCatalogue';
import { algebra } from '../algebra/book';
import { manifold } from '../the-manifold/book';
import { shelf, drawer } from '../the-shelf/book';

let written: $Book | undefined = undefined;

// Shelving completes the card: the book arrives, and the card's synopsis line
// is read off the book's own compression chain — synopsis chapter → summary → tagline.
export const shelve = (book: $Book) => {
    written = book;
    theTeam.$synopsis = book.synopsis?.tagline?.copy ?? '';
};

const titles = (book: $Book): string[] => book.chapters.map(c => c.title?.copy ?? '');

const line = (book: $Book): string => book.synopsis?.tagline?.copy ?? '';

export const libraryCatalogue: $LibraryCatalogue = $(
    <LibraryCatalogue>
        <LibraryCard
            name="The Team"
            of={() => written!}
            title="The Team"
            subtitle="An Account of Four Books, One of Them This One"
            chapters={['The Team', 'Synopsis', 'The First Sheet', 'Night Work', 'The Shelf Was Already a Catalogue', 'The Decision', 'The Author, In Code', 'The Card, In Code']}
        />
        <LibraryCard
            name="The Algebra of Perspective"
            of={() => algebra}
            title="The Algebra of Perspective"
            subtitle="A Study in Reading"
            synopsis={line(algebra)}
            chapters={titles(algebra)}
        />
        <LibraryCard
            name="The Manifold"
            of={() => manifold}
            title="The Manifold of Sentences"
            subtitle="A Geometry of Prose"
            synopsis={line(manifold)}
            chapters={titles(manifold)}
        />
        <LibraryCard
            name="The Shelf"
            of={() => shelf}
            title="The Shelf"
            synopsis={line(shelf)}
            chapters={titles(shelf)}
        />
    </LibraryCatalogue>
);

export const theTeam: $LibraryCard = libraryCatalogue.card('The Team');
export const theAlgebra: $LibraryCard = libraryCatalogue.card('The Algebra of Perspective');
export const theManifold: $LibraryCard = libraryCatalogue.card('The Manifold');
export const theShelf: $LibraryCard = libraryCatalogue.card('The Shelf');

for (const card of libraryCatalogue.cards) card.$author = theTeam;
for (const card of libraryCatalogue.cards) card.$subject = theShelf;

for (const book of [algebra, manifold, shelf]) {
    if (book.author) book.author.$for = theTeam;
    if (book.subject) book.subject.$for = theShelf;
}

const canonical = shelf.cover.sections.flatMap(s => s.elements).find(e => e instanceof $Canonical) as $Canonical | undefined;
if (canonical) canonical.$for = theTeam;

libraryCatalogue.file('author', 'The Team', theTeam);
libraryCatalogue.file('subject', 'Demonstration', theShelf);

// Membership is read off the subject links — every card whose subject is The Shelf,
// the shelf's own card among them. The contents' extension and the drawer both hold it.
const membership = libraryCatalogue.cards.filter(c => c.subject === theShelf);
shelf.tableOfContents.$cards = membership;
drawer.$cards = membership;
