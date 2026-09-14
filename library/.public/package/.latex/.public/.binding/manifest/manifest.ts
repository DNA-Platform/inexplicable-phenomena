import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type Manifest = {
    assembled: string[];
    written: string[];
    rendered: string[];
    bundled: string[];
};

const empty = (): Manifest => ({ assembled: [], written: [], rendered: [], bundled: [] });

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
