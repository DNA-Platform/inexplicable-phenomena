import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { $, $Particle, $Chemical, look } from '@/index';
import { $views$ } from '@/implementation/symbols';

// =============================================================================
// The series of looks — `view`, `$view`, `$$view`, and onward.
//
// A chemical draws through ONE of a numbered series of views. `view` is 0,
// `$view` is 1, `$$view` is 2; each further `$` is the next look, and a
// SUBCLASS extends the series by declaring the next one. `$look` chooses which
// one draws — by position, or by a name `@look` gave it — and every instance
// holds its own dictionary of them under `$views$`.
//
// These promises replace look.test.tsx, perspectives.test.tsx and
// particle-perspectives.test.tsx, which specified the machinery this deleted.
// =============================================================================

function paint(instance: any): string {
    const Comp = $(instance) as React.FC;
    const { container } = render(React.createElement(Comp));
    return container.textContent ?? '';
}

// =============================================================================
// 1. The series — what a class declares, and what a subclass adds
// =============================================================================

describe('the series — a class declares its looks', () => {
    it('a class with only view answers one look', () => {
        class $One extends $Chemical {
            view() { return <span>one</span>; }
        }
        expect(new $One()[$views$].size).toBe(1);
    });

    it('a class with view and $view answers two, in declaration order', () => {
        class $Two extends $Chemical {
            view() { return <span>plain</span>; }
            $view() { return <span>loud</span>; }
        }
        const two = new $Two();
        expect(two[$views$].get(0)!.call(two)).toEqual(<span>plain</span>);
        expect(two[$views$].get(1)!.call(two)).toEqual(<span>loud</span>);
    });

    it('a SUBCLASS extends the series — three from the subclass, two from the base', () => {
        class $Base extends $Chemical {
            view() { return <span>base</span>; }
            $view() { return <span>base1</span>; }
        }
        class $Derived extends $Base {
            $$view() { return <span>derived2</span>; }
        }
        expect(new $Base()[$views$].size).toBe(2);
        expect(new $Derived()[$views$].size).toBe(3);
    });

    it('overriding a look REPLACES it rather than adding one', () => {
        class $Base extends $Chemical {
            view() { return <span>base</span>; }
            $view() { return <span>base1</span>; }
        }
        class $Louder extends $Base {
            $view() { return <span>louder</span>; }
        }
        const louder = new $Louder();
        expect(louder[$views$].size).toBe(2);
        expect(louder[$views$].get(1)!.call(louder)).toEqual(<span>louder</span>);
    });

    it('lives on $Particle — a raw particle has a series too', () => {
        class PThing extends $Particle {
            view() { return <b>p</b>; }
            $view() { return <i>p1</i>; }
        }
        expect(new PThing()[$views$].size).toBe(2);
    });

    // =========================================================================
    // THE SERIES IS OPEN. Nothing in the framework enumerates it: the walk finds
    // the deepest run of `$` on the prototype chain and builds every member up to
    // it. These promises exist because a reader looking at `view · $view · $$view`
    // could reasonably suspect three was a number somebody typed. It is not.
    // =========================================================================

    it('answers TWELVE looks on one class, and every one of them draws', () => {
        const source = ['class $Deep extends base {'];
        for (let at = 0; at < 12; at++)
            source.push(`  ${'$'.repeat(at)}view() { return ${at}; }`);
        source.push('} return $Deep;');
        const $Deep = new Function('base', source.join('\n'))($Chemical);

        const deep = new $Deep();
        expect(deep[$views$].size).toBe(12);
        for (let at = 0; at < 12; at++)
            expect(deep[$views$].get(at)!.call(deep)).toBe(at);
    });

    it('answers a look at depth 40 — there is no ceiling to find', () => {
        const source = ['class $Vast extends base {'];
        for (let at = 0; at < 41; at++)
            source.push(`  ${'$'.repeat(at)}view() { return ${at}; }`);
        source.push('} return $Vast;');
        const $Vast = new Function('base', source.join('\n'))($Chemical);

        const vast = new $Vast();
        expect(vast[$views$].size).toBe(41);
        vast.$look = 40;
        expect(vast.frame()).toBe(40);
    });

    it('a CHAIN of subclasses each adding one reaches the same depth', () => {
        let held: any = class extends $Chemical { view() { return 0; } };
        for (let at = 1; at < 10; at++) {
            const source = [`class $Step extends base { ${'$'.repeat(at)}view() { return ${at}; } } return $Step;`];
            held = new Function('base', source.join('\n'))(held);
        }
        const leaf = new held();
        expect(leaf[$views$].size).toBe(10);
        expect(leaf[$views$].get(9)!.call(leaf)).toBe(9);
        expect(leaf[$views$].get(0)!.call(leaf)).toBe(0);
    });

    it('the out-of-bounds message counts what is actually there, at any depth', () => {
        const source = ['class $Seven extends base {'];
        for (let at = 0; at < 7; at++)
            source.push(`  ${'$'.repeat(at)}view() { return ${at}; }`);
        source.push('} return $Seven;');
        const $Seven = new Function('base', source.join('\n'))($Chemical);

        const seven = new $Seven();
        seven.$look = 7;
        expect(() => seven.frame()).toThrow(/Nothing stands at look 7 — \$Seven draws 7\./);
    });

    it('a gap in the series is refused, and the message names the member that is missing', () => {
        class $Gapped extends $Chemical {
            view() { return <span>a</span>; }
            $$view() { return <span>c</span>; }
        }
        expect(() => new $Gapped()[$views$]).toThrow(/nothing at \$view/);
    });

    it('an ACCESSOR is not a look — only a real method joins the series', () => {
        class $Accessed extends $Chemical {
            view() { return <span>a</span>; }
            get $view(): any { return () => <span>b</span>; }
        }
        expect(new $Accessed()[$views$].size).toBe(1);
    });

    it('a derivative reads the same series its template does', () => {
        class $Shared extends $Chemical {
            view() { return <span>a</span>; }
            $view() { return <span>b</span>; }
        }
        const template = new $Shared();
        const derived = Object.create(template);
        expect(derived[$views$].size).toBe(template[$views$].size);
        expect(derived[$views$].get(1)).toBe(template[$views$].get(1));
    });
});

