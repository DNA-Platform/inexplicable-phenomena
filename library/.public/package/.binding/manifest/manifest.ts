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

export type Manifest = {
    assembled: string[];
    written: string[];
    rendered: string[];
    bundled: string[];
    pages: Record<string, Page>;
};

const empty = (): Manifest => ({ assembled: [], written: [], rendered: [], bundled: [], pages: {} });

export const manifest = {
    at: (binding: string): string => join(binding, '.manifest.json'),

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
