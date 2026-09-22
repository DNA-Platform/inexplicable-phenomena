import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// A DECLARED ACCESSOR IS A REACTIVE PROPERTY BY THE SAME RULE AS A FIELD. A get
// with a set, or a get alone, proxying to anywhere — a plain instance, a Map,
// another chemical — is wrapped like a field is activated: a read records the
// getter's answer in the scope, a set is news unless the answer is unchanged,
// and a set during the chemical's own draw or bond is construction.

class Papers {
    is: string[] = [];
    list: string[] = [];
}

async function tick() {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

describe('a declared get/set is a reactive property', () => {
    it('a set through a declared setter, outside any draw, redraws — on an instance drawn directly', async () => {
        class $W extends $Chemical {
            papers = new Papers();
            get $is(): string[] { return this.papers.is; }
            set $is(given: string[]) { this.papers.is = given; }
            view() { return <span className="is">{this.$is.join(' ')}</span>; }
        }
        new $W();
        const w = new $W();
        const { container } = render(React.createElement($(w)));
        expect(container.querySelector('.is')!.textContent).toBe('');
        await act(async () => { w.$is = ['narrative']; });
        await tick();
        expect(container.querySelector('.is')!.textContent).toBe('narrative');
    });

    it('a prop applied through a declared setter reads back through its getter; and a set through it on a face, where the parent gives no prop, redraws — the template road', async () => {
        let face: $M | undefined;
        class $M extends $Chemical {
            papers = new Papers();
            get $mode(): string { return this.papers.is[0] ?? 'none'; }
            set $mode(mode: string) { this.papers.is = [mode]; }
            $M() { this.papers = new Papers(); }
            view() { face = this; return <span className="mode">{this.$mode}</span>; }
        }
        const M = $($M);
        const given = render(<M mode="a" />);
        expect(given.container.querySelector('.mode')!.textContent).toBe('a');
        given.unmount();
        const { container } = render(<M />);
        expect(container.querySelector('.mode')!.textContent).toBe('none');
        await act(async () => { face!.$mode = 'b'; });
        await tick();
        expect(container.querySelector('.mode')!.textContent).toBe('b');
    });

    it('a set through a setter to an equal answer is not news', async () => {
        let draws = 0;
        class $E extends $Chemical {
            papers = new Papers();
            get $is(): string[] { return this.papers.is; }
            set $is(given: string[]) { this.papers.is = given; }
            view() { draws++; return <span>{this.$is.join(' ')}</span>; }
        }
        new $E();
        const e = new $E();
        e.$is = ['a'];
        render(React.createElement($(e)));
        const before = draws;
        await act(async () => { e.$is = ['a']; });
        await tick();
        expect(draws - before).toBe(0);
    });

    it('a getter that proxies to a plain instance, read in a handler and pushed in place, is seen at finalize', async () => {
        class $L extends $Chemical {
            papers = new Papers();
            get list(): string[] { return this.papers.list; }
            view() {
                return <div>
                    <span className="n">{this.list.length}</span>
                    <button onClick={() => { this.list.push('x'); }}>+</button>
                </div>;
            }
        }
        new $L();
        const { container } = render(React.createElement($(new $L())));
        expect(container.querySelector('.n')!.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.n')!.textContent).toBe('1');
    });

    it('a set through a setter inside the chemical\'s own bond constructor is construction, composed inside a parent', async () => {
        let bonds = 0;
        class $Inner extends $Chemical {
            papers = new Papers();
            get $is(): string[] { return this.papers.is; }
            set $is(given: string[]) { this.papers.is = given; }
            $Inner() { bonds++; this.$is = ['set']; }
            view() { return <span className="inner">{this.$is.join(' ')}</span>; }
        }
        const Inner = $($Inner);
        class $Outer extends $Chemical {
            view() { return <div><Inner /></div>; }
        }
        const Outer = $($Outer);
        const { container } = render(<Outer />);
        expect(container.querySelector('.inner')!.textContent).toBe('set');
        expect(bonds).toBeLessThan(6);
    });

    it('a getter alone, read in a handler, is snapshotted: a handler that changes what it answers redraws', async () => {
        class $C extends $Chemical {
            papers = new Papers();
            get count(): number { return this.papers.list.length; }
            view() {
                return <div>
                    <span className="n">{this.count}</span>
                    <button onClick={() => { const was = this.count; this.papers.list.push('x'); void was; }}>+</button>
                </div>;
            }
        }
        new $C();
        const { container } = render(React.createElement($(new $C())));
        expect(container.querySelector('.n')!.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        expect(container.querySelector('.n')!.textContent).toBe('1');
    });
});
