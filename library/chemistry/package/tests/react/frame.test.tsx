import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Particle, $Chemical, $check } from '@/index';

// =============================================================================
// frame() — the render template method
//
// The framework renders a particle through frame(), never view() directly:
// [$renderView$]() draws the ACTIVE view and HANDS IT to frame(). The default
// frame answers what it was handed, so un-overridden render stays byte-identical.
// Overriding frame() lets a class WRAP or REORGANIZE its output while view()
// remains the content method — and because the drawing arrives as an argument,
// the class chooses whether its wrapper sits inside or outside its bases.
//
// The load-bearing fact these tests pin down: the bond constructor runs BEFORE
// frame (bond() precedes renderView() in $lift), so by the time frame runs the
// children are already bound — frame may arrange them however it likes without
// touching what the bond constructor searched. There is no view/frame boundary
// to protect.
// =============================================================================


// =============================================================================
// 1. The default frame is a transparent pass-through
// =============================================================================

describe('frame — default is transparent', () => {
    it('renders exactly the view, with no wrapper, when frame is not overridden', () => {
        class $Plain extends $Chemical {
            view() { return <span className="v">hello</span>; }
        }
        const Plain = $($Plain);
        const { container } = render(<Plain />);
        expect(container.querySelector('.v')?.textContent).toBe('hello');
        // The view's own element is the root — frame added nothing.
        expect(container.firstElementChild?.tagName).toBe('SPAN');
        expect(container.firstElementChild?.className).toBe('v');
    });

    it('is transparent on a raw $Particle too — frame lives on $Particle', () => {
        class PThing extends $Particle {
            view() { return <b className="p">particle</b>; }
        }
        const Comp = $(new PThing()) as React.FC;
        const { container } = render(React.createElement(Comp));
        expect(container.querySelector('.p')?.textContent).toBe('particle');
        expect(container.firstElementChild?.tagName).toBe('B');
    });
});


// =============================================================================
// 2. A wrapping frame wraps the active view
// =============================================================================

describe('frame — a wrapping frame surrounds the view', () => {
    class $Linked extends $Chemical {
        $label = '';
        view() { return <span className="content">{this.$label}</span>; }
        frame(drawn: React.ReactNode) { return <a className="link" href="#x">{super.frame(drawn)}</a>; }
    }
    const Linked = $($Linked);

    it('places the view inside the frame element', () => {
        const { container } = render(<Linked label="click me" />);
        const link = container.querySelector('a.link');
        expect(link).not.toBeNull();
        expect(link?.querySelector('.content')?.textContent).toBe('click me');
    });

    it('a reactive prop change repaints the wrapped content', async () => {
        class $Badge extends $Chemical {
            n = 0;
            bump() { this.n++; }
            view() { return <span className="count">{String(this.n)}</span>; }
            frame(drawn: React.ReactNode) {
                return (
                    <div className="badge">
                        <button className="bump" onClick={this.bump}>+</button>
                        {super.frame(drawn)}
                    </div>
                );
            }
        }
        const Badge = $($Badge);
        const { container } = render(<Badge />);
        expect(container.querySelector('.badge .count')?.textContent).toBe('0');
        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });
        expect(container.querySelector('.badge .count')?.textContent).toBe('1');
    });
});


// =============================================================================
// 3. Nested frame overrides compose through super.frame(drawn)
// =============================================================================

describe('frame — nested overrides compose via super.frame(drawn)', () => {
    class $Inner extends $Chemical {
        view() { return <span className="v">core</span>; }
        frame(drawn: React.ReactNode) { return <div className="inner">{super.frame(drawn)}</div>; }
    }
    class $Outer extends $Inner {
        frame(drawn: React.ReactNode) { return <div className="outer">{super.frame(drawn)}</div>; }
    }
    const Outer = $($Outer);

    it('both wrappers appear, with the view at the core', () => {
        const { container } = render(<Outer />);
        expect(container.querySelector('.outer > .inner > .v')?.textContent).toBe('core');
    });
});


// =============================================================================
// 4. frame coexists with a bond constructor — binding happens FIRST
// =============================================================================

describe('frame — coexists with the bond constructor', () => {
    class $Chapter extends $Chemical {
        $title = '';
        view() { return <li className="chapter">{this.$title}</li>; }
    }
    class $Book extends $Chemical {
        chapters: $Chapter[] = [];
        $Book(...chapters: $Chapter[]) {
            this.chapters = chapters.map(c => $check(c, $Chapter));
        }
        view() {
            return (
                <ul className="book">
                    {this.chapters.map((c, i) => { const C = $(c); return <C key={i} />; })}
                </ul>
            );
        }
        frame(drawn: React.ReactNode) { return <section className="book-frame">{super.frame(drawn)}</section>; }
    }
    const Chapter = $($Chapter);
    const Book = $($Book);

    it('the bond ctor binds the chapters and the frame wraps the rendered view', () => {
        const { container } = render(
            <Book>
                <Chapter title="One" />
                <Chapter title="Two" />
            </Book>
        );
        const frame = container.querySelector('section.book-frame');
        expect(frame).not.toBeNull();
        expect(frame?.querySelector('ul.book')).not.toBeNull();

        const chapters = container.querySelectorAll('.chapter');
        expect(chapters.length).toBe(2);
        expect([...chapters].map(c => c.textContent)).toEqual(['One', 'Two']);
    });

    it('re-binding when children change still renders correctly through the frame', async () => {
        function Harness() {
            const [n, setN] = React.useState(2);
            return (
                <div>
                    <Book>
                        {Array.from({ length: n }, (_, i) => <Chapter key={i} title={`C${i}`} />)}
                    </Book>
                    <button className="add" onClick={() => setN(x => x + 1)}>add</button>
                </div>
            );
        }
        const { container } = render(<Harness />);
        expect(container.querySelectorAll('.book-frame .chapter').length).toBe(2);
        await act(async () => { fireEvent.click(container.querySelector('.add')!); });
        expect(container.querySelectorAll('.book-frame .chapter').length).toBe(3);
    });
});


