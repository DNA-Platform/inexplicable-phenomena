import { describe, it, expect } from 'vitest';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// $(<X/>, ...written) — a bond constructor handed what it composes.
//
// This is what a composition needs in order to be built from the literal things
// an author wrote. React refuses a chemical as a child, so before this there was
// no way to hand an already-built one to a bond constructor: lifting it back
// through an element re-runs its bond constructor with nothing and empties it.

class $Held extends $Chemical {
    taken: any[] = [];
    $tag = '';
    $Held(...parts: any[]) { this.taken = parts; }
    view() { return null; }
}
const Held = $($Held);

// Inline, the way every writing below a document is — so it flows within a
// block rather than standing beside one.
class $Word extends $Chemical {
    constructor() { super(); this.inline = true; }
    $Word(...parts: any[]) { this.parts = parts; }
    parts: any[] = [];
    view() { return null; }
}
const Word = $($Word);

describe('a bond constructor can be handed what it composes', () => {
    it('takes raw prose', () => {
        const held: $Held = $(<Held />, 'just prose');
        expect(held.taken.length).toBe(1);
        expect(held.taken[0].$elements).toEqual(['just prose']);
    });

    it('KEEPS THE PROPS, and the arguments are separate from them', () => {
        const held: $Held = $(<Held tag="cover" />, 'prose');
        expect(held.$tag).toBe('cover');
        expect(held.taken[0].$elements).toEqual(['prose']);
    });

    it('TAKES AN ALREADY-BUILT CHEMICAL WHOLE, which is the thing React refuses', () => {
        const word: $Word = $(<Word />, 'BLAH');
        const held: $Held = $(<Held />, 'Blah blah ', word, ' blah');
        const block = held.taken[0];
        expect(block.$elements.length).toBe(3);
        expect(block.$elements[0]).toBe('Blah blah ');
        expect(block.$elements[1]).toBe(word);
        expect(block.$elements[2]).toBe(' blah');
    });

    it('and the built one is not rebuilt — it keeps what was written in it', () => {
        const word: $Word = $(<Word />, 'BLAH');
        const held: $Held = $(<Held />, 'a ', word);
        const carried = held.taken[0].$elements[1] as $Word;
        expect(carried).toBe(word);
        expect(carried.parts[0].$elements).toEqual(['BLAH']);
    });

    it('a raw number rides too', () => {
        const held: $Held = $(<Held />, 'the value ', 2, ' stands');
        expect(held.taken[0].$elements).toEqual(['the value ', 2, ' stands']);
    });

    it('with nothing written, the element behaves exactly as it always did', () => {
        const held: $Held = $(<Held tag="plain">from children</Held>);
        expect(held.$tag).toBe('plain');
        expect(held.taken[0].$elements).toEqual(['from children']);
    });
});

describe('and a $Block is the normal thing to hand it', () => {
    it('A BLOCK GOES STRAIGHT THROUGH, whole, as the one argument', () => {
        const word: $Word = $(<Word />, 'BLAH');
        const built: $Held = $(<Held />, 'Blah blah ', word, ' blah');
        const block = built.taken[0];

        const again: $Held = $(<Held />, block);
        expect(again.taken.length).toBe(1);
        expect(again.taken[0]).toBe(block);
    });

    it('so what it composed survives being handed on', () => {
        const word: $Word = $(<Word />, 'BLAH');
        const built: $Held = $(<Held />, 'a ', word);
        const again: $Held = $(<Held />, built.taken[0]);
        const block = again.taken[0];
        expect(block.$elements[0]).toBe('a ');
        expect(block.$elements[1]).toBe(word);
    });

    it('and it keeps its own props while carrying those contents', () => {
        const word: $Word = $(<Word />, 'BLAH');
        const built: $Held = $(<Held tag="cover" />, 'a ', word);
        const again: $Held = $(<Held tag="spine" />, built.taken[0]);
        expect(again.$tag).toBe('spine');
        expect(again.taken[0].$elements[1]).toBe(word);
    });
});

describe('THE RAW FORM IS SUGAR FOR THE BLOCK FORM', () => {
    it('handing the contents and handing the block they make are the same thing', () => {
        const word: $Word = $(<Word />, 'BLAH');

        // Written as contents — the convenient form.
        const sugared: $Held = $(<Held />, 'Blah blah ', word, ' blah');

        // Written as the block itself — the primary form.
        const primary: $Held = $(<Held />, sugared.taken[0]);

        expect(primary.taken.length).toBe(sugared.taken.length);
        expect(primary.taken[0].$elements).toEqual(sugared.taken[0].$elements);
    });
});
