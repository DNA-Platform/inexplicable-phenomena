import { readdirSync } from 'node:fs';

const apparatus = ['.cover.tsx', '.synopsis.tsx', '.table.tsx'];

const order = (file: string): number[] => file.split('-')[0].split('.').map(Number);

const before = (one: string, two: string): number => {
    const first = order(one);
    const second = order(two);
    for (let at = 0; at < Math.max(first.length, second.length); at++) {
        const a = first[at] ?? -1;
        const b = second[at] ?? -1;
        if (a !== b) return a - b;
    }
    return 0;
};

// WHAT A BOOK IS MADE OF, IN THE ORDER IT IS BOUND: the apparatus it holds, by name, then its
// chapters by their number. Said once, so the module the assembly writes and the file a failure
// lands on read the same list.
export const files = (folder: string): string[] => {
    const held = readdirSync(folder, { withFileTypes: true })
        .filter(entry => entry.isFile() && /\.tsx$/.test(entry.name) && !entry.name.endsWith('.d.ts'))
        .map(entry => entry.name);

    return [...apparatus.filter(name => held.includes(name)), ...held.filter(name => /^\d/.test(name)).sort(before)];
};
