import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';
import { $Theme } from '@/abstraction/theme';
import { selection } from '@/abstraction/styled';
import { children, selector, theme, memoize } from '@/implementation/symbols';

// A CHEMICAL DRAWS WHEN ITS OWN STATE, ITS PROPS, ITS THEME, OR A CHEMICAL IT READ
// WHILE DRAWING CHANGED — and otherwise answers what it drew last. So a parent's
// redraw is not its children's, a child's write is not its siblings', and a view
// that reads another chemical follows it. Every promise here counts draws.

async function settled() {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
}

async function drawn(element: React.ReactElement) {
    let container!: HTMLElement;
    await act(async () => { container = render(element).container; });
    await settled();
    return container;
}

// A book of N chapters, two paragraphs each, every draw counted per instance.
function shelf(N = 20) {
    const draws = new Map<any, number>();
    const count = (one: any) => draws.set(one, (draws.get(one) ?? 0) + 1);
    const of = (one: any) => draws.get(one) ?? 0;
    const chapters: any[] = [];
    const paragraphs: any[] = [];
    class $Paragraph extends $Chemical {
        $i = 0;
        n = 0;
        view() { count(this); paragraphs[this.$i] = this; return <p>{this.n}</p>; }
    }
    const Paragraph = $($Paragraph);
    class $Chapter extends $Chemical {
        $i = 0;
        $title = '';
        view() {
            count(this);
            chapters[this.$i] = this;
            return <section><h2>{this.$title}</h2>{[0, 1].map(k => <Paragraph key={k} i={this.$i * 2 + k} />)}</section>;
        }
    }
    const Chapter = $($Chapter);
    class $Book extends $Chemical {
        mark = 0;
        titles: string[] = Array.from({ length: N }, (_, i) => 't' + i);
        view() {
            count(this);
            return <article data-mark={this.mark}>{this.titles.map((title, i) => <Chapter key={i} i={i} title={title} />)}</article>;
        }
    }
    const book = new $Book();
    const sum = (list: any[]) => list.reduce((total, one) => total + of(one), 0);
    return { book, chapters, paragraphs, draws, of, sum, reset: () => draws.clear() };
}

describe("a parent's redraw is not its children's", () => {
    it('a write to the book draws the book and no chapter', async () => {
        const { book, chapters, paragraphs, reset, of, sum } = shelf();
        const container = await drawn(React.createElement($(book)));
        reset();
        await act(async () => { book.mark = 1; });
        await settled();
        expect(container.querySelector('article')!.getAttribute('data-mark')).toBe('1');
        expect(of(book)).toBeGreaterThan(0);
        expect(sum(chapters)).toBe(0);
        expect(sum(paragraphs)).toBe(0);
    });

    it("a paragraph's own write draws it, its chapter and the book above it, and nothing beside them", async () => {
        const { book, chapters, paragraphs, reset, of, sum } = shelf();
        const container = await drawn(React.createElement($(book)));
        reset();
        await act(async () => { paragraphs[7].n = 1; });
        await settled();
        expect(container.querySelectorAll('p')[7].textContent).toBe('1');
        expect(of(paragraphs[7])).toBeGreaterThan(0);
        expect(sum(paragraphs) - of(paragraphs[7])).toBe(0);
        expect(of(chapters[3])).toBeGreaterThan(0);
        expect(sum(chapters) - of(chapters[3])).toBe(0);
        expect(of(book)).toBeGreaterThan(0);
    });

    it('a chapter whose prop changed draws, and the others do not', async () => {
        const { book, chapters, reset, of, sum } = shelf();
        const container = await drawn(React.createElement($(book)));
        reset();
        await act(async () => { book.titles = book.titles.map((title, i) => i === 4 ? 'renamed' : title); });
        await settled();
        expect(container.querySelectorAll('h2')[4].textContent).toBe('renamed');
        expect(of(chapters[4])).toBeGreaterThan(0);
        expect(sum(chapters) - of(chapters[4])).toBe(0);
    });

    it('an unchanged write draws nothing', async () => {
        const { book, chapters, paragraphs, reset, of, sum } = shelf();
        await drawn(React.createElement($(book)));
        reset();
        await act(async () => { book.mark = 0; });
        await settled();
        expect(of(book) + sum(chapters) + sum(paragraphs)).toBe(0);
    });
});

