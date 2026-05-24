import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React, { useState } from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('$method memoization (isPure)', () => {
    it('a $-prefixed method runs once for the same args', () => {
        let callCount = 0;
        class $C extends $Chemical {
            $compute() {
                callCount++;
                return 42;
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);
        const r1 = c.$compute();
        const r2 = c.$compute();
        const r3 = c.$compute();
        expect(callCount).toBe(1);
        expect(r1).toBe(42);
        expect(r2).toBe(42);
        expect(r3).toBe(42);
    });

    it('a plain method (no $) runs every time', () => {
        let callCount = 0;
        class $C extends $Chemical {
            compute() {
                callCount++;
                return 42;
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);
        c.compute();
        c.compute();
        c.compute();
        expect(callCount).toBe(3);
    });

    it('$method re-runs when args change', () => {
        let callCount = 0;
        class $C extends $Chemical {
            $format(n: number) {
                callCount++;
                return `value: ${n}`;
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);
        expect(c.$format(1)).toBe('value: 1');
        expect(c.$format(1)).toBe('value: 1');
        expect(callCount).toBe(1);

        expect(c.$format(2)).toBe('value: 2');
        expect(callCount).toBe(2);

        expect(c.$format(2)).toBe('value: 2');
        expect(callCount).toBe(2);
    });

    it('async $method returns cached promise on subsequent calls', async () => {
        let fetchCount = 0;
        class $C extends $Chemical {
            async $fetchData() {
                fetchCount++;
                await new Promise(r => setTimeout(r, 10));
                return 'data';
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);

        const p1 = c.$fetchData();
        const p2 = c.$fetchData();
        expect(p1).toBe(p2);
        expect(fetchCount).toBe(1);

        const result = await p1;
        expect(result).toBe('data');
    });

    it('async $method with different args re-executes', async () => {
        let fetchCount = 0;
        class $C extends $Chemical {
            async $fetch(id: number) {
                fetchCount++;
                await new Promise(r => setTimeout(r, 5));
                return `item-${id}`;
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);

        const r1 = await c.$fetch(1);
        expect(r1).toBe('item-1');
        expect(fetchCount).toBe(1);

        const r2 = await c.$fetch(2);
        expect(r2).toBe('item-2');
        expect(fetchCount).toBe(2);

        const r3 = await c.$fetch(2);
        expect(r3).toBe('item-2');
        expect(fetchCount).toBe(2);
    });

    it('async $method triggers re-render when resolved', async () => {
        class $C extends $Chemical {
            result: string | null = null;
            async $form() {
                this.result = await this.$load();
            }
            async $load() {
                await new Promise(r => setTimeout(r, 10));
                return 'done';
            }
            view() { return <span className="r">{this.result ?? 'waiting'}</span>; }
        }
        const C = $($C);
        const { container } = render(<C />);
        expect(container.querySelector('.r')!.textContent).toBe('waiting');
        await act(async () => { await new Promise(r => setTimeout(r, 50)); });
        expect(container.querySelector('.r')!.textContent).toBe('done');
    });

    it('$method called during render is also memoized', async () => {
        let callCount = 0;
        class $C extends $Chemical {
            count = 0;
            $expensive() {
                callCount++;
                return this.count * 2;
            }
            increment() { this.count++; }
            view() {
                return <span className="v">{this.$expensive()}</span>;
            }
        }
        const c = new $C();
        const C = $(c);
        const { container } = render(<C />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        expect(callCount).toBe(1);

        await act(async () => { c.increment(); });
        expect(callCount).toBe(1);
    });

    it('memoization is per-instance, not shared between derivatives', () => {
        let callCount = 0;
        class $C extends $Chemical {
            $label = '';
            $compute() {
                callCount++;
                return `computed-${this.$label}`;
            }
            view() { return <span className="c">{this.$compute()}</span>; }
        }
        const C = $($C);
        const { container } = render(
            <div>
                <C label="a" />
                <C label="b" />
            </div>
        );
        const spans = container.querySelectorAll('.c');
        expect(spans.length).toBe(2);
        expect(callCount).toBe(2);
    });
});
