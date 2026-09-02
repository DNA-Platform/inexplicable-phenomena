import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { config } from './config.ts';
import { walk } from './walk.ts';
import { read } from './read.ts';
import { resolve } from './resolve.ts';
import type { Book, Library } from './library.ts';

export type Card = { route: string; title: string; chapters: number };

const titled = (book: Book): string =>
    (book.route.split('/').filter(Boolean).pop() ?? 'library')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const cards = (library: Library): Card[] =>
    library.books.map(book => ({ route: book.route, title: titled(book), chapters: book.chapters.length }));

export const catalogue = (library: Library, to: string): number => {
    const held = cards(library);
    const text = `export type Card = { route: string; title: string; chapters: number };

export const cards: Card[] = [
${held.map(card => `    { route: ${JSON.stringify(card.route)}, title: ${JSON.stringify(card.title)}, chapters: ${card.chapters} },`).join('\n')}
];
`;
    mkdirSync(to, { recursive: true });
    writeFileSync(join(to, 'cards.ts'), text);
    return held.length;
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('catalogue.ts <corpus>');
        process.exit(1);
    }
    const bound = config(at);
    const walked = walk(bound.from);
    const library = resolve(read({ ...walked, entries: walked.entries.filter(entry => !`${walked.root}/${entry.path}/`.startsWith(bound.to + '/')) }));
    console.log(`CATALOGUE ${catalogue(library, bound.to)} cards`);
}
