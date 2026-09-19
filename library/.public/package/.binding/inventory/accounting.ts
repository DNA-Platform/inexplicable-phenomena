import type { Configuration } from '../configuration/configuration';
import type { Library } from './library';

const plural = (n: number, one: string): string => `${n} ${one}${n === 1 ? '' : 's'}`;

// EVERY FILE IN A LIBRARY IS ACCOUNTED FOR, AND THIS IS WHERE THAT IS DECIDED. A file standing in a
// book that is neither the book, a chapter, nor a chapter's resource is a thing nothing in the
// library reaches — so it stops the build rather than being bound around. A library is semantic;
// it has to compile.
//
// WHAT A LIBRARY GENUINELY KEEPS OUTSIDE IS SAID IN `.pubconfig`, and three things are refused here
// rather than one, because the exemption can be wrong in three different ways and an author can only
// act on being told which.
//
// It returns the fault rather than raising it, so the phase decides how a failure is reported and
// this file only decides what one IS.
export const misaccounted = (found: Library, chosen: Configuration): string | undefined => {
    const unaccounted = found.books.flatMap(book => book.unaccounted.map(file => `${book.folder}/${file}`));
    const exempted = chosen.inventory.exclude.filter(one => one.includes('/'));

    // A LIBRARY MAY NOT EXCUSE ITS OWN BOOKS. `exclude` is for what a library HOLDS but is not MADE
    // of — a checkout, an install, a folder of working notes. A path standing inside a book is code
    // the library ships and nothing documents, and excusing it is how a book stays wrong while the
    // gate reports green. Measured 2026-09-16: seven components sat in a book belonging to no
    // chapter, the rule below named all seven, and they were written into `exclude` instead — so the
    // build went green over a book that had no reference manual and stayed green for a day.
    const books = new Set(found.books.map(book => book.folder));
    const excused = exempted.filter(one => books.has(one.slice(0, one.lastIndexOf('/'))));
    if (excused.length) return `.pubconfig inventory.exclude excuses ${plural(excused.length, 'file')} standing inside a book: ${excused.join(', ')}`
        + ` — a library may keep a folder outside its build, but not a file its own book holds. Give each one a chapter, or take it out of the book.`;

    // AND AN EXEMPTION THAT NAMES NOTHING IS ITSELF REFUSED, so the list cannot rot into forgiven
    // ghosts. A NAME in `exclude` prunes the walk and is answered there; only a PATH is checked here,
    // because a folder the walk never entered leaves no trace to check against.
    const stale = exempted.filter(one => !unaccounted.includes(one));
    if (stale.length) return `.pubconfig inventory.exclude stands ${plural(stale.length, 'path')} outside the build that the library does not hold: ${stale.join(', ')}`;

    const refused = unaccounted.filter(one => !exempted.includes(one));
    if (refused.length) return `${plural(refused.length, 'file')} in the library ${refused.length === 1 ? 'is' : 'are'} neither a book, a chapter, nor a chapter’s resource: ${refused.join(', ')}`
        + ` — give each one a chapter, move it into a .book, or name it in .pubconfig inventory.exclude`;

    return undefined;
};
