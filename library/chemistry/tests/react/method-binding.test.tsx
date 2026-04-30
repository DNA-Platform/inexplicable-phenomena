import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';
import { $$template$$, $molecule$ } from '@/implementation/symbols';

describe('Method binding: onClick={this.method}', () => {
    it('bare method reference works as onClick handler (class form)', async () => {
        class $Counter extends $Chemical {
            $count = 0;
            increment() { this.$count++; }
            view() {
                return <div>
                    <span className="v">{this.$count}</span>
                    <button onClick={this.increment}>+</button>
                </div>;
            }
        }
        const C = $($Counter);
        const { container } = render(<C />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.v')!.textContent).toBe('1');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.v')!.textContent).toBe('2');
    });

    it('bare method reference works as onClick handler (held instance)', async () => {
        class $Counter extends $Chemical {
            $count = 0;
            increment() { this.$count++; }
            view() {
                return <div>
                    <span className="v">{this.$count}</span>
                    <button onClick={this.increment}>+</button>
                </div>;
            }
        }
        new $Counter();
        const c = new $Counter();
        const C = $(c);
        const { container } = render(<C />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.v')!.textContent).toBe('1');
    });
});
