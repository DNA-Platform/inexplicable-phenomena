import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';

// =============================================================================
// State Persistence
//
// The framework's promise: state lives in objects, not in React. When you put
// a value into a chemical, you get it back — regardless of whether the
// component was mounted, unmounted, moved, or swapped.
//
// These tests exercise that promise across every object-graph configuration
// the framework supports. They test the FEATURE (state survives) not the
// CODE (which cache or prototype trick makes it work).
// =============================================================================


// -- Shared building blocks --------------------------------------------------

class $Panel extends $Chemical {
    value = '';
    setValue(v: string) { this.value = v; }
    view() {
        return (
            <div className="panel">
                <span className="value">{this.value}</span>
                <input
                    className="input"
                    value={this.value}
                    onChange={(e) => this.setValue(e.target.value)}
                />
            </div>
        );
    }
}
new $Panel();

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
// 1. Direct instance — unmount/remount preserves state
// =============================================================================

describe('state persistence — direct instance across unmount/remount', () => {
    it('counter survives unmount and remount', async () => {
        const counter = new $Counter();
        const C = $(counter);

        const r1 = render(<C />);
        await act(async () => { fireEvent.click(r1.container.querySelector('.inc')!); });
        await act(async () => { fireEvent.click(r1.container.querySelector('.inc')!); });
        await act(async () => { fireEvent.click(r1.container.querySelector('.inc')!); });
        expect(r1.container.querySelector('.count')!.textContent).toBe('3');
        r1.unmount();

        const r2 = render(<C />);
        expect(r2.container.querySelector('.count')!.textContent).toBe('3');
    });

    it('text input survives unmount and remount', async () => {
        const panel = new $Panel();
        const P = $(panel);

        const r1 = render(<P />);
        await act(async () => { panel.value = 'hello world'; });
        expect(r1.container.querySelector('.value')!.textContent).toBe('hello world');
        r1.unmount();

        const r2 = render(<P />);
        expect(r2.container.querySelector('.value')!.textContent).toBe('hello world');
    });

    it('state survives three mount/unmount cycles', async () => {
        const counter = new $Counter();
        const C = $(counter);

        for (let cycle = 1; cycle <= 3; cycle++) {
            const r = render(<C />);
            await act(async () => { fireEvent.click(r.container.querySelector('.inc')!); });
            expect(r.container.querySelector('.count')!.textContent).toBe(String(cycle));
            r.unmount();
        }

        const final = render(<C />);
        expect(final.container.querySelector('.count')!.textContent).toBe('3');
    });
});


// =============================================================================
// 2. Conditional render — only one of N is mounted, each keeps its state
// =============================================================================

