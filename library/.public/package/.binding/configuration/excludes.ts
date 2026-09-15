import type { Configuration } from './configuration';

// WHAT IS NEVER A BOOK, WHEREVER IT STANDS. A face is not here: it is known by holding a binding
// rather than by its name, and the walk skips it on that.
const never = new Set(['.binding', '.git', 'node_modules', 'assets']);

export const excluded = (folder: string, chosen: Configuration): boolean =>
    never.has(folder) || chosen.inventory.excludes.includes(folder);
