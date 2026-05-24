import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React, { useState } from 'react';
import { $, $Chemical, $check } from '@/abstraction/chemical';

describe('Bond constructor re-runs when children change', () => {
    it('adding a child re-invokes the bond constructor with the new set', async () => {
        let bondCallCount = 0;
        let lastCount = 0;

        class $Item extends $Chemical {
            $label = '';
            view() { return <span className="item">{this.$label}</span>; }
        }

        class $Container extends $Chemical {
            items: $Item[] = [];
            $Container(...items: $Item[]) {
                bondCallCount++;
                this.items = items;
                lastCount = items.length;
            }
            view() {
                return (
                    <div className="container">
                        {this.items.map((item, i) => {
                            const I = $(item);
                            return <I key={i} />;
                        })}
                        <span className="count">{this.items.length}</span>
                    </div>
                );
            }
        }

        const Item = $($Item);
        const Container = $($Container);

        function TestHarness() {
            const [n, setN] = useState(2);
            return (
                <div>
                    <Container>
                        {Array.from({ length: n }, (_, i) => (
                            <Item key={i} label={`Item ${i + 1}`} />
                        ))}
                    </Container>
                    <button className="add" onClick={() => setN(c => c + 1)}>Add</button>
                </div>
            );
        }

        const { container } = render(<TestHarness />);
        expect(container.querySelectorAll('.item').length).toBe(2);
        expect(lastCount).toBe(2);

        await act(async () => {
            container.querySelector('.add')!.click();
        });

        expect(container.querySelectorAll('.item').length).toBe(3);
        expect(lastCount).toBe(3);
        expect(bondCallCount).toBeGreaterThan(1);
    });

    it('removing a child updates the bond constructor argument list', async () => {
        let lastLabels: string[] = [];

        class $Tag extends $Chemical {
            $label = '';
            view() { return <span className="tag">{this.$label}</span>; }
        }

        class $TagList extends $Chemical {
            tags: $Tag[] = [];
            $TagList(...tags: $Tag[]) {
                this.tags = tags;
                lastLabels = tags.map(t => t.$label);
            }
            view() {
                return (
                    <div className="tags">
                        {this.tags.map((tag, i) => {
                            const T = $(tag);
                            return <T key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Tag = $($Tag);
        const TagList = $($TagList);

        function Harness() {
            const [items, setItems] = useState(['A', 'B', 'C']);
            return (
                <div>
                    <TagList>
                        {items.map(l => <Tag key={l} label={l} />)}
                    </TagList>
                    <button className="remove" onClick={() => setItems(i => i.slice(0, -1))}>Remove</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(lastLabels).toEqual(['A', 'B', 'C']);
        expect(container.querySelectorAll('.tag').length).toBe(3);

        await act(async () => { container.querySelector('.remove')!.click(); });
        expect(lastLabels).toEqual(['A', 'B']);
        expect(container.querySelectorAll('.tag').length).toBe(2);

        await act(async () => { container.querySelector('.remove')!.click(); });
        expect(lastLabels).toEqual(['A']);
        expect(container.querySelectorAll('.tag').length).toBe(1);
    });

    it('changing a prop on a child is visible on the next render', async () => {
        class $Card extends $Chemical {
            $title = '';
            view() { return <span className="card">{this.$title}</span>; }
        }

        const Card = $($Card);

        function Harness() {
            const [title, setTitle] = useState('first');
            return (
                <div>
                    <Card title={title} />
                    <button className="swap" onClick={() => setTitle('second')}>Swap</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(container.querySelector('.card')!.textContent).toBe('first');

        await act(async () => { container.querySelector('.swap')!.click(); });
        expect(container.querySelector('.card')!.textContent).toBe('second');
    });

    it('bond ctor sees updated children after parent state change', async () => {
        let ctorCalls = 0;
        let lastTotal = 0;

        class $Score extends $Chemical {
            $value = 0;
            view() { return <span className="score">{this.$value}</span>; }
        }

        class $Scoreboard extends $Chemical {
            scores: $Score[] = [];
            $Scoreboard(...scores: $Score[]) {
                ctorCalls++;
                this.scores = scores;
                lastTotal = scores.reduce((s, sc) => s + sc.$value, 0);
            }
            view() {
                return (
                    <div className="board">
                        <span className="total">{lastTotal}</span>
                        {this.scores.map((s, i) => {
                            const S = $(s);
                            return <S key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Score = $($Score);
        const Scoreboard = $($Scoreboard);

        function Harness() {
            const [vals, setVals] = useState([10, 20]);
            return (
                <div>
                    <Scoreboard>
                        {vals.map((v, i) => <Score key={i} value={v} />)}
                    </Scoreboard>
                    <button className="update" onClick={() => setVals([10, 20, 30])}>Add</button>
                </div>
            );
        }

        const { container } = render(<Harness />);
        expect(lastTotal).toBe(30);
        expect(container.querySelectorAll('.score').length).toBe(2);

        await act(async () => { container.querySelector('.update')!.click(); });
        expect(lastTotal).toBe(60);
        expect(container.querySelectorAll('.score').length).toBe(3);
        expect(ctorCalls).toBeGreaterThan(1);
    });

    it('$check accepts subclass where parent type is expected', () => {
        class $Base extends $Chemical {
            $label = '';
            view() { return <span>{this.$label}</span>; }
        }
        class $Extended extends $Base {
            extra = 'bonus';
            view() { return <span>{this.$label} ({this.extra})</span>; }
        }

        class $Host extends $Chemical {
            items: $Base[] = [];
            $Host(...items: $Base[]) {
                this.items = items.map(i => $check(i, $Base));
            }
            view() {
                return <div className="host">{this.items.length} items</div>;
            }
        }

        const Base = $($Base);
        const Extended = $($Extended);
        const Host = $($Host);

        const { container } = render(
            <Host>
                <Base label="plain" />
                <Extended label="fancy" />
            </Host>
        );

        expect(container.querySelector('.host')!.textContent).toBe('2 items');
    });
});
