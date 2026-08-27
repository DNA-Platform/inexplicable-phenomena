import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $$ } from '@/utilities/Lib';

class $HexLetter extends $Letter {
    constructor() {
        super();
        this.cache('HexLetter');
    }

    override specify(): void {
        super.specify();
        $check(/^U\+[0-9A-F]{4}$/.test(this.copy), 'a hex letter is written U+XXXX, and this one is not');
    }
}

const Writing = $($Writing);
const Letter = $($Letter);
const HexLetter = $($HexLetter);
$($Word);

const said = (...children: ReactNode[]) => $(<Writing>{children}</Writing>) as $Writing;

describe('a type bound to the writing it types', () => {
    it('reads the copy of the writing it is bound to', () => {
        const written = said('a', <Letter />);
        expect(written.copy).toBe('a');
        expect($$(written, $Letter).copy).toBe('a');
    });

    it('reads a DIFFERENT writing once it is bound to one', () => {
        const letter = $$(said('a', <Letter />), $Letter);
        expect(letter.copy).toBe('a');
        letter.bind(said('b', <Letter />));
        expect(letter.copy).toBe('b');
    });

    it('closes the composition on itself', () => {
        const letter = $$(said('a', <Letter />), $Letter);
        expect(letter.parts()).toEqual([letter]);
        expect(letter.canonical()).toBe(letter);
    });

    // THE HEX LETTER IS DOUG'S OWN CASE — "what if letters were hex codes? Your
    // validation would be bad." It is, and this is where it shows: CARRIAGE says
    // yes to both names, and READING refuses, because $Letter's one-grapheme rule
    // is the CANONICAL letter's rule and is being asked as the LEVEL's. The two
    // questions are not yet separated, and this promise is what will change when
    // they are.
    it('carries both names, and reading refuses until the canonical rule leaves the level', () => {
        const written = said('U+0041', <HexLetter />);
        expect($$(written)($HexLetter)).toBe(true);
        expect($$(written)($Letter)).toBe(true);
        expect(() => $$(written, $Letter)).toThrow(/a letter is one grapheme/);
    });

    it('refuses a narrower type the writing does not carry', () => {
        expect(() => $$(said('a', <Letter />), $HexLetter)).toThrow(/not a \$HexLetter — it carries \$Letter/);
    });

    it('throws on an unrelated type, naming both sides', () => {
        expect(() => $$(said('a', <Letter />), $Word)).toThrow(/not a \$Word — it carries \$Letter/);
    });

    it('throws when the writing carries no type at all', () => {
        expect(() => $$(said('a'), $Letter)).toThrow(/no type at all/);
    });

    it('specifies that writing carries a type, and a type satisfies it by being parenthetical', () => {
        expect(said('a').specification).toEqual([]);
        expect(said('a', <Letter />).specification.length).toBe(1);
        expect(($($Letter) as never as { $: $Letter }).$.parenthetical).toBe(true);
    });
});

describe('$$ reads two ways', () => {
    it('asks whether a writing IS a kind, and answers without binding it', () => {
        const written = said('a', <Letter />);
        expect($$(written)($Letter)).toBe(true);
        expect($$(written)($Word)).toBe(false);
        expect($$(written)($HexLetter)).toBe(false);
    });

    it('answers a writing carrying no type at all with false rather than a throw', () => {
        expect($$(said('a'))($Letter)).toBe(false);
    });

    it('and a narrower type answers to BOTH names, as reading it as one does', () => {
        const written = said('U+0041', <HexLetter />);
        expect($$(written)($HexLetter)).toBe(true);
        expect($$(written)($Letter)).toBe(true);
    });
});
