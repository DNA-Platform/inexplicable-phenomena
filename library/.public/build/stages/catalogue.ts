import { join } from 'node:path';
import type { Book, Library } from '../library.ts';

// THE CARDS, READ OFF LIVING BOOKS — never parsed out of the source that made
// them. A card carries what a reader is shown before deciding to open anything,
// and every one of those is something the model already answers: a title split
// at its colon, a synopsis's summary, the titles of the chapters. Parsing the
// source for them would be a second reading that can disagree with the first.
//
// Which is why this runs AFTER emitting. The books have to exist to be asked.

/** A BOOK PLUS THE FIELDS A CARD CARRIES. The file called these cards
 *  throughout and the type was called Named; it is named for what it makes. */
export type Card = { book: Book; as: string; title: string; subtitle: string; synopsis: string; chapters: string[] };

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

export const read = async (resolved: Library, into: string): Promise<Card[]> => {
    const named: Card[] = [];
    for (const book of resolved.books) {
        const at = join(into, book.path, 'book.tsx');
        const loaded = (await import(/* @vite-ignore */ `file:///${at.replace(/\\/g, '/')}`)) as { book: any };
        const live = loaded.book;
        // A book is ASKED what it lists. Its own contents already excludes the
        // cover, itself, and everything parenthetical, so the card and the
        // contents cannot disagree — which is the whole point of not counting.
        const own = live.contents.chapters;
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

export const cards = (named: Card[]): string => {
    const declarations = named.map(n =>
        `export const ${n.as}: $Card = card(${quoted(n.book.route)}, ${quoted(n.title)}, ${quoted(n.subtitle)}, ${quoted(n.synopsis)}, [${n.chapters.map(quoted).join(', ')}]);`);

    const by = new Map(named.map(n => [n.book.path, n]));
    const authors = named
        .map(n => {
            const to = n.book.author?.book ? by.get(n.book.author.book) : undefined;
            return to ? `${n.as}.$author = ${to.as};` : '';
        })
        .filter(Boolean);

    const entries = named
        .map(n => {
            const held = n.book.entries.map(p => by.get(p)).filter(Boolean);
            return held.length ? `${n.as}.$entries = [${held.map(h => h!.as).join(', ')}];` : '';
        })
        .filter(Boolean);

    const subjects = named
        .map(n => {
            const to = n.book.subject?.book ? by.get(n.book.subject.book) : undefined;
            return to ? `${n.as}.$subject = ${to.as};` : '';
        })
        .filter(Boolean);

    return `import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $$Book, $CardCatalogue, Book, CardCatalogue } from '@dna-platform/lib';

// THE CARDS OF THIS LIBRARY, GENERATED. A card in the framework is an
// $$Book and nothing more; which fields a library's cards carry is
// that library's business, so this declares them.
//
// Identity is the ROUTE, because a route is what a reader arrives holding. The
// title is writing and may change without breaking a link.
//
// NOTHING HERE IMPORTS A BOOK. A card is a book present without the book, and a
// module that reached for one would be handling the item it stands in for.
export class $Card extends $$Book {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];

    get path(): string { return this.name; }

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get synopsis(): string { return this.$synopsis; }

    get chapters(): string[] { return this.$chapters; }

    // NARROWED, because every card in THIS library is a $Card. The base promises
    // a $$Book; a generated catalogue knows better and says so.
    override get subject(): $Card | undefined { return this.$subject as $Card | undefined; }

    override get library(): $Card | undefined { return super.library as $Card | undefined; }

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

// WHO WROTE EACH, AND WHAT EACH SUBJECT HOLDS. The annotation rules ask a card
// these and the card carried neither — which is why $Subject, $Author and
// $Canonical shipped byte-identical: there was nothing for them to differ ABOUT.
${authors.join('\n')}
${entries.join('\n')}

// A CLASS, so a SCOPE CAN HOLD ONE. An annotation asks its scope for the
// catalogue and finds its own card there, which is why nothing has to be inserted
// into <Author>The Team</Author>. The composition root registers this.
export class $TheCatalogue extends $CardCatalogue {
    override $cards: $$Book[] = [
${named.map(n => `        ${n.as},`).join('\n')}
    ];
}

export const TheCatalogue = $($TheCatalogue);

export const catalogue = $(<TheCatalogue />) as $TheCatalogue;

// AND THE SCOPE IS GIVEN IT. An annotation asks its scope for the catalogue and
// finds its own card there — which is why nothing is inserted into an element a
// person wrote. A library declaring its own catalogue is content, not
// configuration, so it is declared here rather than in the application.
export const file = (): void => { $(Book, CardCatalogue)(TheCatalogue); };

export const at = (path: string): $Card | undefined =>
    catalogue.holds(path) ? catalogue.card(path) as $Card : undefined;
`;
};

// ─── WHERE THE BOOKS ARE ─────────────────────────────────────────────────────
//
// Written out one by one rather than matched by a pattern: a glob sees neither a
// dotted folder nor a dotted file, so it would find none of these and report a
// confident zero. This module is the only door into a book.

export const books = (named: Card[]): string => `import type { $Book } from '@dna-platform/lib';

// THE ONLY DOOR INTO A BOOK, and every one of them is named. A glob would find
// none: every cover and synopsis in this library begins with a dot.
//
// Each entry is a dynamic import, so a page loads the one book it is showing and
// no other. That is not a discipline anybody keeps — it is the shape of the map.
export const books: Record<string, () => Promise<{ book: $Book }>> = {
${named.map(n => `    ${quoted(n.book.route)}: () => import('./${n.book.path}/book'),`).join('\n')}
};
`;
