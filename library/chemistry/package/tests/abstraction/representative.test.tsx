import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $Chemical, $ } from '@/abstraction/chemical';
import { $reaction$ } from '@/implementation/symbols';

// =============================================================================
// THE `$` SURFACE
//
// `$` is a coercion utility: hand it a thing, get the form of that thing you
// need. This file specifies that surface once the representative — `$` standing
// as an ARGUMENT — joins it.
//
//   $($Class)          from a class        the root scope for that class
//   $($,Component)     from a component    a DERIVED scope, falling back to it
//   $(Component)       resolve             the component to render HERE
//   $(Component,$)     the model behind it — and `.$` says the same thing
//   $(A,B)(C)          register            "for A, a B is a C"
//   $(A,B)(C,{…})      register, narrowed  by reach, or by who asks
//
// The NEGATIVE promises are the ones that matter — isolation, no upward leak,
// identity when nothing is registered, a scope not reaching what it never
// bound. Each would still pass against one global map if written the other way
// round, so each is written to fail if it were.
// =============================================================================

class $Plain extends $Chemical {
    view() { return <span>plain</span>; }
}

class $Fancy extends $Plain {
    override view() { return <span>fancy</span>; }
}

class $Other extends $Chemical {
    view() { return <span>other</span>; }
}

// A host that asks for a part and draws what it is given. The local keeps the
// component's own name — no site invents an alias.
function host(asked: any) {
    return class extends $Chemical {
        view() {
            const Plain = $(asked);
            return <div><Plain /></div>;
        }
    };
}

// A scope that BOTH asks for a part itself and binds a child asking for the
// same one — the shape needed to tell "my own asks" from "everything beneath
// me". NAMED deliberately: a bond constructor is discovered by its class's own
// name, so an anonymous class expression silently has none.
function nest(asked: any) {
    return class $Nest extends $Chemical {
        held: $Chemical[] = [];
        $Nest(...held: $Chemical[]) { this.held = held; }
        view() {
            const Plain = $(asked);
            return <div><Plain />{this.held.map((h, i) => { const One = $(h); return <One key={i} />; })}</div>;
        }
    };
}

function holder() {
    return class $Holder extends $Chemical {
        held: $Chemical[] = [];
        $Holder(...held: $Chemical[]) { this.held = held; }
        view() { return <div>{this.held.map((h, i) => { const One = $(h); return <One key={i} />; })}</div>; }
    };
}

function drawn(Component: any): string {
    const { container } = render(React.createElement(Component));
    return container.textContent ?? '';
}

function drawing(element: React.ReactElement): string {
    const { container } = render(element);
    return container.textContent ?? '';
}

// ─── $(Component) — resolve ──────────────────────────────────────────────────

describe('$(Component) — the component to render here', () => {
    it('answers THE VERY OBJECT it was given when nothing is registered', () => {
        const Plain = $($Plain);
        expect($(Plain)).toBe(Plain);
    });

    it('answers the registered stand-in inside the scope that registered it', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Host = $(host(Plain) as any);
        $(Host, Plain)(Fancy);
        expect(drawn(Host)).toContain('fancy');
    });

    it('and is INVISIBLE outside that scope', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Configured = $(host(Plain) as any);
        const Untouched = $(host(Plain) as any);
        $(Configured, Plain)(Fancy);
        expect(drawn(Configured)).toContain('fancy');
        expect(drawn(Untouched)).toContain('plain');
    });

    it('two scopes registering the same part do not disturb each other', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Other = $($Other);
        const First = $(host(Plain) as any);
        const Second = $(host(Plain) as any);
        $(First, Plain)(Fancy);
        $(Second, Plain)(Other);
        expect(drawn(First)).toContain('fancy');
        expect(drawn(Second)).toContain('other');
    });
});

// ─── $(Component,$) and .$ — the model behind the face ───────────────────────

