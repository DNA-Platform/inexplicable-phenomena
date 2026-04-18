import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Chemical } from '@/chemistry/chemical';
import { $rendering$, $phase$ } from '@/symbols';

class $ComputedView extends $Chemical {
    count = 0;
    get doubled() { return this.count * 2; }
    increment() { this.count++; }
    view() {
        return <div className="computed">{this.doubled}</div>;
    }
}

class $MethodInView extends $Chemical {
    items: string[] = ['a', 'b', 'c'];
    getItems() { return this.items; }
    addItem() { this.items = [...this.items, 'new']; }
    view() {
        const items = this.getItems();
        return <div className="items">{items.join(', ')}</div>;
    }
}

describe('Rendering safety — no setState during render', () => {
    it('computed getter in view does not trigger infinite loop', () => {
        const Component = new $ComputedView().Component;
        const { container } = render(<Component />);
        expect(container.querySelector('.computed')!.textContent).toBe('0');
    });

    it('method called from view does not trigger infinite loop', () => {
        const Component = new $MethodInView().Component;
        const { container } = render(<Component />);
        expect(container.querySelector('.items')!.textContent).toBe('a, b, c');
    });

    it('$rendering$ flag is false outside render', async () => {
        let renderingDuringClick = false;
        class $Checker extends $Chemical {
            check() { renderingDuringClick = this[$rendering$]; }
            view() { return <button onClick={() => this.check()}>check</button>; }
        }
        const Component = new $Checker().Component;
        const { container } = render(<Component />);
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(renderingDuringClick).toBe(false);
    });

    it('$rendering$ flag is true during render', () => {
        let renderingDuringRender = false;
        class $RenderChecker extends $Chemical {
            view() {
                renderingDuringRender = this[$rendering$];
                return <div>check</div>;
            }
        }
        const Component = new $RenderChecker().Component;
        render(<Component />);
        expect(renderingDuringRender).toBe(true);
    });
});

describe('Instance independence with useState pattern', () => {
    it('two components from same template have separate state', async () => {
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
        const Counter = new $Counter().Component;
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
