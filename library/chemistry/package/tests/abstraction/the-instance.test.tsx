import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';
import { $Atom } from '@/abstraction/atom';
import { $isTemplate$, $$template$$ } from '@/implementation/symbols';

// THE INSTANCE OWNS ITS FIELDS, AND THE TEMPLATE IS THE FRAMEWORK'S. Doug, 2026-10-08:
// "property initializers are sadly the class constructor. If you are initializing
// reactive properties that aren't value types, they need to be assigned in the bond
// constructor. That's what it is for. But we need basic field initialization to work
// for value types like numbers and strings." · "No first instance for the template!
// That means using the template isn't idempotent." · "I want the mistake to be that
// every instance has a singleton, not that every property assigned like that is
// silently nonreactive."

async function settled() {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

async function drawn(element: React.ReactElement) {
    let container!: HTMLElement;
    await act(async () => { container = render(element).container; });
    await settled();
    return container;
}

describe("the template is the framework's", () => {
    it('an instance an author constructs is never the template, and $(Constructor) makes one', () => {
        class $P extends $Chemical {
            n = 0;
            view() { return <i>{this.n}</i>; }
        }
        const mine = new $P();
        expect(mine[$isTemplate$]).toBe(false);
        expect(Object.prototype.hasOwnProperty.call($P, $$template$$)).toBe(false);
        const P = $($P);
        const template = (P as any).$chemical;
        expect(template[$isTemplate$]).toBe(true);
        expect(template).not.toBe(mine);
        expect(new $P()[$isTemplate$]).toBe(false);
        expect((P as any).$chemical).toBe(template);
    });

    it('a held instance lifted is the component, whichever instance of its class was constructed first', async () => {
        class $Label extends $Chemical {
            text = 'a';
            view() { return <b>{this.text}</b>; }
        }
        class $Page extends $Chemical {
            label = new $Label();
            view() {
                const Label = $(this.label);
                return <div><Label /><button onClick={() => { this.label.text = 'b'; }}>write</button></div>;
            }
        }
        const Page = $($Page);
        const container = await drawn(<Page />);
        expect(container.querySelector('b')!.textContent).toBe('a');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('b')!.textContent).toBe('b');
    });
});

describe('the instance owns its fields', () => {
    it('a field initialized on the template is a reactive property of every instance, assigned to it: a template written afterwards is never consulted', async () => {
        const cells: any[] = [];
        class $Cell extends $Chemical {
            $i = 0;
            n = 0;
            m = 0;
            view() { cells[this.$i] = this; return <i>{this.n}:{this.m}</i>; }
        }
        const Cell = $($Cell);
        const template = (Cell as any).$chemical;
        const container = await drawn(<div><Cell i={0} /><Cell i={1} /></div>);
        const texts = () => Array.from(container.querySelectorAll('i')).map(one => one.textContent);
        expect(texts()).toEqual(['0:0', '0:0']);
        await act(async () => { template.n = 5; });
        await settled();
        await act(async () => { cells[1].m = 1; });
        await settled();
        expect(texts()).toEqual(['0:0', '0:1']);
        await act(async () => { cells[0].n = 1; });
        await settled();
        expect(texts()).toEqual(['1:0', '0:1']);
    });

    it('a field initialized with a reference is the one instance every mount holds, reactive: a write from one mount is drawn by all', async () => {
        const desks: any[] = [];
        class $Shared extends $Chemical {
            v = 0;
            view() { return <u>{this.v}</u>; }
        }
        class $Desk extends $Chemical {
            $i = 0;
            shared = new $Shared();
            view() { desks[this.$i] = this; return <i>{this.shared.v}</i>; }
            bump() { this.shared.v++; }
        }
        const Desk = $($Desk);
        // The one shared instance, lifted once so its fields are live — a held chemical is activated when lifted.
        const Shared = $((Desk as any).$chemical.shared);
        const container = await drawn(<div><Desk i={0} /><Desk i={1} /><Shared /></div>);
        expect(desks[0].shared).toBe(desks[1].shared);
        expect(desks[0].shared).toBe((Desk as any).$chemical.shared);
        await act(async () => { desks[0].bump(); });
        await settled();
        expect(Array.from(container.querySelectorAll('i')).map(one => one.textContent)).toEqual(['1', '1']);
        expect(container.querySelector('u')!.textContent).toBe('1');
    });

    it('an atom mounts itself: the drawn atom is the singleton, not a derivative of it', async () => {
        let jar: any;
        class $Jar extends $Atom {
            charge = 0;
            view() { jar = this; return <b>{this.charge}</b>; }
        }
        const Jar = $($Jar);
        const container = await drawn(<Jar />);
        expect(jar).toBe((Jar as any).$chemical);
        expect(jar[$isTemplate$]).toBe(true);
        await act(async () => { jar.charge = 3; });
        await settled();
        expect(container.querySelector('b')!.textContent).toBe('3');
    });
});
