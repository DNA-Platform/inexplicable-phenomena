import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';
import { $reaction$ } from '@/implementation/symbols';

// `$Reaction.destroy()` deletes the chemical from the registry that `$lift`
// re-enters through. React can then re-render a component whose instance is
// gone — its state still remembers the cid the registry no longer has.
//
// `$lift` used to assert that lookup non-null and immediately set a property
// on the result, so the miss surfaced as "Cannot set properties of undefined
// (setting 'Symbol($Particle.update)')" — nondeterministically, and far from
// its cause. It was seen once in eight driver runs before it was found here.

class $Fragile extends $Chemical {
    view() { return <span>standing</span>; }
}

describe('$lift — an instance the registry has forgotten is rebuilt', () => {
    it('re-renders without throwing after its reaction was destroyed', () => {
        let live: any = null;
        class $Watched extends $Chemical {
            view() { live = this; return <span>standing</span>; }
        }
        const Watched = $($Watched);
        const { container, rerender } = render(<Watched />);
        expect(container.textContent).toContain('standing');
        expect(live).toBeTruthy();

        // exactly what a teardown does to the registry
        live[$reaction$].destroy();

        expect(() => rerender(<Watched />)).not.toThrow();
        expect(container.textContent).toContain('standing');
    });

    it('and the rebuilt instance still draws', () => {
        const Fragile = $($Fragile);
        const { container, rerender } = render(<Fragile />);
        rerender(<Fragile />);
        expect(container.textContent).toContain('standing');
    });
});