describe('a view that reads another chemical follows it', () => {
    it('a reader drawn beside what it reads redraws when that changes, and a bystander beside them does not', async () => {
        const draws = { reader: 0, bystander: 0 };
        class $Counter extends $Chemical {
            n = 0;
            bump() { this.n++; }
            view() { return <button onClick={() => this.bump()}>+</button>; }
        }
        class $Reader extends $Chemical {
            $of: any = undefined;
            view() { draws.reader++; return <span className="read">{this.$of.n}</span>; }
        }
        class $Bystander extends $Chemical {
            view() { draws.bystander++; return <i>still</i>; }
        }
        const Reader = $($Reader);
        const Bystander = $($Bystander);
        class $Page extends $Chemical {
            counter = new $Counter();
            view() {
                const Counter = $(this.counter);
                return <div><Counter /><Reader of={this.counter} /><Bystander /></div>;
            }
        }
        const container = await drawn(React.createElement($(new $Page())));
        expect(container.querySelector('.read')!.textContent).toBe('0');
        const before = { ...draws };
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('.read')!.textContent).toBe('1');
        expect(draws.reader).toBeGreaterThan(before.reader);
        expect(draws.bystander).toBe(before.bystander);
    });

    it('a facade follows what it dresses, when the dress is told by a prop from above', async () => {
        class $Card extends $Chemical {
            $of: any = undefined;
            get as(): string { return this.$of?.$as ?? 'card'; }
            view() { return <div className={'as-' + this.as}>{this[children]}</div>; }
        }
        const Card = $($Card);
        class $Specimen extends $Chemical {
            $as = 'card';
            facade = Card;
            view() { return <b>specimen</b>; }
        }
        const Specimen = $($Specimen);
        class $Browser extends $Chemical {
            as = 'card';
            view() { return <div><button onClick={() => { this.as = 'tile'; }}>tile</button><Specimen as={this.as} /></div>; }
        }
        const container = await drawn(React.createElement($(new $Browser())));
        expect(container.querySelector('.as-card')).not.toBeNull();
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('.as-tile')).not.toBeNull();
        expect(container.querySelector('.as-card')).toBeNull();
    });
});

// A HELD INSTANCE IS THE COMPONENT LIFTED FROM IT, and a write to it is drawn by
// that component; a theme held and written hands on a new face, and the styled
// beneath follow. A template is the framework's, never an instance an author
// constructs — the-instance.test.tsx holds that promise — so a held instance is
// simply an instance.
describe('a held instance is drawn by the component lifted from it', () => {
    it('a write to a held instance is drawn by the component lifted from it', async () => {
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

    it('a theme held and written repaints the styled chemical and the raw styled component beneath it', async () => {
        class $Palette extends $Theme {
            paper = 'rgb(248, 249, 250)';
            ink = 'rgb(32, 33, 34)';
        }
        class $Card extends $Chemical {
            [selector] = selection.article;
            get background() { return this[theme].paper; }
            get color() { return this[theme].ink; }
            view() { return <article>{this[children]}</article>; }
        }
        const Card = $($Card);
        const Raw = selection.p`background: ${(p: any) => p.theme.paper};`;
        class $Desk extends $Chemical {
            palette = new $Palette();
            night = false;
            view() {
                const Palette = $(this.palette);
                return (
                    <div>
                        <Palette>
                            <Card>styled</Card>
                            <Raw>raw</Raw>
                        </Palette>
                        <button onClick={() => this.toggle()}>write the theme</button>
                    </div>
                );
            }
            toggle() {
                this.night = !this.night;
                this.palette.paper = this.night ? 'rgb(32, 33, 34)' : 'rgb(248, 249, 250)';
                this.palette.ink = this.night ? 'rgb(248, 249, 250)' : 'rgb(32, 33, 34)';
            }
        }
        const Desk = $($Desk);
        const container = await drawn(<Desk />);
        const article = container.querySelector('article')!;
        const raw = container.querySelector('p')!;
        expect(getComputedStyle(article).backgroundColor).toBe('rgb(248, 249, 250)');
        expect(getComputedStyle(raw).backgroundColor).toBe('rgb(248, 249, 250)');
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(getComputedStyle(article).backgroundColor).toBe('rgb(32, 33, 34)');
        expect(getComputedStyle(article).color).toBe('rgb(248, 249, 250)');
        expect(getComputedStyle(raw).backgroundColor).toBe('rgb(32, 33, 34)');
    });
});

// THE RULE IN THE FRAMEWORK'S OWN PRIMITIVES. Own state: a derivative's write is its
// own. Reads while drawing: through a reagent the draw calls, through an accessor,
// and never through a handler. Props: the same children drawn again are not news.
// Theme: a provider drawn again for a prop of its own hands the same face.
// A PLAIN FUNCTION LIFTED WITH $ IS CALLED INSIDE ITS WRAPPER'S DRAW, so what it
// reads is the draw's and it follows what it reads; its hooks belong to the
// wrapper's component, which is always called and never settled in an effect.
describe('a plain function lifted with $', () => {
    it('follows what it reads by closure beneath a wrapper that skipped, its hooks work, and it is not called when the wrapper skips', async () => {
        class $Counter extends $Chemical {
            n = 0;
            view() { return <button className="bump" onClick={() => { this.n++; }}>+</button>; }
        }
        const counter = new $Counter();
        let calls = 0;
        const Lifted = $(() => {
            calls++;
            const [k, setK] = React.useState(0);
            return <u className="lifted" onClick={() => setK(k + 1)}>{counter.n}:{k}</u>;
        });
        class $Wrapper extends $Chemical { view() { return <section>{this[children]}</section>; } }
        const Wrapper = $($Wrapper);
        class $Page extends $Chemical {
            mark = 0;
            view() {
                const Counter = $(counter);
                return <div data-mark={this.mark}><Counter /><Wrapper><Lifted /></Wrapper><button className="mark" onClick={() => { this.mark++; }}>m</button></div>;
            }
        }
        const container = await drawn(React.createElement($(new $Page())));
        expect(container.querySelector('.lifted')!.textContent).toBe('0:0');
        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });
        await settled();
        expect(container.querySelector('.lifted')!.textContent).toBe('1:0');
        await act(async () => { fireEvent.click(container.querySelector('.lifted')!); });
        await settled();
        expect(container.querySelector('.lifted')!.textContent).toBe('1:1');
        const before = calls;
        await act(async () => { fireEvent.click(container.querySelector('.mark')!); });
        await settled();
        expect(container.querySelector('div')!.getAttribute('data-mark')).toBe('1');
        expect(calls).toBe(before);
    });
});

