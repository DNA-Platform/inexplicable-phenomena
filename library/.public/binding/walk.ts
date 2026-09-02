import { readdirSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Diagnostic, Entry, File, Library, Path, Role } from './library.ts';

export const dots = (name: string): number => name.match(/^\.+/)?.[0].length ?? 0;

export const bare = (name: string): string => name.replace(/^\.+/, '');

export const role = (name: string): Role => {
    if (!dots(name)) return 'chapter';
    const said = bare(name).split('.')[0];
    return said === 'cover' || said === 'synopsis' ? said : 'chapter';
};

export const route = (path: Path): string => '/' + path.split('/').map(bare).filter(Boolean).join('/');

const written = (name: string): boolean => /\.tsx?$/.test(name) && !name.endsWith('.d.ts');

const forward = (p: string): string => p.split(sep).join('/');

export const walk = (at: string): Library => {
    const root = forward(resolve(at));
    const entries: Entry[] = [];
    const diagnostics: Diagnostic[] = [];

    const visit = (path: Path, order: number): void => {
        const full = path ? `${root}/${path}` : root;
        const names = readdirSync(full).filter(n => n !== 'node_modules');
        const folders = names.filter(n => statSync(`${full}/${n}`).isDirectory()).sort((a, b) => a.localeCompare(b));
        const filenames = names.filter(n => !folders.includes(n) && written(n)).sort((a, b) => a.localeCompare(b));
        const files: File[] = filenames.map((name, at) => ({ name, role: role(name), order: at }));

        if (path) {
            entries.push({
                path,
                route: route(path),
                dots: dots(path.split('/').pop()!),
                files,
                order,
                holds: folders.map(f => `${path}/${f}`),
            });
            if (!files.length && !folders.length) diagnostics.push({ at: path, says: 'holds nothing at all' });
        }

        folders.forEach((f, at) => visit(path ? `${path}/${f}` : f, at));
    };

    visit('', 0);
    return { root, entries, books: [], diagnostics };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('walk.ts <corpus>');
        process.exit(1);
    }
    const library = walk(at);
    const files = library.entries.reduce((n, e) => n + e.files.length, 0);
    console.log(`WALK ${library.entries.length} folders · ${files} files · ${library.diagnostics.length} diagnostics`);
    for (const d of library.diagnostics) console.log(`  ${d.at} — ${d.says}`);
}
