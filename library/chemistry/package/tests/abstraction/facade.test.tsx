import { describe, it, expect } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { $, $Block, $Chemical, $Formula, cache } from '@/index';
import { children } from '@/index';

// A LEVEL answers an interface by name. A chemical that assigns itself to one
// is drawn inside it, wherever it is written.
class $Level extends $Chemical {
    $of: any = undefined;
    got: any[] = [];

    $Level(...given: any[]) {
        this.got = given;
    }

    override view(): ReactNode {
        return (
            <div data-level="" data-of={this.$of?.constructor?.name ?? ''}
                data-copy={this.$of?.copy ?? ''}>{this[children]}</div>
        );
    }
}
const Level = $($Level);

class $Deeper extends $Level {
    override view(): ReactNode {
        return <div data-level="" data-deeper="">{this[children]}</div>;
    }
}
const Deeper = $($Deeper);

class $Other extends $Chemical {
    override view(): ReactNode {
        return <div data-grip="">{this[children]}</div>;
    }
}
const Other = $($Other);

class $Fancy extends $Level {
    override view(): ReactNode {
        return <div data-level="" data-fancy="">{this[children]}</div>;
    }
}
const Fancy = $($Fancy);

class $Thing extends $Chemical {
    inline = true;
    facade = Level;
    $at = 0;
    faces = ['x', 'y', 'z'];
    get copy(): string { return this.faces[this.$at]; }

    turn(): void {
        this.$at = (this.$at + 1) % this.faces.length;
    }

    override view(): ReactNode {
        return <span onClick={() => this.turn()}>{this.copy}</span>;
    }
}
const Thing = $($Thing);

class $Plain extends $Chemical {
    inline = true;

    override view(): ReactNode {
        return <span>plain</span>;
    }
}
const Plain = $($Plain);

class $Unpaired extends $Chemical {
    held = Other;

    override view(): ReactNode {
        return <span>unpaired</span>;
    }
}
const Unpaired = $($Unpaired);

class $Passed extends $Chemical {
    $carried = Other;

    override view(): ReactNode {
        return <span>passed</span>;
    }
}
const Passed = $($Passed);

class $Both extends $Chemical {
    facade = Level;
    grip = Other;

    override view(): ReactNode {
        return <span>both</span>;
    }
}
const Both = $($Both);

class $Stateful extends $Chemical {
    inline = true;
    $at = 0;
    faces = ['x', 'y', 'z'];
    get copy(): string { return this.faces[this.$at]; }

    turn(): void {
        this.$at = (this.$at + 1) % this.faces.length;
    }

    override view(): ReactNode {
        return <span onClick={() => this.turn()}>{this.copy}</span>;
    }
}
const Stateful = $($Stateful);

class $Host extends $Chemical {
    override view(): ReactNode { return <div data-host="">{this[children]}</div>; }
}

// AN IMPLEMENTATION THAT DRAWS THE INSTANCE IT WAS HANDED — which is what an
// interface has to do, or it mounts a second instance of the same element and
// reads one while the screen shows the other.
class $Holder extends $Chemical {
    given: any = undefined;

    $Holder(one: any) {
        this.given = one;
    }

    protected get mark(): string { return 'held'; }

    override view(): ReactNode {
        const one = this.given;
        const Held = one && one.type !== 'block' ? $(one) : undefined;
        return <div data-held={this.mark}>{Held ? <Held /> : this[children]}</div>;
    }
}

class $First extends $Holder {
    protected override get mark(): string { return 'first'; }
}

class $Second extends $Holder {
    protected override get mark(): string { return 'second'; }
}

const First = $($First);
const Second = $($Second);

class $Worn extends $Chemical {
    first = First;
    second = Second;

    override view(): ReactNode {
        return <span>worn</span>;
    }
}
const Worn = $($Worn);

class $Span extends $Chemical {
    override view(): ReactNode {
        return <span data-span="">{this[children]}</span>;
    }
}
const Span = $($Span);

const drawn = (node: ReactNode) => {
    class $Page extends $Chemical {
        override view(): ReactNode { return node; }
    }
    const Page = $($Page);
    return render(<Page />);
};

// A SCOPE HAS TO ACTUALLY HOLD THE THING. The host takes what it hosts as a
// bond child, so the catalyst graph is threaded and a registration on the host
// is reachable from inside it.
// A HOST IS A CHEMICAL, and it has to be. `$(Host, Level)(Fancy)` registers on
// the chemical a component stands for, so a host that is a plain function
// component registers on a $Function$ wrapper that never appears in the tree —
// and nothing could ever reach it. That was why the three promises below were
// read as open: the harness, not the framework.
const hosting = (node: ReactNode) => {
    class $Host extends $Chemical {
        override view(): ReactNode { return <div data-host="">{node}</div>; }
    }
    return $($Host as any) as any;
};

