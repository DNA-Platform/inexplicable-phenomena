import { describe, expect, it } from 'vitest';
import { slug } from './addresses';

// HOW THE COMPILER SPELLS A NAME AS AN ADDRESS, the one spelling every id and every url in a library
// shares. It came from v1's `reflection.slug` letter for letter, so these say it has not moved.
describe('a name spelled as an address', () => {
    it('is lowercase, each run of anything but letters and digits one hyphen, and none at either end', () => {
        expect(slug('The First Shelf')).toBe('the-first-shelf');
        expect(slug('  P versus NP?  ')).toBe('p-versus-np');
    });

    it('reads an apostrophe as inside its word and an ampersand as the word it is', () => {
        expect(slug("Doug's Library")).toBe('dougs-library');
        expect(slug('Doug’s Library')).toBe('dougs-library');
        expect(slug('Claude & Our Projects')).toBe('claude-and-our-projects');
    });

    it('leaves nothing of a name with no letter or digit in it', () => {
        expect(slug('???')).toBe('');
    });
});
