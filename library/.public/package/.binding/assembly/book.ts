import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, sep } from 'node:path';
import type { Book } from '../inventory/library';

const named = (file: string): string => file.replace(/\.tsx$/u, '');
const local = (file: string): string => named(file).replace(/^\.+/u, '').replace(/^[\d.]+-/u, '').replace(/-(\w)/gu, (_, letter: string) => letter.toUpperCase());
const classed = (file: string): string => local(file).replace(/^\w/u, letter => letter.toUpperCase());

// A BOOK, ASSEMBLED FROM THE ONE LIST THE INVENTORY MADE: its apparatus, then its chapters in order.
// The order is the inventory's, so nothing here counts files a second time.
//
// A RESOURCE IS NOT HANDED OVER HERE. It is found in a chapter's own source and replaced before
// anything is compiled — see the binding:resources plugin. This file writes the book and nothing else.
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
// AND THE BOOK TAKES ITS OWN HOT UPDATE, which is the last line of the module and the reason the
// page no longer reloads when a chapter is saved.
//
// REACT FAST REFRESH DECLINES THIS MODULE AND IS RIGHT TO. It swaps a module only when every export
// is a component it knows how to keep; `book` is a VALUE, and a chapter's default export is a
// CLASS. So vite walked up from the edited chapter, through here, to the entry — which exports
// nothing at all and therefore cannot accept either — and fell back to reloading the page. Measured
// 2026-09-19: a mark left on the window did not survive a chapter being saved.
//
// A SELF-ACCEPTING MODULE IS THE BOUNDARY. Vite stops propagating at the first module that accepts,
// re-executes it — which re-imports the chapter that changed — and hands the new namespace to the
// callback. So the book puts itself back on the page, and nothing above it is disturbed.
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
        ...book.files.map(file => `import $${classed(file)} from '${from}/${named(file)}';`),
        ``,
        `const Book = $($Book);`,
        ...book.files.map(file => `const ${classed(file)} = $($${classed(file)});`),
        ``,
        `export const book = $<$Book>(`,
        `    <Book>`,
        ...book.files.map(file => `        <${classed(file)} />`),
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
