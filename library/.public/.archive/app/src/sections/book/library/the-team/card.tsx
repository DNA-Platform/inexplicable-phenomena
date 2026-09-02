import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Book } from '@/book/Book';
import { $CardCatalogue, CardCatalogue } from '@/reference/CardCatalogue';
import { $Canonical } from '@/book/Canonical';
import { type $LibraryCard, LibraryCard } from './librarycard';
import { shelf, drawer, entries } from '../the-shelf/book';

let written: $Book | undefined = undefined;

// Shelving completes the card: the book arrives, and the card's synopsis line
// is read off the book's own compression chain — synopsis chapter → summary → tagline.
export const shelve = (book: $Book) => {
    written = book;
    theTeam.$synopsis = book.synopsis?.tagline?.copy ?? '';
};

const titles = (book: $Book): string[] => book.chapters.map(c => c.title?.copy ?? '');

const line = (book: $Book): string => book.synopsis?.tagline?.copy ?? '';

// ONE DOOR PER BOOK, and nothing behind it is opened until a card is followed.
// These four used to be static imports, so the shelf — the landing page — could
// not draw one spine without every book in memory: a card was BUILT by reading
// its living book, `synopsis={line(algebra)}`, so the card could not exist until
// the book did. Measured, that was 2,061 ms of construction after the last byte
// had already arrived, which is why neither bundling nor lazy loading could fix
// it. The cards below carry their own text instead, and `card.test.tsx` asserts
// that text against the living books so it cannot drift in silence.
//
// THE SHELF IS NOT HERE because the landing page IS the shelf: its book is
// already in memory, so its card reads it and nothing is transcribed.
// A BOOK IS THE VALUE OF THE PROMISE, which it could not be until this sprint.
// Every $Referent declared `then` — the member that chains a reference onto a
// path — and `then` is also the JavaScript thenable protocol, so `Promise<$Book>`
// was not a valid promise type and awaiting one would have handed `resolve` to
// `$Book.then` as though it were a reference and never settled. The member is
// `follow` now, and a book can simply be awaited.
const doors: Record<string, () => Promise<$Book>> = {
    'The Algebra of Perspective': () => import('../algebra/book').then(m => m.algebra),
    'The Manifold': () => import('../the-manifold/book').then(m => m.manifold),
    'The Build': () => import('../the-build/book').then(m => m.build),
};

const arrived = new Map<string, $Book>();

// FOLLOWING A CARD IS WHEN THE BOOK ARRIVES, and it is also when the book's own
// annotations are handed their cards — which used to happen at module scope for
// all four at once, and could not, once nothing was loaded.
export const follow = async (card: $LibraryCard): Promise<void> => {
    if (arrived.has(card.name)) return;
    const door = doors[card.name];
    const book = door ? await door() : card.read();
    arrived.set(card.name, book);
    if (book.author) book.author.$for = theTeam;
    if (book.subject) book.subject.$for = theShelf;
};

export const libraryCatalogue = $(<CardCatalogue cards={[
    $(<LibraryCard
        name="The Team"
        of={() => written!}
        title="The Team"
        subtitle="An Account of Four Books, One of Them This One"
        chapters={['The Team', 'Synopsis', 'The First Sheet', 'Night Work', 'The Shelf Was Already a Catalogue', 'The Decision', 'The Author, In Code', 'The Card, In Code']}
    />) as $LibraryCard,
    $(<LibraryCard
        name="The Algebra of Perspective"
        of={() => arrived.get('The Algebra of Perspective')!}
        title="The Algebra of Perspective"
        subtitle="A Study in Reading"
        synopsis="A study of reading as a change of coordinates."
        chapters={['The Algebra of Perspective', 'Table of Contents', 'Synopsis', 'Coordinates', 'The Index Law', 'The Summary Law', 'The Measure of Reading']}
    />) as $LibraryCard,
    $(<LibraryCard
        name="The Manifold"
        of={() => arrived.get('The Manifold')!}
        title="The Manifold of Sentences"
        subtitle="A Geometry of Prose"
        synopsis="Writing is a smooth surface stitched from folds…"
        chapters={['The Manifold of Sentences', 'Table of Contents', 'Synopsis', 'The Fold', 'The Chart', 'Curvature', 'The Geodesic', 'The Reference', 'The Atlas']}
    />) as $LibraryCard,
    $(<LibraryCard name="The Shelf" of={() => shelf} title="The Shelf" synopsis={line(shelf)} chapters={titles(shelf)} />) as $LibraryCard,
    $(<LibraryCard
        name="The Build"
        of={() => arrived.get('The Build')!}
        title="The Build"
        subtitle="How a Folder Becomes a Library"
        synopsis="How a folder of chapters becomes a library."
        chapters={['The Build', 'Table of Contents', 'Synopsis', 'A Folder Is a Book', 'The Canonical Hierarchy', 'The Process', 'The Dispatch', 'The Description', 'The Library', 'The Showing']}
    />) as $LibraryCard,
]} />) as $CardCatalogue;

export const theTeam: $LibraryCard = libraryCatalogue.card('The Team') as $LibraryCard;
export const theAlgebra: $LibraryCard = libraryCatalogue.card('The Algebra of Perspective') as $LibraryCard;
export const theManifold: $LibraryCard = libraryCatalogue.card('The Manifold') as $LibraryCard;
export const theShelf: $LibraryCard = libraryCatalogue.card('The Shelf') as $LibraryCard;
export const theBuild: $LibraryCard = libraryCatalogue.card('The Build') as $LibraryCard;

for (const card of libraryCatalogue.cards as $LibraryCard[]) card.$author = theTeam;
for (const card of libraryCatalogue.cards as $LibraryCard[]) card.$subject = theShelf;

// THE SHELF'S OWN ANNOTATIONS, wired here because its book is already in memory.
// The other three are wired by `follow`, when they arrive.
if (shelf.author) shelf.author.$for = theTeam;
if (shelf.subject) shelf.subject.$for = theShelf;

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
