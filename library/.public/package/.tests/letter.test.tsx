import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Letter, Letter, Composition, Level, Open, Closed, LetterSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('a letter is the composition that takes anything', () => {
    it('is at level 1, open, and has no parts, whatever it holds', () => {
        const letter = built<$Letter>(<Letter>anything <b>at all</b></Letter>);
        expect(letter.level).toBe(1);
        expect(letter.is(Open)).toBe(true);
        expect(letter.parts).toEqual([]);
        expect(letter.canonical).toBeUndefined();
        expect(letter.specification).toBeInstanceOf(LetterSpecification);
        expect(letter.specify()).toEqual([]);
    });

    it('refuses a composition inside, a letter included, when asked', () => {
        const nested = built<$Letter>(<Letter><Letter>a</Letter></Letter>);
        expect(nested.parts.length).toBe(0);
        expect([...nested.text].length).toBe(1);
        expect(nested.specify()).toContain('Letter: a letter is allowed to have anything but a composition, and this one holds one');
        const graded = built<$Letter>(<Letter><Composition><Level>2</Level></Composition></Letter>);
        expect(graded.specify()).toContain('Letter: a letter is allowed to have anything but a composition, and this one holds one');
    });

    it('a written Closed overrides the open a letter stands, and then prose is refused', () => {
        const closed = built<$Letter>(<Letter>prose <Closed /></Letter>);
        expect(closed.is(Closed)).toBe(true);
        expect(closed.is(Open)).toBe(false);
        expect(closed.specify()).toEqual(['Letter: a closed composition holds only writing, and this one holds something else']);
    });
});
