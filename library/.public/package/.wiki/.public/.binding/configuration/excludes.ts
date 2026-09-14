import type { Configuration } from './configuration';

const never = new Set(['.binding', '.public', '.git', 'node_modules', 'assets']);

export const excluded = (folder: string, chosen: Configuration): boolean =>
    never.has(folder) || chosen.inventory.excludes.includes(folder);
