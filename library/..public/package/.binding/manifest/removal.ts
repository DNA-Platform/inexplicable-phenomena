import { rmSync, rmdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { manifest, type Manifest } from './manifest';

// AND THE FOLDER IT STOOD IN. A page is written under its address, so a book that changed name
// leaves the folder of its old one behind — and an empty folder in a published face is an address
// that answers nothing. The walk upward stops at the first folder still holding something.
const emptied = (face: string, path: string): void => {
    for (let at = dirname(join(face, path)); at !== face && at.startsWith(face); at = dirname(at))
        try { rmdirSync(at); } catch { return; }
};

export const removal = (face: string, previous: Manifest, current: Manifest): string[] => {
    const kept = new Set(manifest.all(current));
    const gone = manifest.all(previous).filter(path => !kept.has(path));
    for (const path of gone) rmSync(join(face, path), { force: true });
    for (const path of gone) emptied(face, path);

    return gone;
};
