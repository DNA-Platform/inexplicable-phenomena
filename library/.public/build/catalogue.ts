import { join } from 'node:path';
import type { Book, Resolved } from './library.ts';

// THE CARDS, READ OFF LIVING BOOKS — never parsed out of the source that made
// them. A card carries what a reader is shown before deciding to open anything,
// and every one of those is something the model already answers: a title split
// at its colon, a synopsis's summary, the titles of the chapters. Parsing the
// source for them would be a second reading that can disagree with the first.
//
// Which is why this runs AFTER emitting. The books have to exist to be asked.

export type Named = { book: Book; as: string; title: string; subtitle: string; synopsis: string; chapters: string[] };

// A card needs an identifier a module can import. The route already names the
// book uniquely, so the identifier is the route with its separators spent.
export const identifier = (route: string): string => {
    const parts = route.split('/').filter(Boolean).flatMap(p => p.split('-'));
    if (!parts.length) return 'library';
    return parts.map((p, i) => (i ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join('');
};

const quoted = (text: string): string => JSON.stringify(text);

// The tagline is the summary's writing with its own title taken off — a summary
// is a section, its title stands at paragraph zero, and what follows is what a
// catalogue prints.
const tagline = (summary: { parts(): { copy: string }[] } | undefined): string =>
    summary ? summary.parts().slice(1).map(p => p.copy).join(' ').trim() : '';

export const read = async (resolved: Resolved, into: string): Promise<Named[]> => {
    const named: Named[] = [];
    for (const book of resolved.books) {
        const at = join(into, book.path, 'book.tsx');
        const loaded = (await import(/* @vite-ignore */ `file:///${at.replace(/\\/g, '/')}`)) as { book: any };
        const live = loaded.book;
        // The compiler wrote this composition, so it knows its shape: the cover,
        // the contents, then the book's own account and chapters, then whatever
        // it catalogues. Only the middle stretch is the book's own writing.
        const own = live.chapters.slice(2, 3 + book.chapters.length);
        named.push({
            book,
            as: identifier(book.route),
            title: live.title?.copy ?? '',
            subtitle: live.subtitle?.copy ?? '',
            synopsis: tagline(live.synopsis?.summary),
            chapters: own.map((c: { title?: { copy: string } }) => c.title?.copy ?? ''),
        });
    }
    return named;
};

// ─── THE CATALOGUE MODULE ────────────────────────────────────────────────────
//
// It imports NO BOOK AT ALL, and that is the whole point rather than a detail:
// a catalogue is what you consult so the item need not be handled. Following a
// card is a NAVIGATION, and the module beside this one is where a book is
// actually fetched.

export const cards = (named: Named[]): string => {
    const declarations = named.map(n =>
        `export const ${n.as}: $Card = card(${quoted(n.book.route)}, ${quoted(n.title)}, ${quoted(n.subtitle)}, ${quoted(n.synopsis)}, [${n.chapters.map(quoted).join(', ')}]);`);

    const by = new Map(named.map(n => [n.book.path, n]));
    const subjects = named
        .map(n => {
            const to = n.book.subject?.book ? by.get(n.book.subject.book) : undefined;
            return to ? `${n.as}.$subject = ${to.as};` : '';
        })
        .filter(Boolean);

    return `import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $IndexCard, IndexCard, $CardCatalogue } from '@dna-platform/lib';

// THE CARDS OF THIS LIBRARY, GENERATED. A card in the framework is an
// $IndexCard<$Book> and nothing more; which fields a library's cards carry is
// that library's business, so this declares them.
//
// Identity is the ROUTE, because a route is what a reader arrives holding. The
// title is writing and may change without breaking a link.
//
// NOTHING HERE IMPORTS A BOOK. A card is a book present without the book, and a
// module that reached for one would be handling the item it stands in for.
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

    // NO CANONICAL LINK. A canonical link is a SUBJECT'S — it says which of the
    // books a subject holds speaks for it — and a card catalogues nothing.
    //
    // AND NO LIBRARY CLIMB. It used to live here, and a rule about books that
    // lives in generated code is a rule with two homes that can disagree. It is
    // $Book.library now, in the framework, asked of a book rather than a card.
}

const Card = $($Card);

const card = (path: string, title: string, subtitle: string, synopsis: string, chapters: string[]): $Card =>
    $(<Card name={path} title={title} subtitle={subtitle} synopsis={synopsis} chapters={chapters} />) as $Card;

${declarations.join('\n')}

// THE SUBJECT LINKS, CARD TO CARD. Nothing is opened to answer any of these: the
// library computes recursively through them, and agreement is checked in place
// rather than by walking books.
${subjects.join('\n')}

export const catalogue = new $CardCatalogue<$Book>(
${named.map(n => `    ${n.as},`).join('\n')}
);

export const at = (path: string): $Card | undefined =>
    catalogue.holds(path) ? catalogue.card(path) as $Card : undefined;
`;
};

// ─── WHERE THE BOOKS ARE ─────────────────────────────────────────────────────
//
// Written out one by one rather than matched by a pattern: a glob sees neither a
// dotted folder nor a dotted file, so it would find none of these and report a
// confident zero. This module is the only door into a book.

export const books = (named: Named[]): string => `import type { $Book } from '@dna-platform/lib';

// THE ONLY DOOR INTO A BOOK, and every one of them is named. A glob would find
// none: every cover and synopsis in this library begins with a dot.
//
// Each entry is a dynamic import, so a page loads the one book it is showing and
// no other. That is not a discipline anybody keeps — it is the shape of the map.
export const books: Record<string, () => Promise<{ book: $Book }>> = {
${named.map(n => `    ${quoted(n.book.route)}: () => import('./${n.book.path}/book'),`).join('\n')}
};
`;
