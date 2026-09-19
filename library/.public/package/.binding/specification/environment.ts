import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { around } from '../inventory/library';
import { graph } from '../manifest/graph';
import { catalogue } from '../catalogue/catalogue';

const geometry = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));

export const binding = geometry.binding;
export const face = geometry.face;
export const library = geometry.library;
export const chosen = configure(binding);
export const found = walk(library, chosen);
if (found.books.length === 0) throw new Error(`${library} holds no book — a specification against nothing would pass`);

// WHAT THE LAST BUILD READ. A promise about the pages reads it; a promise about the books does not,
// and asks the library itself, because a suite that trusts a record cannot catch the record.
export const held = graph.read(binding);
// THE ADDRESSES COME FROM THE PARSED CATALOGUE, not from the graph the last build wrote. A promise
// about the PAGES needs to know where each book stands, and asking the running books that made the
// compiler depend on its own output — which is how a suite came to collect no tests at all, because
// a title had been lowered to a link and `.pubconfig` could no longer find the root it names.
export const table = catalogue(found, chosen).table;
export const shipping = chosen.specification.mode === 'production';
