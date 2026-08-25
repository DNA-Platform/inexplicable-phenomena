import type { $Book } from '@dna-platform/lib';
import { books } from './library/books';

// THE APPLICATION'S DOOR ONTO THE CATALOGUE, and almost nothing is left in it.
//
// The cards, the subject links and the map of books are all GENERATED — read off
// living books by the compiler and written into ./library/. What stays here is
// the one thing that is the application's rather than the library's: fetching.
//
// This file used to hold sixty more lines. It carried a hand-written record of
// what each subject held, and a repair that walked a loaded book handing its
// synopses their cards. Both existed because the emitted covers carried NAMES
// and a name cannot be followed. They carry cards now, so a book arrives already
// wired and there is nothing to repair.

export { $Card, cards, at } from './library/cards';
export { books };

import { at as card } from './library/cards';

// FOLLOWING A CARD IS A NAVIGATION AND NOT A DEREFERENCE. The cards tell you
// where the volume is; once it has been fetched the card is standing beside it,
// which is when the card is given its book.
//
// IT HANDS BACK THE BOOK, which it could not do until this sprint. Every
// $Referent declared `then()` for reference paths — which is also JavaScript's
// thenable protocol — so a promise resolving to a book would have called it with
// `resolve` and never settled. The member is `follow` now.
export const fetch = async (path: string): Promise<$Book> => {
    const found = card(path);
    if (!found) throw new Error(`No card stands for ${JSON.stringify(path)}.`);
    const load = books[path];
    if (!load) throw new Error(`The card for ${JSON.stringify(path)} names no book to fetch.`);
    const { book } = await load();
    found.$of = () => book;
    return book;
};
