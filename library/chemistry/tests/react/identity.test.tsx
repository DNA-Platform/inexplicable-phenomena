import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $Chemical, $, $check } from '@/abstraction/chemical';
import { $Particle } from '@/abstraction/particle';
import {
    $cid$, $symbol$, $parent$, $template$, $isTemplate$, $$template$$
} from '@/implementation/symbols';

// =============================================================================
// Identity
//
// The framework's promise: every particle and chemical has a unique, stable
// identity. $new() creates clones with independent identity. Templates,
// instances, and derivatives each have distinct roles in the identity model.
//
// These tests exercise identity semantics across the full surface: $Particle,
// $Chemical, $new(), $(), template vs instance, prototype chain, and the
// React rendering contract that follows from identity.
// =============================================================================


// -- Shared building blocks --------------------------------------------------

class $Widget extends $Chemical {
    value = '';
    setValue(v: string) { this.value = v; }
    view() {
        return (
            <div className="widget">
                <span className="value">{this.value}</span>
                <input className="input" value={this.value}
                    onChange={(e) => this.setValue(e.target.value)} />
            </div>
        );
    }
}
new $Widget();

class $Counter extends $Chemical {
    count = 0;
    increment() { this.count++; }
    view() {
        return (
            <div className="counter">
                <span className="count">{String(this.count)}</span>
                <button className="inc" onClick={() => this.increment()}>+</button>
            </div>
        );
    }
}
new $Counter();


// =============================================================================
// 1. $Particle identity basics
// =============================================================================

describe('identity — $Particle fundamentals', () => {
    class $P extends $Particle {
        value = 0;
        view() { return <span>{this.value}</span>; }
    }
    new $P();

    it('each instance has a unique cid', () => {
        const a = new $P();
        const b = new $P();
        expect(a[$cid$]).not.toBe(b[$cid$]);
    });

    it('each instance has a unique symbol', () => {
        const a = new $P();
        const b = new $P();
        expect(a[$symbol$]).not.toBe(b[$symbol$]);
        expect(a[$symbol$]).toContain('$Chemistry.');
        expect(b[$symbol$]).toContain('$Chemistry.');
    });

    it('symbol encodes the class name and cid', () => {
        const p = new $P();
        const symbol = p[$symbol$];
        expect(symbol).toMatch(/\$Chemistry\.\$P\[\d+\]$/);
    });

    it('template is the prototype singleton', () => {
        const template = ($P as any)[$$template$$];
        expect(template).toBeDefined();
        expect(template).toBeInstanceOf($P);
        expect(template[$isTemplate$]).toBe(true);
    });
});


// =============================================================================
// 2. $new() — identity of clones
// =============================================================================

describe('identity — $new() clones', () => {
    it('clone gets a fresh cid', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect(clone[$cid$]).not.toBe(source[$cid$]);
    });

    it('clone gets a fresh symbol', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect(clone[$symbol$]).not.toBe(source[$symbol$]);
    });

    it('clone inherits state from source', () => {
        const source = new $Counter();
        source.count = 42;
        const clone = source.$new();
        expect(clone.count).toBe(42);
    });

    it('clone state is detached — writes to clone do not affect source', () => {
        const source = new $Counter();
        source.count = 10;
        const clone = source.$new();
        clone.count = 99;
        expect(source.count).toBe(10);
    });

    it('clone state is detached — writes to source do not affect clone', () => {
        const source = new $Counter();
        const clone = source.$new();
        clone.count = 5;
        source.count = 100;
        expect(clone.count).toBe(5);
    });

    it('clone is an instance of the same class', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect(clone).toBeInstanceOf($Counter);
    });

    it('clone prototype chain includes the source', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect(Object.getPrototypeOf(clone)).toBe(source);
    });

    it('clone template points to the source', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect(clone[$template$]).toBe(source);
    });

    it('multiple clones from same source are independent', () => {
        const source = new $Counter();
        const a = source.$new();
        const b = source.$new();
        const c = source.$new();
        a.count = 1;
        b.count = 2;
        c.count = 3;
        expect(a.count).toBe(1);
        expect(b.count).toBe(2);
        expect(c.count).toBe(3);
        expect(source.count).toBe(0);
    });

    it('clone of a clone creates a three-level prototype chain', () => {
        const root = new $Counter();
        root.count = 100;
        const child = root.$new();
        const grandchild = child.$new();
        expect(grandchild.count).toBe(100);
        expect(Object.getPrototypeOf(grandchild)).toBe(child);
        expect(Object.getPrototypeOf(child)).toBe(root);
        expect(grandchild[$cid$]).not.toBe(child[$cid$]);
        expect(child[$cid$]).not.toBe(root[$cid$]);
    });
});


