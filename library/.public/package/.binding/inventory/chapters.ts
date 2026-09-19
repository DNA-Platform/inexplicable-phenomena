import { readdirSync } from 'node:fs';
import { apparatus, before, isChapter, isDeclaration, isKnown, withoutFinalExtension } from './filenames';

// WHAT EVERY FILE IN A BOOK IS, READ ONCE. A file is the book, a piece of its apparatus, a chapter,
// or some chapter's resource — and anything else is named so the binder can refuse it. All three
// answers come from one reading because they are one question asked from three sides, and a second
// walk would be both a second cost and a second place for the rules to drift. There are four hundred
// and sixty-five conversations coming; this reads a directory that was already being read.
//
// THE CHAPTERS COME BACK IN THE ORDER THEY ARE BOUND: the apparatus a book holds, by name, then its
// chapters by their number. Said once, so the module the assembly writes and the file a failure
// lands on read the same list.
export const accountOfFiles = (folder: string): { chapters: string[]; resources: Map<string, string[]>; unaccounted: string[] } => {
    const filesInFolder = readdirSync(folder, { withFileTypes: true }).filter(entry => entry.isFile()).map(entry => entry.name);
    const writings = filesInFolder.filter(name => apparatus.includes(name) || isChapter(name));
    const writingByName = new Map(writings.flatMap(name => [[name, name], [withoutFinalExtension(name), name]] as [string, string][]));

    const resources = new Map<string, string[]>();
    const unaccounted: string[] = [];

    for (const file of filesInFolder) {
        if (writings.includes(file) || isDeclaration(file)) continue;
        const accompanies = isKnown(file) ? writingByName.get(withoutFinalExtension(file)) : undefined;
        if (accompanies === undefined) { unaccounted.push(file); continue; }
        resources.set(accompanies, [...(resources.get(accompanies) ?? []), file]);
    }

    const chapters = [
        ...apparatus.filter(name => name !== '.book.tsx' && filesInFolder.includes(name)),
        ...filesInFolder.filter(isChapter).sort(before),
    ];

    return { chapters, resources, unaccounted };
};
