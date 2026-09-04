import type { $Book } from '@dna-platform/public';

// THE ONLY DOOR INTO A BOOK, and every one of them is named. A glob would find
// none: every cover and synopsis in this library begins with a dot.
//
// Each entry is a dynamic import, so a page loads the one book it is showing and
// no other. That is not a discipline anybody keeps — it is the shape of the map.
export const books: Record<string, () => Promise<{ book: $Book }>> = {
    "/": () => import('./..the-library/book'),
    "/philosophy": () => import('./.philosophy/.subject/book'),
    "/philosophy/the-hard-problem": () => import('./.philosophy/the-hard-problem/book'),
    "/physics": () => import('./.physics/.subject/book'),
    "/physics/gauge-theory": () => import('./.physics/gauge-theory/book'),
    "/physics/the-standard-model": () => import('./.physics/the-standard-model/book'),
    "/the-team": () => import('./the-team/book'),
};
