import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { $, $Chemical, $check } from '@/abstraction/chemical';

// =============================================================================
// Synthesis — Bond Constructor Features
//
// Bond constructors run when a parent chemical receives children through JSX.
// These tests verify the FEATURE: chemicals persist their state across
// re-renders when their children haven't changed, and bond constructors
// re-run when children DO change.
//
// The key behaviors:
//   1. Same children → bond ctor skipped → child state preserved
//   2. Different children → bond ctor re-runs → parent sees new set
//   3. Child state changes propagate up to re-render the parent
// =============================================================================


// =============================================================================
// 1. Bond constructor skips when children are unchanged
// =============================================================================

describe('bond constructor — children unchanged, state preserved', () => {
    it('child state survives when parent re-renders from its own state change', async () => {
        class $Item extends $Chemical {
            $label = '';
            count = 0;
            inc() { this.count++; }
            view() {
                return (
                    <div className="item">
                        <span className="label">{this.$label}</span>
                        <span className="count">{String(this.count)}</span>
                        <button className="inc" onClick={this.inc}>+</button>
                    </div>
                );
            }
        }

        class $Shelf extends $Chemical {
            title = 'shelf';
            items: $Item[] = [];

            $Shelf(...items: $Item[]) {
                this.items = items.map(i => $check(i, $Item));
            }

            setTitle(t: string) { this.title = t; }

            view() {
                return (
                    <div className="shelf">
                        <span className="title">{this.title}</span>
                        <button className="rename" onClick={() => this.setTitle('renamed')}>rename</button>
                        {this.items.map((item, i) => {
                            const I = $(item);
                            return <I key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Item = $($Item);
        const Shelf = $($Shelf);

        const { container } = render(
            <Shelf>
                <Item label="A" />
                <Item label="B" />
            </Shelf>
        );

        // Increment item A three times
        const items = container.querySelectorAll('.item');
        const btnA = items[0].querySelector('.inc')!;
        await act(async () => { fireEvent.click(btnA); });
        await act(async () => { fireEvent.click(btnA); });
        await act(async () => { fireEvent.click(btnA); });
        expect(items[0].querySelector('.count')!.textContent).toBe('3');
        expect(items[1].querySelector('.count')!.textContent).toBe('0');

        // Parent re-renders from its own state change
        await act(async () => { fireEvent.click(container.querySelector('.rename')!); });
        expect(container.querySelector('.title')!.textContent).toBe('renamed');

        // Child state survived — bond constructor was NOT re-invoked
        const afterItems = container.querySelectorAll('.item');
        expect(afterItems[0].querySelector('.count')!.textContent).toBe('3');
        expect(afterItems[1].querySelector('.count')!.textContent).toBe('0');
    });

    it('bond ctor call count stays at 1 when children are the same on re-render', async () => {
        let bondCalls = 0;

        class $Widget extends $Chemical {
            $name = '';
            view() { return <span className="widget">{this.$name}</span>; }
        }

        class $Dashboard extends $Chemical {
            color = 'blue';
            widgets: $Widget[] = [];

            $Dashboard(...widgets: $Widget[]) {
                bondCalls++;
                this.widgets = widgets;
            }

            repaint() { this.color = this.color === 'blue' ? 'red' : 'blue'; }

            view() {
                return (
                    <div className="dashboard" style={{ color: this.color }}>
                        <button className="repaint" onClick={this.repaint}>repaint</button>
                        {this.widgets.map((w, i) => {
                            const W = $(w);
                            return <W key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Widget = $($Widget);
        const Dashboard = $($Dashboard);

        const { container } = render(
            <Dashboard>
                <Widget name="A" />
                <Widget name="B" />
            </Dashboard>
        );

        expect(bondCalls).toBe(1);

        // Re-render parent 3 times without changing children
        await act(async () => { fireEvent.click(container.querySelector('.repaint')!); });
        await act(async () => { fireEvent.click(container.querySelector('.repaint')!); });
        await act(async () => { fireEvent.click(container.querySelector('.repaint')!); });

        // Bond constructor should NOT have been called again
        expect(bondCalls).toBe(1);
    });
});


// =============================================================================
// 2. Bond constructor re-runs when children change
// =============================================================================

describe('bond constructor — children changed, ctor re-runs', () => {
    it('adding a child triggers bond ctor with the new full set', async () => {
        let lastNames: string[] = [];

        class $Entry extends $Chemical {
            $name = '';
            view() { return <span className="entry">{this.$name}</span>; }
        }

        class $Roster extends $Chemical {
            entries: $Entry[] = [];

            $Roster(...entries: $Entry[]) {
                this.entries = entries;
                lastNames = entries.map(e => e.$name);
            }

            view() {
                return (
                    <div className="roster">
                        {this.entries.map((e, i) => {
                            const E = $(e);
                            return <E key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Entry = $($Entry);
        const Roster = $($Roster);

        function Harness() {
            const [names, setNames] = useState(['Alice', 'Bob']);
            return (
                <div>
                    <Roster>
                        {names.map(n => <Entry key={n} name={n} />)}
                    </Roster>
                    <button className="add" onClick={() => setNames(ns => [...ns, 'Carol'])}>add</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(lastNames).toEqual(['Alice', 'Bob']);

        await act(async () => { fireEvent.click(container.querySelector('.add')!); });
        expect(lastNames).toEqual(['Alice', 'Bob', 'Carol']);
        expect(container.querySelectorAll('.entry').length).toBe(3);
    });

    it('removing a child triggers bond ctor with smaller set', async () => {
        let lastCount = 0;

        class $Chip extends $Chemical {
            $value = '';
            view() { return <span className="chip">{this.$value}</span>; }
        }

        class $ChipBar extends $Chemical {
            chips: $Chip[] = [];

            $ChipBar(...chips: $Chip[]) {
                this.chips = chips;
                lastCount = chips.length;
            }

            view() {
                return (
                    <div className="bar">
                        {this.chips.map((c, i) => {
                            const C = $(c);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Chip = $($Chip);
        const ChipBar = $($ChipBar);

        function Harness() {
            const [items, setItems] = useState(['x', 'y', 'z']);
            return (
                <div>
                    <ChipBar>
                        {items.map(v => <Chip key={v} value={v} />)}
                    </ChipBar>
                    <button className="pop" onClick={() => setItems(is => is.slice(0, -1))}>pop</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(lastCount).toBe(3);

        await act(async () => { fireEvent.click(container.querySelector('.pop')!); });
        expect(lastCount).toBe(2);

        await act(async () => { fireEvent.click(container.querySelector('.pop')!); });
        expect(lastCount).toBe(1);
    });

    it('replacing all children triggers fresh bond ctor invocation', async () => {
        let lastLabels: string[] = [];
        let bondCalls = 0;

        class $Tab extends $Chemical {
            $label = '';
            view() { return <span className="tab">{this.$label}</span>; }
        }

        class $TabGroup extends $Chemical {
            tabs: $Tab[] = [];

            $TabGroup(...tabs: $Tab[]) {
                bondCalls++;
                this.tabs = tabs;
                lastLabels = tabs.map(t => t.$label);
            }

            view() {
                return (
                    <div className="tabs">
                        {this.tabs.map((t, i) => {
                            const T = $(t);
                            return <T key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Tab = $($Tab);
        const TabGroup = $($TabGroup);

        function Harness() {
            const [set, setSet] = useState(['Home', 'Settings']);
            return (
                <div>
                    <TabGroup>
                        {set.map(s => <Tab key={s} label={s} />)}
                    </TabGroup>
                    <button className="swap" onClick={() => setSet(['Profile', 'Logout'])}>swap</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(lastLabels).toEqual(['Home', 'Settings']);
        const initialCalls = bondCalls;

        await act(async () => { fireEvent.click(container.querySelector('.swap')!); });
        expect(lastLabels).toEqual(['Profile', 'Logout']);
        expect(bondCalls).toBeGreaterThan(initialCalls);
    });
});


// =============================================================================
// 3. Cross-chemical reactivity — child writes propagate to parent
// =============================================================================

describe('cross-chemical reactivity — parent re-renders on child state change', () => {
    it('parent reads child property and re-renders when child mutates', async () => {
        class $Voter extends $Chemical {
            $name = '';
            voted = false;
            vote() { this.voted = true; }
            view() {
                return (
                    <div className={`voter-${this.$name}`}>
                        <button className="vote" onClick={this.vote}>vote</button>
                        <span className="status">{this.voted ? 'voted' : 'pending'}</span>
                    </div>
                );
            }
        }

        class $Poll extends $Chemical {
            voters: $Voter[] = [];

            $Poll(...voters: $Voter[]) {
                this.voters = voters.map(v => $check(v, $Voter));
            }

            get tally() { return this.voters.filter(v => v.voted).length; }

            view() {
                return (
                    <div className="poll">
                        <span className="tally">{String(this.tally)}</span>
                        {this.voters.map((v, i) => {
                            const V = $(v);
                            return <V key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Voter = $($Voter);
        const Poll = $($Poll);

        const { container } = render(
            <Poll>
                <Voter name="alice" />
                <Voter name="bob" />
                <Voter name="carol" />
            </Poll>
        );

        expect(container.querySelector('.tally')!.textContent).toBe('0');

        // Alice votes — parent tally should update
        await act(async () => {
            fireEvent.click(container.querySelector('.voter-alice .vote')!);
        });
        expect(container.querySelector('.tally')!.textContent).toBe('1');

        // Bob votes
        await act(async () => {
            fireEvent.click(container.querySelector('.voter-bob .vote')!);
        });
        expect(container.querySelector('.tally')!.textContent).toBe('2');
    });

    it('parent conditional rendering reacts to child state', async () => {
        class $Toggle extends $Chemical {
            on = false;
            flip() { this.on = !this.on; }
            view() {
                return (
                    <div className="toggle">
                        <button className="flip" onClick={this.flip}>flip</button>
                    </div>
                );
            }
        }

        class $Gate extends $Chemical {
            toggle!: $Toggle;

            $Gate(toggle: $Toggle) {
                this.toggle = $check(toggle, $Toggle);
            }

            view() {
                const T = $(this.toggle);
                return (
                    <div className="gate">
                        <T />
                        {this.toggle.on
                            ? <span className="open">OPEN</span>
                            : <span className="closed">CLOSED</span>
                        }
                    </div>
                );
            }
        }

        const Toggle = $($Toggle);
        const Gate = $($Gate);

        const { container } = render(
            <Gate>
                <Toggle />
            </Gate>
        );

        expect(container.querySelector('.closed')).not.toBeNull();
        expect(container.querySelector('.open')).toBeNull();

        await act(async () => {
            fireEvent.click(container.querySelector('.flip')!);
        });

        expect(container.querySelector('.open')).not.toBeNull();
        expect(container.querySelector('.closed')).toBeNull();
    });
});


// =============================================================================
// 4. Dynamic children created at runtime persist across parent re-renders
// =============================================================================

describe('dynamically created children — runtime additions persist', () => {
    it('items added via new $Class() survive parent re-render', async () => {
        class $Note extends $Chemical {
            $text = '';
            starred = false;
            star() { this.starred = true; }
            view() {
                return (
                    <div className="note">
                        <span className="text">{this.$text}</span>
                        <span className="star">{this.starred ? '★' : '☆'}</span>
                        <button className="star-btn" onClick={this.star}>star</button>
                    </div>
                );
            }
        }

        class $Notebook extends $Chemical {
            notes: $Note[] = [];
            color = 'white';

            $Notebook(...notes: $Note[]) {
                this.notes = notes.map(n => $check(n, $Note));
            }

            addNote(text: string) {
                const note = new $Note();
                note.$text = text;
                this.notes = [...this.notes, note];
            }

            repaint() { this.color = this.color === 'white' ? 'yellow' : 'white'; }

            view() {
                return (
                    <div className="notebook" style={{ background: this.color }}>
                        <button className="add" onClick={() => this.addNote('New note')}>add</button>
                        <button className="repaint" onClick={this.repaint}>repaint</button>
                        <span className="count">{String(this.notes.length)}</span>
                        {this.notes.map((n, i) => {
                            const N = $(n);
                            return <N key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Note = $($Note);
        const Notebook = $($Notebook);

        const { container } = render(
            <Notebook>
                <Note text="first" />
            </Notebook>
        );

        expect(container.querySelector('.count')!.textContent).toBe('1');

        // Add a dynamic note
        await act(async () => { fireEvent.click(container.querySelector('.add')!); });
        expect(container.querySelector('.count')!.textContent).toBe('2');

        // Star the dynamic note
        const notes = container.querySelectorAll('.note');
        await act(async () => { fireEvent.click(notes[1].querySelector('.star-btn')!); });
        expect(notes[1].querySelector('.star')!.textContent).toBe('★');

        // Repaint parent — dynamic note and its state should survive
        await act(async () => { fireEvent.click(container.querySelector('.repaint')!); });
        const afterNotes = container.querySelectorAll('.note');
        expect(afterNotes.length).toBe(2);
        expect(afterNotes[1].querySelector('.star')!.textContent).toBe('★');
    });
});


// =============================================================================
// 5. Polymorphic bond constructors — subclass children accepted via $check
// =============================================================================

describe('polymorphic bond constructor — subclass children', () => {
    it('parent accepts mixed subclass types through $check against base', async () => {
        class $Shape extends $Chemical {
            $name = '';
            area(): number { return 0; }
            view() {
                return <span className="shape">{this.$name}: {String(this.area())}</span>;
            }
        }

        class $Circle extends $Shape {
            $radius = 1;
            area() { return Math.round(Math.PI * this.$radius * this.$radius); }
        }

        class $Square extends $Shape {
            $side = 1;
            area() { return this.$side * this.$side; }
        }

        class $Canvas extends $Chemical {
            shapes: $Shape[] = [];

            $Canvas(...shapes: $Shape[]) {
                this.shapes = shapes.map(s => $check(s, $Shape));
            }

            get totalArea() {
                return this.shapes.reduce((sum, s) => sum + s.area(), 0);
            }

            view() {
                return (
                    <div className="canvas">
                        <span className="total">{String(this.totalArea)}</span>
                        {this.shapes.map((s, i) => {
                            const S = $(s);
                            return <S key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Circle = $($Circle);
        const Square = $($Square);
        const Canvas = $($Canvas);

        const { container } = render(
            <Canvas>
                <Circle name="C" radius={5} />
                <Square name="S" side={4} />
            </Canvas>
        );

        // Circle area: round(PI * 25) = 79, Square area: 16, total: 95
        expect(container.querySelector('.total')!.textContent).toBe('95');
        expect(container.querySelectorAll('.shape').length).toBe(2);
    });
});
