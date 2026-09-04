import type { $Book } from '@dna-platform/public';

export const books: Record<string, () => Promise<{ book: $Book }>> = {
    "/wikimedia": () => import('./..wikimedia/book'),
    "/chemistry": () => import('./chemistry/book'),
    "/consciousness": () => import('./consciousness/book'),
    "/gauge-theory": () => import('./gauge-theory/book'),
};
