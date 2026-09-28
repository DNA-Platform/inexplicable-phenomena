import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, sep } from 'node:path';
import type { Book } from '../inventory/library';

const named = (file: string): string => file.replace(/\.tsx$/u, '');
const local = (file: string): string => named(file).replace(/^\.+/u, '').replace(/^[\d.]+-/u, '').replace(/-(\w)/gu, (_, letter: string) => letter.toUpperCase());
// A CHAPTER'S SYMBOL CARRIES ITS NUMBER, because two chapters of one book may be filed under one
// slug — measured 2026-09-20: `3-semantic-reference-theory.tsx` and `5-semantic-reference-theory.tsx`
// both became `SemanticReferenceTheory`, and esbuild refused the module. Nobody reads these names.
const classed = (file: string): string => `${local(file).replace(/^\w/u, letter => letter.toUpperCase())}${/^(\d+)-/u.exec(file)?.[1] ?? ''}`;

// A BOOK, ASSEMBLED FROM THE ONE LIST THE INVENTORY MADE: its apparatus, then its chapters in order.
// The order is the inventory's, so nothing here counts files a second time.
//
// AND IT IS A FUNCTION THAT CALLS ITS CHAPTERS. Doug: "Books will be compiled to import the chapter
// components call the functions and send them into the book as children", and "So too for books." A
// chapter file default-exports a function returning its Chapter, and it is CALLED here, never
// rendered: written as `<TheArgument />` it would reach the book as a function chemical its parts
// never see, where `{TheArgument()}` hands the book the Chapter itself. So `book` is called when the
// page draws it, and each chapter when the book is made.
//
// AND THE BOOK IS HANDED ITS BOOKMARK BY WHOEVER DRAWS IT, on the instance and never as a prop: the
// render and the app build the book from this function once, set its bookmark — the url the page is
// open at — and draw it; a bookmark moved is set on the same instance and paints nothing. Doug,
// 2026-09-27: "the thing can't render without intact routing that would be nonsensical. And we
// should have still been on our first paint."
//
// AND THE BINDER APPENDS NOTHING TO A CHAPTER. From Sprint 89 to Sprint 92 every file beside a
// chapter was imported here and handed to it as an Append; Doug, 2026-09-28: "append is the authors.
// You remove the flexibility if you have the binder do it." A file beside a chapter reaches the page
// through the literal, `![[ identifier.type ]]`, which the transform inserts where it stands, or
// through an Append the author writes; the render still copies every picture beside the pages.
//
// THE TEXT OF A BOOK'S MODULE, WITHOUT WRITING IT ANYWHERE, because two things want the same text
// and only one of them wants a file: the batch writes it so a publish has something to bundle, and
// the dev server SERVES it, so a library with nothing generated on disk still runs. One producer,
// two consumers — the alternative is a second place that knows how a book is put together.
//
// WHERE ITS CHAPTERS ARE IMPORTED FROM is given rather than assumed, because the module has two
// homes. Written to disk it stands beside its siblings and reaches its book by a relative path;
// SERVED, it has no place on disk at all and no directory to be relative to — so the caller that
// knows which it is says so, and neither has to infer it from the other.
//
// AND THE BOOK TAKES ITS OWN HOT UPDATE, which is the last line of the module. React Fast Refresh
// declines a module whose exports are values and classes, and a self-accepting module is where vite
// stops propagating: it re-executes here — re-importing the chapter that changed — and hands the
// new namespace to the callback, so the book puts itself back on the page and nothing above it
// is disturbed.
export const assembled = (book: Book, from = relative(dirname(book.module), book.path).split(sep).join('/')): string => {
    // HOW FAR THIS MODULE STANDS BELOW `application/`, COUNTED THE WAY IT WAS PUT THERE. A book
    // module is `application/books/<folder>.tsx` with the folder's own nesting kept, so the number
    // of steps back up is the number of parts in the folder — the same fact `inventory/books.ts`
    // used to place it, rather than a second reading of the path it produced.
    const application = '../'.repeat(book.folder.split('/').length);
    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import { opened } from '${application}opened';`,
        `import $Book from '${from}/.book';`,
        ...book.files.map(file => `import ${classed(file)} from '${from}/${named(file)}';`),
        ``,
        `const Book = $($Book);`,
        ``,
        `export const book = () => (`,
        `    <Book>`,
        ...book.files.map(file => `        {${classed(file)}()}`),
        `    </Book>`,
        `);`,
        ``,
        `if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });`,
        ``,
    ];
    return lines.join('\n');
};

// AND THE SAME TEXT PUT ON DISK, which a publish needs and a dev server does not.
//
// WRITTEN ONLY WHEN IT CHANGED. A thousand books rewritten identically every build is a thousand
// writes vite must then decide are new, and the digest that keeps a book from being read again
// has the book's module among its inputs.
export const assemble = (face: string, book: Book): string => {
    const written = assembled(book);
    if (!existsSync(book.module) || readFileSync(book.module, 'utf8') !== written) {
        mkdirSync(dirname(book.module), { recursive: true });
        writeFileSync(book.module, written, 'utf8');
    }

    return relative(face, book.module).split(sep).join('/');
};
