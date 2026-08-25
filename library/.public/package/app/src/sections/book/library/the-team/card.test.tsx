import { describe, it, expect } from 'vitest';
import { algebra } from '../algebra/book';
import { manifold } from '../the-manifold/book';
import { build } from '../the-build/book';
import { theAlgebra, theManifold, theBuild } from './card';
import { type $Book } from '@/book/Book';
import { type $LibraryCard } from './librarycard';

// THE CARDS CARRY THEIR OWN TEXT, and this is what keeps that honest.
//
// A card used to be BUILT by reading its living book — `synopsis={line(algebra)}`
// — so the shelf could not draw one spine without the whole library in memory:
// 2,061 ms of construction after the last byte had already arrived. The three
// books behind doors now have their text written out instead, and a written
// copy of something drifts unless something compares it.
//
// This is that comparison. It opens the books, which a PAGE never does.
const line = (book: $Book): string => book.synopsis?.tagline?.copy ?? '';
const titles = (book: $Book): string[] => book.chapters.map(c => c.title?.copy ?? '');

describe('a card says what its book says, without the page opening one', () => {
    const pairs: [string, $LibraryCard, $Book][] = [
        ['The Algebra of Perspective', theAlgebra, algebra],
        ['The Manifold', theManifold, manifold],
        ['The Build', theBuild, build],
    ];

    for (const [name, card, book] of pairs) {
        it(`${name} — its written synopsis is the book's own tagline`, () => {
            expect(card.synopsis).toBe(line(book));
        });

        it(`${name} — its written chapters are the book's own`, () => {
            expect(card.chapters).toEqual(titles(book));
        });
    }
});
