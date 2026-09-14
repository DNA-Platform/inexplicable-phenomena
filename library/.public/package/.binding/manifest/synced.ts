import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repository = 'DNA-Platform/inexplicable-phenomena';
const within = 'library/.public/package/.binding';
const kept = new Set(['.pubconfig', '.manifest.json', 'application/books.ts', 'application/routes.ts', 'application/stylesheets.ts']);
const skipped = new Set(['node_modules', '.vite']);

type Source = { kind: 'local'; at: string } | { kind: 'github'; ref: string };

const forward = (path: string): string => path.split('\\').join('/');

const installed = (): string | undefined => {
    try {
        const main = createRequire(import.meta.url).resolve('@dna-platform/public');
        const at = resolve(dirname(main), '..', '.binding');
        return existsSync(at) ? at : undefined;
    } catch {
        return undefined;
    }
};

const source = (): Source => {
    const asked = process.env.BINDING_SOURCE;
    if (asked?.startsWith('github:')) return { kind: 'github', ref: asked.slice('github:'.length) || 'main' };
    if (asked) return { kind: 'local', at: resolve(asked) };
    const local = installed();
    return local ? { kind: 'local', at: local } : { kind: 'github', ref: 'main' };
};

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

const from = source();
if (from.kind === 'local' && realpathSync(from.at) === realpathSync(here)) {
    console.log(`this is the master .binding — nothing to sync`);
    process.exit(0);
}

const paths = from.kind === 'local' ? listLocal(from.at) : await listGithub(from.ref);
let written = 0;
for (const path of paths) {
    if (kept.has(path)) continue;
    const bytes = from.kind === 'local' ? readFileSync(join(from.at, path)) : await readGithub(from.ref, path);
    const at = join(here, path);
    if (existsSync(at) && readFileSync(at).equals(bytes)) continue;
    mkdirSync(dirname(at), { recursive: true });
    writeFileSync(at, bytes);
    written += 1;
    console.log(`synced  ${path}`);
}
const ignore = join(here, '.gitignore');
if (!existsSync(ignore)) {
    writeFileSync(ignore, ['node_modules/', '.vite/', ''].join('\n'));
    written += 1;
    console.log('synced  .gitignore (npm does not ship one; written so the copy keeps its debris out)');
}
console.log(`${written} file${written === 1 ? '' : 's'} synced from ${from.kind === 'local' ? from.at : `github:${repository}@${from.ref}`} · ${paths.length - written} current · kept: ${[...kept].join(', ')}`);