// =============================================================================
// 3. $new() — rendering identity
// =============================================================================

describe('identity — $new() rendering', () => {
    it('$(source) and $(clone) render independently', async () => {
        const source = new $Counter();
        const clone = source.$new();
        const Source = $(source);
        const Clone = $(clone);
        const { container } = render(
            <div>
                <Source key="s" />
                <Clone key="c" />
            </div>
        );

        const btns = container.querySelectorAll('.inc');
        await act(async () => { fireEvent.click(btns[0]); });

        const counts = container.querySelectorAll('.count');
        expect(counts[0].textContent).toBe('1');
        expect(counts[1].textContent).toBe('0');
    });

    it('clone state persists across unmount/remount', async () => {
        const clone = new $Counter().$new();
        const Clone = $(clone);

        function Wrapper() {
            const [show, setShow] = React.useState(true);
            return (
                <div>
                    {show && <Clone />}
                    <button className="toggle" onClick={() => setShow(s => !s)}>toggle</button>
                </div>
            );
        }

        const { container } = render(<Wrapper />);
        await act(async () => { fireEvent.click(container.querySelector('.inc')!); });
        await act(async () => { fireEvent.click(container.querySelector('.inc')!); });
        expect(container.querySelector('.count')!.textContent).toBe('2');

        await act(async () => { fireEvent.click(container.querySelector('.toggle')!); });
        expect(container.querySelector('.count')).toBeNull();

        await act(async () => { fireEvent.click(container.querySelector('.toggle')!); });
        expect(container.querySelector('.count')!.textContent).toBe('2');
    });

    it('clone used as tab content preserves state across tab switches', async () => {
        const panelA = new $Widget().$new();
        const panelB = new $Widget().$new();

        function Tabs() {
            const [active, setActive] = React.useState(0);
            const panels = [panelA, panelB];
            const Panel = $(panels[active]);
            return (
                <div>
                    <button className="tab-0" onClick={() => setActive(0)}>A</button>
                    <button className="tab-1" onClick={() => setActive(1)}>B</button>
                    <Panel />
                </div>
            );
        }

        const { container } = render(<Tabs />);

        const input = () => container.querySelector('.input') as HTMLInputElement;
        await act(async () => {
            fireEvent.change(input(), { target: { value: 'hello' } });
        });
        expect(container.querySelector('.value')!.textContent).toBe('hello');

        await act(async () => { fireEvent.click(container.querySelector('.tab-1')!); });
        expect(container.querySelector('.value')!.textContent).toBe('');
        await act(async () => {
            fireEvent.change(input(), { target: { value: 'world' } });
        });

        await act(async () => { fireEvent.click(container.querySelector('.tab-0')!); });
        expect(container.querySelector('.value')!.textContent).toBe('hello');

        await act(async () => { fireEvent.click(container.querySelector('.tab-1')!); });
        expect(container.querySelector('.value')!.textContent).toBe('world');
    });
});


// =============================================================================
// 4. Template vs instance identity
// =============================================================================

describe('identity — template vs instance', () => {
    it('$($Class) returns the same Component on repeated calls', () => {
        const a = $($Counter);
        const b = $($Counter);
        expect(a).toBe(b);
    });

    it('$(instance) returns the same Component on repeated calls', () => {
        const inst = new $Counter();
        const a = $(inst);
        const b = $(inst);
        expect(a).toBe(b);
    });

    it('$(clone) returns the same Component on repeated calls', () => {
        const clone = new $Counter().$new();
        const a = $(clone);
        const b = $(clone);
        expect(a).toBe(b);
    });

    it('$(instanceA) and $(instanceB) return different Components', () => {
        const a = new $Counter();
        const b = new $Counter();
        expect($(a)).not.toBe($(b));
    });

    it('$(source) and $(clone) return different Components', () => {
        const source = new $Counter();
        const clone = source.$new();
        expect($(source)).not.toBe($(clone));
    });

    it('$($Class) derivatives have independent state', async () => {
        const Counter = $($Counter);
        const { container } = render(
            <div>
                <Counter key="a" />
                <Counter key="b" />
            </div>
        );

        const btns = container.querySelectorAll('.inc');
        await act(async () => {
            fireEvent.click(btns[0]);
            fireEvent.click(btns[0]);
            fireEvent.click(btns[0]);
        });

        const counts = container.querySelectorAll('.count');
        expect(counts[0].textContent).toBe('3');
        expect(counts[1].textContent).toBe('0');
    });
});


// =============================================================================
// 5. Bond-constructor child identity across parent re-renders
// =============================================================================

