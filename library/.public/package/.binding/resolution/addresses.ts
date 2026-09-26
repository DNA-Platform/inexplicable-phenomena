import { join, relative } from 'node:path';
import { identifier } from '@dna-platform/public';
import type { Configuration } from '../configuration/configuration';
import type { Library } from '../inventory/library';
import { forward } from '../manifest/origin';

export type Chapter = {
    name: string;
    file: string;
    address: string;
};

export type Route = {
    name: string;
    folder: string;
    address: string;
    chapters: Chapter[];
};

export type Table = {
    routes: Route[];
    root?: Route;
};

// THE SLUG IS THE LIBRARY'S, `identifier.slug` in `@dna-platform/public`, AND THE COMPILER IMPORTS IT.
// It stood here as the compiler's own from 2026-09-24 — "the compiler should handle all of this" —
// until 2026-09-26, when an id became the name's: "Title should use the name to create the fragment
// with the Identifier utility. The url should be completely arbitrary." A title, a mention and a
// heading make their own id from their name with that function, so the fragment this compiler
// writes into an address and the id the page wears are one function by construction. Letter for
// letter the same slug, so no address a library answers to has moved.
export const specifierOf = (binding: string, module: string): string => {
    const at = forward(relative(join(binding, 'application'), module)).replace(/\.tsx$/u, '');

    return at.startsWith('.') ? at : `./${at}`;
};

// WHERE EACH BOOK STANDS, AND EACH OF ITS CHAPTERS UNDER IT. A name is written the way a person
// writes it and an address is a URL, so the slug happens here and nowhere before — `.pubconfig`
// names the root book by its name.
//
// EVERY BOOK STANDS AT ITS OWN ADDRESS, AND THE ROOT IS A BOOK LIKE THE OTHERS. `root` answers a
// different question — which book `/` lands on — and no book gives up its own address to answer it.
// Doug, 2026-09-18: "When did you decide that the library catalogue shouldn't follow the same rule."
//
// AND A CHAPTER IS A ROUTE OF ITS BOOK, at `/book/chapter/`. Doug, 2026-09-26: "The book is a static
// page returned by github pages, the chapters are routes on a local spa" — the render writes a page at
// every route and the book's own app answers each. The cover has no route of its own: it is the
// chapter titled with the book's name, and the book's address is where it stands.
export type Named = { folder: string; name: string; chapters: { file: string; name: string }[] };

export const resolution = (found: Library, named: Named[], chosen: Configuration): Table => {
    const wanted = chosen.inventory.root ?? (named.length === 1 ? named[0].name : 'index');
    const standing = new Set(found.books.map(book => book.folder));
    const routes = named.filter(one => standing.has(one.folder)).map(one => {
        const address = `/${identifier.slug(one.name)}`;

        return { name: one.name, folder: one.folder, address, chapters: one.chapters.map(chapter => ({ ...chapter, address: `${address}/${identifier.slug(chapter.name)}` })) };
    });
    const root = routes.find(route => route.name === wanted);
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that — the books are ${routes.map(route => route.name).join(', ')}`);

    return { routes, root };
};
