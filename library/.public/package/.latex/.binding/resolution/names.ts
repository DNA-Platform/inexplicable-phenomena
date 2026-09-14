import type { Book, Diagnostic } from '../inventory/library';

export const nameOf = (book: Book): string => book.folder.replace(/^\.+/, '');

export const collisions = (books: Book[]): Diagnostic[] => {
    const seen = new Map<string, string>();
    const found: Diagnostic[] = [];
    for (const book of books) {
        const name = nameOf(book);
        const other = seen.get(name);
        if (other !== undefined) found.push({ at: book.folder, says: `named "${name}", which ${other} already is` });
        else seen.set(name, book.folder);
    }
    return found;
};
