import type { Entry } from '../manifest/graph';

// A BOOK'S NAME IS THE BOOK'S OWN. It is read off the running book — its cover's title, put through
// the framework's slug on the way out and never kept — and the binder makes no name of its own.
// A reading may answer a list; a name never does, and this says which one it is asking for.
export const nameOf = (entry: Entry): string => (typeof entry.book.name === 'string' ? entry.book.name : '');
