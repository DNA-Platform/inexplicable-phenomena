import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { $, $Particle, $Chemical } from '@/index';

// Vertical perspective — `look('up'|'down')` walks ONE live instance up and
// down its OWN prototype chain, rendering it through any ancestor's `view`
// ("revert to base view"). This is the vertical axis, orthogonal to the
// horizontal sibling-menu axis (`perspectives`/`reveal`). `look` lives on
// $Particle; $Chemical inherits it — so these tests prove it works identically
// whether the chain roots at $Particle or at $Chemical.

// ── A three-level $Particle chain ──
class PBase extends $Particle {
    label = 'x';
    view() { return <span className="v">base:{this.label}</span>; }
}
class PMid extends PBase {
    view() { return <span className="v">mid:{this.label}</span>; }
}
class PLeaf extends PMid {
    view() { return <span className="v">leaf:{this.label}</span>; }
}

// ── A three-level $Chemical chain, same shape ──
class CBase extends $Chemical {
    label = 'x';
    view() { return <span className="v">base:{this.label}</span>; }
}
class CMid extends CBase {
    view() { return <span className="v">mid:{this.label}</span>; }
}
class CLeaf extends CMid {
    view() { return <span className="v">leaf:{this.label}</span>; }
}

// Render a live instance through its CURRENT active view and read the text.
// $(instance) returns the instance's lifted Component; mount it as an element
// (calling it directly would invoke hooks outside React's render).
function paint(instance: any): string {
    const Comp = $(instance) as React.FC;
    const { container } = render(React.createElement(Comp));
    return container.querySelector('.v')!.textContent!;
}

// One parameterized suite, run for both roots — `look` must behave identically.
for (const [root, Leaf, Mid, Base] of [
    ['$Particle', PLeaf, PMid, PBase],
    ['$Chemical', CLeaf, CMid, CBase],
] as const) {
    describe(`look — vertical ancestry walk (chain rooted at ${root})`, () => {
        it('starts at the instance\'s own (most-derived) view', () => {
            expect(paint(new Leaf())).toBe('leaf:x');
            expect((new Leaf() as any).viewLevel).toBe(Leaf.name);
        });

        it('look("up") renders the parent\'s view', () => {
            const leaf = new Leaf();
            leaf.look('up');
            expect(paint(leaf)).toBe('mid:x');
            expect((leaf as any).viewLevel).toBe(Mid.name);
        });

        it('repeated up reverts to the base view, then clamps (no-op)', () => {
            const leaf = new Leaf();
            leaf.look('up');                    // → Mid
            leaf.look('up');                    // → Base
            expect(paint(leaf)).toBe('base:x');
            expect((leaf as any).viewLevel).toBe(Base.name);
            leaf.look('up');                    // clamp — stays at base
            leaf.look('up');                    // clamp again
            expect(paint(leaf)).toBe('base:x');
            expect((leaf as any).viewLevel).toBe(Base.name);
        });

        it('look("up") bottoms out at the highest USER view — never the framework base', () => {
            const leaf = new Leaf();
            leaf.look('up'); leaf.look('up'); leaf.look('up'); leaf.look('up');
            // Base.view is the most general user view; the framework view
            // ($Particle.toString / $Chemical.children) is never selectable.
            expect(paint(leaf)).toBe('base:x');
            expect((leaf as any).viewLevel).toBe(Base.name);
        });

        it('look("down") specializes back toward the actual class', () => {
            const leaf = new Leaf();
            leaf.look('up'); leaf.look('up');   // → Base
            leaf.look('down');                  // → Mid
            expect(paint(leaf)).toBe('mid:x');
            expect((leaf as any).viewLevel).toBe(Mid.name);
        });

        it('up-then-down round-trips to the same render', () => {
            const leaf = new Leaf();
            const before = paint(leaf);
            leaf.look('up');
            leaf.look('down');
            expect(paint(leaf)).toBe(before);   // back to leaf:x
            expect((leaf as any).viewLevel).toBe(Leaf.name);
        });

        it('look("down") at the actual class is a no-op', () => {
            const leaf = new Leaf();
            leaf.look('down');                  // already most-specific
            expect(paint(leaf)).toBe('leaf:x');
            leaf.look('down');                  // still a no-op
            expect(paint(leaf)).toBe('leaf:x');
            expect((leaf as any).viewLevel).toBe(Leaf.name);
        });

        it("look('up?'/'down?') reports the clamps for a breadcrumb/clamp UI", () => {
            const leaf = new Leaf();
            expect(leaf.look('up?')).toBe(true);    // can go more general
            expect(leaf.look('down?')).toBe(false); // already most specific
            leaf.look('up'); leaf.look('up');       // → Base
            expect(leaf.look('up?')).toBe(false);   // at the base
            expect(leaf.look('down?')).toBe(true);
        });
    });
}

