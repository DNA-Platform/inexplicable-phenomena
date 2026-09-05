export type Path = string;

export type Role = 'cover' | 'synopsis' | 'chapter';

export type Cards = { title: string; author: string; subject: string };

export type File = {
    name: string;
    role: Role;
    order: number;
    declares?: string;
    cards?: Cards;
};

export type Entry = {
    path: Path;
    route: string;
    dots: number;
    files: File[];
    order: number;
    holds: Path[];
};

export type Book = {
    path: Path;
    route: string;
    cover: File;
    synopsis: File;
    chapters: File[];
};

export type Diagnostic = {
    at: Path;
    says: string;
};

export type Library = {
    root: string;
    entries: Entry[];
    books: Book[];
    diagnostics: Diagnostic[];
};
