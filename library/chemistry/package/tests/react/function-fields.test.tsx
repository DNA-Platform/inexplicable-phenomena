import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// A FIELD IS A VALUE EVEN WHEN IT HOLDS A FUNCTION; ONLY A FUNCTION DECLARED ON THE
// PROTOTYPE IS A METHOD. So a prop with a default handler is one field, as React's
// `({ onPick = noop })` is: given, the given one is called; not given, the default;
// written after mount, the view follows.

async function settled() {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

describe('a field whose default is a function is a prop like any other', () => {
    it('given as a prop, the given function is called', async () => {
        class $Picker extends $Chemical {
            $onPick = () => 'default';
            view() { return <span className="picked">{this.$onPick()}</span>; }
        }
        const Picker = $($Picker);
        let container!: HTMLElement;
        await act(async () => { container = render(<Picker onPick={() => 'given'} />).container; });
        expect(container.querySelector('.picked')!.textContent).toBe('given');
    });

    it('not given, the default is called', async () => {
        class $Picker extends $Chemical {
            $onPick = () => 'default';
            view() { return <span className="picked">{this.$onPick()}</span>; }
        }
        const Picker = $($Picker);
        let container!: HTMLElement;
        await act(async () => { container = render(<Picker />).container; });
        expect(container.querySelector('.picked')!.textContent).toBe('default');
    });

    it('written after mount, the view follows, at the cost of any other write', async () => {
        const draws = { picker: 0, plain: 0 };
        class $Picker extends $Chemical {
            $onPick = () => 'default';
            view() { draws.picker++; return <span className="picked">{this.$onPick()}</span>; }
        }
        class $Plain extends $Chemical {
            $label = 'default';
            view() { draws.plain++; return <span className="picked">{this.$label}</span>; }
        }
        new $Picker();
        new $Plain();
        const picker = new $Picker();
        const plain = new $Plain();
        const { container } = render(<>{React.createElement($(picker))}{React.createElement($(plain))}</>);
        await settled();
        const before = { picker: draws.picker, plain: draws.plain };
        await act(async () => { picker.$onPick = () => 'later'; plain.$label = 'later'; });
        await settled();
        expect(container.querySelectorAll('.picked')[0].textContent).toBe('later');
        expect(draws.picker - before.picker).toBe(draws.plain - before.plain);
    });

    it('a method on the prototype is still a method: called from outside any handler, its in-place change is seen', async () => {
        class $List extends $Chemical {
            items: string[] = [];
            add() { this.items.push('x'); }
            view() { return <span className="n">{this.items.length}</span>; }
        }
        new $List();
        const list = new $List();
        const { container } = render(React.createElement($(list)));
        await settled();
        await act(async () => { list.add(); });
        await settled();
        expect(container.querySelector('.n')!.textContent).toBe('1');
    });
});
