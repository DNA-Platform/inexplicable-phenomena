import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Book } from '@/book/Book';
import { $CardCatalogue, CardCatalogue } from '@/library/CardCatalogue';
import { $Canonical } from '@/book/Canonical';
import { type $LibraryCard, LibraryCard } from './librarycard';
import { algebra } from '../algebra/book';
import { manifold } from '../the-manifold/book';
import { shelf, drawer, entries } from '../the-shelf/book';
import { build } from '../the-build/book';

let written: $Book | undefined = undefined;

// Shelving completes the card: the book arrives, and the card's synopsis line
// is read off the book's own compression chain — synopsis chapter → summary → tagline.
export const shelve = (book: $Book) => {
    written = book;
    theTeam.$synopsis = book.synopsis?.tagline?.copy ?? '';
};

const titles = (book: $Book): string[] => book.chapters.map(c => c.title?.copy ?? '');

const line = (book: $Book): string => book.synopsis?.tagline?.copy ?? '';

export const libraryCatalogue = $(<CardCatalogue cards={[
    $(<LibraryCard
        name="The Team"
        of={() => written!}
        title="The Team"
        subtitle="An Account of Four Books, One of Them This One"
        chapters={['The Team', 'Synopsis', 'The First Sheet', 'Night Work', 'The Shelf Was Already a Catalogue', 'The Decision', 'The Author, In Code', 'The Card, In Code']}
    />) as $LibraryCard,
    $(<LibraryCard name="The Algebra of Perspective" of={() => algebra} title="The Algebra of Perspective" subtitle="A Study in Reading" synopsis={line(algebra)} chapters={titles(algebra)} />) as $LibraryCard,
    $(<LibraryCard name="The Manifold" of={() => manifold} title="The Manifold of Sentences" subtitle="A Geometry of Prose" synopsis={line(manifold)} chapters={titles(manifold)} />) as $LibraryCard,
    $(<LibraryCard name="The Shelf" of={() => shelf} title="The Shelf" synopsis={line(shelf)} chapters={titles(shelf)} />) as $LibraryCard,
    $(<LibraryCard name="The Build" of={() => build} title="The Build" subtitle="How a Folder Becomes a Library" synopsis={line(build)} chapters={titles(build)} />) as $LibraryCard,
]} />) as $CardCatalogue;

export const theTeam: $LibraryCard = libraryCatalogue.card('The Team') as $LibraryCard;
export const theAlgebra: $LibraryCard = libraryCatalogue.card('The Algebra of Perspective') as $LibraryCard;
export const theManifold: $LibraryCard = libraryCatalogue.card('The Manifold') as $LibraryCard;
export const theShelf: $LibraryCard = libraryCatalogue.card('The Shelf') as $LibraryCard;
export const theBuild: $LibraryCard = libraryCatalogue.card('The Build') as $LibraryCard;

for (const card of libraryCatalogue.cards as $LibraryCard[]) card.$author = theTeam;
for (const card of libraryCatalogue.cards as $LibraryCard[]) card.$subject = theShelf;

for (const book of [algebra, manifold, shelf, build]) {
    if (book.author) book.author.$for = theTeam;
    if (book.subject) book.subject.$for = theShelf;
}

const canonical = shelf.cover.words.find(w => w instanceof $Canonical) as $Canonical | undefined;
if (canonical) canonical.$for = theTeam;

libraryCatalogue.file('author', 'The Team', theTeam);
libraryCatalogue.file('subject', 'Demonstration', theShelf);

// Membership is read off the subject links — every card whose subject is The Shelf,
// the shelf's own card among them. The drawer holds it to print the cards as cards.
const membership = (libraryCatalogue.cards as $LibraryCard[]).filter(c => c.subject === theShelf);
drawer.$cards = membership;

// THE CATALOGUE ENTRIES ARE CHAPTERS. Each synopsis standing in The Shelf is
// handed the card of the book it is OF — the same act, one grade up, as the
// author and subject links above. Until this runs every synopsis reads home;
// after it, three of them read elsewhere and the shelf catalogues three books.
// In the order The Shelf composes them.
[theAlgebra, theManifold, theTeam, theBuild].forEach((card, at) => {
    const entry = entries[at];
    if (entry) entry.$for = card;
});
