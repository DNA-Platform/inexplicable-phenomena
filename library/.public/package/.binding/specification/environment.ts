import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { resolution } from '../resolution/addresses';

export const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const library = resolve(binding, '..');
export const chosen = configure(binding);
export const found = walk(library, chosen);
if (found.books.length === 0) throw new Error(`${library} holds no book — a specification against nothing would pass`);
export const table = resolution(found, chosen);
export const shipping = chosen.specification.mode === 'production';