describe('identity — bond-constructor children survive parent re-render', () => {
    it('distinct-type children preserve state', async () => {
        class $PanelA extends $Chemical {
            count = 0;
            increment() { this.count++; }
            view() {
                return (
                    <div className="panel-a">
                        <span className="count">{String(this.count)}</span>
                        <button className="inc" onClick={() => this.increment()}>+</button>
                    </div>
                );
            }
        }
        new $PanelA();
        class $PanelB extends $Chemical {
            count = 0;
            increment() { this.count++; }
            view() {
                return (
                    <div className="panel-b">
                        <span className="count">{String(this.count)}</span>
                        <button className="inc" onClick={() => this.increment()}>+</button>
                    </div>
                );
            }
        }
        new $PanelB();

        class $Host extends $Chemical {
            title = 'host';
            items: $Chemical[] = [];
            $Host(...items: $Chemical[]) { this.items = items; }
            setTitle(t: string) { this.title = t; }
            view() {
                return (
                    <div>
                        <span className="title">{this.title}</span>
                        <button className="rename" onClick={() => this.setTitle('changed')}>rename</button>
                        {this.items.map((item, i) => {
                            const C = $(item);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const PanelA = $($PanelA);
        const PanelB = $($PanelB);
        const Host = $($Host);

        const { container } = render(
            <Host>
                <PanelA />
                <PanelB />
            </Host>
        );

        await act(async () => { fireEvent.click(container.querySelector('.panel-a .inc')!); });
        await act(async () => { fireEvent.click(container.querySelector('.panel-a .inc')!); });
        await act(async () => { fireEvent.click(container.querySelector('.panel-b .inc')!); });

        expect(container.querySelector('.panel-a .count')!.textContent).toBe('2');
        expect(container.querySelector('.panel-b .count')!.textContent).toBe('1');

        await act(async () => { fireEvent.click(container.querySelector('.rename')!); });
        expect(container.querySelector('.title')!.textContent).toBe('changed');

        expect(container.querySelector('.panel-a .count')!.textContent).toBe('2');
        expect(container.querySelector('.panel-b .count')!.textContent).toBe('1');
    });

    it('same-type children with explicit keys preserve state', async () => {
        class $Item extends $Chemical {
            $tag = '';
            count = 0;
            increment() { this.count++; }
            view() {
                return (
                    <div className={`item-${this.$tag}`}>
                        <span className="count">{String(this.count)}</span>
                        <button className="inc" onClick={() => this.increment()}>+</button>
                    </div>
                );
            }
        }
        new $Item();

        class $Container extends $Chemical {
            title = 'container';
            items: $Item[] = [];
            $Container(...items: $Item[]) {
                this.items = items.map(i => $check(i, $Item));
            }
            setTitle(t: string) { this.title = t; }
            view() {
                return (
                    <div>
                        <span className="title">{this.title}</span>
                        <button className="rename" onClick={() => this.setTitle('new')}>rename</button>
                        {this.items.map((item, i) => {
                            const C = $(item);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Item = $($Item);
        const Container = $($Container);

        const { container } = render(
            <Container>
                <Item key="x" tag="x" />
                <Item key="y" tag="y" />
            </Container>
        );

        await act(async () => { fireEvent.click(container.querySelector('.item-x .inc')!); });
        await act(async () => { fireEvent.click(container.querySelector('.item-x .inc')!); });
        await act(async () => { fireEvent.click(container.querySelector('.item-x .inc')!); });
        expect(container.querySelector('.item-x .count')!.textContent).toBe('3');
        expect(container.querySelector('.item-y .count')!.textContent).toBe('0');

        await act(async () => { fireEvent.click(container.querySelector('.rename')!); });
        expect(container.querySelector('.title')!.textContent).toBe('new');

        expect(container.querySelector('.item-x .count')!.textContent).toBe('3');
        expect(container.querySelector('.item-y .count')!.textContent).toBe('0');
    });
});


// =============================================================================
// 6. Inverse: $(Component) recovers the chemical
// =============================================================================

describe('identity — $ inverse', () => {
    it('$($(instance)) returns the instance', () => {
        const inst = new $Counter();
        const Comp = $(inst);
        expect($(Comp)).toBe(inst);
    });

    it('$($(clone)) returns the clone', () => {
        const clone = new $Counter().$new();
        const Comp = $(clone);
        expect($(Comp)).toBe(clone);
    });

    it('$($Class) inverse returns the template', () => {
        const Comp = $($Counter);
        const template = $(Comp);
        expect(template).toBeInstanceOf($Counter);
        expect(template[$isTemplate$]).toBe(true);
    });
});
