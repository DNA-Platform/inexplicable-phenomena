import { join } from 'node:path';
import { $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@dna-platform/public';
import type { Diagnostic, Library } from '../inventory/library';
import type { Entry, Graph } from '../manifest/graph';

// WHAT IT MEANS TO BE A LIBRARY. The framework's own specification, over what the load answered
// rather than over a piece of writing — each rule reads every book at once and says what does not
// hold. A rule costs one method and runs on data, so it costs nothing per book however many books
// stand in the library: the load is the expensive thing, and it has already been paid and kept.
// A library that copied this binding adds its own rules by extending this class.
//
// A FAILURE OPENS WITH THE BOOK'S FOLDER AND `›`, the shape the framework's own descent uses, so
// the task that runs these lands each one on the file a person can open.
export class LibrarySpecification extends Specification<Graph> {
    @specify('every book in a library is named')
    $named(library: Graph): void {
        const unnamed = library.books.filter(one => named(one) === '');
        $check(unnamed.length === 0, unnamed.map(one => `${at(one)}${titled(one)} makes no name, and a book is named by its title`).join(' · '));
    }

    @specify('no two books in a library are named the same')
    $unique(library: Graph): void {
        const seen = new Map<string, Entry>();
        const shared: string[] = [];
        for (const one of library.books) {
            const name = named(one);
            if (name === '') continue;
            const other = seen.get(name);
            if (other === undefined) seen.set(name, one);
            else shared.push(`${at(one)}${titled(one)} is named "${name}", which ${other.folder}, ${titled(other)}, already is`);
        }
        $check(shared.length === 0, shared.join(' · '));
    }
}

// WHAT DOES NOT HOLD, WHERE A PERSON CAN OPEN IT. The specification raises one error carrying every
// failure, each opening with the book's folder, and each lands on that book's first file — its cover
// where it has one — so a name taken twice is a red line under the book that took it.
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

const named = (one: Entry): string => one.book.name ?? '';

// THE FOLDER, THEN THE MARK, THEN WHAT IS WRONG — the shape the framework's own descent writes, so
// the task that runs these reads the folder off the front and lands the line on that book's file.
const at = (one: Entry): string => `${one.folder} › `;

const titled = (one: Entry): string => `the book titled "${one.book.title ?? ''}"`;