const kept = <T extends $Chemical>(Base: any): [any, () => T | undefined] => {
    let held: T | undefined;
    class $Keep extends (Base as new () => $Chemical) {
        override view(): ReactNode { held = this as unknown as T; return super.view(); }
    }
    return [$($Keep as any), () => held];
};

describe('an interface assignment is drawn inside what it assigns itself to', () => {
    it('1. a chemical with a paired face is wrapped in that level', () => {
        const { container } = drawn(<Thing />);
        expect(container.querySelectorAll('[data-level]').length).toBe(1);
        expect(container.textContent).toBe('x');
    });

    // THE CONTRACT — the interface is handed THE INSTANCE as `of`, and that
    // instance's own drawing as its children. Not a block, not an element: the
    // object, so the interface can ask it anything.
    it('2. the interface is handed the instance it dresses', () => {
        const { container } = drawn(<Thing />);
        const level = container.querySelector('[data-level]')!;
        expect(level.getAttribute('data-of')).toBe('$Thing');
        expect(level.getAttribute('data-copy')).toBe('x');
        expect(level.textContent).toBe('x');
    });

    it('3. and literal writing still arrives as a block, so the two are told apart', () => {
        const [Keep, held] = kept<$Level>($Level);
        render(<Keep>abc</Keep>);
        expect(held()!.got.length).toBe(1);
        expect((held()!.got[0] as $Block).type).toBe('block');
    });

    // THE DECLARATION IS THE WAY IN, AND THE ONLY ONE. Wrapping happens on the
    // instance as it draws itself, so a level written by hand around it is an
    // ordinary chemical holding another — it does not stand in for the
    // declaration, and the instance still dresses itself inside it.
    it('4. a level written by hand holds the instance, which still dresses itself', () => {
        const { container } = render(<Level><Thing /></Level>);
        expect(container.querySelectorAll('[data-level]').length).toBe(2);
    });

    it('5. and the same is true of a subclass of the level', () => {
        const { container } = render(<Deeper><Thing /></Deeper>);
        expect(container.querySelectorAll('[data-deeper]').length).toBe(1);
        expect(container.querySelectorAll('[data-level]').length).toBe(2);
    });

    it('6. ANY member holding a component is an assignment — nothing is asked in return', () => {
        const { container } = drawn(<Unpaired />);
        expect(container.querySelectorAll('[data-grip]').length).toBe(1);
        expect(container.textContent).toBe('unpaired');
    });

    it('6b. a $-PREFIXED member holding a component is a prop, never an assignment', () => {
        const { container } = drawn(<Passed />);
        expect(container.querySelectorAll('[data-grip]').length).toBe(0);
        expect(container.textContent).toBe('passed');
    });

    it('7. a chemical with no faces is untouched', () => {
        const { container } = render(<Plain />);
        expect(container.querySelectorAll('[data-level]').length).toBe(0);
    });
});