describe('$(Component,$) and .$ — the model behind the face', () => {
    class $Shape extends $Chemical { view() { return <span>shape</span>; } }

    it('a component carries its model at .$, and it is the object $(X,$) answers', () => {
        const Plain = $($Plain);
        expect((Plain as any).$).toBe($(Plain, $));
        expect((Plain as any).$).toBeInstanceOf($Plain);
    });

    it('the same, for a component made from a class', () => {
        const From = $($Shape);
        expect((From as any).$).toBe($(From, $));
        expect((From as any).$).toBeInstanceOf($Shape);
    });

    it('the same, for one made from a held instance — the very instance', () => {
        const held = new $Shape();
        const From = $(held);
        expect((From as any).$).toBe($(From, $));
        expect((From as any).$).toBe(held);
    });

    it('the same, for a derived scope — its own model, not the one it came from', () => {
        const From = $($, $($Shape));
        expect((From as any).$).toBe($(From, $));
        expect((From as any).$).not.toBe(($($Shape) as any).$);
    });

    it('the same, for a tag', () => {
        const Div = $('div');
        expect((Div as any).$).toBe($(Div as any, $));
    });

    it('the same, for one made by $bind', () => {
        const Bound = ($($Shape) as any).$bind();
        expect(Bound.$).toBe($(Bound, $));
    });

    it('resolving FIRST gives the model of what stands in, not of what was asked for', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        let seen: any = null;
        class $Painter extends $Chemical {
            view() { seen = ($(Plain) as any).$; return <span>painted</span>; }
        }
        const Painter = $($Painter);
        $(Painter, Plain)(Fancy);
        render(React.createElement(Painter));
        expect(seen).toBeInstanceOf($Fancy);
        expect(seen).toBe((Fancy as any).$);
    });

    it('but asking for a model does NOT resolve — you named a component, you get that one', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Scope = $($, Plain);
        $(Scope, Plain)(Fancy);
        expect($(Plain, $)).toBe((Plain as any).$);
        expect($(Plain, $)).not.toBe((Fancy as any).$);
    });

    it('a plain function carries NO model until $ gives it one', () => {
        const Loose = () => <span>loose</span>;
        expect((Loose as any).$).toBeUndefined();
        const Wrapped = $(Loose);
        expect((Wrapped as any).$).toBe($(Wrapped as any, $));
        expect($(Loose as any, $)).toBe((Wrapped as any).$);
    });

    it('and an INSTANCE is not a component — the representative is not consulted there', () => {
        const held = new $Shape();
        expect($(held as any, $ as any)).toBe($(held));
    });
});

// ─── $($,Component) — a derived scope ────────────────────────────────────────

describe('$($,Component) — a derived scope', () => {
    it('answers a different component that still draws the same thing', () => {
        const Plain = $($Plain);
        const Mine = $($, Plain);
        expect(Mine).not.toBe(Plain);
        expect(drawn(Mine)).toContain('plain');
    });

    it('falls back to what it derived from', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Host = $(host(Plain) as any);
        const Mine = $($, Host);
        $(Host, Plain)(Fancy);
        expect(drawn(Mine)).toContain('fancy');
    });

    it('and the parent does NOT see what the derivative registered', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Host = $(host(Plain) as any);
        const Mine = $($, Host);
        $(Mine, Plain)(Fancy);
        expect(drawn(Mine)).toContain('fancy');
        expect(drawn(Host)).toContain('plain');
    });

    it('a derivative SHADOWS its parent rather than merging with it', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Other = $($Other);
        const Host = $(host(Plain) as any);
        const Mine = $($, Host);
        $(Host, Plain)(Fancy);
        $(Mine, Plain)(Other);
        expect(drawn(Host)).toContain('fancy');
        expect(drawn(Mine)).toContain('other');
    });
});

// ─── $(A,B)(C) — register ────────────────────────────────────────────────────

describe('$(A,B)(C) — register', () => {
    it('answers a registrar rather than registering', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Host = $(host(Plain) as any);
        expect(typeof $(Host, Plain)).toBe('function');
        expect(drawn(Host)).toContain('plain');
        $(Host, Plain)(Fancy);
        expect(drawn(Host)).toContain('fancy');
    });

    it('a plain function component can be asked for, registered, and stood in for', () => {
        const Plainly = () => <span>plainly</span>;
        const Fancily = () => <span>fancily</span>;
        const Host = $(host(Plainly) as any);
        expect(drawn(Host)).toContain('plainly');
        $(Host, Plainly)(Fancily);
        expect(drawn(Host)).toContain('fancily');
    });

    it('and asking for one twice gives the same component, so React identity holds', () => {
        const Once = () => <span>once</span>;
        expect($(Once)).toBe($(Once));
    });
});

// ─── Narrowing: reach, and who asks ──────────────────────────────────────────

describe('reach — how far a registration carries', () => {
    it('projects DOWNWARD by default, reaching a bound child', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Inner = $(host(Plain) as any);
        const Nest = $(nest(Plain) as any);
        $(Nest, Plain)(Fancy);
        expect(drawing(<Nest><Inner /></Nest>)).toBe('fancyfancy');
    });

    it('and narrows to the scope s OWN asks when told to', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Inner = $(host(Plain) as any);
        const Nest = $(nest(Plain) as any);
        $(Nest, Plain)(Fancy, { reach: 'self' });
        expect(drawing(<Nest><Inner /></Nest>)).toBe('fancyplain');
    });
});

describe('the asker — whose asks a registration answers', () => {
    it('answers only the class that was named', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Inner = $(host(Plain) as any);
        const Nest = $(nest(Plain) as any);
        $(Nest, Plain)(Fancy, { asker: ($(Inner, $) as any).constructor });
        expect(drawing(<Nest><Inner /></Nest>)).toBe('plainfancy');
    });

    it('and a named asker beats an unnamed registration in the same scope', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Other = $($Other);
        const Inner = $(host(Plain) as any);
        const Nest = $(nest(Plain) as any);
        $(Nest, Plain)(Other);
        $(Nest, Plain)(Fancy, { asker: ($(Inner, $) as any).constructor });
        expect(drawing(<Nest><Inner /></Nest>)).toBe('otherfancy');
    });
});