// =============================================================================
// 2. @look — the attribute that names one
// =============================================================================

describe('@look — naming a look', () => {
    it('a named look is reachable by NAME and by POSITION, and they are the same function', () => {
        class $Named extends $Chemical {
            view() { return <span>plain</span>; }
            @look('shout') $view() { return <span>SHOUT</span>; }
        }
        const named = new $Named();
        expect(named[$views$].get('shout')).toBe(named[$views$].get(1));
    });

    it('an UNNAMED look is reachable by position only', () => {
        class $Bare extends $Chemical {
            view() { return <span>plain</span>; }
            $view() { return <span>other</span>; }
        }
        const bare = new $Bare();
        expect(bare[$views$].get(1)).toBeDefined();
        expect([...bare[$views$].keys()].filter(k => typeof k === 'string')).toEqual([]);
    });

    it("a subclass's name is found from the subclass and NOT from the base", () => {
        class $Plain extends $Chemical {
            view() { return <span>plain</span>; }
        }
        class $Fancy extends $Plain {
            @look('fancy') $view() { return <span>fancy</span>; }
        }
        expect(new $Fancy()[$views$].get('fancy')).toBeDefined();
        expect(new $Plain()[$views$].get('fancy')).toBeUndefined();
    });

    it('two looks may not share a name', () => {
        expect(() => {
            class $Clashing extends $Chemical {
                view() { return <span>a</span>; }
                @look('same') $view() { return <span>b</span>; }
                @look('same') $$view() { return <span>c</span>; }
            }
            return $Clashing;
        }).toThrow(/already the look called same/);
    });

    it('@look on something that is not a look is refused', () => {
        expect(() => {
            class $Wrong extends $Chemical {
                view() { return <span>a</span>; }
                @look('nope') draw() { return <span>b</span>; }
            }
            return $Wrong;
        }).toThrow(/is not one/);
    });
});

// =============================================================================
// 3. $look — choosing which one draws
// =============================================================================

describe('$look — the choice', () => {
    class $Sheet extends $Chemical {
        view() { return <span className="v">plain</span>; }
        @look('github') $view() { return <span className="v">github</span>; }
        @look('night') $$view() { return <span className="v">night</span>; }
    }

    it('draws view by default', () => {
        expect(paint(new $Sheet())).toBe('plain');
    });

    it('a POSITION selects', () => {
        const sheet = new $Sheet();
        sheet.$look = 1;
        expect(paint(sheet)).toBe('github');
    });

    it('a NAME selects the same drawing a position does', () => {
        const byNumber = new $Sheet();
        byNumber.$look = 1;
        const byName = new $Sheet();
        byName.$look = 'github';
        expect(paint(byName)).toBe(paint(byNumber));
    });

    it('reaches the instance through the JSX attribute', () => {
        const Sheet = $($Sheet);
        const { container } = render(<Sheet look={2} />);
        expect(container.textContent).toBe('night');
    });

    it('the attribute takes a name too, and the DOM is identical either way', () => {
        const Sheet = $($Sheet);
        const named = render(<Sheet look="night" />).container.innerHTML;
        const numbered = render(<Sheet look={2} />).container.innerHTML;
        expect(named).toBe(numbered);
    });

    it('a position out of bounds is refused, naming what was asked and how many there are', () => {
        const sheet = new $Sheet();
        sheet.$look = 9;
        expect(() => sheet.frame()).toThrow(/Nothing stands at look 9 — \$Sheet draws 3\./);
    });

    it('a name that is not a look is refused, naming the names that are', () => {
        const sheet = new $Sheet();
        sheet.$look = 'nope';
        expect(() => sheet.frame()).toThrow(/no look called nope — it draws github, night\./);
    });

    it('a write in a HANDLER repaints through the ordinary reactive field', () => {
        class $Switcher extends $Chemical {
            view() { return <button onClick={() => { this.$look = 1; }}>plain</button>; }
            $view() { return <button onClick={() => { this.$look = 0; }}>loud</button>; }
        }
        const Switcher = $($Switcher);
        const { container } = render(<Switcher />);
        expect(container.textContent).toBe('plain');
        act(() => { fireEvent.click(container.querySelector('button')!); });
        expect(container.textContent).toBe('loud');
    });
});

