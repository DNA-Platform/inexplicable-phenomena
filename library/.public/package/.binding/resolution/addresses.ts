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
// EVERY BOOK STANDS AT ITS OWN ADDRESS, AND THE ROOT IS A BOOK LIKE THE OTHERS.
//
// It did not used to be. `.pubconfig`'s root book was given `/` instead of an address of its own,
// so one book in the library was addressed by WHERE IT SAT and every other by WHAT IT WAS — and a
// reference to it resolved to `/` because of a configuration field rather than because of anything
// about the book. Doug, 2026-09-18: "When did you decide that the library catalogue shouldn't
// follow the same rule. We can have the default point there but what hack breaks this rule?"
//
// It is the slug fault one floor up: an address bound to TOPOLOGY rather than to identity. Move the
// root and every reference to that book is wrong, and nothing in the library says so.
//
// So the root is now a book with an address, and `root` is the answer to a different question —
// which book `/` LANDS ON — asked by the entry and by the prerender, neither of which needs the
// book to have given up its own address to answer it.
export const resolution = (found: Library, held: Graph, chosen: Configuration): Table => {
    const wanted = chosen.inventory.root ?? (held.books.length === 1 ? nameOf(held.books[0]) : 'index');
    const standing = new Set(found.books.map(book => book.folder));
    const routes = held.books.filter(entry => standing.has(entry.folder)).map(entry => {
        const name = nameOf(entry);

        return { name, folder: entry.folder, address: `/${reflection.slug(name)}` };
    });
    const root = routes.find(route => route.name === wanted);
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that — the books are ${routes.map(route => route.name).join(', ')}`);

    return { routes, root };
};
