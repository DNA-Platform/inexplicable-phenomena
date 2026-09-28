import { basename } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import type { Library } from '../inventory/library';
import { identifier } from '@dna-platform/public';
import { pageOf, resolution, type Table } from '../resolution/addresses';
import { forward } from '../manifest/origin';
import { tidy } from './language';
import { structure as compiled, type Structure } from './structure';

// THE CARD CATALOGUE, ANSWERING ONE QUESTION: what URL does this key stand at.
//
// `catalogue.ts` is a PROXY NAME, flagged for Doug.
//
// A KEY IS A NAME AND A URL IS A PLACE, and the whole of this file is the one step between them.
// Doug, 2026-09-18: "they are given a url! A reference to writing. They use it to make the link" —
// so nothing here builds a link and nothing here draws. It answers an address and hands it over.
//
// IT REFUSES BY NON-MEMBERSHIP ALONE. A key the library does not hold gets nothing back: there is
// no fallback, no nearest match, and no filesystem asked. That is the whole integrity story, and it
// is the reason `#${slug(name)}` has to go — a guess is what a table answers with when it would
// rather not say no.
//
// NOTHING IS LOADED. The names come from `catalogue/structure.ts`, which reads a book's source, and
// the addresses from `resolution/addresses.ts`, which never opened a book. Put together they are the
// catalogue a page used to ask at draw time, answered before a page exists.

export type Catalogue = {
    readonly table: Table;
    // THE ONE READING OF THE LIBRARY, held so nothing reads it a second time — the validator and
    // the catalogue answer off the same structure, or they disagree.
    readonly structure: Structure;
    where(key: string): string | undefined;
    // WHICH BOOK'S NAME SCOPES A REFERENCE WRITTEN IN IT. `$[[ ./The Sheet ]]` means the chapter
    // of the book it stands in, and the scope is the one thing a reference cannot carry.
    scope(file: string): string | undefined;
    keys(): string[];
};

export const catalogue = (found: Library, chosen: Configuration, given?: Structure): Catalogue => {
    const structure = given ?? compiled(found);
    // A BOOK'S CHAPTERS IN THE ORDER THE STRUCTURE READ THEM, which is the inventory's. The cover is
    // the book's own spot, so it stands in no book's list.
    const chaptersOf = new Map<string, { file: string; name: string }[]>();
    for (const spot of structure.spots.values()) {
        const name = structure.named.get(spot.id);
        if (spot.kind !== 'chapter' || name === undefined) continue;
        chaptersOf.set(spot.book, [...(chaptersOf.get(spot.book) ?? []), { file: basename(spot.file), name }]);
    }
    const named = found.books.flatMap(book => {
        const name = structure.named.get(book.folder);

        return name === undefined ? [] : [{ folder: book.folder, name, chapters: chaptersOf.get(book.folder) ?? [] }];
    });
    const table = resolution(found, named, chosen);

    // A KEY ANSWERS WITH A URL, WRITTEN FROM THE DOMAIN FORWARD — the library's base and the book's
    // own address, ending in a slash because that is the page a reader lands on. GitHub Pages
    // answers `/turing` with a redirect to `/turing/`, so the address written here is the one a
    // reader arrives at rather than the one they are sent from.
    //
    // AND THE BOOK IS IN EVERY URL, not only in a book's own. Doug, 2026-09-18: "It gives the book
    // as part of the url, put it in the url for consistent urls everywhere." So a chapter's address
    // is its book's and then its own, and a reference to anything in this library says which book
    // it is in before it says anything else — which is the reference grammar written as a URL:
    //
    //     Book Code                 ->  /dougs-library/
    //     Book Code / Chapter Code  ->  /dougs-library/the-sheet/
    //     Book Code / Mention       ->  /dougs-library/the-sheet/#the-mention
    //
    // A CHAPTER IS A ROUTE OF ITS BOOK, WITH A PAGE OF ITS OWN. It was a fragment on its book's page
    // from 2026-09-19 — Doug: "Don't chapters have #ids right now? Wouldn't it append the hash." — to
    // 2026-09-26, when the chapters became routes: "The book is a static page returned by github
    // pages, the chapters are routes on a local spa"; "Long distance urls to that which was mentioned
    // also must work… Everything needs to go through the router." The render writes a page at every
    // route and the book's app answers each, so a link from anywhere lands on a page the host
    // serves, and a link within the book is a route the app takes in place. Whether or not a
    // chapter's title prints, the chapter has its route — the compiler reads no tag to know; Doug,
    // 2026-09-20: "The compiler just cares that things are in the right file."
    //
    // AND A MENTION IS A FRAGMENT ON THE PAGE OF THE FILE IT STANDS IN, the cover's on the book's.
    // The id it lands on is its name's slug, made with the same `identifier.slug` the element makes
    // its own id with, so the address written here and the id worn are one function by construction.
    //
    // A CHAPTER IS NAMED WITHIN ITS BOOK AND NOWHERE ELSE, so `Dougs Library > The Sheet` is the
    // WHOLE key and there is no bare one beside it.
    //
    // There was, briefly: a bare name offered wherever only one book in the library used it. Doug,
    // 2026-09-18: "Then maybe you can't have synonyms and there's no home?" — and he is right twice
    // over. It is a SYNONYM, two keys standing for one thing, which is the collision this catalogue
    // exists to make impossible. And it is offered on a condition that has nothing to do with the
    // chapter: name a chapter `The Sheet` in some other book and a key in this one stops existing.
    //
    // ONE KEY, ONE THING. Two books may both hold a `Table of Contents` and neither is wrong,
    // because the scope is what tells them apart — which is why the scope is IN the key rather than
    // inferred from what else happens to be in the library.
    const at = new Map<string, string>();
    const inside: { path: string; name: string }[] = [];
    for (const route of table.routes) {
        const book = pageOf(chosen.resolution.base, route.address);
        at.set(route.name, book);
        const held = found.books.find(one => one.folder === route.folder);
        if (held !== undefined) inside.push({ path: forward(held.path), name: route.name });

        // AND ITS CHAPTERS, EACH AT ITS OWN PAGE — and its anchors, which are spots of the structure
        // rather than a second reading, each on the page of the file it stands in.
        const pages = new Map<string, string>();
        for (const chapter of route.chapters) {
            const page = pageOf(chosen.resolution.base, chapter.address);
            at.set(`${route.name} / ${chapter.name}`, page);
            pages.set(chapter.file, page);
        }
        for (const spot of structure.spots.values()) {
            if (spot.kind !== 'anchor' || spot.book !== route.folder) continue;
            const anchor = structure.named.get(spot.id);
            if (anchor !== undefined) at.set(`${route.name} / ${anchor}`, `${pages.get(basename(spot.file)) ?? book}#${identifier.slug(anchor)}`);
        }
    }

    // THE DEEPEST BOOK THAT HOLDS A FILE, because a library nests: `semantics-of-types` stands
    // inside `semantic-reference-theory`, which stands inside `claude-and-our-projects`. The
    // shallowest match would answer every chapter with the outermost book it happens to sit under.
    const deepest = (file: string): { path: string; name: string } | undefined => {
        const held = forward(file);

        return inside.filter(one => held.startsWith(`${one.path}/`)).sort((one, two) => two.path.length - one.path.length)[0];
    };

    return {
        table,
        structure,
        where: (key: string): string | undefined => at.get(tidy(key)),
        scope: (file: string): string | undefined => deepest(file)?.name,
        keys: (): string[] => [...at.keys()].sort(),
    };
};
