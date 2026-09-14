import { relative, join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import { bindingOf, type Library } from '../inventory/library';
import { nameOf, collisions } from './names';

export type Route = {
    name: string;
    address: string;
    module: string;
    specifier: string;
};

export type Table = {
    routes: Route[];
    root?: Route;
};

const forward = (path: string): string => path.split('\\').join('/');

const specifierOf = (binding: string, module: string): string => {
    const at = forward(relative(join(binding, 'application'), module)).replace(/\.tsx$/, '');
    return at.startsWith('.') ? at : './' + at;
};

export const resolution = (library: Library, chosen: Configuration): Table => {
    const found = collisions(library.books);
    if (found.length) throw new Error(found.map(one => `${one.at} is ${one.says}`).join('\n'));

    const wanted = chosen.inventory.root ?? (library.books.length === 1 ? nameOf(library.books[0]) : 'index');
    const binding = bindingOf(library.root);
    const routes = library.books.map(book => {
        const name = nameOf(book);
        return { name, address: name === wanted ? '/' : `/${name}`, module: book.module, specifier: specifierOf(binding, book.module) };
    });
    const root = routes.find(route => route.address === '/');
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that`);
    return { routes, root };
};