// =============================================================================
// 5. frame can REORGANIZE already-bound children (view is optional)
// =============================================================================

describe('frame — reorganizes already-bound children freely', () => {
    class $Item extends $Chemical {
        $name = '';
        view() { return <span className="item">{this.$name}</span>; }
    }
    // frame ignores view() entirely and renders the bound children reversed.
    class $Reversed extends $Chemical {
        items: $Item[] = [];
        $Reversed(...items: $Item[]) {
            this.items = items.map(i => $check(i, $Item));
        }
        frame(drawn: React.ReactNode) {
            return (
                <div className="reversed">
                    {this.items.slice().reverse().map((it, i) => { const I = $(it); return <I key={i} />; })}
                </div>
            );
        }
    }
    const Item = $($Item);
    const Reversed = $($Reversed);

    it('the bond ctor bound A,B,C; the frame renders them C,B,A even though view() is never called', () => {
        const { container } = render(
            <Reversed>
                <Item name="A" />
                <Item name="B" />
                <Item name="C" />
            </Reversed>
        );
        const items = [...container.querySelectorAll('.item')].map(n => n.textContent);
        expect(items).toEqual(['C', 'B', 'A']);
    });
});


// =============================================================================
// 6. frame renders whichever look $look selects
// =============================================================================

describe('frame — renders the selected look', () => {
    class Base extends $Chemical {
        label = 'x';
        view() { return <span className="v">base:{this.label}</span>; }
        $view() { return <span className="v">mid:{this.label}</span>; }
        frame(drawn: React.ReactNode) { return <div className="fr">{super.frame(drawn)}</div>; }
    }
    class Leaf extends Base {
        $$view() { return <span className="v">leaf:{this.label}</span>; }
    }

    function paint(inst: any) {
        const Comp = $(inst) as React.FC;
        const { container } = render(React.createElement(Comp));
        return container;
    }

    it('the frame wraps whichever look $look selects, and a subclass extends the series', () => {
        const base = new Leaf();
        expect(paint(base).querySelector('.fr .v')?.textContent).toBe('base:x');

        const mid = new Leaf();
        mid.$look = 1;
        expect(paint(mid).querySelector('.fr .v')?.textContent).toBe('mid:x');

        const leaf = new Leaf();
        leaf.$look = 2;
        expect(paint(leaf).querySelector('.fr .v')?.textContent).toBe('leaf:x');
    });
});


// =============================================================================
// 7. render filters ($show/$hide) still short-circuit BEFORE frame
// =============================================================================

describe('frame — render filters short-circuit before frame', () => {
    class $Toggle extends $Chemical {
        view() { return <span className="v">shown</span>; }
        frame(drawn: React.ReactNode) { return <div className="fr">{super.frame(drawn)}</div>; }
    }
    // $show is a framework filter prop, above the derived prop type — cast, as
    // the render-filters suite does.
    const Toggle = $($Toggle) as any;

    it('a hidden chemical renders nothing — the frame is not produced', () => {
        const { container, rerender } = render(<Toggle show={false} />);
        expect(container.querySelector('.fr')).toBeNull();
        expect(container.querySelector('.v')).toBeNull();

        rerender(<Toggle show={true} />);
        expect(container.querySelector('.fr .v')?.textContent).toBe('shown');
    });
});


// =============================================================================
// 8. frame is the render entry — it is handed what the view drew
// =============================================================================

describe('frame — is handed what the view drew', () => {
    it('the view draws first, and frame receives that drawing', () => {
        const order: string[] = [];
        class $Traced extends $Chemical {
            view() { order.push('view'); return <span className="v">t</span>; }
            frame(drawn: React.ReactNode) { order.push('frame'); return super.frame(drawn); }
        }
        const Traced = $($Traced);
        render(<Traced />);
        expect(order.includes('frame')).toBe(true);
        expect(order.includes('view')).toBe(true);
        expect(order.indexOf('view')).toBeLessThan(order.indexOf('frame'));
    });
});


// =============================================================================
// 9. A class chooses which side of its bases it wraps on
//
// Handing the drawing IN is what makes an INNER wrapper expressible at all:
// wrap `drawn` and hand it up, and the bases close outside you; wrap
// `super.frame(drawn)` and you close outside them. Before the drawing was an
// argument, `super.frame()` returned content the bases had already finished
// wrapping, so depth decided position and the deepest class was always
// outermost — which is how a class ended up outside a facade it should sit in.
// =============================================================================

describe('frame — inner and outer', () => {
    class $Based extends $Chemical {
        view() { return <span className="v">core</span>; }
        frame(drawn: React.ReactNode) { return <div className="base">{super.frame(drawn)}</div>; }
    }

    it('a class that wraps the DRAWING sits inside its base', () => {
        class $In extends $Based {
            frame(drawn: React.ReactNode) { return super.frame(<i className="in">{drawn}</i>); }
        }
        const In = $($In);
        const { container } = render(<In />);
        expect(container.querySelector('.base > .in > .v')?.textContent).toBe('core');
    });

    it('a class that wraps its BASE sits outside it', () => {
        class $Out extends $Based {
            frame(drawn: React.ReactNode) { return <i className="out">{super.frame(drawn)}</i>; }
        }
        const Out = $($Out);
        const { container } = render(<Out />);
        expect(container.querySelector('.out > .base > .v')?.textContent).toBe('core');
    });
});
