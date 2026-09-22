import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// A WALKED COLLECTION IS COMPARED BY WHAT IT HOLDS. snapshot() copies a Set, a
// Map and a Date by content, so a scope that only reads one, or leaves it as it
// found it, has nothing to report; and a fresh one holding what the old one
// held is not news to a setter, nor to the settle pass.

async function click(container: HTMLElement, selector = 'button') {
    await act(async () => { fireEvent.click(container.querySelector(selector)!); });
}

describe('a Set, a Map and a Date are walked, so they are compared by content', () => {
    it('a handler that only reads a Set draws nothing', async () => {
        let draws = 0;
        let seen = -1;
        class $S extends $Chemical {
            set = new Set([1, 2]);
            view() {
                draws++;
                return <button onClick={() => { seen = this.set.size; }}>read</button>;
            }
        }
        new $S();
        const { container } = render(React.createElement($(new $S())));
        const before = draws;
        await click(container);
        expect(seen).toBe(2);
        expect(draws - before).toBe(0);
    });

    it('a Set cleared and refilled with the same members is not news', async () => {
        let draws = 0;
        class $S extends $Chemical {
            classes = new Set(['a', 'b']);
            view() {
                draws++;
                return <button onClick={() => { this.classes.clear(); this.classes.add('a'); this.classes.add('b'); }}>again</button>;
            }
        }
        new $S();
        const { container } = render(React.createElement($(new $S())));
        const before = draws;
        await click(container);
        expect(draws - before).toBe(0);
    });

    it('a Map read is quiet and a Map written wakes', async () => {
        let draws = 0;
        class $M extends $Chemical {
            map = new Map([['x', 1]]);
            view() {
                draws++;
                return <div>
                    <span className="n">{this.map.get('x')}</span>
                    <button className="read" onClick={() => { this.map.get('x'); }}>read</button>
                    <button className="write" onClick={() => { this.map.set('x', 2); }}>write</button>
                </div>;
            }
        }
        new $M();
        const { container } = render(React.createElement($(new $M())));
        const before = draws;
        await click(container, '.read');
        expect(draws - before).toBe(0);
        await click(container, '.write');
        expect(container.querySelector('.n')!.textContent).toBe('2');
    });

    it('a Date read is quiet', async () => {
        let draws = 0;
        class $D extends $Chemical {
            when = new Date(1000);
            view() {
                draws++;
                return <button onClick={() => { this.when.getTime(); }}>read</button>;
            }
        }
        new $D();
        const { container } = render(React.createElement($(new $D())));
        const before = draws;
        await click(container);
        expect(draws - before).toBe(0);
    });

    it('assigning a fresh Set holding what the old one held is not news', async () => {
        let draws = 0;
        class $S extends $Chemical {
            set = new Set([1]);
            view() {
                draws++;
                return <button onClick={() => { this.set = new Set([1]); }}>same</button>;
            }
        }
        new $S();
        const { container } = render(React.createElement($(new $S())));
        const before = draws;
        await click(container);
        expect(draws - before).toBe(0);
    });

    it('a fresh equal Set handed as a prop settles', async () => {
        let draws = 0;
        class $Child extends $Chemical {
            $picked = new Set<string>();
            view() { return <span className="n">{this.$picked.size}</span>; }
        }
        const Child = $($Child);
        class $Parent extends $Chemical {
            items = ['a'];
            view() {
                if (++draws > 30) throw new Error('the settle pass never settles');
                return <div>
                    <Child picked={new Set(this.items)} />
                    <button onClick={() => { this.items.push('b'); }}>more</button>
                </div>;
            }
        }
        new $Parent();
        const { container } = render(React.createElement($(new $Parent())));
        expect(container.querySelector('.n')!.textContent).toBe('1');
        await click(container);
        expect(container.querySelector('.n')!.textContent).toBe('2');
        expect(draws).toBeLessThan(12);
    });
});
