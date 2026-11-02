import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, children } from '@/index';

// What a view writes at its top belongs to the chemical whose view wrote it.
//
// The synthesis parents a bond's children; a chemical written in a view had no
// parent until it said where it belonged with `on`. Now every topmost chemical
// element of a drawing — one no other chemical element of the same drawing
// encloses — is given a default assignment to the writer, completed on mount
// the way a written one is: it takes the writer as its parent, and `$` resolves
// outward from it. Nothing is held for it; a parent is a fact about the tree.

const met: { at: string; parent: any; asked?: any }[] = [];

class $Held extends $Chemical {
    $mark = '';
    view() { met.push({ at: this.$mark, parent: this.parent }); return <i>{this.$mark}</i>; }
}
const Held = $($Held);

class $Inner extends $Chemical {
    view() { met.push({ at: 'inner', parent: this.parent }); return <b>inner</b>; }
}
const Inner = $($Inner);

class $Other extends $Inner { }
const Other = $($Other);

class $Box extends $Chemical {
    view() { met.push({ at: 'box', parent: this.parent }); return <u>{this[children]}</u>; }
}
const Box = $($Box);

class $Asks extends $Chemical {
    view() { met.push({ at: 'asks', parent: this.parent, asked: $(Inner) }); return <s>asks</s>; }
}
const Asks = $($Asks);

class $Owner extends $Chemical {
    held!: $Held;
    $Owner(held: $Held) { this.held = held; }
    view() { return null; }
}
const Owner = $($Owner);

const drawn = { page: undefined as any };

async function show(Page: any): Promise<HTMLElement> {
    met.length = 0;
    let host!: HTMLElement;
    await act(async () => { host = render(React.createElement(Page)).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return host;
}

const last = (at: string) => [...met].reverse().find(one => one.at === at)!;

describe('what a view writes at its top belongs to the chemical whose view wrote it', () => {
    it('a written chemical has its writer as parent once it has mounted', async () => {
        class $Page extends $Chemical {
            view() { drawn.page = this; return <Held mark="one" />; }
        }
        await show($($Page));
        expect(last('one').parent).toBe(drawn.page);
    });

    it('and every top of a fragment belongs to it', async () => {
        class $Page extends $Chemical {
            view() { drawn.page = this; return <><Held mark="one" /><Held mark="two" /></>; }
        }
        await show($($Page));
        expect(last('one').parent).toBe(drawn.page);
        expect(last('two').parent).toBe(drawn.page);
    });

    it('AND WHAT A WRITTEN CHEMICAL ENCLOSES BELONGS TO IT, NOT TO THE WRITER', async () => {
        class $Page extends $Chemical {
            view() { drawn.page = this; return <Box><Inner /></Box>; }
        }
        await show($($Page));
        expect(last('box').parent).toBe(drawn.page);
        expect(last('inner').parent).toBeInstanceOf($Box);
    });

    it('AND A BONDED CHILD DRAWN ELSEWHERE KEEPS ITS OWN PLACE', async () => {
        const owner = $(<Owner><Held mark="kept" /></Owner>) as unknown as $Owner;
        class $Page extends $Chemical {
            view() { const Kept = $(owner.held); return <Kept />; }
        }
        await show($($Page));
        expect(last('kept').parent).toBe(owner);
    });

    it('and a written on still says where it belongs', async () => {
        class $Page extends $Chemical {
            one?: $Held;
            view() { drawn.page = this; return <Held mark="mine" on={() => this.one} />; }
        }
        await show($($Page));
        expect(drawn.page.one?.$mark).toBe('mine');
        expect(last('mine').parent).toBe(drawn.page);
    });

    it('AND IT IS TOLD WHERE IT BELONGS BEFORE IT IS BONDED, so its bond constructor resolves outward too', async () => {
        const bonded: { parent: any; asked: any }[] = [];
        class $Early extends $Chemical {
            $Early() { bonded.push({ parent: this.parent, asked: $(Inner) }); }
            view() { return <em>early</em>; }
        }
        const Early = $($Early);
        class $Page extends $Chemical {
            view() { drawn.page = this; return <Early />; }
        }
        const Page = $($Page);
        $(Page, Inner)(Other);
        await show(Page);
        expect(bonded.length).toBeGreaterThan(0);
        expect(bonded[0].parent).toBe(drawn.page);
        expect(bonded[0].asked).toBe(Other);
    });

    it('and the representative resolves outward from a written chemical', async () => {
        class $Page extends $Chemical {
            view() { return <Asks />; }
        }
        const Page = $($Page);
        $(Page, Inner)(Other);
        await show(Page);
        expect(last('asks').asked).toBe(Other);
    });

    it('AND BEING GIVEN A PARENT WAKES NOTHING: the writer is drawn no more than one that writes no chemical', async () => {
        const drawings = async (node: () => React.ReactNode) => {
            let count = 0;
            class $Page extends $Chemical { view() { count++; return node(); } }
            await show($($Page));
            return count;
        };
        const nothing = await drawings(() => <i>nothing</i>);
        expect(await drawings(() => <Held mark="quiet" />)).toBe(nothing);
        expect(await drawings(() => <><Held mark="one" /><Held mark="two" /></>)).toBe(nothing);
    });
});
