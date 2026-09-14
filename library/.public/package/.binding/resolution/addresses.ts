import { join, relative } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import { bindingOf, problem, type Diagnostic, type Library } from '../inventory/library';
import { forward } from '../manifest/origin';
import type { Graph } from '../manifest/graph';
import { LibrarySpecification } from '../specification/library';
import { nameOf } from './names';

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

const specifierOf = (binding: string, module: string): string => {
    const at = forward(relative(join(binding, 'application'), module)).replace(/\.tsx$/u, '');

    return at.startsWith('.') ? at : `./${at}`;
};

// WHAT DOES NOT HOLD ABOUT THE LIBRARY. The specification raises one error carrying every failure,
// each opening with the book's folder, and each lands on that book's first file — its cover where
// it has one — so a duplicate name is a red line under the book that took it.
export const diagnostics = (found: Library, held: Graph): Diagnostic[] => {
    try {
        new LibrarySpecification().check(held);

        return [];
    } catch (error) {
        return String((error as Error)?.message ?? error)
            .split(' · ')
            .filter(said => said.trim() !== '')
            .map(said => {
                const [at, ...rest] = said.split(' › ');
                const book = found.books.find(one => one.folder === at);

                return { at, file: join(book?.path ?? found.root, book?.files[0] ?? '.book.tsx'), says: rest.join(' › ') };
            });
    }
};

export const resolution = (found: Library, held: Graph, chosen: Configuration): Table => {
    const wrong = diagnostics(found, held);
    if (wrong.length) throw new Error(wrong.map(problem).join('\n'));

    const wanted = chosen.inventory.root ?? (held.books.length === 1 ? nameOf(held.books[0]) : 'index');
    const binding = bindingOf(found.root);
    const routes = held.books.map(entry => {
        const name = nameOf(entry);
        const book = found.books.find(one => one.folder === entry.folder);

        return {
            name,
            address: name === wanted ? '/' : `/${name}`,
            module: book?.module ?? '',
            specifier: specifierOf(binding, book?.module ?? ''),
        };
    });
    const root = routes.find(route => route.address === '/');
    if (chosen.inventory.root !== undefined && root === undefined)
        throw new Error(`.pubconfig names "${chosen.inventory.root}" as the root, and no book is named that — the books are ${routes.map(route => route.name).join(', ')}`);

    return { routes, root };
};
