import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// WHAT A DRAWN PAGE LEAVES BEHIND, so the next bind can keep it: the book it is the page of, the
// digest of that book when it was drawn, the digest of the addresses it refers to, the sheet it
// links, and the markup it was drawn with, kept beside the binding under `.pages/`. A page whose
// book and references still hold is not drawn again; it is written again onto the new shell from
// its kept markup. Sprint 109, D11.
export type Page = {
    folder: string;
    digest: string;
    references: string;
    binder: string;
    sheet: string;
    markup: string;
};

// WHAT THE BUNDLE LEAVES BEHIND, kept by book since 2026-10-19: a book's chunk, the entry its page loads,
// every file that chunk needs and the packages it imports bare; the shared entries one per bare name,
// which the shell's import map resolves; and the app, with the page Vite wrote for it, onto which the
// import map is put. A chunk whose book's digest holds is not built again.
export type Chunk = {
    digest: string;
    entry: string;
    files: string[];
    bindings: Record<string, string[]>;
};

export type Shared = {
    digest: string;
    map: Record<string, string>;
    files: string[];
};

export type App = {
    digest: string;
    files: string[];
    bindings: Record<string, string[]>;
    shell: string;
};

export type Manifest = {
    assembled: string[];
    written: string[];
    rendered: string[];
    bundled: string[];
    pages: Record<string, Page>;
    chunks: Record<string, Chunk>;
    shared?: Shared;
    app?: App;
};

const empty = (): Manifest => ({ assembled: [], written: [], rendered: [], bundled: [], pages: {}, chunks: {} });

export const manifest = {
    at: (binding: string): string => join(binding, '.manifest.json'),
    // NOTHING KEPT, which is what a bind told `fresh` starts from. Sprint 110.
    empty,

    read(binding: string): Manifest {
        const at = manifest.at(binding);
        if (!existsSync(at)) return empty();
        try {
            return { ...empty(), ...(JSON.parse(readFileSync(at, 'utf8')) as Partial<Manifest>) };
        } catch {
            return empty();
        }
    },

    write(binding: string, parts: Manifest): Manifest {
        const current: Manifest = { ...parts };
        writeFileSync(manifest.at(binding), JSON.stringify(current, null, 2) + '\n', 'utf8');
        return current;
    },

    all(one: Manifest): string[] {
        return [...one.assembled, ...one.written, ...one.rendered, ...one.bundled];
    },
};
