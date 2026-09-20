// THE BOOK THAT IS OPEN, AND THE ONE THING THAT MAY REPLACE IT.
//
// A BOOK MODULE CANNOT REACH THE ENTRY THAT RENDERED IT. `main.tsx` imports the route table, which
// imports the book list, which imports the books — so a book asking the entry to draw it again
// would close a circle. This module is the leaf both ends can hold: the entry says how to draw, a
// book says draw this, and neither imports the other.
//
// IT EXISTS FOR HOT REPLACEMENT AND NOTHING ELSE. React Fast Refresh takes a module only when every
// export is a component it can swap, and a book module exports `book`, which is a VALUE — so vite
// walks up from an edited chapter, finds nothing that will take the update, and reloads the page.
// Measured 2026-09-19 on Dougs Library: a mark left on the window did not survive a chapter being
// saved. THE BOOK MODULE ACCEPTS ITS OWN UPDATE INSTEAD, and hands the new book through here.
type Opened = { open(book: unknown): void; drawn(how: (book: unknown) => void): void };

let how: ((book: unknown) => void) | undefined;
let waiting: unknown;

export const opened: Opened = {
    // A BOOK ARRIVING BEFORE THE ENTRY IS READY IS KEPT, NOT DROPPED. The order these two run in is
    // decided by vite's graph rather than by us, and a book whose update landed first would
    // otherwise be a silent no-op that looks exactly like hot replacement not working.
    open: (book: unknown): void => { if (how === undefined) waiting = book; else how(book); },
    drawn: (said: (book: unknown) => void): void => {
        how = said;
        if (waiting !== undefined) { const held = waiting; waiting = undefined; said(held); }
    },
};
