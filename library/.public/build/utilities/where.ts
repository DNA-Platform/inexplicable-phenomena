import { existsSync } from 'node:fs';
import { dirname, join, resolve as absolute, sep } from 'node:path';
import type { Path } from '../library.ts';

// WHERE THE WORKSPACE IS. The order manifest lives at the repository root, and
// the compiler needs it to know the arrangement a person made by hand.
//
// This was a LITERAL ABSOLUTE PATH, which meant the compiler ran on one machine
// and, anywhere else, found no manifest and fell back to alphabetical without
// saying so — a wrong answer wearing a right one. It is climbed for now, and a
// failure to find it is stated rather than swallowed.

// the others as `string` — so the three agreed completely while appearing not to.
export const forward = (p: string): Path => p.split(sep).join('/');

export const root = (from: string = process.cwd()): string => {
    let at = absolute(from);
    for (;;) {
        if (existsSync(join(at, '.vscode', 'sort-order.json'))) return at;
        const up = dirname(at);
        if (up === at) {
            console.warn('no order manifest found above ' + from + ' — order falls back to alphabetical');
            return absolute(from);
        }
        at = up;
    }
};
