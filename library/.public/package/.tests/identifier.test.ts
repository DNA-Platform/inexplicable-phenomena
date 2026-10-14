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

    // Doug, 2026-10-14, landing the slug that keeps every alphabet: "remember to convert sensible things. & should
    // be and. Are there other conversions like that that are obvious?" — the signs that read as a word read as it.
    it('reads punctuation as prose does: an apostrophe stands inside a word, and a sign that reads as a word is that word', () => {
        expect(identifier.slug("Doug's Library")).toBe('dougs-library');
        expect(identifier.slug('Doug’s Library')).toBe('dougs-library');
        expect(identifier.slug('Claude & Our Projects')).toBe('claude-and-our-projects');
        expect(identifier.slug('C++ at 100%')).toBe('c-plus-plus-at-100-percent');
        expect(identifier.slug('me@home')).toBe('me-at-home');
    });

    // Doug, 2026-10-13, ruling the importer's names: "the slug keeps every alphabet" — a title in Cyrillic is a
    // book of his, and its address is its own letters, lowercased, as a Latin one's are. Sprint 109, U13.
    it('keeps the letters and digits of every script, so a title in Cyrillic addresses its book in Cyrillic', () => {
        expect(identifier.slug('Понимание основ СРТ')).toBe('понимание-основ-срт');
        expect(identifier.slug('Перевод английских слов на русский')).toBe('перевод-английских-слов-на-русский');
        expect(identifier.slug('Café Été, 2026')).toBe('café-été-2026');
        expect(identifier.slug('語り手の本')).toBe('語り手の本');
    });

    it('is an instance of its class, exported as the other utilities are', () => {
        expect(identifier).toBeInstanceOf(Identifier);
    });
});