// The LIVE scenario the app exercises, and the regression for the cross-chemical
// repaint bug: a consumer chemical mounts ONCE and stays mounted, holding the
// walked instance as a BONDED CHILD and reading its viewLevel/canLook in its own
// view. Clicking look() must repaint that same mounted consumer — the rendered
// instance AND the breadcrumb (viewLevel) AND the clamp (canLook) — WITHOUT a
// fresh render(). A test that re-renders each time would falsely pass; this one
// holds the mount, so it fails unless the cursor is a scope-tracked reactive
// write that diffuses up the composition tree to the consumer.
describe('look — a once-mounted consumer repaints live (cross-chemical)', () => {
    class CBase2 extends $Chemical {
        label = 'x';
        view() { return <span className="v">base:{this.label}</span>; }
    }
    class CMid2 extends CBase2 {
        view() { return <span className="v">mid:{this.label}</span>; }
    }
    class CLeaf2 extends CMid2 {
        view() { return <span className="v">leaf:{this.label}</span>; }
    }

    class Inspector extends $Chemical {
        target!: any;
        Target!: React.FC;
        Inspector(target: any) { this.target = target; this.Target = $(target) as React.FC; }
        view() {
            return (
                <div>
                    <span className="level">{this.target.viewLevel}</span>
                    <span className="downable">{String(this.target.look('down?'))}</span>
                    <button title="up" onClick={() => { this.target.look('up'); }} />
                    <button title="down" onClick={() => { this.target.look('down'); }} />
                    <span className="stage">{React.createElement(this.Target)}</span>
                </div>
            );
        }
    }

    it('▲/▼ on a live mount move the rendered view, the breadcrumb, and the clamp', async () => {
        const I = $(Inspector);
        const Leaf$ = $(CLeaf2);
        const { container } = render(<I><Leaf$ /></I>);
        const level = () => container.querySelector('.level')!.textContent;
        const stage = () => container.querySelector('.v')!.textContent;
        const downable = () => container.querySelector('.downable')!.textContent;
        const up = () => container.querySelector('button[title="up"]')! as HTMLButtonElement;
        const down = () => container.querySelector('button[title="down"]')! as HTMLButtonElement;

        // Start: most-derived. The consumer reads it live.
        expect(level()).toBe('CLeaf2');
        expect(stage()).toBe('leaf:x');
        expect(downable()).toBe('false');                  // already most specific

        // ▲ — the SAME mounted consumer must repaint everything it read.
        await act(async () => { up().click(); });
        expect(level()).toBe('CMid2');
        expect(stage()).toBe('mid:x');
        expect(downable()).toBe('true');                   // can specialize now

        await act(async () => { up().click(); });
        expect(level()).toBe('CBase2');
        expect(stage()).toBe('base:x');

        // ▲ at the base is a no-op — nothing moves.
        await act(async () => { up().click(); });
        expect(level()).toBe('CBase2');
        expect(stage()).toBe('base:x');

        // ▼ back down — the live walk reverses.
        await act(async () => { down().click(); });
        expect(level()).toBe('CMid2');
        expect(stage()).toBe('mid:x');
    });
});

// A class with no own view override is simply not a selectable level — looking
// through it lands on the nearest ancestor that DOES override. (PSkip below
// adds no view, so the chain of user view-levels is still [PLeaf2, PBase2].)
describe('look — a non-overriding subclass is not a selectable level', () => {
    class PBase2 extends $Particle {
        label = 'q';
        view() { return <span className="v">base:{this.label}</span>; }
    }
    class PSkip extends PBase2 { /* no view override */ }
    class PLeaf2 extends PSkip {
        view() { return <span className="v">leaf:{this.label}</span>; }
    }

    it('walks past the gap straight to the base view', () => {
        const leaf = new PLeaf2();
        expect(paint(leaf)).toBe('leaf:q');
        leaf.look('up');                        // skips PSkip → PBase2
        expect(paint(leaf)).toBe('base:q');
        expect((leaf as any).viewLevel).toBe('PBase2');
        leaf.look('up');                        // clamp at base
        expect(paint(leaf)).toBe('base:q');
    });
});
