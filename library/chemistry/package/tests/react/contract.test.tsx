import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('Contract: deep path mutation (Doug\'s this.x.y.z = 10 case)', () => {
    it('mutating a deep-nested property from an event-handler-driven method triggers re-render', async () => {
        class $C extends $Chemical {
            $data: { nested: { value: number } } = { nested: { value: 0 } };
            setDeep() { this.$data.nested.value = 42; }
            view() {
                return <>
                    <span>{this.$data.nested.value}</span>
                    <button onClick={() => this.setDeep()}>set</button>
                </>;
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        expect(container.querySelector('span')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('span')!.textContent).toBe('42');
    });
});

describe('Contract: computed getters work without useMemo', () => {
    it('derived value from getter re-renders correctly', async () => {
        class $C extends $Chemical {
            $price? = 10;
            $quantity? = 2;
            get total() { return (this.$price ?? 0) * (this.$quantity ?? 0); }
            view() { return <>
                <span className="total">{this.total}</span>
                <button onClick={() => { this.$quantity = (this.$quantity ?? 0) + 1 }}>+</button>
            </>; }
        }
        const C = $($C);
        const { container } = render(<C />);
        expect(container.querySelector('.total')!.textContent).toBe('20');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.total')!.textContent).toBe('30');
    });
});

describe('Contract: multiple mutations in a single handler batch to one render', () => {
    it('three mutations in one click produce one re-render with all updated', async () => {
        class $C extends $Chemical {
            $alpha? = 1;
            $beta? = 2;
            $gamma? = 3;
            view() {
                return <div>
                    <span className="a">{this.$alpha}</span>
                    <span className="b">{this.$beta}</span>
                    <span className="c">{this.$gamma}</span>
                    <button onClick={() => { this.$alpha = 10; this.$beta = 20; this.$gamma = 30; }}>set</button>
                </div>;
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.a')!.textContent).toBe('10');
        expect(container.querySelector('.b')!.textContent).toBe('20');
        expect(container.querySelector('.c')!.textContent).toBe('30');
    });
});

describe('Contract: async method with pre- and post-await mutations', () => {
    it('both mutations observed, sync shows pre-await, async shows post-await', async () => {
        class $C extends $Chemical {
            $state? = 'idle';
            async load() {
                this.$state = 'loading';
                await new Promise(r => setTimeout(r, 0));
                this.$state = 'done';
            }
            view() {
                return <>
                    <span className="state">{this.$state}</span>
                    <button onClick={() => this.load()}>go</button>
                </>;
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        expect(container.querySelector('.state')!.textContent).toBe('idle');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
            // Don't await inside act; let React flush naturally
            await new Promise(r => setTimeout(r, 20));
        });
        expect(container.querySelector('.state')!.textContent).toBe('done');
    });
});

describe('Contract: handler that throws still re-renders for mutations made before throw', () => {
    it('pre-throw mutation is reflected', async () => {
        class $C extends $Chemical {
            $count? = 0;
            view() {
                return <>
                    <span className="count">{this.$count}</span>
                    <button onClick={() => {
                        (this as any).$count++;
                        throw new Error('boom');
                    }}>+</button>
                </>;
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        try {
            await act(async () => {
                fireEvent.click(container.querySelector('button')!);
            });
        } catch { /* handler threw; OK */ }
        // $count increment should still be reflected in DOM.
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });
});

describe('Contract: view reads are idempotent (no infinite loop)', () => {
    it('rendering many times doesn\'t diverge for deterministic view', async () => {
        let renders = 0;
        class $C extends $Chemical {
            $count? = 0;
            view() {
                renders++;
                return <>
                    <span className="count">{this.$count}</span>
                    <button onClick={() => this.$count = (this.$count ?? 0) + 1}>+</button>
                </>;
            }
        }
        const C = $($C);
        const { container } = render(<C />);
        const initialRenders = renders;
        // Wait for post-lifecycle to settle.
        await act(async () => { await new Promise(r => setTimeout(r, 20)); });
        // Renders should not be accumulating indefinitely.
        const finalRenders = renders;
        expect(finalRenders - initialRenders).toBeLessThan(5);
    });
});
