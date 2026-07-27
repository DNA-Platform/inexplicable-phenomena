import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// Persistence is the parent's to express, via keys. These prove the caller can fix
// identity: a keyed child carries its own state across a reorder (the key overrides
// the positional default), and an unkeyed one does not (honest disconfirmation).

class $Item extends $Chemical {
    $label = '';
    $count = 0;
    bump() { this.$count++; }
    view() {
        return <button className={`i-${this.$label}`} onClick={() => this.bump()}>{this.$label}:{this.$count}</button>;
    }
}
const Item = $($Item);

describe('parent keying — the caller expresses sameness', () => {
    it('a KEYED child keeps its state when the parent reorders it', async () => {
        class $List extends $Chemical {
            $order = ['a', 'b'];
            flip() { this.$order = [...this.$order].reverse(); }
            view() {
                return (
                    <div>
                        {this.$order.map(l => <Item key={l} label={l} />)}
                        <button className="flip" onClick={() => this.flip()}>flip</button>
                    </div>
                );
            }
        }
        const List = $($List);
        const { container } = render(<List />);
        await act(async () => { fireEvent.click(container.querySelector('.i-a')!); });
        await act(async () => { fireEvent.click(container.querySelector('.i-a')!); });
        expect(container.querySelector('.i-a')!.textContent).toBe('a:2');

        await act(async () => { fireEvent.click(container.querySelector('.flip')!); });

        // The key expressed "a is the same a" — its count must follow it across the move.
        expect(container.querySelector('.i-a')!.textContent).toBe('a:2');
        expect(container.querySelector('.i-b')!.textContent).toBe('b:0');
    });

    it('an UNKEYED child does NOT carry state across a reorder — state is positional', async () => {
        class $List extends $Chemical {
            $order = ['a', 'b'];
            flip() { this.$order = [...this.$order].reverse(); }
            view() {
                return (
                    <div>
                        {this.$order.map(l => <Item label={l} />)}
                        <button className="flip" onClick={() => this.flip()}>flip</button>
                    </div>
                );
            }
        }
        const List = $($List);
        const { container } = render(<List />);
        await act(async () => { fireEvent.click(container.querySelector('.i-a')!); });
        await act(async () => { fireEvent.click(container.querySelector('.i-a')!); });

        await act(async () => { fireEvent.click(container.querySelector('.flip')!); });

        // No key was given, so the count stayed at position 0, now showing label 'b'.
        expect(container.querySelector('.i-b')!.textContent).toBe('b:2');
        expect(container.querySelector('.i-a')!.textContent).toBe('a:0');
    });
});