// ─── What a scope reaches, and in what order ─────────────────────────────────

describe('a scope reaches what it BINDS', () => {
    // A chemical that merely returns `this.children` never parents them, so a
    // part standing "inside" it has no lineage to walk. The catalyst graph is
    // threaded by the bond constructor — the bond is what makes a scope reach.
    it('does not reach a child it never bound', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        class $Loose extends $Chemical {
            view() { return <div>{this.children}</div>; }
        }
        const Loose = $($Loose);
        $(Loose, Plain)(Fancy);
        const Inner = $(host(Plain) as any);
        expect(drawing(<Loose><Inner /></Loose>)).toContain('plain');
    });

    it('and DOES reach one it bound through its bond constructor', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Inner = $(host(Plain) as any);
        const Held = $(holder() as any);
        $(Held, Plain)(Fancy);
        expect(drawing(<Held><Inner /></Held>)).toContain('fancy');
    });
});

describe('precedence — nearest to the asker wins', () => {
    it('the asker s OWN scope beats an ancestor s', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Other = $($Other);
        const Inner = $(host(Plain) as any);
        const Outer = $(holder() as any);
        $(Outer, Plain)(Other);
        $(Inner, Plain)(Fancy);
        const text = drawing(<Outer><Inner /></Outer>);
        expect(text).toContain('fancy');
        expect(text).not.toContain('other');
    });

    it('and an ancestor answers when the asker says nothing', () => {
        const Plain = $($Plain);
        const Other = $($Other);
        const Inner = $(host(Plain) as any);
        const Outer = $(holder() as any);
        $(Outer, Plain)(Other);
        expect(drawing(<Outer><Inner /></Outer>)).toContain('other');
    });
});

// ─── When a scope exists ─────────────────────────────────────────────────────

describe('a reading answers the same, painting or not', () => {
    // Chemical code resolves as the chemical it belongs to. Without that a
    // reading answered one way during a paint and another from a test — one
    // model, two object graphs.
    it('a method resolves with NO render in flight', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        class $Reader extends $Chemical {
            read() { return $(Plain); }
            view() { return null; }
        }
        const Reader = $($Reader);
        $(Reader, Plain)(Fancy);
        expect(($(Reader, $) as any).read()).toBe(Fancy);
    });

    it('and answers the same thing inside a paint', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        let painted: any = null;
        class $Reader extends $Chemical {
            read() { return $(Plain); }
            view() { painted = this.read(); return <span>read</span>; }
        }
        const Reader = $($Reader);
        $(Reader, Plain)(Fancy);
        const outside = ($(Reader, $) as any).read();
        render(React.createElement(Reader));
        expect(painted).toBe(Fancy);
        expect(painted).toBe(outside);
    });
});

describe('a handler is not a paint', () => {
    it('resolves inside an event handler, in the graph the handler belongs to', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        let answered: any = null;
        class $Clickable extends $Chemical {
            view() { return <button onClick={() => { answered = $(Plain); }}>go</button>; }
        }
        const Clickable = $($Clickable);
        $(Clickable, Plain)(Fancy);
        const { container } = render(React.createElement(Clickable));
        container.querySelector('button')!.click();
        expect(answered).toBe(Fancy);
    });

    it('and MAY be configured from one, because a handler runs after the paint', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Later = $(host(Plain) as any);
        class $Configurer extends $Chemical {
            view() { return <button onClick={() => { $(Later, Plain)(Fancy); }}>configure</button>; }
        }
        const Configurer = $($Configurer);
        const { container } = render(React.createElement(Configurer));
        expect(drawn(Later)).toContain('plain');
        expect(() => container.querySelector('button')!.click()).not.toThrow();
        expect(drawn(Later)).toContain('fancy');
    });
});

describe('configuration is not a render', () => {
    it('registering while drawing throws, naming where configuration belongs', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        class $Naughty extends $Chemical {
            view() { $(Plain, Plain)(Fancy); return <span>no</span>; }
        }
        const Naughty = $($Naughty);
        expect(() => drawn(Naughty)).toThrow(/during a render/);
    });

    it('creating a scope while drawing throws', () => {
        const Plain = $($Plain);
        class $AlsoNaughty extends $Chemical {
            view() { $($, Plain); return <span>no</span>; }
        }
        const AlsoNaughty = $($AlsoNaughty);
        expect(() => drawn(AlsoNaughty)).toThrow(/during a render/);
    });
});

// ─── The registry the surface stands on ──────────────────────────────────────

describe('a scope lets go with the chemical that held it', () => {
    it('destroying the chemical releases its registry without throwing', () => {
        const Plain = $($Plain);
        const Fancy = $($Fancy);
        const Held = $(holder() as any);
        $(Held, Plain)(Fancy);
        const model: any = $(Held, $);
        expect(() => model[$reaction$].destroy()).not.toThrow();
    });
});
