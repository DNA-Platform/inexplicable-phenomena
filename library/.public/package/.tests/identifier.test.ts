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

// Doug, 2026-10-17: "It is very important that we normalize text for ids exactly teh same… Make sure the
// sanitizer is very smart. like & to and… and everything else we thought of and ponder corner cases that are
// unseen thus far too!" Every case below is one name that LOOKS like another, or reads like another, and must
// stand at one address; or one that looks alike and means otherwise, and must not. Sprint 111, U17.
describe('two names that look the same stand at one address, and two that mean otherwise do not', () => {
    it('reads a letter the same however it was composed, so an accent typed as one mark or two is one address', () => {
        expect(identifier.slug('Café')).toBe(identifier.slug('Café'));
        expect(identifier.slug('Gödel')).toBe(identifier.slug('Gödel'));
        expect(identifier.slug('Gödel')).toBe('gödel');
    });

    it('takes every apostrophe a keyboard types for one, so none of them splits a word', () => {
        for (const one of ["Doug's", 'Doug’s', 'Doug‘s', 'Dougʼs', 'Doug`s', 'Doug´s'])
            expect(identifier.slug(`${one} Library`), one).toBe('dougs-library');
        expect(identifier.slug('Dr. Helga d’Oustafost')).toBe('dr-helga-doustafost');
    });

    it('reads a sign of equality as a word, so P = NP and P ≠ NP are two addresses and neither is p-np', () => {
        expect(identifier.slug('P = NP: arguments')).toBe('p-equals-np-arguments');
        expect(identifier.slug('Arguments for and against P ≠ NP')).toBe('arguments-for-and-against-p-not-equals-np');
    });

    it('reads a sharp after a letter as a language says it, and leaves a number sign and a heading mark as nothing', () => {
        expect(identifier.slug('C# and F#')).toBe('c-sharp-and-f-sharp');
        expect(identifier.slug('C')).not.toBe(identifier.slug('C#'));
        expect(identifier.slug('Item #2')).toBe('item-2');
        expect(identifier.slug('# The Semantics of Inheritance')).toBe('the-semantics-of-inheritance');
    });

    it('drops what cannot be seen, so a name with a zero-width space, a soft hyphen or a direction mark in it is the name without', () => {
        expect(identifier.slug('Invest​ing')).toBe('investing');
        expect(identifier.slug('co­operate')).toBe('cooperate');
        expect(identifier.slug('﻿The Ledger')).toBe('the-ledger');
        expect(identifier.slug('The ‮Ledger‬')).toBe('the-ledger');
        expect(identifier.slug('Heart️')).toBe('heart');
    });

    it('reads every space as a space, so a line break, a tab or a non-breaking space between words is one dash', () => {
        expect(identifier.slug('История Биткоина.\nКто такой')).toBe('история-биткоина-кто-такой');
        expect(identifier.slug('The\tFirst Shelf　Here')).toBe('the-first-shelf-here');
    });

    it('keeps the vowel signs of a script that writes them as marks, so a word in Devanagari is one word', () => {
        expect(identifier.slug('हिन्दी भाषा')).toBe('हिन्दी-भाषा');
        expect(identifier.slug('ภาษาไทย')).toBe('ภาษาไทย');
    });

    it('lets a lookalike stand where its letter stood, so a sanitized name keeps its address', () => {
        expect(identifier.slug('Who∕Watson ❨2❩ ⁅draft⁆')).toBe(identifier.slug('Who/Watson (2) [draft]'));
        expect(identifier.slug('Who∕Watson ❨2❩ ⁅draft⁆')).toBe('who-watson-2-draft');
    });

    it('leaves a pictograph and a decoration out, and a name of nothing else no address, for the binder to refuse', () => {
        expect(identifier.slug('💬 Well TONX is doing very well…')).toBe('well-tonx-is-doing-very-well');
        expect(identifier.slug('1️⃣ First')).toBe('1-first');
        expect(identifier.slug('🎉')).toBe('');
        expect(identifier.slug('???')).toBe('');
        expect(identifier.slug('')).toBe('');
    });

    it('is a slug of its own slug, so an address read back as a name stands where it stood', () => {
        for (const one of ['The First Shelf', 'C++ at 100%', 'Понимание основ СРТ', 'P ≠ NP', 'Café́', 'हिन्दी'])
            expect(identifier.slug(identifier.slug(one)), one).toBe(identifier.slug(one));
    });
});

describe('the identifier normalizes text as it is seen, which is what a slug and a sanitized name both begin from', () => {
    it('composes, collapses every space to one, and trims', () => {
        expect(identifier.normalized('  Café \n\t au  lait  ')).toBe('Café au lait');
    });

    it('drops controls and invisible marks, and keeps the joiner that shapes two letters of a script', () => {
        expect(identifier.normalized('a\u0007b​c')).toBe('abc');
        expect(identifier.normalized('می‌خواهم')).toBe('می‌خواهم');
        expect(identifier.normalized('👨‍👩')).toBe('👨👩');
    });

    it('keeps case and every visible sign, since a name is shown as written', () => {
        expect(identifier.normalized('Doug & Seren $ $Chemical SRT')).toBe('Doug & Seren $ $Chemical SRT');
        expect(identifier.normalized('Pointers in C++: *x vs **x')).toBe('Pointers in C++: *x vs **x');
    });
});
