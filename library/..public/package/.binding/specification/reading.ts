import { $Book, $Canonical, $Catalogue, $Cover, $TypeOfCanonical, $TypeOfCover, html, reflection } from '@dna-platform/public';

// WHAT IS READ OFF A LIVE BOOK, ONE MEMBER PER FACT. Loading a book is what costs; once it is
// loaded, another fact costs a member here and nothing else — no second pass, and no change to the
// graph it is written into. A library that copied this binding adds its own facts by extending
// this class. Every member reaches through the framework's reflection, by TYPE and never by class,
// because a library writes its own kinds: a cover of its own and a title of its own still answer.
// A FACT THAT IS A LIST ANSWERS A LIST. Names are written the way a person writes them, so a
// joined string could not be taken apart again — and a structure encoded in a string and parsed
// back out is the tell that a mechanism is being used for something it is not for.
export class Reading {
    $name(book: $Book): string { return book.name; }
    $title(book: $Book): string { return html.text(book.title?.heading()?._block); }
    // WHERE A MENTION LEADS, NOT WHAT IT SAYS. An author written `[Doug](/my-library-log/)` says Doug
    // and leads to the log, and the address is the compiler's — so a running book answers the
    // address it was given, and a mention of the page it stands on answers none.
    $author(book: $Book): string { return this.leads(this.cover(book)?.author()); }
    $subject(book: $Book): string { return this.leads(this.cover(book)?.subject()); }
    $types(book: $Book): string[] { return reflection.types(this.cover(book) ?? book).flatMap(type => reflection.names(type)); }
    $chapters(book: $Book): string[] { return book.chapters.map(chapter => chapter.name); }
    $catalogued(book: $Book): string[] { return (book.tableOfContents?.chapters ?? []).map(mention => this.leads(mention)); }
    // WHAT A CATALOGUE SHELVES, which is a different question from what a book holds. A synopsis says
    // the book it is FOR, and a catalogue is a book of synopses — so the books it shelves are the
    // canonical addresses written into its chapters. It reads the PRINTED documents rather than the
    // block, because a chapter writes its document in print() and nothing an author wrote is in the book.
    $shelves(book: $Book): string[] {
        return book.chapters.flatMap(chapter => chapter.parts())
            .flatMap(document => reflection.within<$Canonical>(document, $TypeOfCanonical))
            .map(named => this.leads(named));
    }

    protected leads(mention: $Catalogue | undefined): string {
        return html.text(mention?.path()?._block);
    }

    protected cover(book: $Book): $Cover | undefined {
        return book.cover?.searchPartsForOne<$Cover>($TypeOfCover);
    }
}

// THE MEMBERS, GATHERED THROUGH THE PROTOTYPE CHAIN, the way the framework gathers a specification's
// rules — so a library's own reading extends this one and both sets answer.
const members = (held: Reading): string[] => {
    const names = new Set<string>();
    for (let held_: object | null = Object.getPrototypeOf(held) as object | null; held_ !== null && held_ !== Object.prototype; held_ = Object.getPrototypeOf(held_))
        for (const name of Object.getOwnPropertyNames(held_))
            if (name.startsWith('$') && typeof (held as never)[name] === 'function') names.add(name);

    return [...names].sort();
};

export const read = (book: $Book, held: Reading): Record<string, string | string[]> =>
    Object.fromEntries(members(held).map(name => [name.slice(1), (held as never as Record<string, (book: $Book) => string | string[]>)[name].call(held, book)]));
