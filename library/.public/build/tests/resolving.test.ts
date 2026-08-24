import { describe, it, expect } from 'vitest';
import { resolve } from '../stages/resolve.ts';
import type { Entry, File, Library, Reference } from '../library.ts';

// A LIBRARY BUILT BY HAND, because resolving never touches a filesystem. The
// seam is a type, so a promise about resolving can be written without a folder.

const file = (name: string, role: File['role'], declares: string, order = 0): File =>
    ({ name, role, order, declares });

const book = (path: string, route: string, references: Reference[] = []): Entry => ({
    path,
    route,
    dots: 0,
    kind: 'book',
    own: '',
    holds: [],
    files: [file('.cover.tsx', 'cover', 'Cover'), file('.synopsis.tsx', 'synopsis', 'Synopsis', 1)],
    references,
    order: 0,
});

const subject = (path: string, route: string, own: string, holds: string[], references: Reference[] = []): Entry =>
    ({ ...book(path, route, references), kind: 'subject', own, holds, files: [] });

const points = (as: string, display: string, to: string): Reference =>
    ({ as, display, at: `${to}/.cover.tsx`, book: to });

const named = (as: string, display: string): Reference => ({ as, display, at: '', book: '' });

// The shape the corpus has: a library book, a subject with two books beneath it,
// and a book that authors itself.
const library = (over: Partial<Record<string, Reference[]>> = {}): Library => ({
    root: '/nowhere',
    speaks: '..own',
    complaints: [], books: [],
    entries: [
        { ...book('..own', '/', over['..own'] ?? [points('author', 'TheTeam', 'the-team')]), route: '/' },
        subject('.physics', '/physics', '.physics/.subject', ['.physics/.subject', '.physics/deep', '.physics/a']),
        book('.physics/.subject', '/physics', over['.physics/.subject'] ?? []),
        book('.physics/deep', '/physics/deep', over['.physics/deep'] ?? []),
        book('.physics/a', '/physics/a', over['.physics/a'] ?? []),
        book('the-team', '/the-team', over['the-team'] ?? [points('author', 'TheTeam', 'the-team')]),
    ],
});

const of = (l: Library, path: string) => resolve(l).books.find(b => b.path === path);

describe('what a book BELONGS to is answered by position, and a declaration only confirms it', () => {
    it('a silent cover is given the subject it sits in', () => {
        const b = of(library(), '.physics/deep');
        expect(b?.subject?.book).toBe('.physics/.subject');
    });

    it('a declared subject keeps what its author wrote', () => {
        const b = of(library({ '.physics/deep': [points('subject', 'Physics', '.physics/.subject')] }), '.physics/deep');
        expect(b?.subject?.book).toBe('.physics/.subject');
        expect(b?.subject?.display).toBe('Physics');
    });

    it('AND NOTHING IS WRITTEN BACK — the entry the author left is untouched', () => {
        const l = library();
        const before = JSON.stringify(l);
        resolve(l);
        expect(JSON.stringify(l)).toBe(before);
    });
});

describe('who WROTE it is the author declared, or the one the library names', () => {
    it('a silent cover is given the author the library names', () => {
        const b = of(library(), '.physics/deep');
        expect(b?.author?.book).toBe('the-team');
    });

    // A LINK WITH NO BOOK IS NOT A FAULT, and the corpus depends on it: a cover
    // may name its author as a NAME rather than as an import. What used to be
    // recorded as `from: 'unresolved'` is simply an empty book with a display.
    it('an author named rather than imported stands for a name, and that is not a fault', () => {
        const l = library({ '.physics/deep': [named('author', 'A Stranger')] });
        const said = resolve(l);
        const b = said.books.find(x => x.path === '.physics/deep');
        expect(b?.author?.display).toBe('A Stranger');
        expect(b?.author?.book).toBe('');
        expect(said.complaints.some(c => c.at === '.physics/deep')).toBe(false);
    });
});

describe('which book SPEAKS for a subject cannot be answered by position', () => {
    it('with nothing declared, the shortest title takes it', () => {
        const b = of(library(), '.physics/.subject');
        expect(b?.canonical?.book).toBe('.physics/a');
    });

    it('a declared canonical beats the default', () => {
        const b = of(library({ '.physics/.subject': [points('canonical', 'Deep', '.physics/deep')] }), '.physics/.subject');
        expect(b?.canonical?.book).toBe('.physics/deep');
        expect(b?.canonical?.display).toBe('Deep');
    });

    it('AND A SUBJECT NAMING A BOOK IT DOES NOT HOLD IS INVALID, by name', () => {
        const l = library({ '.physics/.subject': [points('canonical', 'The Team', 'the-team')] });
        const complaints = resolve(l).complaints;
        expect(complaints.some(c => c.at === '.physics/.subject' && c.says.includes('does not hold it'))).toBe(true);
    });
});

describe('what a subject HOLDS falls out of where its books sit', () => {
    it('the canonical stands first and the rest stand alphabetically', () => {
        const b = of(library(), '.physics/.subject');
        expect(b?.entries).toEqual(['.physics/a', '.physics/deep']);
    });

    it('declaring a different canonical REORDERS the page', () => {
        const b = of(library({ '.physics/.subject': [points('canonical', 'Deep', '.physics/deep')] }), '.physics/.subject');
        expect(b?.entries).toEqual(['.physics/deep', '.physics/a']);
    });

    it('a book that catalogues nothing holds nothing — subjecthood is a COUNT', () => {
        expect(of(library(), '.physics/deep')?.entries).toEqual([]);
    });

    it('a subject holds the BOOKS of what sits in it, never the folders', () => {
        const b = of(library(), '..own');
        expect(b?.entries).toContain('.physics/.subject');
        expect(b?.entries).not.toContain('.physics');
    });
});
