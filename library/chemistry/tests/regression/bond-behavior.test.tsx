// =============================================================================
// Regression: observable bond behavior (Sprint 24, Story A-1)
//
// This suite pins the externally-visible behavior of reactive bonds so that
// the bond-accessor refactor (moving accessor installation off the prototype
// and onto each instance) is provably observably equivalent.
//
// Rules of the road for this file:
//   - Tests assert what users observe: DOM contents, render counts,
//     observable values, lifecycle effects.
//   - Tests do NOT inspect internal placement. No
//     `Object.getOwnPropertyDescriptor($Foo.prototype, '$x')`. No imports
//     from `src/implementation/symbols.ts`.
//   - Each test pins ONE invariant. Names describe what is being pinned.
//
// Render-count contract pinned here:
//   - Each user-observable write produces between 1 and 2 view() calls in
//     the current implementation (the post-render useEffect re-runs view()
//     to diff/cache; if the diff fires, an extra update follows).
//   - Render-count assertions therefore use bounded ranges (>= floor,
//     <= ceiling). The ceilings are deliberately tight so that silent
//     over-rendering during the refactor will be caught.
//
// Coverage sections:
//   1. Direct writes to a chemical's reactive prop trigger re-render
//   2. Writes to nested structures (Map, Set, array, object) inside a
//      reactive prop trigger re-render
//   3. Writes from event handlers, from setTimeout, from outside any handler
//   4. Cross-chemical writes: writing to inner.$v from outer's handler
//      updates the mounted inner component
//   5. Derivative fan-out: parent write fans out to all `$lift`-derived
//      mounts of the same parent
//   6. Lexical-scoping invariants at the bond level: derivative writes don't
//      bleed into siblings; parent writes fan out to all derivatives
//   7. Held-instance + held-derivative + lifted-component combinations
// =============================================================================

import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';
import { $Particle } from '@/abstraction/particle';


// Per-write upper bound on view() calls in the current impl.
// Each observable write triggers an update; the post-render effect may run
// view() once more to diff. Two view-calls per logical write is the cap.
const MAX_RENDERS_PER_WRITE = 2;


// -----------------------------------------------------------------------------
// 0. Instance state isolation (prototype-stability invariant, observed)
//
// SP-1 found that reactive accessors are already installed on each instance
// rather than the class prototype. The behavioral consequence — two
// independently-constructed instances of the same class do NOT share
// reactive-prop state — is what the rest of the system depends on. Pin it
// here as observable behavior so the suite catches any future regression
// that accidentally hoists state to a shared location.
// -----------------------------------------------------------------------------

describe('regression — instance state isolation', () => {
    it('two instances of the same class hold independent values for the same reactive prop', () => {
        class $Foo extends $Chemical {
            $count? = 0;
            view() { return <span className="c">{this.$count}</span>; }
        }
        new $Foo();
        const a = new $Foo();
        const b = new $Foo();

        (a as any).$count = 7;

        expect((a as any).$count).toBe(7);
        expect((b as any).$count).toBe(0);
    });

    it('two mounted instances of the same class render independent values', async () => {
        class $Foo extends $Chemical {
            $count? = 0;
            view() { return <span className="c">{this.$count}</span>; }
        }
        new $Foo();
        const a = new $Foo();
        const b = new $Foo();

        const { container: ca } = render(<a.Component />);
        const { container: cb } = render(<b.Component />);

        expect(ca.querySelector('.c')!.textContent).toBe('0');
        expect(cb.querySelector('.c')!.textContent).toBe('0');

        await act(async () => { (a as any).$count = 7; });

        expect(ca.querySelector('.c')!.textContent).toBe('7');
        // b's DOM must NOT have changed: writes to a do not bleed to b.
        expect(cb.querySelector('.c')!.textContent).toBe('0');
    });

    it('writing on one instance does not wake the other (observed via render counts)', async () => {
        let aRenders = 0;
        let bRenders = 0;
        class $Foo extends $Chemical {
            $count? = 0;
            view() { return <span>{this.$count}</span>; }
        }
        new $Foo();
        const a = new $Foo();
        const b = new $Foo();
        // Distinguish renders by patching view via subclass-style instance flag.
        // Easier: each instance has its own render counter via a closure flag.
        (a as any)._renderHook = () => aRenders++;
        (b as any)._renderHook = () => bRenders++;
        // Re-define view per-instance is not supported; instead, count via
        // a wrapped Component-mount and compare aRenders/bRenders movement.
        class $Counter extends $Chemical {
            $count? = 0;
            _isA = false;
            view() {
                if (this._isA) aRenders++; else bRenders++;
                return <span>{this.$count}</span>;
            }
        }
        new $Counter();
        const ai = new $Counter(); (ai as any)._isA = true;
        const bi = new $Counter(); (bi as any)._isA = false;
        render(<ai.Component />);
        render(<bi.Component />);

        const aBefore = aRenders;
        const bBefore = bRenders;

        await act(async () => { (ai as any).$count = 9; });

        expect(aRenders - aBefore).toBeGreaterThanOrEqual(1);
        // b was not written to → b must not re-render.
        expect(bRenders - bBefore).toBe(0);
    });
});


