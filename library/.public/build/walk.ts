import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { join, relative, dirname, basename, sep } from 'node:path';
import type { Complaint, Entry, File, Kind, Library, Path, Role } from './library.ts';

// THE WALK. It turns a folder of writing into a description of a library, and it
// is the only stage that ever looks at the filesystem.
//
// It adds files BY COMPUTED PATH and never by pattern. A glob does not match a
// dot-prefixed name, and this bit three times before it was written down: tsc's
// `include` saw one file of three, ts-morph's `addSourceFilesAtPaths` loaded
// nothing at all, and only an explicit path found them.

const forward = (p: string): Path => p.split(sep).join('/');

export const dotsOf = (name: string): number => (name.match(/^\.+/)?.[0].length ?? 0);

export const bare = (name: string): string => name.replace(/^\.+/, '');

// A dot on a file says only that it is not a chapter; the name says which it is.
export const roleOf = (name: string): Role => {
    if (!dotsOf(name)) return 'chapter';
    const said = bare(name).split('.')[0];
    return said === 'cover' || said === 'synopsis' ? said : 'chapter';
};

const contentish = (name: string): boolean => /\.tsx?$/.test(name) && !name.endsWith('.d.ts');

// THE ROUTE, which is not the folder path and must not be confused with it.
// Dots are an authoring mark and have no business in a URL; and a folder that
// speaks for its container IS that container as far as a reader is concerned,
// so it collapses onto its parent rather than appearing beneath it.
export const routeOf = (path: Path, spoken: boolean): string => {
    const parts = path.split('/').filter(Boolean);
    if (spoken) parts.pop();
    const cleaned = parts.map(bare).filter(Boolean);
    return '/' + cleaned.join('/');
};

// Order comes from the arrangement a person made, kept beside the library rather
// than inside the filenames — listed entries first in their order, unlisted after,
// alphabetically. The comparator matches the tool that writes the manifest.
export const ordering = (listed: string[]) => (a: string, b: string): number => {
    const at = listed.indexOf(a);
    const bt = listed.indexOf(b);
    if (at !== -1 && bt !== -1) return at - bt;
    if (at !== -1) return -1;
    if (bt !== -1) return 1;
    return a.localeCompare(b);
};

type Manifest = Record<string, string[]>;

export const manifestAt = (workspace: string): Manifest => {
    const at = join(workspace, '.vscode', 'sort-order.json');
    if (!existsSync(at)) return {};
    try {
        return JSON.parse(readFileSync(at, 'utf-8')) as Manifest;
    } catch {
        return {};
    }
};

const held = (dir: string) => readdirSync(dir).filter(n => n !== 'node_modules');

// The folder that SPEAKS for a container is the one wearing the most dots, and
// exactly one may wear it. Dots rank; position decides a kind.
const speaker = (folders: string[]): string => {
    const top = folders.reduce((n, f) => Math.max(n, dotsOf(f)), 0);
    if (!top) return '';
    const at = folders.filter(f => dotsOf(f) === top);
    return at.length === 1 ? at[0] : '';
};

export const walk = (root: string, workspace = process.cwd()): Library => {
    const manifest = manifestAt(workspace);
    const entries: Entry[] = [];
    const complaints: Complaint[] = [];

    const listedFor = (dir: string): string[] => {
        const key = forward(relative(workspace, dir)) || '.';
        return manifest[key] ?? [];
    };

    const visit = (dir: string, order: number): void => {
        const names = held(dir);
        const folders = names.filter(n => statSync(join(dir, n)).isDirectory());
        const filenames = names.filter(n => !folders.includes(n) && contentish(n));
        const sortBy = ordering(listedFor(dir));
        folders.sort(sortBy);
        filenames.sort(sortBy);

        const own = speaker(folders);
        const path = forward(relative(root, dir));
        const spoken = dir !== root && speaker(held(dirname(dir)).filter(n => statSync(join(dirname(dir), n)).isDirectory())) === basename(dir);
        // A dot is a CLAIM to be a subject and the contents have to earn it — so a
        // dotted folder holding nothing is a named failure, never quietly a book.
        // The one exception is the folder that speaks for its container: that one
        // is the container's own book, which is why position outranks the dots.
        const kind: Kind = spoken ? 'book' : dotsOf(basename(dir)) || folders.length ? 'subject' : 'book';

        const files: File[] = filenames.map((name, at) => ({
            name,
            role: roleOf(name),
            order: at,
        }));

        if (path) {
            entries.push({
                path,
                route: routeOf(path, spoken),
                dots: dotsOf(basename(dir)),
                kind,
                own: own ? forward(relative(root, join(dir, own))) : '',
                holds: folders.map(f => forward(relative(root, join(dir, f)))),
                files,
                references: [],
                order,
            });

            if (kind === 'subject' && !folders.length) complaints.push({ at: path, says: 'marked a subject and holds nothing' });
            if (folders.length && !own) complaints.push({ at: path, says: 'no single folder speaks for it' });
            if (kind === 'book' && files.length && !files.some(f => f.role === 'cover')) complaints.push({ at: path, says: 'a book with no cover' });
            if (kind === 'book' && !files.length && !folders.length) complaints.push({ at: path, says: 'holds nothing at all' });
        }

        // The root is a parameter rather than an entry, so the convention never
        // judges its name — but it is still a container, and a library with
        // nothing speaking for it has no book of its own.
        if (!path && folders.length && !own) complaints.push({ at: '.', says: 'no single folder speaks for the library' });

        folders.forEach((f, at) => visit(join(dir, f), at));
    };

    visit(root, 0);
    return { root, entries, complaints };
};
