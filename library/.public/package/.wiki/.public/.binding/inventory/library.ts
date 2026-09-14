import { join } from 'node:path';

// THE GEOMETRY: a library holds books; its face is .public; the binding lives in the face; what the
// binder generates compiles inward, into the binding, never into the library.
export const faceOf = (library: string): string => join(library, '.public');
export const bindingOf = (library: string): string => join(faceOf(library), '.binding');

export type Chapter = {
    file: string;
    order: number[];
};

export type Book = {
    folder: string;
    path: string;
    cover: boolean;
    synopsis: boolean;
    contents: boolean;
    chapters: Chapter[];
    module: string;
};

export type Library = {
    root: string;
    base?: string;
    books: Book[];
};

export type Diagnostic = {
    at: string;
    says: string;
};
