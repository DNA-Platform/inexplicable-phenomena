import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

// A CHEMICAL IS NOT DIRTY WHILE IT DRAWS; ITS DIRTINESS STARTS AFTER RENDER.
// Doug, 2026-09-24: "when view is running, and render in general, we don't need
// to track changes on the executing chemical itself, because we know render
// happens last in the pipeline because its the result of view. Other chemicals
// might change how they look, but we have already rendered the current one."
// A change made to the drawing chemical during its draw is in its output or is
// seen by the settle pass; a change to another chemical still wakes that one.

async function settled() {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

async function drawn(element: React.ReactElement) {
    let container!: HTMLElement;
    await act(async () => { container = render(element).container; });
    await settled();
    return container;
}

// A host whose view calls two methods of a mounted chemical, one taking a class
// away from the host's Set and one giving it back, as an annotation's erase and
// defines do. Each call runs in a scope of its own.
function world(meddles: boolean) {
    const draws = { host: 0, outer: 0 };
    let mark: any;
    class $Mark extends $Chemical {
        erase(host: any) { host.classes.delete('marked'); }
        defines(host: any) { host.classes.add('marked'); }
        view() { mark = this; return <i />; }
    }
    const Mark = $($Mark);
    class $Host extends $Chemical {
        classes = new Set<string>();
        title = 'a';
        view() {
            if (++draws.host > 60) throw new Error('the host never settles');
            if (meddles && mark) {
                mark.erase(this);
                mark.defines(this);
            }
            return (
                <div className={[...this.classes].join(' ') || undefined}>
                    <span className="title">{this.title}</span>
                    <Mark />
                </div>
            );
        }
    }
    class $Outer extends $Chemical {
        host: any = undefined;
        view() {
            if (++draws.outer > 60) throw new Error('the parent never settles');
            const Host = $(this.host);
            return <section><Host /></section>;
        }
    }
    new $Host();
    new $Outer();
    return { draws, $Host, $Outer, mark: () => mark };
}

describe('a chemical is not dirty while it draws', () => {
    it('another chemical takes a class away and gives it back during the draw: the host settles, and a change costs what it costs a host nobody touches', async () => {
        const plain = world(false);
        const untouched = new plain.$Host();
        await drawn(React.createElement($(untouched)));
        const plainBefore = plain.draws.host;
        await act(async () => { untouched.title = 'b'; });
        await settled();
        const cost = plain.draws.host - plainBefore;

        const touched = world(true);
        const host = new touched.$Host();
        const container = await drawn(React.createElement($(host)));
        expect(container.querySelector('div')!.className).toBe('marked');
        const before = touched.draws.host;
        await act(async () => { host.title = 'b'; });
        await settled();
        expect(container.querySelector('.title')!.textContent).toBe('b');
        expect(touched.draws.host - before).toBe(cost);
    });

    it('and inside a parent, the parent draws no more than the parent of a host nobody touches', async () => {
        const outers: number[] = [];
        for (const meddles of [false, true]) {
            const w = world(meddles);
            const host = new w.$Host();
            const outer = new w.$Outer();
            outer.host = host;
            host.parent = outer;
            await drawn(React.createElement($(outer)));
            outers.push(w.draws.outer);
        }
        expect(outers[1]).toBe(outers[0]);
    });

    it('the same method called outside the draw still redraws the host', async () => {
        const w = world(false);
        const host = new w.$Host();
        const container = await drawn(React.createElement($(host)));
        expect(container.querySelector('div')!.className).toBe('');
        await act(async () => { w.mark().defines(host); });
        await settled();
        expect(container.querySelector('div')!.className).toBe('marked');
    });
});

describe('another chemical changed during a draw is woken, and the drawing chemical is not', () => {
    it('a method of another chemical changes it: that chemical paints the change, and the host draws as often as when nothing changes', async () => {
        const hosts: number[] = [];
        let painted = '';
        for (const bumps of [false, true]) {
            const draws = { host: 0 };
            let other: any;
            class $Other extends $Chemical {
                n = 0;
                bump() { this.n++; }
                view() { other = this; return <b className="n">{this.n}</b>; }
            }
            const Other = $($Other);
            class $Host extends $Chemical {
                view() {
                    if (++draws.host > 60) throw new Error('the host never settles');
                    if (bumps && other && other.n < 1) other.bump();
                    return <div><Other /></div>;
                }
            }
            new $Host();
            const container = await drawn(React.createElement($(new $Host())));
            hosts.push(draws.host);
            if (bumps) painted = container.querySelector('.n')!.textContent!;
        }
        expect(painted).toBe('1');
        expect(hosts[1]).toBe(hosts[0]);
    });

    it('a draw writes a mounted child: the child paints the change, and the drawing host draws as often as when nothing is written', async () => {
        const hosts: number[] = [];
        let painted = '';
        for (const writes of [false, true]) {
            const draws = { host: 0 };
            let mounted = false;
            class $Child extends $Chemical {
                n = 0;
                view() { mounted = true; return <b className="n">{this.n}</b>; }
            }
            new $Child();
            class $Host extends $Chemical {
                child: any = undefined;
                view() {
                    if (++draws.host > 60) throw new Error('the host never settles');
                    if (writes && mounted) this.child.n = 1;
                    const Child = $(this.child);
                    return <div><Child /></div>;
                }
            }
            new $Host();
            const host = new $Host();
            const child = new $Child();
            host.child = child;
            child.parent = host;
            const container = await drawn(React.createElement($(host)));
            hosts.push(draws.host);
            if (writes) painted = container.querySelector('.n')!.textContent!;
        }
        expect(painted).toBe('1');
        expect(hosts[1]).toBe(hosts[0]);
    });
});
