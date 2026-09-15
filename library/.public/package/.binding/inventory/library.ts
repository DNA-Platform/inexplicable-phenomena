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
};

// FAILURES IN THE COMPILER'S OWN SHAPE — `file(line,col): error TAG: message` — which is what an
// editor's problem matcher reads, so a book that does not hold turns a line red under the file it
// came from, the way a type error does.
export const problem = (one: Diagnostic): string => `${one.file}(1,1): error SPEC: ${one.at} — ${one.says}`;
