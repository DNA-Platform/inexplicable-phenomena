import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Particle, $Chemical, $check } from '@/index';

// =============================================================================
// frame() — the render template method
//
// The framework renders a particle through frame(), never view() directly:
// [$renderView$]() returns this.frame(), and frame() calls the ACTIVE view. The
// default frame is a transparent pass-through, so un-overridden render stays
// byte-identical. Overriding frame() lets a class WRAP or REORGANIZE its output
// while view() remains the content method.
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
        frame() { return <a className="link" href="#x">{super.frame()}</a>; }
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
            frame() {
                return (
                    <div className="badge">
                        <button className="bump" onClick={this.bump}>+</button>
                        {super.frame()}
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
// 3. Nested frame overrides compose through super.frame()
// =============================================================================

describe('frame — nested overrides compose via super.frame()', () => {
    class $Inner extends $Chemical {
        view() { return <span className="v">core</span>; }
        frame() { return <div className="inner">{super.frame()}</div>; }
    }
    class $Outer extends $Inner {
        frame() { return <div className="outer">{super.frame()}</div>; }
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
        frame() { return <section className="book-frame">{super.frame()}</section>; }
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
        frame() {
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
// 6. frame renders the ACTIVE view under look()
// =============================================================================

describe('frame — renders the active view under look()', () => {
    class Base extends $Chemical {
        label = 'x';
        view() { return <span className="v">base:{this.label}</span>; }
        frame() { return <div className="fr">{super.frame()}</div>; }
    }
    class Mid extends Base {
        view() { return <span className="v">mid:{this.label}</span>; }
    }
    class Leaf extends Mid {
        view() { return <span className="v">leaf:{this.label}</span>; }
    }

    function paint(inst: any) {
        const Comp = $(inst) as React.FC;
        const { container } = render(React.createElement(Comp));
        return container;
    }

    it('the frame wraps whichever ancestor view look() selects', () => {
        const leaf = new Leaf();
        expect(paint(leaf).querySelector('.fr .v')?.textContent).toBe('leaf:x');

        const up = new Leaf();
        up.look('up');
        expect(paint(up).querySelector('.fr .v')?.textContent).toBe('mid:x');

        const top = new Leaf();
        top.look('up'); top.look('up');
        expect(paint(top).querySelector('.fr .v')?.textContent).toBe('base:x');
    });
});


// =============================================================================
// 7. render filters ($show/$hide) still short-circuit BEFORE frame
// =============================================================================

describe('frame — render filters short-circuit before frame', () => {
    class $Toggle extends $Chemical {
        view() { return <span className="v">shown</span>; }
        frame() { return <div className="fr">{super.frame()}</div>; }
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
// 8. frame is the render entry — view is reached only through it
// =============================================================================

describe('frame — is the sole render entry', () => {
    it('frame() runs, then reaches view() through super.frame()', () => {
        const order: string[] = [];
        class $Traced extends $Chemical {
            view() { order.push('view'); return <span className="v">t</span>; }
            frame() { order.push('frame'); return super.frame(); }
        }
        const Traced = $($Traced);
        render(<Traced />);
        expect(order.includes('frame')).toBe(true);
        expect(order.includes('view')).toBe(true);
        // frame is entered before the view it wraps.
        expect(order.indexOf('frame')).toBeLessThan(order.indexOf('view'));
    });
});
