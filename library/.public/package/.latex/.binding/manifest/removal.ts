import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { manifest, type Manifest } from './manifest';

export const removal = (library: string, previous: Manifest, current: Manifest): string[] => {
    const kept = new Set(manifest.all(current));
    const gone = manifest.all(previous).filter(path => !kept.has(path));
    for (const path of gone) rmSync(join(library, path), { force: true });
    return gone;
};