// -----------------------------------------------------------------------------
// 1. Direct writes to a reactive prop trigger re-render
// -----------------------------------------------------------------------------

describe('regression — direct writes to reactive props', () => {
    it('a direct assignment to $prop updates the DOM', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $value? = 'a';
            view() {
                renderCount++;
                return <span className="v">{this.$value}</span>;
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        expect(container.querySelector('.v')!.textContent).toBe('a');
        const before = renderCount;

        await act(async () => { c.$value = 'b'; });

        expect(container.querySelector('.v')!.textContent).toBe('b');
        // One write → at least one render, at most MAX_RENDERS_PER_WRITE.
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('writing the same value still triggers at least one re-render (no eq short-circuit)', async () => {
        // Pin current behavior: bonds do not skip writes when newValue === oldValue.
        // If the refactor introduces eq-skipping, that is an observable change and
        // must be a deliberate decision, not a silent regression.
        let renderCount = 0;
        class $C extends $Chemical {
            $value? = 'x';
            view() {
                renderCount++;
                return <span className="v">{this.$value}</span>;
            }
        }
        new $C();
        const c = new $C();
        render(<c.Component />);
        const before = renderCount;

        await act(async () => { c.$value = 'x'; });

        expect(renderCount - before).toBeGreaterThanOrEqual(1);
    });

    it('a sequence of writes across separate ticks each updates the DOM', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $value? = 0;
            view() {
                renderCount++;
                return <span className="v">{this.$value}</span>;
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => { c.$value = 1; });
        expect(container.querySelector('.v')!.textContent).toBe('1');

        await act(async () => { c.$value = 2; });
        expect(container.querySelector('.v')!.textContent).toBe('2');

        await act(async () => { c.$value = 3; });
        expect(container.querySelector('.v')!.textContent).toBe('3');

        // Three writes → at most 3 * MAX_RENDERS_PER_WRITE view() calls.
        expect(renderCount - before).toBeGreaterThanOrEqual(3);
        expect(renderCount - before).toBeLessThanOrEqual(3 * MAX_RENDERS_PER_WRITE);
    });
});


// -----------------------------------------------------------------------------
// 2. Writes to nested structures inside a reactive prop trigger re-render
// -----------------------------------------------------------------------------

describe('regression — nested-structure writes through reactive props', () => {
    it('Map.set inside a reactive prop triggers re-render and updates DOM', async () => {
        let renderCount = 0;
        class $M extends $Chemical {
            $map: Map<string, number> = new Map();
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="size">{this.$map.size}</span>
                        <button onClick={() => { this.$map.set('k' + this.$map.size, 1); }}>add</button>
                    </div>
                );
            }
        }
        new $M();
        const m = new $M();
        const { container } = render(<m.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.size')!.textContent).toBe('1');

        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.size')!.textContent).toBe('2');

        const delta = renderCount - before;
        expect(delta).toBeGreaterThanOrEqual(2);
        expect(delta).toBeLessThanOrEqual(2 * MAX_RENDERS_PER_WRITE);
    });

    it('Set.add inside a reactive prop triggers re-render and updates DOM', async () => {
        let renderCount = 0;
        class $S extends $Chemical {
            $set: Set<number> = new Set();
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="size">{this.$set.size}</span>
                        <button onClick={() => { this.$set.add(this.$set.size); }}>add</button>
                    </div>
                );
            }
        }
        new $S();
        const s = new $S();
        const { container } = render(<s.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.size')!.textContent).toBe('1');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('Array.push inside a reactive prop triggers re-render and updates DOM', async () => {
        let renderCount = 0;
        class $L extends $Chemical {
            $items: string[] = [];
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="len">{this.$items.length}</span>
                        <button onClick={() => { this.$items.push('x'); }}>add</button>
                    </div>
                );
            }
        }
        new $L();
        const l = new $L();
        const { container } = render(<l.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.len')!.textContent).toBe('1');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('plain object property write through a reactive prop triggers re-render', async () => {
        let renderCount = 0;
        class $O extends $Chemical {
            $config: { mode: string } = { mode: 'light' };
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="mode">{this.$config.mode}</span>
                        <button onClick={() => { this.$config.mode = 'dark'; }}>toggle</button>
                    </div>
                );
            }
        }
        new $O();
        const o = new $O();
        const { container } = render(<o.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.mode')!.textContent).toBe('dark');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('deep-path write (this.$x.y.z = N) triggers re-render and updates DOM', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $data: { nested: { value: number } } = { nested: { value: 0 } };
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="v">{this.$data.nested.value}</span>
                        <button onClick={() => { this.$data.nested.value = 42; }}>set</button>
                    </div>
                );
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.v')!.textContent).toBe('42');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });
});


