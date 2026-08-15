import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $IndexCard, IndexCard, $CardCatalogue, $Synopsis } from '@dna-platform/lib';

// THE CARD THIS LIBRARY CARRIES. A card in the framework is an $IndexCard<$Book>
// and nothing more; which fields a library's cards carry is that library's
// business, so this declares them. Identity is the PATH, because a path is what
// a route arrives holding. The title is writing and may change without breaking
// a link.
export class $Card extends $IndexCard<$Book> {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];
    $subject?: $Card = undefined;

    get path(): string { return this.name; }

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get synopsis(): string { return this.$synopsis; }

    get chapters(): string[] { return this.$chapters; }

    get subject(): $Card | undefined { return this.$subject; }

    // NO CANONICAL LINK, and the reason is not the name it would have shadowed.
    // A canonical link is a SUBJECT'S — it says which of the books a subject
    // holds speaks for it — and a card catalogues nothing. It is a surrogate you
    // consult so the item need not be handled, so a question about what a
    // subject holds is not a question a card can answer.
    get library(): $Card | undefined {
        return this.$subject === this ? this : this.$subject?.library;
    }
}

const Card = $($Card);

const card = (path: string, title: string, subtitle: string, synopsis: string, chapters: string[]): $Card =>
    $(<Card name={path} title={title} subtitle={subtitle} synopsis={synopsis} chapters={chapters} />) as $Card;

export const catalogue = new $CardCatalogue<$Book>(
    card('/', 'A Test Library', '', 'Two subjects, four books, every rule exercised.', ['Synopsis', 'What This Library Is', 'What This Library Exercises']),
    card('/physics', 'Physics', 'The Study of What There Is', 'Two books, one of them canonical.', ['Synopsis', 'What Physics Is']),
    card('/physics/the-standard-model', 'The Standard Model', 'A Catalogue of Fields', 'Twelve fermions, four forces, one field.', ['Synopsis', 'Symmetry']),
    card('/physics/gauge-theory', 'Gauge Theory', 'The Shape of a Force', 'A local symmetry, and the force it demands.', ['Synopsis', 'The Gauge Principle']),
    card('/philosophy', 'Philosophy', 'The Study of What Follows', 'One book, no declaration.', ['Synopsis']),
    card('/philosophy/the-hard-problem', 'The Hard Problem', 'Why There Is Something It Is Like', 'Function explained, experience unexplained.', ['Synopsis', 'What It Is Like']),
);

export const at = (path: string): $Card | undefined =>
    catalogue.holds(path) ? catalogue.card(path) as $Card : undefined;

const of = (path: string): $Card => catalogue.card(path) as $Card;

// THE SUBJECT LINKS, CARD TO CARD. Nothing is opened to answer any of these:
// the library computes recursively through them, and agreement is checked in
// place rather than by walking books.
of('/').$subject = of('/');
of('/physics').$subject = of('/');
of('/philosophy').$subject = of('/');
of('/physics/the-standard-model').$subject = of('/physics');
of('/physics/gauge-theory').$subject = of('/physics');
of('/philosophy/the-hard-problem').$subject = of('/philosophy');

// WHAT A SUBJECT HOLDS, in the order its book stands their synopses in. The
// catalogue knows this without opening anything, which is what lets a subject
// page draw its entries with no book but its own present.
//
// AND THIS IS WHERE THE CANONICAL LINK LIVES, because it is a subject's and not
// a card's: the first book a subject holds speaks for it unless its cover names
// another. Asking a card which book speaks for a subject would be asking the
// surrogate a question about the thing it stands in for.
export const held: Record<string, string[]> = {
    '/': ['/physics', '/philosophy'],
    '/physics': ['/physics/the-standard-model', '/physics/gauge-theory'],
    '/philosophy': ['/philosophy/the-hard-problem'],
};

// THE ONLY DOOR INTO A BOOK. Written out rather than matched by a pattern: a
// glob sees neither a dotted folder nor a dotted file, so it would find none of
// these and report a confident zero.
export const books: Record<string, () => Promise<{ book: $Book }>> = {
    '/': () => import('./library/..the-library/book'),
    '/physics': () => import('./library/.physics/.subject/book'),
    '/physics/the-standard-model': () => import('./library/.physics/the-standard-model/book'),
    '/physics/gauge-theory': () => import('./library/.physics/gauge-theory/book'),
    '/philosophy': () => import('./library/.philosophy/.subject/book'),
    '/philosophy/the-hard-problem': () => import('./library/.philosophy/the-hard-problem/book'),
};

// A CARD HANDS BACK NO BOOK UNTIL ITS BOOK IS PRESENT. Following a card is a
// navigation and not a dereference: the catalogue tells you where the volume is,
// and once it has been fetched the card is standing beside it.
//
// IT HANDS BACK A HOLDER RATHER THAN THE BOOK, and that is forced: $Book declares
// `then()` for reference paths, so a promise resolving to one would call it and
// never settle. Any stage that loads a book asynchronously meets this.
export const fetch = async (path: string): Promise<{ book: $Book }> => {
    const found = at(path);
    if (!found) throw new Error(`The catalogue holds no card for ${JSON.stringify(path)}.`);
    const load = books[path];
    if (!load) throw new Error(`The card for ${JSON.stringify(path)} names no book to fetch.`);
    const holder = await load();
    found.$of = () => holder.book;
    shelve(path, holder.book);
    return holder;
};

// SHELVING COMPLETES THE BOOK. Its cover names its subject in prose; the card is
// what makes that name followable, and each synopsis it catalogues is handed the
// card of the book it stands for — which is what makes it read ELSEWHERE, and
// therefore what makes this book a catalogue.
const shelve = (path: string, book: $Book): void => {
    const here = of(path);
    if (book.subject) book.subject.$for = here.subject;
    const standing = book.chapters.filter(
        (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
    );
    (held[path] ?? []).forEach((child, i) => {
        const entry = standing[i];
        if (entry) entry.$for = of(child);
    });
};