describe('state persistence — conditional render (tabs pattern)', () => {
    it('two panels, toggling between them preserves both', async () => {
        const panelA = new $Panel();
        const panelB = new $Panel();
        const PanelA = $(panelA);
        const PanelB = $(panelB);

        let showA = true;
        function App() {
            const [, setTick] = React.useState(0);
            return (
                <div>
                    <button className="toggle" onClick={() => { showA = !showA; setTick(t => t + 1); }}>toggle</button>
                    {showA ? <PanelA /> : <PanelB />}
                </div>
            );
        }

        const { container } = render(<App />);

        // Write to panel A
        await act(async () => { panelA.value = 'A-state'; });
        expect(container.querySelector('.value')!.textContent).toBe('A-state');

        // Switch to B
        await act(async () => { fireEvent.click(container.querySelector('.toggle')!); });
        expect(container.querySelector('.value')!.textContent).toBe('');

        // Write to panel B
        await act(async () => { panelB.value = 'B-state'; });
        expect(container.querySelector('.value')!.textContent).toBe('B-state');

        // Switch back to A — state should survive
        await act(async () => { fireEvent.click(container.querySelector('.toggle')!); });
        expect(container.querySelector('.value')!.textContent).toBe('A-state');

        // Switch to B again — state should survive
        await act(async () => { fireEvent.click(container.querySelector('.toggle')!); });
        expect(container.querySelector('.value')!.textContent).toBe('B-state');
    });

    it('three panels in an array, index-based switching', async () => {
        const panels = [new $Panel(), new $Panel(), new $Panel()];
        const Components = panels.map(p => $(p));

        let active = 0;
        function App() {
            const [, setTick] = React.useState(0);
            const C = Components[active]!;
            return (
                <div>
                    <button className="go-0" onClick={() => { active = 0; setTick(t => t + 1); }}>0</button>
                    <button className="go-1" onClick={() => { active = 1; setTick(t => t + 1); }}>1</button>
                    <button className="go-2" onClick={() => { active = 2; setTick(t => t + 1); }}>2</button>
                    <C />
                </div>
            );
        }

        const { container } = render(<App />);

        // Set state on panel 0
        await act(async () => { panels[0].value = 'zero'; });
        expect(container.querySelector('.value')!.textContent).toBe('zero');

        // Switch to 1, set state
        await act(async () => { fireEvent.click(container.querySelector('.go-1')!); });
        await act(async () => { panels[1].value = 'one'; });
        expect(container.querySelector('.value')!.textContent).toBe('one');

        // Switch to 2, set state
        await act(async () => { fireEvent.click(container.querySelector('.go-2')!); });
        await act(async () => { panels[2].value = 'two'; });
        expect(container.querySelector('.value')!.textContent).toBe('two');

        // Round-trip back through all three — each remembers
        await act(async () => { fireEvent.click(container.querySelector('.go-0')!); });
        expect(container.querySelector('.value')!.textContent).toBe('zero');

        await act(async () => { fireEvent.click(container.querySelector('.go-1')!); });
        expect(container.querySelector('.value')!.textContent).toBe('one');

        await act(async () => { fireEvent.click(container.querySelector('.go-2')!); });
        expect(container.querySelector('.value')!.textContent).toBe('two');
    });
});


// =============================================================================
// 3. $new() clones — independent state isolation
// =============================================================================

describe('state persistence — $new() clone isolation', () => {
    it('clone inherits initial state from source', () => {
        const source = new $Counter();
        source.count = 10;
        const clone = source.$new();
        const C = $(clone);
        const { container } = render(<C />);
        expect(container.querySelector('.count')!.textContent).toBe('10');
    });

    it('writing to clone does not affect source', async () => {
        const source = new $Counter();
        const clone = source.$new();
        const Source = $(source);
        const Clone = $(clone);

        const { container } = render(
            <div>
                <div className="s"><Source /></div>
                <div className="c"><Clone /></div>
            </div>
        );

        // Click clone's button three times
        const cloneBtn = container.querySelector('.c .inc')!;
        await act(async () => { fireEvent.click(cloneBtn); });
        await act(async () => { fireEvent.click(cloneBtn); });
        await act(async () => { fireEvent.click(cloneBtn); });

        expect(container.querySelector('.c .count')!.textContent).toBe('3');
        expect(container.querySelector('.s .count')!.textContent).toBe('0');
    });

    it('writing to source does not affect clone', async () => {
        const source = new $Counter();
        const clone = source.$new();
        const Source = $(source);
        const Clone = $(clone);

        const { container } = render(
            <div>
                <div className="s"><Source /></div>
                <div className="c"><Clone /></div>
            </div>
        );

        await act(async () => { source.count = 99; });

        expect(container.querySelector('.s .count')!.textContent).toBe('99');
        expect(container.querySelector('.c .count')!.textContent).toBe('0');
    });

    it('three clones are fully independent', async () => {
        const source = new $Counter();
        const a = source.$new();
        const b = source.$new();
        const c = source.$new();
        const A = $(a);
        const B = $(b);
        const C = $(c);

        const { container } = render(
            <div>
                <div className="a"><A /></div>
                <div className="b"><B /></div>
                <div className="c"><C /></div>
            </div>
        );

        await act(async () => { a.count = 10; });
        await act(async () => { b.count = 20; });
        await act(async () => { c.count = 30; });

        expect(container.querySelector('.a .count')!.textContent).toBe('10');
        expect(container.querySelector('.b .count')!.textContent).toBe('20');
        expect(container.querySelector('.c .count')!.textContent).toBe('30');
    });

    it('clone state persists across unmount/remount', async () => {
        const source = new $Counter();
        const clone = source.$new();
        const C = $(clone);

        const r1 = render(<C />);
        await act(async () => { clone.count = 42; });
        expect(r1.container.querySelector('.count')!.textContent).toBe('42');
        r1.unmount();

        const r2 = render(<C />);
        expect(r2.container.querySelector('.count')!.textContent).toBe('42');
    });
});


