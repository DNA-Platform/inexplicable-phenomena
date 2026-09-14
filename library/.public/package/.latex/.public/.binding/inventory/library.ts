import { join, resolve } from 'node:path';

// THE GEOMETRY: a library holds books; its face is .public; the binding lives in the face; what the
// binder generates compiles inward, into the binding, never into the library. Said once, in both
// directions, so nothing else counts folders upward by hand.
export const faceOf = (library: string): string => join(library, '.public');
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
