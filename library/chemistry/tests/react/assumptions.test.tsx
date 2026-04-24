import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Chemical } from '@/abstraction/chemical';
import { $phase$, $resolve$ } from '@/implementation/symbols';

class $Display extends $Chemical {
    $text? = 'initial';
    view() { return <div className="display">{this.$text}</div>; }
}

class $Counter extends $Chemical {
    count = 0;
    increment() { this.count++; }
    view() {
        return (
            <div className="counter">
                <span className="count">{this.count}</span>
                <button onClick={() => this.increment()}>+</button>
            </div>
        );
    }
}

describe('Clicking a button that calls a method updates the UI', () => {
    it('clicking a button updates the UI', async () => {
        const Counter = new $Counter().Component;
        const { container } = render(<Counter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });

    it('method called on a held instance updates the UI', async () => {
        // Create a second instance (non-template) to use the $lift path
        new $Counter(); // ensure template exists
        const counter = new $Counter(); // this one is NOT the template
        const Counter = counter.Component;
        const { container } = render(<Counter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            counter.increment();
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });
});

describe('Lifecycle: awaiting next(phase) resolves after the framework reaches that phase', () => {
    it('next("mount") resolves after a component mounts', async () => {
        new $Display();
        const display = new $Display();
        const Display = display.Component;
        let mounted = false;
        display.next('mount').then(() => { mounted = true; });
        render(<Display />);
        await act(async () => { await new Promise(r => setTimeout(r, 10)); });
        expect(mounted).toBe(true);
    });
});

describe('Two rendered instances of the same chemical hold independent state', () => {
    it('clicking one component does not affect the other', async () => {
        class $IndependentCounter extends $Chemical {
            count = 0;
            increment() { this.count++; }
            view() {
                return <div className="counter"><span className="count">{this.count}</span><button onClick={() => this.increment()}>+</button></div>;
            }
        }
        const Counter = new $IndependentCounter().Component;
        const { container } = render(
            <div><Counter /><Counter /></div>
        );
        const buttons = container.querySelectorAll('button');
        const counts = container.querySelectorAll('.count');
        expect(counts[0].textContent).toBe('0');
        expect(counts[1].textContent).toBe('0');
        await act(async () => { fireEvent.click(buttons[0]); });
        expect(counts[0].textContent).toBe('1');
        expect(counts[1].textContent).toBe('0');
    });
});

describe('Parent re-rendering with new props updates the child', () => {
    it('new props from a parent re-render reach the child', async () => {
        const Display = new $Display().Component;
        function Parent() {
            const [text, setText] = React.useState('first');
            return (
                <div>
                    <Display text={text} />
                    <button className="change" onClick={() => setText('second')}>Change</button>
                </div>
            );
        }
        const { container } = render(<Parent />);
        expect(container.querySelector('.display')!.textContent).toBe('first');
        await act(async () => {
            fireEvent.click(container.querySelector('.change')!);
        });
        expect(container.querySelector('.display')!.textContent).toBe('second');
    });
});

describe('Consecutive state mutations each update the DOM', () => {
    it('three clicks in sequence show three incremented values', async () => {
        const Counter = new $Counter().Component;
        const { container } = render(<Counter />);
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('1');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('2');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.count')!.textContent).toBe('3');
    });
});

describe('Removing a component from the tree unmounts it', () => {
    it('conditional rendering removes the DOM subtree', async () => {
        new $Display();
        const display = new $Display();
        const Display = display.Component;
        function Wrapper() {
            const [show, setShow] = React.useState(true);
            return (
                <div>
                    {show && <Display />}
                    <button className="toggle" onClick={() => setShow(false)}>Remove</button>
                </div>
            );
        }
        const { container } = render(<Wrapper />);
        expect(container.querySelector('.display')).not.toBeNull();
        await act(async () => {
            fireEvent.click(container.querySelector('.toggle')!);
        });
        expect(container.querySelector('.display')).toBeNull();
    });
});