// =============================================================================
// 4. Clones as tabs — the exact bug scenario
// =============================================================================

describe('state persistence — clones as conditional tabs', () => {
    it('$new() clones used as tab panels keep independent state across switches', async () => {
        const source = new $Panel();
        const tab0 = source.$new();
        const tab1 = source.$new();
        const tab2 = source.$new();
        const Tab0 = $(tab0);
        const Tab1 = $(tab1);
        const Tab2 = $(tab2);

        const tabs = [Tab0, Tab1, Tab2];
        let active = 0;

        function App() {
            const [, setTick] = React.useState(0);
            const ActiveTab = tabs[active]!;
            return (
                <div>
                    <button className="t0" onClick={() => { active = 0; setTick(t => t + 1); }}>0</button>
                    <button className="t1" onClick={() => { active = 1; setTick(t => t + 1); }}>1</button>
                    <button className="t2" onClick={() => { active = 2; setTick(t => t + 1); }}>2</button>
                    <ActiveTab />
                </div>
            );
        }

        const { container } = render(<App />);

        // Set state on each tab
        await act(async () => { tab0.value = 'alpha'; });
        expect(container.querySelector('.value')!.textContent).toBe('alpha');

        await act(async () => { fireEvent.click(container.querySelector('.t1')!); });
        await act(async () => { tab1.value = 'beta'; });
        expect(container.querySelector('.value')!.textContent).toBe('beta');

        await act(async () => { fireEvent.click(container.querySelector('.t2')!); });
        await act(async () => { tab2.value = 'gamma'; });
        expect(container.querySelector('.value')!.textContent).toBe('gamma');

        // Full round trip — every tab remembers
        await act(async () => { fireEvent.click(container.querySelector('.t0')!); });
        expect(container.querySelector('.value')!.textContent).toBe('alpha');

        await act(async () => { fireEvent.click(container.querySelector('.t1')!); });
        expect(container.querySelector('.value')!.textContent).toBe('beta');

        await act(async () => { fireEvent.click(container.querySelector('.t2')!); });
        expect(container.querySelector('.value')!.textContent).toBe('gamma');
    });
});


// =============================================================================
// 5. Bond-constructor children — instances created by parent
// =============================================================================

