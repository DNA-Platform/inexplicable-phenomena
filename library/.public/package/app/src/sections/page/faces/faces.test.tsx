import { describe, it, expect } from 'vitest';
import { dress, palettes, letterpress, readme } from './faces';

// R13, made checkable: a dress is palette + face-set. Book and Night are the
// SAME face-set worn in two palettes; Github is the distinct set. If a later
// edit collapses that — one dress reaching for another's face, or the palettes
// fusing — these fail. The corroborating sibling of the on-screen look.
describe('R13 — a dress is palette plus face', () => {
    it('Book and Night are one face-set worn in two palettes', () => {
        expect(dress('book').faces).toBe(letterpress);
        expect(dress('night').faces).toBe(letterpress);
        expect(dress('book').faces).toBe(dress('night').faces);
        expect(dress('book').palette).not.toBe(dress('night').palette);
        expect(dress('book').palette.strongInk).not.toBe(dress('night').palette.strongInk);
    });

    it('Github is the distinct face-set', () => {
        expect(dress('github').faces).toBe(readme);
        expect(dress('github').faces).not.toBe(dress('book').faces);
    });

    it('every dress carries a full face-set and a prism theme', () => {
        (['book', 'github', 'night'] as const).forEach((d) => {
            const spec = dress(d);
            expect(typeof spec.faces.Heading).toBe('function');
            expect(typeof spec.faces.Body).toBe('function');
            expect(typeof spec.faces.Strong).toBe('function');
            expect(typeof spec.faces.InlineCode).toBe('function');
            expect(typeof spec.faces.Fence).toBe('function');
            expect(typeof spec.faces.Rule).toBe('function');
            expect(typeof spec.faces.DisplayMath).toBe('function');
            expect(typeof spec.faces.Link).toBe('function');
            expect(spec.palette.codeTheme).toBeTruthy();
            expect(palettes[d]).toBe(spec.palette);
        });
    });
});
