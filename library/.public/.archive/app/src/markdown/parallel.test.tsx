import { describe, it, expect } from 'vitest';
import { $Code } from '@/writing/Code';
import { written, found } from './parallel';
import { $Link } from '@/reference/Link';

// The parallel text's claim, pinned so the screen cannot drift from it: one text, two
// notations, and the READINGS agree. The oracle for each side is the other
// side — no expectation is hand-written, so neither can quietly go stale.

describe('a parallel text — a written part and a found part are the same thing', () => {
    it('both sides answer the same number of parts', () => {
        expect(written().parts().length).toBe(found().parts().length);
    });

    // THE TITLES LABEL THE SIDES and are deliberately different text — "Written
    // by hand" against "Found in the notation" — so the claim is about the body.
    //
    // This used to compare everything and passed by COINCIDENCE: the titles
    // differ by one word, and the written side's <Link> was dissolving into two
    // plain words, which cancelled it exactly. The link survives now, so the
    // accident shows. The oracle is still each side for the other.
    const body = (of: { parts(): { sentences: { words: unknown[] }[] }[] }) =>
        of.parts().slice(1).flatMap(p => p.sentences).flatMap(s => s.words);

    it('both sides read to the same words', () => {
        expect(body(written()).length).toBe(body(found()).length);
    });

    it('both sides stand a code block at the same position', () => {
        const at = (parts: unknown[], is: (p: unknown) => boolean) =>
            parts.findIndex(is as never);
        const left = written().parts();
        const right = found().parts();
        expect(at(left, p => p instanceof $Code)).toBe(at(right, p => p instanceof $Code));
    });

    it('the notation surfaces its reference as a part; the hand-written side carries it in the block', () => {
        const references = found().parts()
            .flatMap(p => p.sentences)
            .flatMap(s => s.parts())
            .filter(w => w instanceof $Link);
        expect(references.length).toBe(1);
        expect(references[0].copy).toBe('a link');
        // The written side reads the same words — the link is drawn from the
        // block rather than found by a notation, which is not a defect.
        expect(written().copy).toContain('a link');
    });
});
