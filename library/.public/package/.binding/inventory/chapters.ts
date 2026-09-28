import { readdirSync } from 'node:fs';
import { Accompanying, Clashing, accompanies, accompanying, apparatus, before, isChapter, isDeclaration, isKnown, withoutFinalExtension } from './filenames';

// WHAT EVERY FILE IN A BOOK IS, READ ONCE. A file is the book, a piece of its apparatus, a chapter,
// or some chapter's resource — and anything else is named so the binder can refuse it. All three
// answers come from one reading because they are one question asked from three sides, and a second
// walk would be both a second cost and a second place for the rules to drift. There are four hundred
// and sixty-five conversations coming; this reads a directory that was already being read.
//
// THE CHAPTERS COME BACK IN THE ORDER THEY ARE BOUND: the apparatus a book holds, by name, then its
// chapters by their number. Said once, so the module the assembly writes and the file a failure
// lands on read the same list.
export const accountOfFiles = (folder: string): { chapters: string[]; resources: Map<string, Accompanying[]>; unaccounted: string[]; clashing: Clashing[] } => {
    const filesInFolder = readdirSync(folder, { withFileTypes: true }).filter(entry => entry.isFile()).map(entry => entry.name);

    // A NUMBERED .tsx IS A CHAPTER UNLESS IT ACCOMPANIES ANOTHER — its base being another candidate's
    // name, a separator and an identifier — so `5-the-plate-figures.tsx` stands beside the plate and
    // `5-the-plate.tsx` is the chapter. Decided with every candidate in hand, once.
    const candidates = filesInFolder.filter(isChapter);
    const chaptersOnly = candidates.filter(one =>
        !candidates.some(other => other !== one && accompanies(withoutFinalExtension(one), withoutFinalExtension(other), 1)));
    const writings = filesInFolder.filter(name => apparatus.includes(name) || chaptersOnly.includes(name));

    // THE WRITING A FILE ACCOMPANIES is the one whose extension-free name is the file's base, or the
    // file's base up to one character — the longest such, so a writing named for another's prefix
    // keeps what is its own.
    const accompanied = (file: string): string | undefined => {
        const base = withoutFinalExtension(file);

        return writings
            .filter(writing => accompanies(base, withoutFinalExtension(writing), file.endsWith('.tsx') ? 1 : 0))
            .sort((one, two) => two.length - one.length)[0];
    };

    const resources = new Map<string, Accompanying[]>();
    const unaccounted: string[] = [];

    for (const file of filesInFolder) {
        if (writings.includes(file) || isDeclaration(file)) continue;
        const accompanies = isKnown(file) ? accompanied(file) : undefined;
        if (accompanies === undefined) { unaccounted.push(file); continue; }
        resources.set(accompanies, [...(resources.get(accompanies) ?? []), accompanying(file, accompanies)]);
    }

    // IDENTIFIERS ARE UNIQUE PER TYPE among a writing's files — Doug, 2026-09-28: "the compiler would
    // error on chapter-name.id.tsx, chapter-name-id.tsx, because ids must be unique per type." Both
    // are named, so an author knows which two to tell apart.
    const clashing: Clashing[] = [];
    for (const [writing, files] of resources)
        for (const one of files)
            if (files.some(other => other !== one && other.identifier === one.identifier && other.type === one.type))
                clashing.push({ ...one, writing });

    const chapters = [
        ...apparatus.filter(name => name !== '.book.tsx' && filesInFolder.includes(name)),
        ...chaptersOnly.sort(before),
    ];

    return { chapters, resources, unaccounted, clashing };
};
