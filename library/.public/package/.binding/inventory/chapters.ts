import { readdirSync } from 'node:fs';
import type { Chapter } from './library';

const files = (folder: string): string[] =>
    readdirSync(folder, { withFileTypes: true })
        .filter(entry => entry.isFile() && /\.tsx$/.test(entry.name) && !entry.name.endsWith('.d.ts'))
        .map(entry => entry.name);

export const orderOf = (file: string): number[] => file.split('-')[0].split('.').map(Number);

export const before = (one: Chapter, two: Chapter): number => {
    for (let at = 0; at < Math.max(one.order.length, two.order.length); at++) {
        const a = one.order[at] ?? -1;
        const b = two.order[at] ?? -1;
        if (a !== b) return a - b;
    }
    return 0;
};

export const chapters = (folder: string): Chapter[] =>
    files(folder)
        .filter(file => /^\d/.test(file))
        .map(file => ({ file, order: orderOf(file) }))
        .sort(before);

export const apparatus = (folder: string): { cover: boolean; synopsis: boolean; contents: boolean } => {
    const held = new Set(files(folder));
    return { cover: held.has('.cover.tsx'), synopsis: held.has('.synopsis.tsx'), contents: held.has('.table.tsx') };
};
