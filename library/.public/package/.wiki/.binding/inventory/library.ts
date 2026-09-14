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
