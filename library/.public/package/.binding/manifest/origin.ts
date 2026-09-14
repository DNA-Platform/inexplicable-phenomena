import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';

// WHERE A COPY CAME FROM, and how to read the master there. The copy script writes it into
// .pubconfig as manifest.origin — a path to the master, the package that carries one, or
// github:<ref> — and sync reads it from there and nowhere else.
export type Origin =
    | { kind: 'local'; at: string }
    | { kind: 'package'; name: string; at: string }
    | { kind: 'github'; ref: string };

export const repository = 'DNA-Platform/inexplicable-phenomena';
export const within = 'library/.public/package/.binding';

// A COPY'S OWN FILES, never overwritten by its origin: its configuration, its record, what its own
// assembly wrote, and ITS DEPENDENCIES — the master names the real packages, and a copy inside a
// checkout points at the checkout instead, so a change is there the moment it is built rather than
// the moment it is published. Everything else in the folder is the master's.
export const kept = new Set(['.graph.json', 'package.json', 'application/books.ts', '.pubconfig', '.manifest.json', 'application/routes.ts', 'application/stylesheets.ts']);
export const skipped = new Set(['node_modules', '.vite']);

export const forward = (path: string): string => path.split(sep).join('/');

const packageName = (said: string): boolean => {
    if (said.startsWith('.') || said.startsWith('/') || said.includes(':')) return false;
    const parts = said.split('/');
    return said.startsWith('@') ? parts.length === 2 : parts.length === 1;
};

export const origin = (binding: string, configured: string): Origin => {
    if (configured.startsWith('github:')) return { kind: 'github', ref: configured.slice('github:'.length) || 'main' };
    if (packageName(configured)) {
        const main = createRequire(join(binding, 'package.json')).resolve(configured);
        const at = resolve(dirname(main), '..', '.binding');
        if (!existsSync(at)) throw new Error(`${configured} resolves to ${main}, and no .binding stands beside its dist`);
        return { kind: 'package', name: configured, at };
    }
    return { kind: 'local', at: resolve(binding, configured) };
};

export const describe = (from: Origin): string =>
    from.kind === 'github' ? `github:${repository}@${from.ref}` : from.kind === 'package' ? `${from.name} at ${from.at}` : from.at;

const listLocal = (root: string): string[] => {
    const found: string[] = [];
    const visit = (dir: string): void => {
        for (const name of readdirSync(dir)) {
            if (skipped.has(name)) continue;
            const path = join(dir, name);
            if (statSync(path).isDirectory()) visit(path);
            else found.push(forward(relative(root, path)));
        }
    };
    visit(root);
    return found.sort();
};

const listGithub = async (ref: string): Promise<string[]> => {
    const answer = await fetch(`https://api.github.com/repos/${repository}/git/trees/${ref}?recursive=1`, { headers: { accept: 'application/vnd.github+json' } });
    if (!answer.ok) throw new Error(`GitHub answered ${answer.status} listing ${repository}@${ref}`);
    const { tree } = (await answer.json()) as { tree: { path: string; type: string }[] };
    return tree
        .filter(one => one.type === 'blob' && one.path.startsWith(within + '/'))
        .map(one => one.path.slice(within.length + 1))
        .filter(path => !path.split('/').some(part => skipped.has(part)))
        .sort();
};

const readGithub = async (ref: string, path: string): Promise<Buffer> => {
    const answer = await fetch(`https://raw.githubusercontent.com/${repository}/${ref}/${within}/${path}`);
    if (!answer.ok) throw new Error(`GitHub answered ${answer.status} reading ${path}`);
    return Buffer.from(await answer.arrayBuffer());
};

export const listing = async (from: Origin): Promise<string[]> => (from.kind === 'github' ? listGithub(from.ref) : listLocal(from.at));

export const reading = async (from: Origin, path: string): Promise<Buffer> => (from.kind === 'github' ? readGithub(from.ref, path) : readFileSync(join(from.at, path)));

// BRINGING THE MASTER'S FILES INTO A COPY — the one loop sync and copy share. A file the copy
// keeps is never touched; a file already equal is left alone; a .gitignore is written when the
// master shipped without one, because npm does not ship it.
export const bring = async (from: Origin, into: string, keeping: Set<string>): Promise<{ written: string[]; current: number }> => {
    const paths = await listing(from);
    const written: string[] = [];
    for (const path of paths) {
        if (keeping.has(path)) continue;
        const bytes = await reading(from, path);
        const at = join(into, path);
        if (existsSync(at) && readFileSync(at).equals(bytes)) continue;
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, bytes);
        written.push(path);
    }
    const ignore = join(into, '.gitignore');
    if (!existsSync(ignore)) {
        writeFileSync(ignore, ['node_modules/', '.vite/', ''].join('\n'));
        written.push('.gitignore');
    }
    return { written, current: paths.filter(path => !keeping.has(path) && !written.includes(path)).length };
};
