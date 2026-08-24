import type { Book, Complaint, Library, Link, Path } from '../library.ts';

// RESOLVING. A description says what is there; a library says what it means.
//
// The work is almost entirely one move done in three directions: A NAME BECOMES
// A REFERENCE. A cover saying it belongs to physics is holding a word, and a
// word cannot be followed — so the phase finds the thing the word stands for and
// puts that in its place.
//
// And SILENCE IS FILLED HERE and nowhere else, because this is the only phase
// that knows both what was written and where it was written. Nothing is written
// back: the authored file stays exactly as its author left it, and what gains
// the answer is the resolved library, which is a model rather than a manuscript.

const containerOf = (path: Path): Path => {
    const at = path.lastIndexOf('/');
    return at === -1 ? '' : path.slice(0, at);
};

export const resolve = (library: Library): Library => {
    const complaints: Complaint[] = [...library.complaints];
    const byPath = new Map(library.entries.map(e => [e.path, e]));

    // The folder that speaks for a container, and the root is a container too.
    const speakerFor = (path: Path): Path => (path === '' ? library.speaks : byPath.get(path)?.own ?? '');

    // A subject is a folder whose book lives inside it, so a reader meeting
    // `.physics` is meeting `.physics/.subject`. Everywhere below, a book named
    // by a folder means that folder's own book when it has one.
    const bookAt = (path: Path): Path => {
        const entry = byPath.get(path);
        if (!entry) return '';
        return entry.kind === 'subject' ? entry.own : entry.path;
    };

    const authored = library.entries.filter(e => e.kind === 'book');

    // THE LIBRARY'S OWN AUTHOR, which is what a silent cover is given. It is read
    // off the library's own book rather than invented, so a corpus that never
    // names an author supplies nothing and says so.
    const ownBook = byPath.get(library.speaks);
    const houseAuthor = ownBook?.references.find(r => r.as === 'author');

    const books: Book[] = authored.map(entry => {
        const container = containerOf(entry.path);
        const speaks = speakerFor(container) === entry.path;
        const cover = entry.files.find(f => f.role === 'cover')!;
        const synopsis = entry.files.find(f => f.role === 'synopsis')!;
        const chapters = entry.files.filter(f => f.role === 'chapter');

        const said = (as: string) => entry.references.find(r => r.as === as);

        // WHAT A BOOK BELONGS TO is answered by position, and a declaration only
        // ever confirms it or points somewhere non-canonical. A book that speaks
        // for its container belongs to whatever holds THAT.
        const declaredSubject = said('subject');
        const home = speaks ? bookAt(speakerFor(containerOf(container))) || entry.path : bookAt(container);
        const subject: Link | undefined = declaredSubject?.book
            ? { book: declaredSubject.book, display: declaredSubject.display }
            : declaredSubject
                ? { book: home, display: declaredSubject.display }
                : home
                    ? { book: home, display: '' }
                    : undefined;

        // WHO WROTE IT is declared or supplied from the library's own author, and
        // a supplied author that stands for nobody is still stated rather than
        // quietly dropped — the display is what a reader sees either way.
        // A LINK WITH NO BOOK IS NOT A FAULT. A cover may name its author as a
        // NAME rather than as an import — `<Author>The Team</Author>` — and the
        // corpus does exactly that. It stands for a name; nothing is wrong.
        const declaredAuthor = said('author');
        const author: Link | undefined = declaredAuthor
            ? { book: declaredAuthor.book, display: declaredAuthor.display }
            : houseAuthor
                ? { book: houseAuthor.book, display: houseAuthor.display }
                : undefined;

        return { path: entry.path, route: entry.route, at: speaks ? container : entry.path, cover, synopsis, chapters, author, subject, entries: [] };
    });

    const byBook = new Map(books.map(b => [b.path, b]));

    // WHAT A SUBJECT HOLDS is not a list the subject keeps. It falls out of where
    // its books sit, which is why nothing has to be maintained in two places.
    for (const book of books) {
        if (book.at === book.path) continue;
        const container = byPath.get(book.at);
        const held = (container ? container.holds : library.entries.filter(e => !containerOf(e.path)).map(e => e.path))
            .filter(path => path !== book.path)
            .map(bookAt)
            .filter(path => byBook.has(path));

        // WHICH BOOK SPEAKS FOR IT cannot be answered by position — a folder does
        // not say which of its children represents it — so the cover answers, and
        // with nothing declared the shortest title takes it.
        const said = byPath.get(book.path)!.references.find(r => r.as === 'canonical');
        const shortest = [...held].sort((a, b) => byBook.get(a)!.route.length - byBook.get(b)!.route.length || a.localeCompare(b))[0];
        const chosen = said?.book || shortest;
        if (chosen) {
            book.canonical = { book: chosen, display: said?.display ?? '' };
            if (said?.book && !held.includes(said.book)) {
                complaints.push({ at: book.path, says: `names ${JSON.stringify(said.display)} canonical, and does not hold it` });
            }
        }

        // Inferred entries stand alphabetically with the canonical first. A
        // subject that arranges them itself overrides this, and the manifest is
        // where that arrangement lives.
        const alphabetical = [...held].sort((a, b) => byBook.get(a)!.route.localeCompare(byBook.get(b)!.route));
        book.entries = chosen && alphabetical.includes(chosen)
            ? [chosen, ...alphabetical.filter(p => p !== chosen)]
            : alphabetical;
    }

    return { ...library, books, complaints };
};
