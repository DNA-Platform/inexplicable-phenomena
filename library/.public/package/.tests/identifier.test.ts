import { describe, it, expect } from 'vitest';
import { identifier, Identifier } from '@dna-platform/public';

// THE ONE SLUG. Doug, 2026-09-26: "Title should use the name to create the fragment with the Identifier
// utility. The url should be completely arbitrary." The compiler imports this same function, so the
// fragments it writes are the ids the page wears — one function, and these cases are its whole account.
describe('the identifier slugs a name, and it is the one slug the library and the compiler share', () => {
    it('lowercases, and joins words with one dash', () => {
        expect(identifier.slug('The First Shelf')).toBe('the-first-shelf');
        expect(identifier.slug('  P versus NP?  ')).toBe('p-versus-np');
        expect(identifier.slug('What is claimed')).toBe('what-is-claimed');
    });

    it('reads punctuation as prose does: an apostrophe stands inside a word, an ampersand is a word', () => {
        expect(identifier.slug("Doug's Library")).toBe('dougs-library');
        expect(identifier.slug('Doug’s Library')).toBe('dougs-library');
        expect(identifier.slug('Claude & Our Projects')).toBe('claude-and-our-projects');
    });

    it('is an instance of its class, exported as the other utilities are', () => {
        expect(identifier).toBeInstanceOf(Identifier);
    });
});
