import { $Book, $Cover, $TypeOfCover, html, reflection } from '@dna-platform/public';

// WHAT IS READ OFF A LIVE BOOK, ONE MEMBER PER FACT. Loading a book is what costs; once it is
// loaded, another fact costs a member here and nothing else — no second pass, and no change to the
// graph it is written into. A library that copied this binding adds its own facts by extending
// this class. Every member reaches through the framework's reflection, by TYPE and never by class,
// because a library writes its own kinds: a cover of its own and a title of its own still answer.
export class Reading {
    $name(book: $Book): string { return book.name; }
    $title(book: $Book): string { return html.text(book.title?.heading()?._block); }
    $author(book: $Book): string { return html.text(this.cover(book)?.author()?._block); }
    $subject(book: $Book): string { return html.text(this.cover(book)?.subject()?._block); }
    $chapters(book: $Book): string { return book.chapters.map(chapter => chapter.name).join(' '); }
    $catalogued(book: $Book): string { return (book.tableOfContents?.chapters ?? []).map(mention => mention.name).join(' '); }

    protected cover(book: $Book): $Cover | undefined {
        return book.cover?.parts().find((part): part is $Cover => reflection.is<$Cover>(part, $TypeOfCover));
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

export const read = (book: $Book, held: Reading): Record<string, string> =>
    Object.fromEntries(members(held).map(name => [name.slice(1), (held as never as Record<string, (book: $Book) => string>)[name].call(held, book)]));
