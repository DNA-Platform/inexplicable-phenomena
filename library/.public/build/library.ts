// THE SEAM. Every stage after the walk reads this and never the filesystem, which
// is what lets them be built by different people at the same time.
//
// It is a TYPE and not a file on disk: there is no serialized intermediate, and
// nothing here is written out. A stage imports these declarations and writes a
// function against them.

/** A path relative to the library root, with forward slashes. It is the identity. */
export type Path = string;

/** What an entry is. Decided by position first and dots second — a dotted folder
 *  that speaks for its container is that container's BOOK, not a subject. */
export type Kind = 'subject' | 'book';

/** What a file is. Dots say a file is not a chapter; the name says which it is.
 *
 *  There is deliberately no 'resource' here. A resource in this library is a
 *  NON-markdown file beside the markdown chapter that documents it — prose and
 *  code, one thing in two languages — and a chapter in a code library is already
 *  code, so the pattern has no second half to occupy. A file named for another
 *  file and explained by nothing is an orphan, whatever it is called. */
export type Role = 'cover' | 'synopsis' | 'chapter';

/** One reference from a cover to another book's cover.
 *
 *  Authored as an import whose ALIAS is the display name and whose TARGET is the
 *  link — `<Subject>{Math}</Subject>`, or `<Subject><Math /></Subject>`. The walk
 *  reads both forms and reports the same thing.
 *
 *  `at` is the cover the import points to; the folder holding it IS the book,
 *  because a cover's location is its book's location. */
export type Reference = {
    /** 'author' | 'subject' | 'canonical' — the element the reference stood in. */
    as: string;
    /** the import alias, which is what a reader sees */
    display: string;
    /** the cover file the import resolves to, relative to the library root */
    at: Path;
    /** the book that cover belongs to — `at` without its filename */
    book: Path;
};

export type File = {
    /** the filename as authored, dots and all */
    name: string;
    role: Role;
    /** position among its siblings, resolved once by the walk and never again */
    order: number;
};

export type Entry = {
    /** the folder, dots and all, relative to the root — `.physics/.subject` */
    path: Path;
    /** THE ROUTE a reader arrives holding — `/physics`. Not the same string as
     *  `path`, and the difference is deliberate: dots are an authoring mark and
     *  have no business in a URL, and a subject's own book IS the subject as far
     *  as a reader is concerned, so it collapses onto its parent rather than
     *  appearing beneath it. Computed here so nothing downstream derives it twice. */
    route: string;
    /** how many dots the folder name wears. Among folders the count carries the
     *  depth of subjecthood; it decides nothing on its own. */
    dots: number;
    kind: Kind;
    /** the folder that speaks for this one — its own book. Empty for a book. */
    own: Path;
    /** the folders it holds, in resolved order */
    holds: Path[];
    files: File[];
    /** every reference this folder's cover makes, resolved to a target */
    references: Reference[];
    order: number;
};

/** Something wrong with the arrangement. Complaints TRAVEL rather than stop the
 *  walk: one pass tells an author everything that is wrong, because a build that
 *  reports one fault at a time is a build somebody runs many times. */
export type Complaint = {
    at: Path;
    says: string;
};

export type Library = {
    /** the absolute path the walk was pointed at. The root is a parameter, not an
     *  entry, so the convention never judges it. */
    root: string;
    entries: Entry[];
    complaints: Complaint[];
};