describe('state persistence — bond-constructor children', () => {
    it('children created in bond ctor persist state when parent re-renders', async () => {
        class $Child extends $Chemical {
            $tag = '';
            count = 0;
            increment() { this.count++; }
            view() {
                return (
                    <div className={`child-${this.$tag}`}>
                        <span className="count">{String(this.count)}</span>
                        <button className="inc" onClick={() => this.increment()}>+</button>
                    </div>
                );
            }
        }
        new $Child();

        class $Parent extends $Chemical {
            title = 'parent';
            items: $Child[] = [];

            $Parent(...items: $Child[]) {
                this.items = items;
            }

            setTitle(t: string) { this.title = t; }

            view() {
                return (
                    <div>
                        <span className="title">{this.title}</span>
                        <button className="rename" onClick={() => this.setTitle('renamed')}>rename</button>
                        {this.items.map((c, i) => {
                            const C = $(c);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Parent = $($Parent);
        const Child = $($Child);
        const { container } = render(
            <Parent>
                <Child tag="a" />
                <Child tag="b" />
            </Parent>
        );

        // Increment child A twice
        const btnA = container.querySelector('.child-a .inc')!;
        await act(async () => { fireEvent.click(btnA); });
        await act(async () => { fireEvent.click(btnA); });
        expect(container.querySelector('.child-a .count')!.textContent).toBe('2');
        expect(container.querySelector('.child-b .count')!.textContent).toBe('0');

        // Re-render parent by changing its title
        await act(async () => { fireEvent.click(container.querySelector('.rename')!); });
        expect(container.querySelector('.title')!.textContent).toBe('renamed');

        // Child A's state survived parent re-render
        expect(container.querySelector('.child-a .count')!.textContent).toBe('2');
        expect(container.querySelector('.child-b .count')!.textContent).toBe('0');
    });
});


// =============================================================================
// 6. Template derivatives — per-mount state isolation
// =============================================================================

describe('state persistence — template derivatives are isolated', () => {
    it('two mounts of $($Class) have fully independent state', async () => {
        const Counter = $($Counter);
        const { container } = render(
            <div>
                <div className="a"><Counter /></div>
                <div className="b"><Counter /></div>
            </div>
        );

        const btnA = container.querySelector('.a .inc')!;
        await act(async () => { fireEvent.click(btnA); });
        await act(async () => { fireEvent.click(btnA); });

        expect(container.querySelector('.a .count')!.textContent).toBe('2');
        expect(container.querySelector('.b .count')!.textContent).toBe('0');
    });

    it('template write propagates to derivatives that have not shadowed', async () => {
        class $Tag extends $Chemical {
            tag = 'default';
            view() { return <span className="tag">{this.tag}</span>; }
        }
        new $Tag();

        const Tag = $($Tag);
        const template = (Tag as any).$chemical;
        const { container } = render(
            <div>
                <Tag key="a" />
                <Tag key="b" />
                <Tag key="c" />
            </div>
        );

        await act(async () => { template.tag = 'global'; });
        const tags = container.querySelectorAll('.tag');
        expect(tags[0].textContent).toBe('global');
        expect(tags[1].textContent).toBe('global');
        expect(tags[2].textContent).toBe('global');
    });

    it('derivative shadow survives template write', async () => {
        class $Tag extends $Chemical {
            tag = 'default';
            localSet(v: string) { this.tag = v; }
            view() {
                return (
                    <div className="item">
                        <span className="tag">{this.tag}</span>
                        <button className="local" onClick={() => this.localSet('mine')}>mine</button>
                    </div>
                );
            }
        }
        new $Tag();

        const Tag = $($Tag);
        const template = (Tag as any).$chemical;
        const { container } = render(
            <div>
                <Tag key="a" />
                <Tag key="b" />
            </div>
        );

        // Shadow derivative A
        const buttons = container.querySelectorAll('.local');
        await act(async () => { fireEvent.click(buttons[0]); });
        expect(container.querySelectorAll('.tag')[0].textContent).toBe('mine');

        // Template write — A keeps its shadow, B updates
        await act(async () => { template.tag = 'global'; });
        expect(container.querySelectorAll('.tag')[0].textContent).toBe('mine');
        expect(container.querySelectorAll('.tag')[1].textContent).toBe('global');
    });
});


// =============================================================================
// 7. Mixed graphs — direct instances held by a template-spawned parent
// =============================================================================

describe('state persistence — mixed object graphs', () => {
    it('direct child instances inside a template parent keep state across parent re-renders', async () => {
        const counterA = new $Counter();
        const counterB = new $Counter();

        class $Shell extends $Chemical {
            border = 'none';
            setBorder(v: string) { this.border = v; }
            view() {
                const A = $(counterA);
                const B = $(counterB);
                return (
                    <div className="shell" style={{ border: this.border }}>
                        <span className="border-val">{this.border}</span>
                        <button className="restyle" onClick={() => this.setBorder('solid')}>restyle</button>
                        <div className="a"><A /></div>
                        <div className="b"><B /></div>
                    </div>
                );
            }
        }

        const Shell = $($Shell);
        const { container } = render(<Shell />);

        // Increment counter A
        const btnA = container.querySelector('.a .inc')!;
        await act(async () => { fireEvent.click(btnA); });
        await act(async () => { fireEvent.click(btnA); });
        expect(container.querySelector('.a .count')!.textContent).toBe('2');
        expect(container.querySelector('.b .count')!.textContent).toBe('0');

        // Re-render Shell by changing its own state
        await act(async () => { fireEvent.click(container.querySelector('.restyle')!); });
        expect(container.querySelector('.border-val')!.textContent).toBe('solid');

        // Counter A still has its state
        expect(container.querySelector('.a .count')!.textContent).toBe('2');
        expect(container.querySelector('.b .count')!.textContent).toBe('0');
    });

    it('direct instances conditionally rendered inside a template parent', async () => {
        const panelA = new $Panel();
        const panelB = new $Panel();

        class $TabHost extends $Chemical {
            active = 0;
            switchTo(i: number) { this.active = i; }
            view() {
                const panel = this.active === 0 ? panelA : panelB;
                const P = $(panel);
                return (
                    <div>
                        <button className="go-0" onClick={() => this.switchTo(0)}>A</button>
                        <button className="go-1" onClick={() => this.switchTo(1)}>B</button>
                        <P />
                    </div>
                );
            }
        }

        const TabHost = $($TabHost);
        const { container } = render(<TabHost />);

        // Set panel A state
        await act(async () => { panelA.value = 'alpha'; });
        expect(container.querySelector('.value')!.textContent).toBe('alpha');

        // Switch to B, set its state
        await act(async () => { fireEvent.click(container.querySelector('.go-1')!); });
        await act(async () => { panelB.value = 'beta'; });
        expect(container.querySelector('.value')!.textContent).toBe('beta');

        // Switch back to A — state must survive
        await act(async () => { fireEvent.click(container.querySelector('.go-0')!); });
        expect(container.querySelector('.value')!.textContent).toBe('alpha');

        // And B still has its state
        await act(async () => { fireEvent.click(container.querySelector('.go-1')!); });
        expect(container.querySelector('.value')!.textContent).toBe('beta');
    });
});


// =============================================================================
// 8. External mutation after unmount — state set while unmounted shows on remount
// =============================================================================

describe('state persistence — mutation while unmounted', () => {
    it('external write while unmounted is visible on next mount', async () => {
        const counter = new $Counter();
        const C = $(counter);

        const r1 = render(<C />);
        expect(r1.container.querySelector('.count')!.textContent).toBe('0');
        r1.unmount();

        counter.count = 50;

        const r2 = render(<C />);
        expect(r2.container.querySelector('.count')!.textContent).toBe('50');
    });

    it('multiple external writes while unmounted — last write wins', async () => {
        const panel = new $Panel();
        const P = $(panel);

        const r1 = render(<P />);
        await act(async () => { panel.value = 'first'; });
        r1.unmount();

        panel.value = 'second';
        panel.value = 'third';

        const r2 = render(<P />);
        expect(r2.container.querySelector('.value')!.textContent).toBe('third');
    });
});


// =============================================================================
// 9. Nested direct instances — two levels deep
// =============================================================================

describe('state persistence — nested instance hierarchy', () => {
    it('grandchild state persists when grandparent re-renders', async () => {
        const leaf = new $Counter();

        class $Middle extends $Chemical {
            view() {
                const Leaf = $(leaf);
                return <div className="middle"><Leaf /></div>;
            }
        }
        const middle = new $Middle();

        class $Root extends $Chemical {
            label = 'root';
            setLabel(v: string) { this.label = v; }
            view() {
                const M = $(middle);
                return (
                    <div className="root">
                        <span className="label">{this.label}</span>
                        <button className="relabel" onClick={() => this.setLabel('changed')}>change</button>
                        <M />
                    </div>
                );
            }
        }
        const root = new $Root();
        const Root = $(root);

        const { container } = render(<Root />);

        // Increment leaf
        const btn = container.querySelector('.inc')!;
        await act(async () => { fireEvent.click(btn); });
        await act(async () => { fireEvent.click(btn); });
        expect(container.querySelector('.count')!.textContent).toBe('2');

        // Re-render root
        await act(async () => { fireEvent.click(container.querySelector('.relabel')!); });
        expect(container.querySelector('.label')!.textContent).toBe('changed');

        // Leaf state survived
        expect(container.querySelector('.count')!.textContent).toBe('2');
    });
});
