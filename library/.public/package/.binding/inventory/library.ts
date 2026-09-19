import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// THE GEOMETRY: a library holds books; its face holds the binding; what the binder generates
// compiles inward, into the binding, never into the library. Said once, in both directions, so
// nothing else counts folders upward by hand.
//
// THE FACE IS FOUND, NOT NAMED. A library calls its face whatever puts it where its keeper wants
// it — `.public`, or `...public` to sit above books that open with dots of their own — so the only
// thing that identifies one is that it holds the binding. `.public` is what a library with no face
// yet would be given, and it is the only place that name is written.
export const isFace = (folder: string): boolean => existsSync(join(folder, '.binding'));
export const faceOf = (library: string): string =>
    join(library, readdirSync(library, { withFileTypes: true })
        .find(entry => entry.isDirectory() && isFace(join(library, entry.name)))?.name ?? '.public');
export const bindingOf = (library: string): string => join(faceOf(library), '.binding');
export const around = (binding: string): { binding: string; face: string; library: string } => {
    const face = resolve(binding, '..');
    return { binding, face, library: resolve(face, '..') };
};

export type Book = {
    folder: string;
    path: string;
    files: string[];
    // WHAT STANDS BESIDE EACH CHAPTER, and what stands beside nothing. Both come from the single
    // reading of the folder that also ordered the chapters, so the binder never asks a book's
    // directory a second question it already has the answer to.
    resources: Map<string, string[]>;
    unaccounted: string[];
    module: string;
};

export type Library = {
    root: string;
    books: Book[];
};

export type Diagnostic = {
    at: string;
    file: string;
    says: string;
    // WHAT IS WRONG, NAMED IN THE LIBRARY'S OWN WORDS. Doug, 2026-09-18: "you have to map them to
    // errors in the semantics of the actual framework — duplicate title, missing this, no catalogue
    // for this." A reader debugging a cover is holding a book, not a graph, and a fault called
    // `half-claim` or `unwhole edge` tells them about the compiler's data structure instead of
    // about their library.
    //
    // IT STANDS WHERE A COMPILER PUTS ITS ERROR CODE, so an editor's problem matcher reads it and a
    // person scanning a list of failures sees the KIND before the sentence.
    fault?: string;
};

// FAILURES IN THE COMPILER'S OWN SHAPE — `file(line,col): error TAG: message` — which is what an
// editor's problem matcher reads, so a book that does not hold turns a line red under the file it
// came from, the way a type error does.
export const problem = (one: Diagnostic): string => `${one.file}(1,1): error ${one.fault ?? 'SPEC'}: ${one.at} — ${one.says}`;