describe('when a chemical draws, by the primitives', () => {
    it("a derivative's write is its own: the others lifted from the same template do not draw", async () => {
        const cells: any[] = [];
        const draws = [0, 0, 0];
        class $Cell extends $Chemical {
            $i = 0;
            n = 0;
            view() { cells[this.$i] = this; draws[this.$i]++; return <i>{this.n}</i>; }
        }
        const Cell = $($Cell);
        const container = await drawn(<div><Cell i={0} /><Cell i={1} /><Cell i={2} /></div>);
        const before = [...draws];
        await act(async () => { cells[1].n = 1; });
        await settled();
        expect(Array.from(container.querySelectorAll('i')).map(one => one.textContent)).toEqual(['0', '1', '0']);
        expect(draws[1]).toBeGreaterThan(before[1]);
        expect(draws[0]).toBe(before[0]);
        expect(draws[2]).toBe(before[2]);
    });

    it("a read through a reagent the draw calls, or through an accessor, is the draw's; a handler's read is not", async () => {
        const draws = { method: 0, accessor: 0, handler: 0 };
        class $Counter extends $Chemical {
            n = 0;
            bump() { this.n++; }
            view() { return <button className="bump" onClick={() => this.bump()}>+</button>; }
        }
        class $ByMethod extends $Chemical {
            $of: any = undefined;
            shown() { return this.$of.n; }
            view() { draws.method++; return <span className="method">{this.shown()}</span>; }
        }
        class $ByAccessor extends $Chemical {
            $of: any = undefined;
            get shown() { return this.$of.n; }
            view() { draws.accessor++; return <span className="accessor">{this.shown}</span>; }
        }
        class $ByHandler extends $Chemical {
            $of: any = undefined;
            seen = -1;
            view() { draws.handler++; return <button className="look" onClick={() => { void this.$of.n; }}>look</button>; }
        }
        const ByMethod = $($ByMethod);
        const ByAccessor = $($ByAccessor);
        const ByHandler = $($ByHandler);
        class $Page extends $Chemical {
            counter = new $Counter();
            view() {
                const Counter = $(this.counter);
                return <div><Counter /><ByMethod of={this.counter} /><ByAccessor of={this.counter} /><ByHandler of={this.counter} /></div>;
            }
        }
        const container = await drawn(React.createElement($(new $Page())));
        await act(async () => { fireEvent.click(container.querySelector('.look')!); });
        await settled();
        const before = { ...draws };
        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });
        await settled();
        expect(container.querySelector('.method')!.textContent).toBe('1');
        expect(container.querySelector('.accessor')!.textContent).toBe('1');
        expect(draws.method).toBeGreaterThan(before.method);
        expect(draws.accessor).toBeGreaterThan(before.accessor);
        expect(draws.handler).toBe(before.handler);
    });

    it('the same children drawn again by a parent are not news to the child', async () => {
        let wraps = 0;
        class $Wrapper extends $Chemical {
            view() { wraps++; return <section>{this[children]}</section>; }
        }
        const Wrapper = $($Wrapper);
        class $Page extends $Chemical {
            mark = 0;
            view() { return <div data-mark={this.mark}><Wrapper><b>held</b></Wrapper><button onClick={() => { this.mark++; }}>mark</button></div>; }
        }
        const container = await drawn(React.createElement($(new $Page())));
        const before = wraps;
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('div')!.getAttribute('data-mark')).toBe('1');
        expect(container.querySelector('section b')!.textContent).toBe('held');
        expect(wraps).toBe(before);
    });

    it('a function prop is compared by identity: a keyed child whose handler closed over a new item draws, every other prop equal', async () => {
        const picked: string[] = [];
        class $Row extends $Chemical {
            $id = 0;
            $onPick: (() => void) | undefined = undefined;
            view() { return <li onClick={() => this.$onPick?.()}>{this.$id}</li>; }
        }
        const Row = $($Row);
        class $List extends $Chemical {
            items = [{ id: 1, v: 'old' }];
            view() { return <ul>{this.items.map(item => <Row key={item.id} id={item.id} onPick={() => { picked.push(item.v); }} />)}</ul>; }
            swap() { this.items = [{ id: 1, v: 'new' }]; }
        }
        const list = new $List();
        const container = await drawn(React.createElement($(list)));
        await act(async () => { fireEvent.click(container.querySelector('li')!); });
        await settled();
        expect(picked).toEqual(['old']);
        await act(async () => { list.swap(); });
        await settled();
        await act(async () => { fireEvent.click(container.querySelector('li')!); });
        await settled();
        expect(picked).toEqual(['old', 'new']);
    });

    it('[memoize] = false is the off-switch: the chemical draws whenever its parent does, and a plain component beneath it reading by closure is fresh', async () => {
        let wraps = 0;
        class $Counter extends $Chemical {
            n = 0;
            view() { return <button onClick={() => { this.n++; }}>+</button>; }
        }
        const counter = new $Counter();
        const Plain = () => <i className="plain">{counter.n}</i>;
        class $Wrapper extends $Chemical {
            [memoize] = false;
            view() { wraps++; return <section>{this[children]}</section>; }
        }
        const Wrapper = $($Wrapper);
        class $Page extends $Chemical {
            view() { const Counter = $(counter); return <div data-n={counter.n}><Counter /><Wrapper><Plain /></Wrapper></div>; }
        }
        const container = await drawn(React.createElement($(new $Page())));
        const before = wraps;
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('.plain')!.textContent).toBe('1');
        expect(wraps).toBeGreaterThan(before);
    });

    it('beneath a chemical switched off, a chemical child still memoizes: unchanged, it does not draw', async () => {
        let leaves = 0;
        class $Leaf extends $Chemical {
            view() { leaves++; return <b>leaf</b>; }
        }
        const Leaf = $($Leaf);
        class $Wrapper extends $Chemical {
            [memoize] = false;
            view() { return <section>{this[children]}</section>; }
        }
        const Wrapper = $($Wrapper);
        class $Page extends $Chemical {
            mark = 0;
            view() { return <div data-mark={this.mark}><Wrapper><Leaf /></Wrapper><button onClick={() => { this.mark++; }}>mark</button></div>; }
        }
        const container = await drawn(React.createElement($(new $Page())));
        const before = leaves;
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('div')!.getAttribute('data-mark')).toBe('1');
        expect(leaves).toBe(before);
    });

    it('said on a base class, [memoize] = false reaches every subclass: an app switches itself off', async () => {
        let wraps = 0;
        class $App extends $Chemical {
            [memoize] = false;
        }
        class $Wrapper extends $App {
            view() { wraps++; return <section>{this[children]}</section>; }
        }
        const Wrapper = $($Wrapper);
        class $Page extends $Chemical {
            mark = 0;
            view() { return <div data-mark={this.mark}><Wrapper><b>held</b></Wrapper><button onClick={() => { this.mark++; }}>mark</button></div>; }
        }
        const container = await drawn(React.createElement($(new $Page())));
        const before = wraps;
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(wraps).toBeGreaterThan(before);
    });

    it('a provider drawn again for a prop of its own hands the same face, and the chemical beneath does not draw', async () => {
        let cards = 0;
        let palettes = 0;
        class $Palette extends $Theme {
            $label = '';
            paper = 'white';
            override view() { palettes++; return <section data-label={this.$label}>{this[children]}</section>; }
        }
        class $Card extends $Chemical {
            view() { cards++; return <b>{this[theme].paper}</b>; }
        }
        const Card = $($Card);
        const Palette = $($Palette);
        class $Page extends $Chemical {
            mark = 0;
            view() { return <div><Palette label={String(this.mark)}><Card /></Palette><button onClick={() => { this.mark++; }}>mark</button></div>; }
        }
        const container = await drawn(React.createElement($(new $Page())));
        const before = { cards, palettes };
        await act(async () => { fireEvent.click(container.querySelector('button')!); });
        await settled();
        expect(container.querySelector('section')!.getAttribute('data-label')).toBe('1');
        expect(palettes).toBeGreaterThan(before.palettes);
        expect(cards).toBe(before.cards);
    });
});
