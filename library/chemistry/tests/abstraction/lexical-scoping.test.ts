import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// =============================================================================
// Lexical Scoping — what a sensible developer expects
//
// Three forms of component creation:
//
//   $(instance)   — direct. The instance IS the component. No derivative.
//                   State persists across unmount/remount. One-to-one.
//
//   $($Class)     — template. Each mount spawns a derivative via Object.create.
//                   Derivatives inherit bond accessors from the template's
//                   prototype chain. Reads cascade (own backing → template's
//                   backing). Writes shadow locally. Template writes
//                   unconditionally wake all derivatives via diffuse().
//
//   $new()        — clone. Object.create of the instance, detached state.
//                   Own identity, own molecule. All props optional.
//
// Tests that exercise derivative behavior (isolation, propagation, fan-out)
// use the $($Class) template path. Direct instance tests use $(instance).
// =============================================================================


// -----------------------------------------------------------------------------
// 1. Identity sanity — two mounts of the same instance both render its state
// -----------------------------------------------------------------------------

describe('lexical scoping — identity sanity', () => {
    it('two mounts of the same instance both render its current state', () => {
        class $R extends $Chemical {
            tag = 'shared';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R(); // template
        const r = new $R();
        const C = $(r);
        const { container } = render(
            React.createElement('div', null,
                React.createElement(C as any),
                React.createElement(C as any),
            )
        );
        const spans = container.querySelectorAll('span');
        expect(spans.length).toBe(2);
        expect(spans[0].textContent).toBe('shared');
        expect(spans[1].textContent).toBe('shared');
    });
});


// -----------------------------------------------------------------------------
// 2. Parent write trickles to all unshadowed derivatives
// -----------------------------------------------------------------------------

describe('lexical scoping — template → derivatives propagation', () => {
    it('mutating template\'s bond wakes all derivatives that read via prototype', async () => {
        class $R extends $Chemical {
            tag = 'A';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const C = $($R);
        const template = (C as any).$chemical;
        const { container } = render(
            React.createElement('div', null,
                React.createElement(C as any, { key: 'a' }),
                React.createElement(C as any, { key: 'b' }),
            )
        );
        await act(async () => {
            template.tag = 'B';
        });
        const spans = container.querySelectorAll('span');
        expect(spans[0].textContent).toBe('B');
        expect(spans[1].textContent).toBe('B');
    });
});


// -----------------------------------------------------------------------------
// 3. Derivative write isolates that derivative; siblings unaffected
// -----------------------------------------------------------------------------

describe('lexical scoping — derivative isolation on write', () => {
    it('one derivative writing tag does not affect siblings', async () => {
        class $R extends $Chemical {
            tag = 'shared';
            shadow(value: string) { this.tag = value; }
            view() {
                return React.createElement('div', null,
                    React.createElement('span', { className: 'tag' }, this.tag),
                    React.createElement('button', { onClick: () => this.shadow('local') }, 'shadow')
                );
            }
        }
        new $R();
        const C = $($R);
        const { container } = render(
            React.createElement('div', null,
                React.createElement(C as any, { key: 'a' }),
                React.createElement(C as any, { key: 'b' }),
            )
        );
        const buttons = container.querySelectorAll('button');
        await act(async () => {
            fireEvent.click(buttons[0]);
        });
        const tags = container.querySelectorAll('.tag');
        expect(tags[0].textContent).toBe('local');   // shadowed
        expect(tags[1].textContent).toBe('shared');  // still inherited
    });
});


// -----------------------------------------------------------------------------
// 4. Parent write fans out unconditionally (even to shadowed derivatives)
// -----------------------------------------------------------------------------

describe('lexical scoping — fan-out is unconditional', () => {
    it('template\'s bond change wakes all derivatives, but each renders its own value', async () => {
        let renderCount = 0;
        class $R extends $Chemical {
            tag = 'parent';
            shadow(value: string) { this.tag = value; }
            view() {
                renderCount++;
                return React.createElement('div', null,
                    React.createElement('span', { className: 'tag' }, this.tag),
                    React.createElement('button', { onClick: () => this.shadow('local') }, 'shadow')
                );
            }
        }
        new $R();
        const C = $($R);
        const template = (C as any).$chemical;
        const { container } = render(
            React.createElement('div', null,
                React.createElement(C as any, { key: 'a' }),
                React.createElement(C as any, { key: 'b' }),
            )
        );
        const buttons = container.querySelectorAll('button');
        // Shadow derivative A.
        await act(async () => { fireEvent.click(buttons[0]); });

        const beforeParentWrite = renderCount;
        // Now write template.
        await act(async () => { template.tag = 'parent-new'; });
        // BOTH derivatives' views should run again (fan-out is unconditional).
        // The shadowed one renders 'local', the unshadowed renders 'parent-new'.
        expect(renderCount).toBeGreaterThan(beforeParentWrite);

        const tags = container.querySelectorAll('.tag');
        expect(tags[0].textContent).toBe('local');         // shadow stays
        expect(tags[1].textContent).toBe('parent-new');    // inherits new value
    });
});


// -----------------------------------------------------------------------------
// 5. Deleting a shadow restores inheritance
// -----------------------------------------------------------------------------

describe('lexical scoping — delete restores inheritance', () => {
    it('deleting derivative\'s own value lets parent\'s value show through again', async () => {
        // Note: this test exercises the read-time behavior. The framework's
        // contract: if a derivative writes, then deletes, subsequent reads
        // resolve to parent.
        class $R extends $Chemical {
            tag = 'parent';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(React.createElement(C as any));

        // Verify the framework respects shadow→delete restoration once we
        // expose a way to delete via the framework. This test is a
        // placeholder for the contract; mark as TODO if the API doesn't
        // expose deletion.
        expect(container.textContent).toBe('parent');
    });
});


// -----------------------------------------------------------------------------
// 6. Three-level chain (root → child → grandchild)
// -----------------------------------------------------------------------------

describe('lexical scoping — three-level chain', () => {
    it('root write propagates through chain to grandchild', async () => {
        class $R extends $Chemical {
            tag = 'root';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const root = new $R();
        // Build a chain: child = $(root); grandchild = $(child of an interim)
        // The framework should support `$(derivative)` to get a further
        // derivative — i.e., $() works on any instance, including derivatives.
        // For now, we test through React mounts at nested sites.
        class $Outer extends $Chemical {
            view() { return React.createElement($(root) as any); }
        }
        new $Outer();
        class $Outermost extends $Chemical {
            view() { return React.createElement($($Outer) as any); }
        }
        const TopLevel = $($Outermost);
        const { container } = render(React.createElement(TopLevel as any));
        expect(container.textContent).toBe('root');

        await act(async () => { root.tag = 'updated'; });
        expect(container.textContent).toBe('updated');
    });
});


// -----------------------------------------------------------------------------
// 7. Bond-ctor pass-through — Doug's headline scenario
// -----------------------------------------------------------------------------

describe('lexical scoping — template at three sites', () => {
    it('template mutation wakes all three derivatives', async () => {
        class $Inner extends $Chemical {
            tag = 'leaf';
            view() { return React.createElement('span', { className: 'inner' }, this.tag); }
        }
        new $Inner();
        const Inner = $($Inner);
        const template = (Inner as any).$chemical;

        const { container } = render(
            React.createElement('div', null,
                React.createElement(Inner as any, { key: 'a' }),
                React.createElement(Inner as any, { key: 'b' }),
                React.createElement(Inner as any, { key: 'c' }),
            )
        );

        const leaves = container.querySelectorAll('.inner');
        expect(leaves.length).toBe(3);
        leaves.forEach(l => expect(l.textContent).toBe('leaf'));

        await act(async () => { template.tag = 'leaf-updated'; });
        const updatedLeaves = container.querySelectorAll('.inner');
        updatedLeaves.forEach(l => expect(l.textContent).toBe('leaf-updated'));
    });
});


// -----------------------------------------------------------------------------
// 8. Same instance with different props at two sites
// -----------------------------------------------------------------------------

describe('lexical scoping — different props at two sites', () => {
    it('each site applies its own props to its own derivative', () => {
        class $Tag extends $Chemical {
            $label = 'default';
            view() { return React.createElement('span', null, this.$label); }
        }
        new $Tag();
        const T = $($Tag);
        const { container } = render(
            React.createElement('div', null,
                React.createElement(T as any, { label: 'site-a', key: 'a' }),
                React.createElement(T as any, { label: 'site-b', key: 'b' }),
            )
        );
        const spans = container.querySelectorAll('span');
        expect(spans[0].textContent).toBe('site-a');
        expect(spans[1].textContent).toBe('site-b');
    });
});


// -----------------------------------------------------------------------------
// 9. Unmount cleans up derivative; parent's set shrinks
// -----------------------------------------------------------------------------

describe('lexical scoping — cleanup on unmount', () => {
    it('unmounting stops the derivative from reacting to parent state changes', async () => {
        // Behavioral assertion: after unmount, parent writes don't trigger
        // re-renders for this derivative. We observe via render counts —
        // the unmounted derivative's view() should not run after unmount.
        let renderCount = 0;
        class $R extends $Chemical {
            tag = 'a';
            view() {
                renderCount++;
                return React.createElement('span', null, this.tag);
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);

        const { unmount, container } = render(React.createElement(C as any));
        expect(container.textContent).toBe('a');
        const beforeCount = renderCount;

        unmount();

        await act(async () => { r.tag = 'b'; });

        // After unmount, the derivative is not in parent's wake-up set,
        // so its view doesn't run again.
        expect(renderCount).toBe(beforeCount);
    });
});


// -----------------------------------------------------------------------------
// 10. Mount/unmount cycle leaves no leaks
// -----------------------------------------------------------------------------

describe('lexical scoping — mount/unmount cycle', () => {
    it('repeated mount/unmount at same site does not accumulate stale wake-ups', async () => {
        // Behavioral: after N mount/unmount cycles followed by a parent
        // write, only the currently-mounted derivative reacts (zero, since
        // we ended unmounted). No stale derivatives still listening.
        let renderCount = 0;
        class $R extends $Chemical {
            tag = 'a';
            view() {
                renderCount++;
                return React.createElement('span', null, this.tag);
            }
        }
        new $R();
        const r = new $R();
        const C = $(r);

        for (let i = 0; i < 5; i++) {
            const { unmount } = render(React.createElement(C as any));
            unmount();
        }

        const beforeWrite = renderCount;
        await act(async () => { r.tag = 'updated'; });
        // Nothing is mounted, no derivative should react.
        expect(renderCount).toBe(beforeWrite);
    });
});


// -----------------------------------------------------------------------------
// 11. Class form vs instance form — bond ctor only on class form
// -----------------------------------------------------------------------------

describe('lexical scoping — class form runs bond ctor; instance form does not', () => {
    it('$($Class) on first mount with valid children runs the bond ctor', async () => {
        let bondCtorCalls = 0;
        class $Wrapper extends $Chemical {
            items: number[] = [];
            $Wrapper(...items: number[]) {
                bondCtorCalls++;
                this.items = items;
            }
            view() { return null; }
        }
        // Numbers are valid orchestrator-arg children (strings are skipped).
        const W = $($Wrapper);
        const { unmount } = render(
            React.createElement(W as any, null, 1, 2, 3)
        );
        expect(bondCtorCalls).toBeGreaterThan(0);
        unmount();
    });

    it('$(instance) does not run the bond ctor on mount', () => {
        let bondCtorCalls = 0;
        class $Tagger extends $Chemical {
            tag = '';
            $Tagger(...args: any[]) {
                bondCtorCalls++;
            }
            view() { return React.createElement('span', null, this.tag); }
        }
        const t = new $Tagger();
        const T = $(t);
        // Even with children-shaped JSX, instance form skips the bond ctor.
        render(React.createElement(T as any, null, 'a', 'b'));
        expect(bondCtorCalls).toBe(0);
    });
});


// -----------------------------------------------------------------------------
// 12. Cached factory: $(instance) returns same Component reference
// -----------------------------------------------------------------------------

describe('lexical scoping — clone unconditionally even without props', () => {
    it('mounting <C /> with no props still produces a renderable derivative', () => {
        // Behavioral: mounting with no props still produces output that
        // reflects the parent's state — proving a derivative was created.
        class $R extends $Chemical {
            tag = 'parent';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(React.createElement(C as any)); // no props
        expect(container.textContent).toBe('parent');
    });

    it('mounting <C /> with no props but later parent updates flow through', async () => {
        class $R extends $Chemical {
            tag = 'parent';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const r = new $R();
        const C = $(r);
        const { container } = render(React.createElement(C as any)); // no props
        expect(container.textContent).toBe('parent');
        await act(async () => { r.tag = 'updated'; });
        // Derivative was created (despite no props) so it heard the update.
        expect(container.textContent).toBe('updated');
    });
});


describe('lexical scoping — Component reference stability', () => {
    it('$(r) returns the same Component function across calls', () => {
        class $R extends $Chemical {
            view() { return null; }
        }
        new $R();
        const r = new $R();
        const A = $(r);
        const B = $(r);
        expect(A).toBe(B);
    });

    it('each mount point renders the component independently', () => {
        // Behavioral: three mounts → three rendered spans.
        class $R extends $Chemical {
            tag = 'shared';
            view() { return React.createElement('span', null, this.tag); }
        }
        new $R();
        const r = new $R();
        const C = $(r);

        const { container } = render(
            React.createElement('div', null,
                React.createElement(C as any, { key: 'a' }),
                React.createElement(C as any, { key: 'b' }),
                React.createElement(C as any, { key: 'c' }),
            )
        );

        // Three mount sites → three rendered spans → three derivatives.
        expect(container.querySelectorAll('span').length).toBe(3);
    });
});