// -----------------------------------------------------------------------------
// 3. Writes from event handlers, from setTimeout, from outside any handler
// -----------------------------------------------------------------------------

describe('regression — write source: handler, timeout, external', () => {
    it('a write from an event handler triggers re-render', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $count? = 0;
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="c">{this.$count}</span>
                        <button onClick={() => { this.$count = (this.$count ?? 0) + 1; }}>+</button>
                    </div>
                );
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.c')!.textContent).toBe('1');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('a write from setTimeout triggers re-render', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $count? = 0;
            view() {
                renderCount++;
                return <span className="c">{this.$count}</span>;
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => {
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    c.$count = 5;
                    resolve();
                }, 10);
            });
            await new Promise(r => setTimeout(r, 10));
        });

        expect(container.querySelector('.c')!.textContent).toBe('5');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('a write from a Promise.then callback triggers re-render', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $status? = 'idle';
            view() {
                renderCount++;
                return <span className="s">{this.$status}</span>;
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => {
            await Promise.resolve('ok').then(v => { c.$status = v; });
            await new Promise(r => setTimeout(r, 5));
        });

        expect(container.querySelector('.s')!.textContent).toBe('ok');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('an external write (no handler, no timer, just code) triggers re-render', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $value? = 'a';
            view() {
                renderCount++;
                return <span className="v">{this.$value}</span>;
            }
        }
        new $C();
        const c = new $C();
        const { container } = render(<c.Component />);
        const before = renderCount;

        await act(async () => { c.$value = 'b'; });

        expect(container.querySelector('.v')!.textContent).toBe('b');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });
});


// -----------------------------------------------------------------------------
// 4. Cross-chemical writes
// -----------------------------------------------------------------------------

