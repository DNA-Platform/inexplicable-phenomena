import { describe, it, expect } from 'vitest';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// =============================================================================
// `$(Component,$)` — what stands behind a component.
//
// A component is a face. The chemical is the thing wearing it. The
// representative in the LAST position asks for the thing rather than the face.
//
// This form took the job the bare `$(Component)` used to do, because the bare
// form now answers a different question: not "what is behind this" but "what
// should I render here". The two are easy to confuse, so the promises below
// state the difference rather than assume it.
// =============================================================================

class $Counted extends $Chemical {
    count = 42;
    view() { return <span>{this.count}</span>; }
}

class $Recounted extends $Counted {
    override count = 7;
}

describe('$(Component,$) — what stands behind a component', () => {
    it('gives back the chemical the component was made from', () => {
        const Counted = $($Counted);
        expect($(Counted, $)).toBeInstanceOf($Counted);
    });

    it('gives back the VERY instance, when the component was made from one', () => {
        const held = new $Counted();
        held.count = 99;
        expect($($(held), $)).toBe(held);
        expect($($(held), $).count).toBe(99);
    });

    it('does NOT resolve first — you named a component, so you get THAT component s chemical', () => {
        const Counted = $($Counted);
        const Recounted = $($Recounted);
        const Scope = $($, Counted);
        $(Scope, Counted)(Recounted);

        // A registration is in force for Counted inside Scope. Asking what
        // stands behind Counted still answers Counted — the question was about
        // the component you named, not about what would be drawn in its place.
        expect($(Counted, $)).toBe((Counted as any).$chemical);
        expect($(Counted, $)).not.toBe((Recounted as any).$chemical);
    });

    it('and the bare form answers a component, never a chemical', () => {
        const Counted = $($Counted);
        expect($(Counted)).toBe(Counted);
        expect($(Counted)).not.toBe((Counted as any).$chemical);
    });
});
