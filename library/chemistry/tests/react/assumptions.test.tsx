import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Chemical } from '@/chemistry/chemical';
import { $phase$, $resolve$ } from '@/symbols';

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

describe('React assumption: re-render on method call', () => {
    it('click triggers re-render via $Bonding', async () => {
        const Counter = new $Counter().Component;
        const { container } = render(<Counter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });

    it('held instance method triggers re-render', async () => {
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

describe('React assumption: lifecycle phases', () => {
    it('phase advances after mount', async () => {
        new $Display(); // ensure template exists
        const display = new $Display();
        const Display = display.Component;
        render(<Display />);
        await act(async () => {});
        expect(display[$phase$]).not.toBe('setup');
    });
});

describe('React assumption: instance independence', () => {
    it('two template components have separate state', async () => {
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

describe('React assumption: props flow', () => {
    it('parent re-render with new props updates child', async () => {
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

describe('React assumption: consecutive re-renders', () => {
    it('multiple clicks each update the DOM', async () => {
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

describe('React assumption: unmount cleanup', () => {
    it('component removal fires unmount', async () => {
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
