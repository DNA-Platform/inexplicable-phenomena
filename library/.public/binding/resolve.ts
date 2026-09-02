import { pathToFileURL } from 'node:url';
import { walk } from './walk.ts';
import { read } from './read.ts';
import type { Book, Diagnostic, Library } from './library.ts';

export const resolve = (library: Library): Library => {
    const diagnostics: Diagnostic[] = [...library.diagnostics];
    const books: Book[] = library.entries.flatMap(entry => {
        if (!entry.files.length) return [];
        const cover = entry.files.find(f => f.role === 'cover');
        const synopsis = entry.files.find(f => f.role === 'synopsis');
        const chapters = entry.files.filter(f => f.role === 'chapter');
        if (!cover) diagnostics.push({ at: entry.path, says: 'a book with no cover' });
        if (!synopsis) diagnostics.push({ at: entry.path, says: 'a book with no synopsis — a book gives an account of itself' });
        if (!cover || !synopsis) return [];
        return [{ path: entry.path, route: entry.route, cover, synopsis, chapters }];
    });
    return { ...library, books, diagnostics };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('resolve.ts <corpus>');
        process.exit(1);
    }
    const library = resolve(read(walk(at)));
    console.log(`RESOLVE ${library.books.length} books · ${library.diagnostics.length} diagnostics`);
    for (const d of library.diagnostics) console.log(`  ${d.at} — ${d.says}`);
}