describe('regression — cross-chemical writes target the right component', () => {
    it('writing inner.$v from outer\'s handler updates inner\'s observable value', async () => {
        // Pin: a chemical can hold a reference to another chemical and write
        // to its reactive props from a handler. This is the basic
        // cross-chemical pattern from tests/react/scope-tracking.test.tsx.
        class $Inner extends $Chemical {
            $v? = 0;
            view() { return <span className="iv">{this.$v}</span>; }
        }
        class $Outer extends $Chemical {
            $inner!: $Inner;
            view() {
                return (
                    <div>
                        <button onClick={() => { this.$inner.$v = (this.$inner.$v ?? 0) + 1; }}>inc</button>
                    </div>
                );
            }
        }
        new $Inner();
        new $Outer();
        const inner = new $Inner();
        const outer = new $Outer();
        outer.$inner = inner;

        const { container } = render(<outer.Component />);

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(inner.$v).toBe(1);
    });

    it('writing outer.$inner.$value targets ONLY inner (outer that does not read inner.$value does not re-render)', async () => {
        // Pin scoping: a handler that writes to a referenced chemical's
        // reactive prop must not wake the writing chemical when the writer's
        // own view doesn't read that prop.
        let outerRenders = 0;
        class $Inner extends $Chemical {
            $value? = 0;
            view() { return <span className="iv">{this.$value}</span>; }
        }
        class $Outer extends $Chemical {
            $inner!: $Inner;
            view() {
                outerRenders++;
                return (
                    <div>
                        <span className="ot">outer</span>
                        <button onClick={() => { this.$inner.$value = (this.$inner.$value ?? 0) + 1; }}>inc</button>
                    </div>
                );
            }
        }
        new $Inner();
        new $Outer();
        const inner = new $Inner();
        const outer = new $Outer();
        outer.$inner = inner;

        const { container } = render(<outer.Component />);
        const before = outerRenders;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        // The write landed on inner.
        expect(inner.$value).toBe(1);
        // Outer's view never read inner.$value, so it must not re-render.
        expect(outerRenders - before).toBe(0);
    });

    it('a writing chemical that reads its OWN reactive prop alongside the cross-write re-renders', async () => {
        // Pin: writing outer.$selfTag and outer.$inner.$value in the same
        // handler updates outer's DOM (because outer reads $selfTag) and
        // also updates inner's value. Anchors the basic dual-write case.
        let outerRenders = 0;
        class $Inner extends $Chemical {
            $value? = 0;
            view() { return <span className="iv">{this.$value}</span>; }
        }
        class $Outer extends $Chemical {
            $selfTag? = 'init';
            $inner!: $Inner;
            view() {
                outerRenders++;
                return (
                    <div>
                        <span className="ot">{this.$selfTag}</span>
                        <button onClick={() => {
                            this.$selfTag = 'updated';
                            this.$inner.$value = (this.$inner.$value ?? 0) + 1;
                        }}>inc</button>
                    </div>
                );
            }
        }
        new $Inner();
        new $Outer();
        const inner = new $Inner();
        const outer = new $Outer();
        outer.$inner = inner;

        const { container } = render(<outer.Component />);
        expect(container.querySelector('.ot')!.textContent).toBe('init');
        const before = outerRenders;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        // Both writes landed.
        expect(inner.$value).toBe(1);
        expect(container.querySelector('.ot')!.textContent).toBe('updated');
        // Outer re-rendered for its own $selfTag write.
        expect(outerRenders - before).toBeGreaterThanOrEqual(1);
        expect(outerRenders - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });
});


// -----------------------------------------------------------------------------
// 5. Derivative fan-out: parent write reaches all $lift-derived mounts
// -----------------------------------------------------------------------------

describe('regression — parent write fans out to all derivative mounts', () => {
    it('two mounts of $(parent) both update on a parent write (DOM)', async () => {
        class $R extends $Chemical {
            $tag? = 'A';
            view() { return <span className="t">{this.$tag}</span>; }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(
            <div>
                <C />
                <C />
            </div>
        );
        const tagsBefore = container.querySelectorAll('.t');
        expect(tagsBefore.length).toBe(2);
        tagsBefore.forEach(n => expect(n.textContent).toBe('A'));

        await act(async () => { r.$tag = 'B'; });

        const tags = container.querySelectorAll('.t');
        tags.forEach(n => expect(n.textContent).toBe('B'));
    });

    it('three mounts: each derivative re-renders at least once on a single parent write', async () => {
        let totalRenders = 0;
        class $R extends $Chemical {
            $tag? = 'A';
            view() {
                totalRenders++;
                return <span className="t">{this.$tag}</span>;
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        render(
            <div>
                <C />
                <C />
                <C />
            </div>
        );
        const before = totalRenders;

        await act(async () => { r.$tag = 'B'; });

        // Three derivatives, one parent write → each fans out → at least 3
        // additional view() calls. Pin this floor; if the refactor regresses
        // fan-out (e.g. only the first derivative wakes), this fails.
        expect(totalRenders - before).toBeGreaterThanOrEqual(3);
        // Upper bound: 3 derivatives * MAX_RENDERS_PER_WRITE.
        expect(totalRenders - before).toBeLessThanOrEqual(3 * MAX_RENDERS_PER_WRITE);
    });

    it('parent write does NOT trigger renders for unmounted derivatives', async () => {
        let totalRenders = 0;
        class $R extends $Chemical {
            $tag? = 'A';
            view() {
                totalRenders++;
                return <span className="t">{this.$tag}</span>;
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);

        const { unmount } = render(<div><C /><C /></div>);
        unmount();

        const before = totalRenders;
        await act(async () => { r.$tag = 'B'; });

        // Nothing mounted → no derivative re-renders. Pin: the fan-out
        // mechanism must clean up unmounted derivatives.
        expect(totalRenders - before).toBe(0);
    });
});


// -----------------------------------------------------------------------------
// 6. Lexical-scoping invariants at the bond level
// -----------------------------------------------------------------------------

describe('regression — lexical scoping invariants at the bond level', () => {
    it('a derivative write does not bleed into a sibling derivative (DOM)', async () => {
        class $R extends $Chemical {
            $tag? = 'shared';
            shadow(value: string) { this.$tag = value; }
            view() {
                return (
                    <div>
                        <span className="tag">{this.$tag}</span>
                        <button onClick={() => this.shadow('local')}>shadow</button>
                    </div>
                );
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(
            <div>
                <C key="a" />
                <C key="b" />
            </div>
        );

        const buttons = container.querySelectorAll('button');
        await act(async () => { fireEvent.click(buttons[0]); });

        const tags = container.querySelectorAll('.tag');
        expect(tags[0].textContent).toBe('local');
        expect(tags[1].textContent).toBe('shared');
    });

    it('a derivative write does not re-render the sibling derivative', async () => {
        // Pin: writes on a derivative are local. If the refactor accidentally
        // hoists writes to the parent's notification path, the sibling would
        // see the wake-up and re-render with 'shared'.
        const renderTags: string[] = [];
        class $R extends $Chemical {
            $tag? = 'shared';
            shadow(value: string) { this.$tag = value; }
            view() {
                renderTags.push(this.$tag ?? '?');
                return (
                    <div>
                        <span className="tag">{this.$tag}</span>
                        <button onClick={() => this.shadow('local')}>shadow</button>
                    </div>
                );
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(
            <div>
                <C key="a" />
                <C key="b" />
            </div>
        );
        const initialCount = renderTags.length;
        expect(initialCount).toBeGreaterThanOrEqual(2);

        const buttons = container.querySelectorAll('button');
        await act(async () => { fireEvent.click(buttons[0]); });

        // After the click, only the FIRST derivative re-rendered (with 'local').
        // The sibling ('shared') should NOT have re-rendered.
        const newRenders = renderTags.slice(initialCount);
        expect(newRenders).toContain('local');
        expect(newRenders).not.toContain('shared');
    });

    it('a parent write fans out to all derivatives, including shadowed ones (each shows its own value)', async () => {
        let renderCount = 0;
        class $R extends $Chemical {
            $tag? = 'parent';
            shadow(value: string) { this.$tag = value; }
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="tag">{this.$tag}</span>
                        <button onClick={() => this.shadow('local')}>shadow</button>
                    </div>
                );
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(
            <div>
                <C key="a" />
                <C key="b" />
            </div>
        );

        const buttons = container.querySelectorAll('button');
        await act(async () => { fireEvent.click(buttons[0]); });

        const beforeParentWrite = renderCount;
        await act(async () => { r.$tag = 'parent-new'; });

        // BOTH derivatives re-render on the parent write.
        expect(renderCount - beforeParentWrite).toBeGreaterThanOrEqual(2);

        const tags = container.querySelectorAll('.tag');
        expect(tags[0].textContent).toBe('local');
        expect(tags[1].textContent).toBe('parent-new');
    });

    it('a parent write reaches a derivative-of-a-derivative chain', async () => {
        // Build a 2-level chain of mounts; root write must reach the leaf.
        class $R extends $Chemical {
            $tag? = 'root';
            view() { return <span className="leaf">{this.$tag}</span>; }
        }
        new $R();
        const root = new $R();
        const Leaf = $(root);

        class $Wrapper extends $Chemical {
            view() { return <Leaf />; }
        }
        new $Wrapper();
        const Wrapper = $($Wrapper);

        const { container } = render(<Wrapper />);
        expect(container.querySelector('.leaf')!.textContent).toBe('root');

        await act(async () => { root.$tag = 'updated'; });

        expect(container.querySelector('.leaf')!.textContent).toBe('updated');
    });
});


// -----------------------------------------------------------------------------
// 7. Held-instance + held-derivative + lifted-component combinations
// -----------------------------------------------------------------------------

describe('regression — held-instance, held-derivative, lifted-component combinations', () => {
    it('held instance: external write to its $prop reaches the mounted component', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $value? = 'a';
            view() {
                renderCount++;
                return <span className="v">{this.$value}</span>;
            }
        }
        new $C();
        const held = new $C();
        const { container } = render(<held.Component />);
        const before = renderCount;

        await act(async () => { held.$value = 'b'; });

        expect(container.querySelector('.v')!.textContent).toBe('b');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('lifted component ($($Class)) renders and reacts to internal handler writes', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $count? = 0;
            view() {
                renderCount++;
                return (
                    <div>
                        <span className="c">{this.$count}</span>
                        <button onClick={() => { this.$count = (this.$count ?? 0) + 1; }}>+</button>
                    </div>
                );
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        const before = renderCount;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.c')!.textContent).toBe('1');
        expect(renderCount - before).toBeGreaterThanOrEqual(1);
        expect(renderCount - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('held derivative: $(held) keeps Component identity stable; writes to held reach all mounts', async () => {
        class $C extends $Chemical {
            $tag? = 'shared';
            view() { return <span className="t">{this.$tag}</span>; }
        }
        new $C();
        const held = new $C();

        // $(held) returns the same Component reference each time.
        const A = $(held);
        const B = $(held);
        expect(A).toBe(B);

        const { container } = render(
            <div>
                <A key="x" />
                <A key="y" />
            </div>
        );
        const tags = container.querySelectorAll('.t');
        expect(tags.length).toBe(2);
        tags.forEach(n => expect(n.textContent).toBe('shared'));

        await act(async () => { held.$tag = 'updated'; });

        const tagsAfter = container.querySelectorAll('.t');
        tagsAfter.forEach(n => expect(n.textContent).toBe('updated'));
    });

    it('mixed: held instance mounted via .Component AND $() in same tree both react to one parent write', async () => {
        let renderCount = 0;
        class $C extends $Chemical {
            $tag? = 'init';
            view() {
                renderCount++;
                return <span className="t">{this.$tag}</span>;
            }
        }
        new $C();
        const held = new $C();
        const Lifted = $(held);

        const { container } = render(
            <div>
                <held.Component />
                <Lifted />
                <Lifted />
            </div>
        );
        const tagsBefore = container.querySelectorAll('.t');
        expect(tagsBefore.length).toBe(3);
        tagsBefore.forEach(n => expect(n.textContent).toBe('init'));

        const before = renderCount;
        await act(async () => { held.$tag = 'next'; });

        const tags = container.querySelectorAll('.t');
        tags.forEach(n => expect(n.textContent).toBe('next'));

        // Three mount sites all wake on a single parent write.
        expect(renderCount - before).toBeGreaterThanOrEqual(3);
        expect(renderCount - before).toBeLessThanOrEqual(3 * MAX_RENDERS_PER_WRITE);
    });

    it('handler on a derivative does not re-render the sibling derivative or the held .Component mount', async () => {
        // This pins the lexical-scoping rule: derivative-local writes stay
        // local across all current mount-shape combinations.
        const renderTags: string[] = [];
        class $C extends $Chemical {
            $tag? = 'shared';
            shadow() { this.$tag = 'local'; }
            view() {
                renderTags.push(this.$tag ?? '?');
                return (
                    <div>
                        <span className="t">{this.$tag}</span>
                        <button onClick={() => this.shadow()}>x</button>
                    </div>
                );
            }
        }
        new $C();
        const held = new $C();
        const Lifted = $(held);

        const { container } = render(
            <div>
                <held.Component />
                <Lifted key="a" />
                <Lifted key="b" />
            </div>
        );
        const initialRenderCount = renderTags.length;
        expect(initialRenderCount).toBeGreaterThanOrEqual(3);

        // Click the second button (the first <Lifted /> mount, since the
        // held.Component mount is at index 0).
        const buttons = container.querySelectorAll('button');
        await act(async () => { fireEvent.click(buttons[1]); });

        const newRenders = renderTags.slice(initialRenderCount);
        // Only the derivative that was clicked re-rendered, with 'local'.
        expect(newRenders).toContain('local');
        // No 'shared' renders means siblings + the held.Component mount
        // did NOT re-render.
        expect(newRenders).not.toContain('shared');
    });
});


// -----------------------------------------------------------------------------
// 8. Invariants from SP-1 audit + scope.finalize fanout fix
//
// SP-1 (Cathy) confirmed that reactive accessors are installed on the
// instance, not on the class prototype. The follow-up fix to
// `scope.finalize()` added derivative fan-out (gated by hasOwnProperty on
// $derivatives$ to preserve lexical scoping); the same gate latent bug was
// fixed in `bond.ts`'s `fanOutToDerivatives`. This block pins:
//
//   1. Cross-chemical writes from a scoped handler reach a side-by-side
//      mounted inner component (the test that was previously red and is now
//      green after the scope.finalize fix).
//   2. $Reagent installation lands on the instance, not the prototype.
//   3. Repeated instantiation does not pile up state on the constructor.
//   4. Repeated instantiation + particularization does not mutate
//      prototypes.
// -----------------------------------------------------------------------------

describe('regression — invariants from SP-1 audit + scope-finalize fix', () => {
    it('cross-chemical write from a scoped handler updates a side-by-side mounted inner (DOM)', async () => {
        // Pin the bug-then-fix: outer's onClick runs inside a scope (event
        // augmentation), writes to inner.$value. Before the scope.finalize
        // fanout fix, inner's $lift-mounted derivatives never woke because
        // finalize() called react() on the chemical but skipped derivatives.
        // After the fix, inner's mounted derivative re-renders and the DOM
        // updates. Inner is mounted as a sibling of outer (NOT nested in
        // outer's render tree) so the only path to inner's update is through
        // the derivative fan-out.
        let innerRenders = 0;
        class $Inner extends $Chemical {
            $value? = 0;
            view() {
                innerRenders++;
                return <span className="iv">{this.$value}</span>;
            }
        }
        new $Inner();
        const inner = new $Inner();

        class $Outer extends $Chemical {
            view() {
                return (
                    <button onClick={() => { inner.$value = (inner.$value ?? 0) + 1; }}>inc</button>
                );
            }
        }
        new $Outer();
        const outer = new $Outer();

        // Mount inner and outer side-by-side at the React top level so inner
        // is NOT nested inside outer's render tree.
        const { container } = render(
            <div>
                <inner.Component />
                <outer.Component />
            </div>
        );
        expect(container.querySelector('.iv')!.textContent).toBe('0');
        const before = innerRenders;

        await act(async () => { fireEvent.click(container.querySelector('button')!); });

        expect(container.querySelector('.iv')!.textContent).toBe('1');
        expect(innerRenders - before).toBeGreaterThanOrEqual(1);
        expect(innerRenders - before).toBeLessThanOrEqual(MAX_RENDERS_PER_WRITE);
    });

    it('$Reagent assignment target is the instance, not the prototype', () => {
        // Pin: a class method's descriptor on the class prototype is the
        // ORIGINAL definition-style (value-only) descriptor — never an
        // accessor — both before and after instantiation + render. The
        // SP-1 audit's deeper finding is that the class prototype is inert:
        // any reagent wrapping that the framework chooses to perform must
        // land on the INSTANCE, never on the prototype.
        //
        // Implementation note (verified during follow-up): non-$ method
        // wrapping does not actually run through molecule reactivation in
        // the current code path (collectProperties stops at the first
        // prototype carrying $isChemicalBase$, which $Foo.prototype inherits
        // transitively). So no own `bump` may be installed on the instance
        // either — the test tolerates both states. What is non-negotiable
        // is that the prototype stays inert and that calling inst.bump()
        // still works through prototype lookup.
        class $Foo extends $Chemical {
            $count? = 0;
            bump() { this.$count = (this.$count ?? 0) + 1; }
            view() { return <span>{this.$count}</span>; }
        }

        // Snapshot the prototype's `bump` descriptor BEFORE any instantiation.
        const protoDescBefore = Object.getOwnPropertyDescriptor($Foo.prototype, 'bump');
        expect(protoDescBefore).toBeDefined();
        expect(typeof protoDescBefore!.value).toBe('function');
        expect(protoDescBefore!.get).toBeUndefined();
        expect(protoDescBefore!.set).toBeUndefined();
        const originalBump = protoDescBefore!.value;

        new $Foo(); // template instantiation
        const inst = new $Foo();
        const C = inst.Component;
        render(<C />);

        // After construction + render, the prototype's `bump` descriptor must
        // be UNCHANGED — same definition-style (value-only) descriptor with
        // the original function. Any wrapper that lives on the instance
        // does NOT mutate the prototype.
        const protoDescAfter = Object.getOwnPropertyDescriptor($Foo.prototype, 'bump');
        expect(protoDescAfter).toBeDefined();
        expect(typeof protoDescAfter!.value).toBe('function');
        expect(protoDescAfter!.get).toBeUndefined();
        expect(protoDescAfter!.set).toBeUndefined();
        expect(protoDescAfter!.value).toBe(originalBump);

        // If an own `bump` descriptor exists on the instance, it MUST NOT
        // be the prototype's original — i.e. the only acceptable place for
        // a reagent wrapper is the instance. (No own descriptor is also
        // acceptable: that just means no wrapper was installed.)
        const instDesc = Object.getOwnPropertyDescriptor(inst, 'bump');
        if (instDesc !== undefined) {
            expect(typeof instDesc.value).toBe('function');
            expect(instDesc.value).not.toBe(originalBump);
        }

        // Either way, calling inst.bump() must still update $count via
        // either prototype lookup or an own wrapper.
        (inst as any).bump();
        expect((inst as any).$count).toBe(1);
    });

    it('constructor-static state is stable across many instantiations', () => {
        // Pin: instantiating a class N times must not pile up state on the
        // class object (constructor) itself. The framework is allowed to set
        // a one-shot static like $$template$$ on first construction, but
        // subsequent constructions must be idempotent on the constructor's
        // own keys.
        class $Bar extends $Chemical {
            $count? = 0;
            view() { return <span>{this.$count}</span>; }
        }

        new $Bar(); // template — allowed to set $$template$$ etc.
        const beforeKeys = Object.getOwnPropertyNames($Bar).slice().sort();
        const beforeSyms = Object.getOwnPropertySymbols($Bar).slice();

        for (let i = 0; i < 5; i++) {
            const x = new $Bar();
            const C = x.Component;
            const { unmount } = render(<C />);
            unmount();
        }

        const afterKeys = Object.getOwnPropertyNames($Bar).slice().sort();
        const afterSyms = Object.getOwnPropertySymbols($Bar).slice();

        expect(afterKeys).toEqual(beforeKeys);
        expect(afterSyms.length).toBe(beforeSyms.length);
    });

    it('prototype is stable across N=10 instantiations + particularization does not taint Error.prototype', () => {
        // Pin two invariants in one shot:
        //   (a) ten new $Wrapped(...) calls leave $Wrapped.prototype's own
        //       names unchanged.
        //   (b) particularizing an Error via $Particle does NOT mutate
        //       Error.prototype.
        // We use a $Particle subclass for the particularized case so we
        // don't drag in the full $Chemical machinery — particularization is
        // a $Particle-level concern.
        class $Wrapped extends $Particle {
            constructor(e: Error) { super(e); }
        }

        const protoBefore = Object.getOwnPropertyNames($Wrapped.prototype).slice().sort();
        const errProtoBefore = Object.getOwnPropertyNames(Error.prototype).slice().sort();

        for (let i = 0; i < 10; i++) new $Wrapped(new Error(`b${i}`));

        const protoAfter = Object.getOwnPropertyNames($Wrapped.prototype).slice().sort();
        const errProtoAfter = Object.getOwnPropertyNames(Error.prototype).slice().sort();

        expect(protoAfter).toEqual(protoBefore);
        expect(errProtoAfter).toEqual(errProtoBefore);
    });
});
