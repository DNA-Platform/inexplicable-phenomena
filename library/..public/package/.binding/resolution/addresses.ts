import { join, relative } from 'node:path';
import { reflection } from '@dna-platform/public';
import type { Configuration } from '../configuration/configuration';
import type { Library } from '../inventory/library';
import { forward } from '../manifest/origin';

export type Route = {
    name: string;
    folder: string;
    address: string;
};

export type Table = {
    routes: Route[];
    root?: Route;
};

export const specifierOf = (binding: string, module: string): string => {
    const at = forward(relative(join(binding, 'application'), module)).replace(/\.tsx$/u, '');

    return at.startsWith('.') ? at : `./${at}`;
};

// WHERE EACH BOOK STANDS. A name is written the way a person writes it and an address is a URL, so
// the slug happens here and nowhere before — `.pubconfig` names the root book by its name.
//
// EVERY BOOK STANDS AT ITS OWN ADDRESS, AND THE ROOT IS A BOOK LIKE THE OTHERS. `root` answers a
// different question — which book `/` lands on — and no book gives up its own address to answer it.
// Doug, 2026-09-18: "When did you decide that the library catalogue shouldn't follow the same rule."
export type Named = { folder: string; name: string };

export const resolution = (found: Library, named: Named[], chosen: Configuration): Table => {
    const wanted = chosen.inventory.root ?? (named.length === 1 ? named[0].name : 'index');
    const standing = new Set(found.books.map(book => book.folder));
    const routes = named.filter(one => standing.has(one.folder)).map(one => ({ name: one.name, folder: one.folder, address: `/${reflection.slug(one.name)}` }));
    const root = routes.find(route => route.name === wanted);
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that — the books are ${routes.map(route => route.name).join(', ')}`);

    return { routes, root };
};
