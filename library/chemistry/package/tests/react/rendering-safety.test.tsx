import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// These tests pin down a critical framework guarantee: rendering a chemical
// is SAFE even when its view reads computed values or calls methods. The
// framework must not trigger infinite render loops from the act of rendering.

describe('Views can read computed getters without causing re-render loops', () => {
    it('a getter referenced in view renders cleanly', () => {
        class $ComputedView extends $Chemical {
            count = 0;
            get doubled() { return this.count * 2; }
            view() {
                return <div className="computed">{this.doubled}</div>;
            }
        }
        const Component = $($ComputedView);
        const { container } = render(<Component />);
        expect(container.querySelector('.computed')!.textContent).toBe('0');
    });
});

describe('Views can call methods without causing re-render loops', () => {
    it('a method invoked from view renders cleanly', () => {
        class $MethodInView extends $Chemical {
            items: string[] = ['a', 'b', 'c'];
            getItems() { return this.items; }
            view() {
                return <div className="items">{this.getItems().join(', ')}</div>;
            }
        }
        const Component = $($MethodInView);
        const { container } = render(<Component />);
        expect(container.querySelector('.items')!.textContent).toBe('a, b, c');
    });
});