// =============================================================================
// 4. The same promises from BOTH roots
//
// $look, $views$ and frame() all live on $Particle and $Chemical inherits
// them, so every claim above must hold identically whether a chain roots at
// $Particle or at $Chemical. The suite this replaced ran its whole matrix
// twice for exactly this reason; so does this one.
// =============================================================================

for (const [root, Root] of [['$Particle', $Particle], ['$Chemical', $Chemical]] as const) {
    describe(`the series, from a chain rooted at ${root}`, () => {
        class Base extends (Root as any) {
            view() { return <span className="v">base</span>; }
            @look('shout') $view() { return <span className="v">shout</span>; }
        }
        class Leaf extends Base {
            @look('whisper') $$view() { return <span className="v">whisper</span>; }
        }

        it('a subclass extends the series and the base does not gain it', () => {
            // three looks and two names; view itself is not named
            expect((new Leaf() as any)[$views$].size).toBe(3 + 2);
            expect((new Base() as any)[$views$].size).toBe(2 + 1);
        });

        it('a position selects', () => {
            const leaf: any = new Leaf();
            leaf.$look = 2;
            expect(paint(leaf)).toBe('whisper');
        });

        it('a name selects', () => {
            const leaf: any = new Leaf();
            leaf.$look = 'shout';
            expect(paint(leaf)).toBe('shout');
        });

        it('an inherited name is reachable from the subclass', () => {
            const leaf = new Leaf() as any;
            expect(leaf[$views$].get('shout')).toBe(leaf[$views$].get(1));
        });

        it('out of bounds is refused', () => {
            const leaf: any = new Leaf();
            leaf.$look = 7;
            expect(() => leaf.frame()).toThrow(/Nothing stands at look 7 — Leaf draws 3\./);
        });
    });
}

// =============================================================================
// 5. frame() wraps whichever look is selected
// =============================================================================

describe('frame — the wrapper travels with the choice', () => {
    it('wraps the SELECTED look, not always view', () => {
        class $Picture extends $Chemical {
            view() { return <span className="c">bare</span>; }
            $view() { return <span className="c">ornate</span>; }
            frame() { return <div className="f">{super.frame()}</div>; }
        }
        const picture = new $Picture();
        picture.$look = 1;
        const Picture = $(picture) as React.FC;
        const { container } = render(React.createElement(Picture));
        expect(container.querySelector('.f')).not.toBeNull();
        expect(container.querySelector('.f .c')?.textContent).toBe('ornate');
    });
});

// =============================================================================
// 5. A prop may not overwrite a view — the type forbids it, and so does the run
// =============================================================================

describe('a prop cannot overwrite a view', () => {
    it('refuses a `view` prop at runtime, where a spread gets past the type', () => {
        class $Guarded extends $Chemical {
            view() { return <span>safe</span>; }
            $view() { return <span>also safe</span>; }
        }
        const Guarded = $($Guarded) as any;
        const smuggled = { view: () => <span>hijacked</span> };
        expect(() => render(<Guarded {...smuggled} />)).toThrow(/overwrite a view/);
    });

    it('refuses a `$view` prop, which would land on $$view', () => {
        class $Guarded2 extends $Chemical {
            view() { return <span>safe</span>; }
        }
        const Guarded2 = $($Guarded2) as any;
        expect(() => render(<Guarded2 {...{ $view: 1 }} />)).toThrow(/overwrite a view/);
    });

    it('does NOT refuse look, which is the attribute that chooses one', () => {
        class $Fine extends $Chemical {
            view() { return <span>a</span>; }
            $view() { return <span>b</span>; }
        }
        const Fine = $($Fine);
        expect(render(<Fine look={1} />).container.textContent).toBe('b');
    });
});
