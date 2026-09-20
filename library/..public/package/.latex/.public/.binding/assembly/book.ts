import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, sep } from 'node:path';
import type { Book } from '../inventory/library';

const named = (file: string): string => file.replace(/\.tsx$/u, '');
const local = (file: string): string => named(file).replace(/^\.+/u, '').replace(/^[\d.]+-/u, '').replace(/-(\w)/gu, (_, letter: string) => letter.toUpperCase());
const classed = (file: string): string => local(file).replace(/^\w/u, letter => letter.toUpperCase());

// A BOOK, ASSEMBLED FROM THE ONE LIST THE INVENTORY MADE: its apparatus, then its chapters in order.
// The order is the inventory's, so nothing here counts files a second time.
export const assemble = (face: string, book: Book): string => {
    const from = relative(dirname(book.module), book.path).split(sep).join('/');
    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
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
    ];
    // WRITTEN ONLY WHEN IT CHANGED. A thousand books rewritten identically every build is a thousand
    // writes vite must then decide are new, and the digest that keeps a book from being read again
    // has the book's module among its inputs.
    const written = lines.join('\n');
    if (!existsSync(book.module) || readFileSync(book.module, 'utf8') !== written) {
        mkdirSync(dirname(book.module), { recursive: true });
        writeFileSync(book.module, written, 'utf8');
    }

    return relative(face, book.module).split(sep).join('/');
};
