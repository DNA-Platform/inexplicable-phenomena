import type { Configuration } from '../configuration/configuration';
import type { Diagnostic, Library } from './library';

// EVERY FILE IN A LIBRARY IS ACCOUNTED FOR, AND THIS IS WHERE THAT IS DECIDED. A file standing in a
// book that is neither the book, a chapter, nor a file accompanying one is a thing nothing in the
// library reaches — so it stops the build rather than being bound around. A library is semantic;
// it has to compile.
//
// WHAT A LIBRARY GENUINELY KEEPS OUTSIDE IS SAID IN `.pubconfig`, and the exemption can be wrong in
// more than one way, so each way is refused under its own name and an author can act on being told
// which.
//
// IT RETURNS DIAGNOSTICS RATHER THAN RAISING THEM, in the compiler's one shape — file, fault, what is
// wrong in the library's words — so the phase reports them as every phase does. Doug, 2026-09-28:
// "Make sure to have the binder/compiler deliver errors in a consistent way. It should be like a
// tool that compiles the code by binding the books of the library and, really, binding the whole
// library together."
export const faults = {
    excused: 'EXCUSED-INSIDE-A-BOOK',
    stale: 'STALE-EXEMPTION',
    unaccounted: 'UNACCOUNTED',
    clashing: 'CLASHING-IDENTIFIER',
};

export const misaccounted = (found: Library, chosen: Configuration): Diagnostic[] => {
    const wrong: Diagnostic[] = [];
    const unaccounted = found.books.flatMap(book => book.unaccounted.map(file => `${book.folder}/${file}`));
    const exempted = chosen.inventory.exclude.filter(one => one.includes('/'));

    // A LIBRARY MAY NOT EXCUSE ITS OWN BOOKS. `exclude` is for what a library HOLDS but is not MADE
    // of — a checkout, an install, a folder of working notes. A path standing inside a book is code
    // the library ships and nothing documents, and excusing it is how a book stays wrong while the
    // gate reports green. Measured 2026-09-16: seven components sat in a book belonging to no
    // chapter, the rule below named all seven, and they were written into `exclude` instead — so the
    // build went green over a book that had no reference manual and stayed green for a day.
    const books = new Set(found.books.map(book => book.folder));
    for (const one of exempted.filter(path => books.has(path.slice(0, path.lastIndexOf('/')))))
        wrong.push({ fault: faults.excused, at: '.pubconfig', file: one, says: `inventory.exclude excuses a file standing inside a book — a library may keep a folder outside its build, but not a file its own book holds; give it a chapter, or take it out of the book` });
    if (wrong.length) return wrong;

    // AND AN EXEMPTION THAT NAMES NOTHING IS ITSELF REFUSED, so the list cannot rot into forgiven
    // ghosts. A NAME in `exclude` prunes the walk and is answered there; only a PATH is checked here,
    // because a folder the walk never entered leaves no trace to check against.
    for (const one of exempted.filter(path => !unaccounted.includes(path)))
        wrong.push({ fault: faults.stale, at: '.pubconfig', file: one, says: `inventory.exclude stands a path outside the build that the library does not hold` });
    if (wrong.length) return wrong;

    for (const one of unaccounted.filter(path => !exempted.includes(path)))
        wrong.push({ fault: faults.unaccounted, at: one.slice(0, one.lastIndexOf('/')), file: one, says: `neither a book, a chapter, nor a file accompanying one — give it a chapter, move it into a .book, or name it in .pubconfig inventory.exclude` });

    // AND TWO FILES MAY NOT ACCOMPANY ONE WRITING UNDER ONE IDENTIFIER AND TYPE — Doug, 2026-09-28:
    // "the compiler would error on chapter-name.id.tsx, chapter-name-id.tsx, because ids must be
    // unique per type." The account named them; here each is refused, naming the other.
    for (const book of found.books)
        for (const one of book.clashing)
            wrong.push({ fault: faults.clashing, at: book.folder, file: `${book.folder}/${one.file}`, says: `accompanies ${one.writing} as "${one.identifier}" of type ${one.type}, which another file already does — identifiers are unique per type, so give one of them another identifier` });

    return wrong;
};
