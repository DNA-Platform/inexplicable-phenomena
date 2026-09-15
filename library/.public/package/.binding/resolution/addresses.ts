import { join, relative } from 'node:path';
import { reflection } from '@dna-platform/public';
import type { Configuration } from '../configuration/configuration';
import { bindingOf, type Library } from '../inventory/library';
import { forward } from '../manifest/origin';
import type { Graph } from '../manifest/graph';
import { nameOf } from './names';

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

// WHERE EACH BOOK STANDS. Names are the books' own, read at specify; what it MEANS to be a library
// is asked there too, so nothing here rules on anything and this step only resolves.
// A NAME IS WRITTEN THE WAY A PERSON WRITES IT and an ADDRESS is a URL, so the slug happens here
// and nowhere before — `.pubconfig` names the root book by its name, not by its address.
export const resolution = (found: Library, held: Graph, chosen: Configuration): Table => {
    const wanted = chosen.inventory.root ?? (held.books.length === 1 ? nameOf(held.books[0]) : 'index');
    const standing = new Set(found.books.map(book => book.folder));
    const routes = held.books.filter(entry => standing.has(entry.folder)).map(entry => {
        const name = nameOf(entry);

        return { name, folder: entry.folder, address: name === wanted ? '/' : `/${reflection.slug(name)}` };
    });
    const root = routes.find(route => route.address === '/');
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that — the books are ${routes.map(route => route.name).join(', ')}`);

    return { routes, root };
};
