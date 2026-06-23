import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

class $Simple extends $Chemical {
    count = 0;
    increment() { this.count++; }
    view() {
        return <div><span className="v">{this.count}</span><button onClick={() => this.increment()}>+</button></div>;
    }
}

describe('Instance rendering via .Component', () => {
    it('template .Component works', async () => {
        const Counter = $($Simple);
        const { container } = render(<Counter />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.v')!.textContent).toBe('1');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.v')!.textContent).toBe('2');
    });

    it('held instance .Component works', async () => {
        const instance = new $Simple();
        const Counter = $(instance);
        const { container } = render(<Counter />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.v')!.textContent).toBe('1');
    });

    it('held instance method from outside works', async () => {
        const instance = new $Simple();
        const Counter = $(instance);
        const { container } = render(<Counter />);
        expect(container.querySelector('.v')!.textContent).toBe('0');
        await act(async () => { instance.increment(); });
        expect(container.querySelector('.v')!.textContent).toBe('1');
    });
});
