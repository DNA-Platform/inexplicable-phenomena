import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React, { useState } from 'react';

function PureCounter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <span className="count">{count}</span>
            <button onClick={() => setCount(c => c + 1)}>+</button>
        </div>
    );
}

describe('Pure React: verify testing setup handles re-renders', () => {
    it('single click', async () => {
        const { container } = render(<PureCounter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });

    it('two separate clicks', async () => {
        const { container } = render(<PureCounter />);
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('2');
    });

    it('three separate clicks', async () => {
        const { container } = render(<PureCounter />);
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('3');
    });
});

describe('Pure React: external state update via closure', () => {
    it('external mutation + forced re-render', async () => {
        let count = 0;
        let forceUpdate: () => void;
        function ClosureCounter() {
            const [, setState] = useState({});
            forceUpdate = () => setState({});
            return <div><span className="count">{count}</span><button onClick={() => { count++; setState({}); }}>+</button></div>;
        }
        const { container } = render(<ClosureCounter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('1');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('2');
    });
});