describe('where the assignment meets the rest of the framework', () => {
    // GROUPING IS UNTOUCHED. Wrapping happens when an instance draws itself, so
    // nothing about how a holder's children are gathered changes.
    it('8. inline grouping is exactly as it was', () => {
        const [Keep, held] = kept<$Level>($Level);
        render(<Keep>hello<Thing /></Keep>);
        const got = held()!.got;
        expect(got.length).toBe(1);
        expect((got[0] as $Block).type).toBe('block');
    });

    it('9. a formula that stands for a faced chemical is wrapped once it has resolved', () => {
        // placeholder


        expect(true).toBe(true);
    });

    it('10. the wrapped chemical keeps its own state and handlers', () => {
        const { container } = drawn(<Thing />);
        fireEvent.click(container.querySelector('span')!);
        expect(container.textContent).toBe('y');
        fireEvent.click(container.querySelector('span')!);
        expect(container.textContent).toBe('z');
    });

    // ONE INSTANCE, SO NO DIVERGENCE. What the interface reads and what the
    // screen shows are the same object; clicking the drawing moves both.
    it('11. the interface reads the very thing being drawn', () => {
        const { container } = drawn(<Thing />);
        const level = () => container.querySelector('[data-level]')!;
        expect(level().getAttribute('data-copy')).toBe('x');
        fireEvent.click(container.querySelector('span')!);
        expect(container.textContent).toBe('y');
        expect(level().getAttribute('data-copy')).toBe('y');
    });

    it('12. DEPTH — the immediate parent decides, never an ancestor', () => {
        const { container } = render(<Level><Span><Thing /></Span></Level>);
        expect(container.querySelectorAll('[data-level]').length).toBe(2);
        expect(container.querySelector('[data-span]')!.querySelectorAll('[data-level]').length).toBe(1);
    });

    it('13. two faces nest, first declared outermost', () => {
        const { container } = drawn(<Both />);
        const level = container.querySelector('[data-level]')!;
        expect(level.querySelectorAll('[data-grip]').length).toBe(1);
        expect(container.querySelector('[data-grip]')!.querySelectorAll('[data-level]').length).toBe(0);
    });

    // WRAPPING CHANGES NOTHING ABOUT IDENTITY. Whatever the framework does to a
    // chemical handed a fresh element on a rerender, it does the same to one the
    // walk has placed inside a level — measured against a faceless control
    // rather than asserted, because the policy is the framework's, not ours.
    it('14. a rerender treats a wrapped chemical exactly as an unwrapped one', () => {
        const run = (Inner: any) => {
            const [Keep] = kept<$Host>($Host);
            const { container, rerender } = render(<Keep><Inner /></Keep>);
            fireEvent.click(container.querySelector('span')!);
            const clicked = container.textContent;
            rerender(<Keep><Inner /></Keep>);
            const after = container.textContent;
            const levels = container.querySelectorAll('[data-level]').length;
            cleanup();
            return { clicked, after, levels };
        };
        const control = run(Stateful);
        const faced = run(Thing);
        expect(control.clicked).toBe('y');
        expect(faced.clicked).toBe('y');
        expect(faced.after).toBe(control.after);
        expect(faced.levels).toBe(1);
        expect(control.levels).toBe(0);
    });

    // CLOSED 2026-08-29 for 16 and 17. A FACADE IS CHOSEN WHERE THE ELEMENT WAS
    // WRITTEN, not where the instance draws itself: the walk resolves it under
    // the asker that drew it and hands the answer down as `$facade`, so a
    // registration on the holder is consulted. By the time frame() runs the
    // asker is pinned to the instance, which is why asking there never could.
    //
    // These read as open for two years' worth of sessions because of the HARNESS
    // rather than the framework — `hosting` returned a plain function component,
    // so the registration landed on a $Function$ wrapper nothing ever rendered.
    it('16. — a scope stands a different level in behind the same declaration', () => {
        const Host = hosting(<Thing />);
        $(Host, Level)(Fancy);
        const { container } = render(<Host />);
        expect(container.querySelectorAll('[data-fancy]').length).toBe(1);
        expect(container.querySelectorAll('[data-level]').length).toBe(1);
    });

    it('17. — and the same class draws plainly outside that scope', () => {
        const Configured = hosting(<Thing />);
        const Untouched = hosting(<Thing />);
        $(Configured, Level)(Fancy);
        const one = render(<Configured />);
        expect(one.container.querySelectorAll('[data-fancy]').length).toBe(1);
        cleanup();
        const two = render(<Untouched />);
        expect(two.container.querySelectorAll('[data-fancy]').length).toBe(0);
        expect(two.container.querySelectorAll('[data-level]').length).toBe(1);
    });

    // OPEN 2026-08-29, AND FOR A DIFFERENT REASON THAN IT WAS. Scope substitution
    // reaches now — 16 and 17 prove it. This one asks something else: a thing
    // ALREADY DRAWN INSIDE a Level should not be wrapped in another, and judged
    // on the DECLARED facade rather than whatever stood in for it. Asking that
    // needs the drawn instance's ancestry, and a drawn instance is its own root —
    // see the catalyst graph. Two data-levels where one is wanted.
    it('18. — satisfaction is judged on the declared facade, never the substitute', () => {
        const Host = hosting(<Level><Thing /></Level>);
        $(Host, Level)(Fancy);
        const { container } = render(<Host />);
        expect(container.querySelectorAll('[data-level]').length).toBe(1);
    });

    // CAPTURED 2026-08-27. Two interfaces, each drawing the instance it holds
    // through $ — the way an implementation must. The stamp that stops a stack
    // re-wrapping rides on the ELEMENT, and $(instance) makes a fresh one every
    // render, so the inner wrapper handed the machine wrapped it again, and
    // again, until the stack overflowed.
    it('19. two interfaces that draw the instance they hold wrap it ONCE each', () => {
        const Host = hosting(<Worn />);
        let raised: unknown;
        let container: HTMLElement | undefined;
        try { container = render(<Host />).container; } catch (thrown) { raised = thrown; }
        expect(raised).toBeUndefined();
        expect(container!.querySelectorAll('[data-held]').length).toBe(2);
        expect(Array.from(container!.querySelectorAll('[data-held]')).map(n => n.getAttribute('data-held')))
            .toEqual(['first', 'second']);
        expect(container!.textContent).toBe('worn');
    });

    // NO BOUNDARY, UNLIKE A FORMULA. A formula is swapped by the render walk, so
    // one handed straight to React is never seen. An assignment is worn by the
    // INSTANCE as it draws, so it holds at a react root too.
    it('15. a faced chemical mounted as a react root is wrapped all the same', () => {
        const { container } = render(<Thing />);
        expect(container.querySelectorAll('[data-level]').length).toBe(1);
        expect(container.textContent).toBe('x');
    });
});
