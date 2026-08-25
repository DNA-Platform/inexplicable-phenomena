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

export const annotates = ['author', 'subject', 'canonical'] as const;

/** What a reference stood in. Derived from the list, never restated. */
export type As = typeof annotates[number];

/** The annotation a JSX tag names, or nothing if the tag names none. */
export const annotation = (tag: string): As | undefined =>
    annotates.find(a => a === tag.toLowerCase());

/** One reference from a cover to another book's cover.
 *
 *  Authored as an import whose ALIAS is the display name and whose TARGET is the
 *  link — `<Subject>{Math}</Subject>`, or `<Subject><Math /></Subject>`. The walk
 *  reads both forms and reports the same thing.
 *
 *  `at` is the cover the import points to; the folder holding it IS the book,
 *  because a cover's location is its book's location. */
export type Reference = {
    /** the element the reference stood in */
    as: As;
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
    /** the name the file exports, read from the source and NOT derivable from the
     *  filename — `.cover.tsx` exports `TestLibraryCover` in one book and
     *  `HardProblemCover` in another. Anything that composes a book needs it.
     *
     *  Undefined until the source is read; empty means read and exporting
     *  nothing a book can compose. */
    declares?: string;
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

/** Something wrong with the arrangement. Diagnostics TRAVEL rather than stop the
 *  walk: one pass tells an author everything that is wrong, because a build that
 *  reports one fault at a time is a build somebody runs many times. */
export type Diagnostic = {
    at: Path;
    says: string;
};

/** THE ONE SEAM, and every stage both takes it and returns it. There is no
 *  second, narrower seam and therefore no tense to name: the walk fills the
 *  entries, refer fills their references, resolve fills the books, and what
 *  arrives at emitting is the same shape that left the walk. */
export type Library = {
    /** the absolute path the walk was pointed at. The root is a parameter, not an
     *  entry, so the convention never judges it. */
    root: string;
    /** the folder that speaks for the library itself — the root's own book. The
     *  root is a parameter rather than an entry, so this is where its one
     *  structural fact is kept. */
    speaks: Path;
    entries: Entry[];
    /** what the entries MEAN, filled by resolving. Empty until then. */
    books: Book[];
    diagnostics: Diagnostic[];
};

// ─────────────────────────────────────────────────────────────────────────────
// RESOLVING — the second seam.
//
// A description says what is THERE. A library says what it MEANS: who wrote a
// book, what it is about, which of a subject's books speaks for it, and which
// books a subject holds. Every answer below is a PATH rather than a word,
// because a word cannot be followed.
//
// The unit here is the BOOK, not the folder. A subject is a folder whose book
// lives inside it, so `.physics` and `.physics/.subject` are one book with one
// route, and this is where the two collapse into one thing.

/** One answer, followable. HOW it was arrived at is deliberately not here: the
 *  emitter writes what a cover does not carry and leaves what it does, so
 *  nothing downstream needs to know whether an author wrote it. A link that
 *  points at nothing is a Complaint instead. */
export type Link = {
    /** the book this points at, by path */
    book: Path;
    /** what a reader is shown — the alias the author wrote, or the supplied name */
    display: string;
};

export type Book = {
    /** the folder holding the book's files — `.physics/.subject`, never `.physics` */
    path: Path;
    /** the route a reader arrives holding — `/physics` */
    route: string;
    /** the folder a reader would call this, which for a subject is its container */
    at: Path;
    cover: File;
    synopsis: File;
    /** the book's own chapters, in resolved order — cover and synopsis excluded */
    chapters: File[];
    author?: Link;
    subject?: Link;
    /** subjects only: which of the books it holds speaks for it */
    canonical?: Link;
    /** the books this one catalogues, in resolved order. EMPTY for an ordinary
     *  book, which is subjecthood as a count rather than as a declaration. */
    entries: Path[];
};


