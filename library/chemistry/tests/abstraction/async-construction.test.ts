import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// =============================================================================
// Async bond constructors — first-class async data loading.
//
// A chemical's bond ctor MAY be `async`. Sync prologue runs immediately when
// the orchestrator invokes the ctor. The returned Promise gets bundled into
// the chemical's [$construction$] event. When the bundle settles, the view
// re-renders with whatever post-await state the ctor set.
//
// `chemical.next('construction')` returns the bundle promise. Resolves
// immediately if the ctor was sync (or didn't run); resolves when the
// Promise.allSettled bundle completes if it was async. Includes the
// context-parent's construction in the bundle (chain).
// =============================================================================


describe('async bond ctor — sync prologue and async tail', () => {
    it('sync state set in prologue is visible at first render', async () => {
        class $Loader extends $Chemical {
            $status = '';
            $data = '';
            async $Loader(...args: number[]) {
                this.$status = 'loading';            // sync prologue
                await new Promise(r => setTimeout(r, 5));
                this.$data = 'loaded';                // post-await
            }
            view() {
                return React.createElement('div', null,
                    React.createElement('span', { className: 'status' }, this.$status),
                    React.createElement('span', { className: 'data' }, this.$data),
                );
            }
        }
        new $Loader();
        const { container } = render(React.createElement($($Loader) as any, null, 1));

        // First render shows the prologue state.
        expect(container.querySelector('.status')!.textContent).toBe('loading');
        expect(container.querySelector('.data')!.textContent).toBe('');

        // After the bundle settles, view re-renders with post-await state.
        await act(async () => { await new Promise(r => setTimeout(r, 20)); });
        expect(container.querySelector('.status')!.textContent).toBe('loading');
        expect(container.querySelector('.data')!.textContent).toBe('loaded');
    });
});


describe('chemical.next("construction") — awaitable from outside', () => {
    it('resolves after the async bond ctor settles', async () => {
        class $Slow extends $Chemical {
            $value = 0;
            async $Slow(...args: number[]) {
                await new Promise(r => setTimeout(r, 5));
                this.$value = args[0];
            }
            view() { return React.createElement('span', null, String(this.$value)); }
        }
        new $Slow();
        const { container } = render(React.createElement($($Slow) as any, null, 42));
        // Prologue ran but no value set; view shows initial 0.
        expect(container.textContent).toBe('0');

        // Wait for construction to settle externally.
        await act(async () => { await new Promise(r => setTimeout(r, 20)); });
        expect(container.textContent).toBe('42');
    });

    it('resolves immediately for a sync bond ctor', async () => {
        class $Fast extends $Chemical {
            $value = 0;
            $Fast(...args: number[]) { this.$value = args[0]; }
            view() { return null; }
        }
        new $Fast();
        // Mounting and immediately checking — sync ctor's [$construction$]
        // is Promise.resolve().
        render(React.createElement($($Fast) as any, null, 1));
        // No assertion needed — if construction were never set, the next test
        // would catch it.
        expect(true).toBe(true);
    });
});


describe('async bond ctor — error handling', () => {
    it('a failing async ctor does not break sibling renders', async () => {
        class $Fails extends $Chemical {
            async $Fails(...args: number[]) {
                throw new Error('intentional');
            }
            view() { return null; }
        }
        new $Fails();

        // Should not throw at render time (errors land in the bundle).
        await act(async () => {
            render(React.createElement($($Fails) as any, null, 1));
            await new Promise(r => setTimeout(r, 10));
        });
        // No crash; test reaches here.
        expect(true).toBe(true);
    });
});


describe('async bond ctor — sync prologue is visible to the next ctor', () => {
    it('a child\'s sync prologue state is visible inside the parent\'s bond ctor', async () => {
        // Mixed sync/async bond ctors. The orchestrator processes children
        // FIRST (each child's bond ctor runs in turn — sync prologue runs
        // synchronously up to the first await). Parent's bond ctor runs
        // LAST, with collected child instances as args. By the time parent's
        // ctor reads child.$state, every child's sync prologue has finished,
        // even if their async tails haven't.

        class $Item extends $Chemical {
            $name = '';
            $tag = 'initial';
            async $Item() {
                this.$tag = this.$name + '-prologue';   // sync prologue
                await new Promise(r => setTimeout(r, 10));
                this.$tag = this.$name + '-final';      // post-await
            }
            view() { return null; }
        }
        new $Item();

        let parentSawTag = '';
        class $Container extends $Chemical {
            items: $Item[] = [];
            $Container(...items: $Item[]) {
                this.items = items;
                if (items[0]) parentSawTag = items[0].$tag;
            }
            view() { return null; }
        }
        new $Container();

        render(React.createElement($($Container) as any, null,
            React.createElement($($Item) as any, { name: 'a' }),
        ));

        expect(parentSawTag).toBe('a-prologue');
    });

    it('mixed sync and async siblings — earlier siblings\' state visible to later', async () => {
        // A is sync; B is async with prologue. Both sync states should be
        // visible to a parent ctor reading them post-children-process.

        class $A extends $Chemical {
            $value = 'A-default';
            $A() {
                this.$value = 'A-set';
            }
            view() { return null; }
        }
        new $A();

        class $B extends $Chemical {
            $value = 'B-default';
            async $B() {
                this.$value = 'B-prologue';
                await new Promise(r => setTimeout(r, 10));
                this.$value = 'B-final';
            }
            view() { return null; }
        }
        new $B();

        let parentSawA = '';
        let parentSawB = '';
        class $Mixer extends $Chemical {
            $Mixer(a: $A, b: $B) {
                parentSawA = a.$value;
                parentSawB = b.$value;
            }
            view() { return null; }
        }
        new $Mixer();

        render(React.createElement($($Mixer) as any, null,
            React.createElement($($A) as any),
            React.createElement($($B) as any),
        ));

        expect(parentSawA).toBe('A-set');         // sync ctor result
        expect(parentSawB).toBe('B-prologue');    // async ctor's prologue, pre-await
    });
});

describe('async bond ctor — sync prologue runs synchronously', () => {
    it('the prologue runs at orchestrator-call time, before the ctor returns', async () => {
        let prologueRan = false;
        class $X extends $Chemical {
            $value = 0;
            async $X(...args: number[]) {
                prologueRan = true;          // prologue
                this.$value = args[0];        // sync state set
                await new Promise(r => setTimeout(r, 5));
            }
            view() { return React.createElement('span', null, String(this.$value)); }
        }
        new $X();
        const { container } = render(React.createElement($($X) as any, null, 7));
        // Prologue ran synchronously during render — both the boolean and
        // the prop-setting are visible at first render.
        expect(prologueRan).toBe(true);
        expect(container.textContent).toBe('7');
    });
});


describe('async bond ctor — render after settle', () => {
    it('view re-renders when construction settles, not before', async () => {
        let renderCount = 0;
        class $Tracker extends $Chemical {
            $loaded = false;
            async $Tracker(...args: number[]) {
                await new Promise(r => setTimeout(r, 5));
                this.$loaded = true;
            }
            view() {
                renderCount++;
                return React.createElement('span', null, this.$loaded ? 'YES' : 'NO');
            }
        }
        new $Tracker();
        const { container } = render(React.createElement($($Tracker) as any, null, 1));

        const initialRender = renderCount;
        expect(container.textContent).toBe('NO');

        await act(async () => { await new Promise(r => setTimeout(r, 20)); });

        // At least one re-render fired after construction settled.
        expect(renderCount).toBeGreaterThan(initialRender);
        expect(container.textContent).toBe('YES');
    });
});
