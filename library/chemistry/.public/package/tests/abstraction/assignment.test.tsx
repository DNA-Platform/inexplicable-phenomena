import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, $Formula, cache } from '@/index';
import { children } from '@/index';

// on={() => this.member} — a chemical saying where the one it draws belongs.
//
// The arrow is two artefacts in one expression: its TYPE checks that the member
// can hold what is being assigned, and its SOURCE names which member. Neither
// alone does both — a typed callback names nothing, and a string path checks
// nothing.
//
// It is resolved in the render walk, where the chemical that wrote it is known,
// and completed on mount, because at the moment the walk runs the instance it
// names does not exist yet.

class $Held extends $Chemical {
    $mark = '';
    note = '';
    view() { return <i className="held">{this.$mark}{this.note}</i>; }
}
const Held = $($Held);

// A page is captured as it draws, and counted, the way the rest of this suite
// does it — a prop holding a function is bonded as a method, so a capture that
// travels as a prop cannot be assigned at all.
const drawing = { page: undefined as any, count: 0 };

function show(Page: any): HTMLElement {
    drawing.page = undefined;
    drawing.count = 0;
    return render(React.createElement(Page)).container;
}

function seen<T>(chemical: T): T {
    drawing.page = chemical;
    drawing.count++;
    return chemical;
}

describe('a chemical is assigned into the member the arrow reads', () => {
    class $Single extends $Chemical {
        one?: $Held;
        view() { seen(this); return <Held on={() => this.one} />; }
    }
    const Single = $($Single);

    it('the member holds the instance that was drawn', () => {
        show(Single);
        expect((drawing.page as $Single).one).toBeInstanceOf($Held);
    });

    class $Marked extends $Chemical {
        one?: $Held;
        view() { seen(this); return <Held mark="written" on={() => this.one} />; }
    }
    const Marked = $($Marked);

    it('and it is the very instance on the page, not another of its kind', () => {
        const container = show(Marked);
        expect((drawing.page as $Marked).one!.$mark).toBe('written');
        expect(container.querySelector('.held')!.textContent).toBe('written');
    });
});

describe('WHAT THE MEMBER HOLDS DECIDES — a list collects', () => {
    class $Many extends $Chemical {
        many: $Held[] = [];
        view() {
            seen(this);
            return (
                <div>
                    <span className="count">{this.many.length}</span>
                    {['a', 'b', 'c'].map(k => <Held key={k} mark={k} on={() => this.many} />)}
                </div>
            );
        }
    }
    const Many = $($Many);

    it('collects every one of them, in the order they were written', () => {
        show(Many);
        const page = drawing.page as $Many;
        expect(page.many.length).toBe(3);
        expect(page.many.map(one => one.$mark)).toEqual(['a', 'b', 'c']);
    });

    it('AND THE PAGE SEES WHAT IT WAS GIVEN — the count on screen reads 3', () => {
        const container = show(Many);
        expect(container.querySelector('.count')!.textContent).toBe('3');
    });

    it('and it SETTLES — reading the list does not make it grow', () => {
        show(Many);
        expect((drawing.page as $Many).many.length).toBe(3);
        expect(drawing.count).toBeLessThan(10);
    });
});

describe('a chemical leaving the page takes back what it said', () => {
    class $Maybe extends $Chemical {
        one?: $Held;
        many: $Held[] = [];
        $there = true;
        view() {
            seen(this);
            if (!this.$there) return <div />;
            return <div><Held on={() => this.one} /><Held on={() => this.many} /></div>;
        }
    }
    const Maybe = $($Maybe);

    it('the single member is cleared and the list member loses it', async () => {
        show(Maybe);
        const page = drawing.page as $Maybe;
        expect(page.one).toBeInstanceOf($Held);
        expect(page.many.length).toBe(1);
        await act(async () => { page.$there = false; });
        expect(page.one).toBeUndefined();
        expect(page.many.length).toBe(0);
    });
});

describe('the corner cases — a formula and an interface', () => {
    class $Kind extends $Formula {
        constructor() { super(); this[cache](); }
        view() { return <span className="kind">{this[children]}</span>; }
    }
    class $Book extends $Kind {
        constructor() { super(); this[cache]('Book'); }
    }
    const Kinded = $($Kind);
    $($Book);

    class $Standing extends $Chemical {
        kind?: $Kind;
        view() { seen(this); return <Kinded on={() => this.kind}>Book</Kinded>; }
    }
    const Standing = $($Standing);

    it('A FORMULA IS RESOLVED FIRST, so what is assigned is what it stood for', () => {
        show(Standing);
        expect((drawing.page as $Standing).kind).toBeInstanceOf($Book);
    });

    class $Frame extends $Chemical {
        $of: any;
        view() { return <u className="frame">{this[children]}</u>; }
    }
    const Frame = $($Frame);

    class $Dressed extends $Chemical {
        facade = Frame;
        view() { return <i className="dressed" />; }
    }
    const Dressed = $($Dressed);

    class $Dresser extends $Chemical {
        // Declared as what it will actually hold — the facade — because a chemical
        // that declares one is handed out as it.
        worn?: any;
        view() { seen(this); return <Dressed on={() => this.worn} />; }
    }
    const Dresser = $($Dresser);

    // A FACADE IS WHAT ITS CHEMICAL IS HANDED OUT AS — that is what a facade is
    // for, and it is why an assignment completes on mount: the facade comes into
    // being in frame(), so it does not exist when a bond constructor runs.
    it('A CHEMICAL DECLARING A FACADE IS ASSIGNED AS ITS FACADE, holding the other as `of`', () => {
        const container = show(Dresser);
        expect(container.querySelector('.frame .dressed')).not.toBeNull();
        const held = (drawing.page as $Dresser).worn as unknown as $Frame;
        expect(held).toBeInstanceOf($Frame);
        expect(held.$of).toBeInstanceOf($Dressed);
    });
});

describe('an assignment that names no member says so', () => {
    class $Wrong extends $Chemical {
        view() { return <Held on={(() => 42) as any} />; }
    }
    const Wrong = $($Wrong);

    it('refuses at the walk, naming the shape it wanted', () => {
        expect(() => show(Wrong)).toThrow(/on=\{\(\) => this\.member\}/);
    });
});

// =============================================================================
// DOES IT SETTLE — the question the feature lives or dies on.
//
// The assignment lands AFTER the first paint, so it wakes the chemical that was
// assigned into. If that chemical draws the member it was given, the wake is a
// second pass — and the second pass must not produce a third. These promises
// state the cost as a NUMBER rather than as a reassurance.
// =============================================================================

describe('the cost of assigning after the first paint, MEASURED AGAINST A BASELINE', () => {
    // A "pass" here is a call to view(), not a React render: the framework draws
    // the view a second time in its own change-detection effect. So the number
    // that matters is the DIFFERENCE between the same page with and without an
    // assignment, and whether that difference grows with how many are assigned.
    const drew = { page: 0, child: 0 };

    class $Counted extends $Chemical {
        view() { drew.child++; return <i className="counted" />; }
    }
    const Counted = $($Counted);

    function pageOf(many: number, assigning: boolean) {
        class $Page extends $Chemical {
            held: $Counted[] = [];
            view() {
                drew.page++;
                seen(this);
                return (
                    <div>
                        <span className="count">{this.held.length}</span>
                        {Array.from({ length: many }, (_, at) => assigning
                            ? <Counted key={at} on={() => this.held} />
                            : <Counted key={at} />)}
                    </div>
                );
            }
        }
        return $($Page);
    }

    function cost(many: number, assigning: boolean) {
        drew.page = 0; drew.child = 0;
        const container = show(pageOf(many, assigning));
        return { page: drew.page, child: drew.child, count: container.querySelector('.count')!.textContent };
    }

    it('THE COST IS CONSTANT — three assigned and twenty assigned cost the page the same', () => {
        expect(cost(3, true).page).toBe(cost(20, true).page);
    });

    it('and it is TWO passes more than the same page assigning nothing', () => {
        const plain = cost(20, false).page;
        const assigning = cost(20, true).page;
        expect(assigning - plain).toBe(2);
    });

    it('every one of the twenty is held, and the page draws the number it was given', () => {
        const measured = cost(20, true);
        expect((drawing.page as any).held.length).toBe(20);
        expect(measured.count).toBe('20');
    });

    it('AND IT STOPS — nothing draws again once it has settled', async () => {
        cost(20, true);
        const page = drawing.page as any;
        drew.page = 0; drew.child = 0;
        await act(async () => { await new Promise(r => setTimeout(r, 40)); });
        expect(drew.page).toBe(0);
        expect(drew.child).toBe(0);
        expect(page.held.length).toBe(20);
    });

    class $Deep extends $Chemical {
        held: $Counted[] = [];
        view() { drew.page++; seen(this); return <div><Counted on={() => this.held} /></div>; }
    }
    const Deep = $($Deep);

    class $Above extends $Chemical {
        inside: $Deep[] = [];
        view() { drew.page++; return <Deep on={() => this.inside} />; }
    }
    const Above = $($Above);

    it('and a page assigned into a page above it settles too', () => {
        drew.page = 0;
        render(React.createElement(Above as any));
        const settled = drew.page;
        expect(settled).toBeGreaterThan(0);
        expect(settled).toBeLessThan(20);
    });

    class $Cycled extends $Chemical {
        many: $Counted[] = [];
        $there = true;
        view() {
            seen(this);
            return <div>{this.$there ? <Counted on={() => this.many} /> : null}</div>;
        }
    }
    const Cycled = $($Cycled);

    it('a child that leaves and comes back is held ONCE, not twice', async () => {
        show(Cycled);
        const page = drawing.page as $Cycled;
        expect(page.many.length).toBe(1);
        await act(async () => { page.$there = false; });
        expect(page.many.length).toBe(0);
        await act(async () => { page.$there = true; });
        expect(page.many.length).toBe(1);
        await act(async () => { page.$there = false; });
        await act(async () => { page.$there = true; });
        expect(page.many.length).toBe(1);
    });
});

// =============================================================================
// THE ERROR SURFACE — what happens when it is written wrong, or when something
// else touches what was assigned.
//
// Every one of these used to be silent, or was assumed rather than known.
// =============================================================================

describe('assignment reaches into the object graph', () => {
    class $Model {
        fields: $Held[] = [];
        one?: $Held;
    }

    class $Deeply extends $Chemical {
        model = new $Model();
        view() {
            seen(this);
            return <div>
                <Held mark="a" on={() => this.model.fields} />
                <Held mark="b" on={() => this.model.fields} />
                <Held mark="c" on={() => this.model.one} />
            </div>;
        }
    }
    const Deeply = $($Deeply);

    it('A DEEP PATH lands where it points, list and single alike', () => {
        show(Deeply);
        const page = drawing.page as $Deeply;
        expect(page.model.fields.map(one => one.$mark)).toEqual(['a', 'b']);
        expect(page.model.one!.$mark).toBe('c');
    });

    class $Elsewhere extends $Chemical {
        gathered: $Held[] = [];
        view() { return <em />; }
    }
    const somewhereElse = $($Elsewhere).$ as $Elsewhere;

    class $Across extends $Chemical {
        other = somewhereElse;
        view() { seen(this); return <Held mark="crossed" on={() => this.other.gathered} />; }
    }
    const Across = $($Across);

    it('AND IT REACHES ANOTHER CHEMICAL — assigned across the graph, and it still settles', () => {
        somewhereElse.gathered = [];
        show(Across);
        expect(somewhereElse.gathered.map(one => one.$mark)).toEqual(['crossed']);
    });

    class $Nowhere extends $Chemical {
        view() { return <Held on={() => (this as any).missing.thing} />; }
    }
    const Nowhere = $($Nowhere);

    it('and a path that walks through nothing SAYS SO, naming where it stopped', () => {
        expect(() => show(Nowhere)).toThrow(/nothing stands at this\.missing/);
    });
});

describe('two cannot be the one thing', () => {
    class $Both extends $Chemical {
        one?: $Held;
        view() {
            seen(this);
            return <div>
                <Held mark="first" on={() => this.one} />
                <Held mark="second" on={() => this.one} />
            </div>;
        }
    }
    const Both = $($Both);

    it('a second claimant on a single member is refused, naming both', () => {
        expect(() => show(Both)).toThrow(/Two are assigned to the same member/);
    });
});

describe('when something else changes what was assigned', () => {
    class $Own extends $Chemical {
        one?: $Held;
        many: $Held[] = [];
        $there = true;
        view() {
            seen(this);
            return <div>{this.$there
                ? <><Held mark="mine" on={() => this.one} /><Held mark="mine" on={() => this.many} /></>
                : null}</div>;
        }
    }
    const Own = $($Own);

    it('an outside write STANDS — the assignment does not fight it', async () => {
        show(Own);
        const page = drawing.page as $Own;
        const other = $($Held).$ as $Held;
        await act(async () => { page.one = other; });
        expect(page.one).toBe(other);
    });

    it('AND RETRACTION NEVER TAKES BACK WHAT IT DID NOT PUT THERE', async () => {
        show(Own);
        const page = drawing.page as $Own;
        const other = $($Held).$ as $Held;
        await act(async () => { page.one = other; });
        await act(async () => { page.$there = false; });
        expect(page.one).toBe(other);
    });

    it('nor from a list it was removed from by hand', async () => {
        show(Own);
        const page = drawing.page as $Own;
        const other = $($Held).$ as $Held;
        await act(async () => { page.many = [other]; });
        await act(async () => { page.$there = false; });
        expect(page.many).toEqual([other]);
    });
});

describe('an assignment written where nothing is drawing it', () => {
    it('refuses, because it was never resolved against anyone', () => {
        expect(() => render(<Held on={() => undefined} />)).toThrow(/nothing that draws it/);
    });
});

describe('the type is checked, and this is the proof', () => {
    it('a member that cannot hold the child does not compile', () => {
        class $Mistyped extends $Chemical {
            label = '';
            view() {
                // @ts-expect-error — `label` is a string, so it cannot hold a $Held
                return <Held on={() => this.label} />;
            }
        }
        expect($($Mistyped)).toBeTypeOf('function');
    });
});

// =============================================================================
// THE THREE THAT USED TO PASS IN SILENCE.
//
// Each was measured before it was designed for: an `on` on a tag did nothing, a
// reorder left the member disagreeing with the page, and a view drawing from
// what it is assigned HUNG — React's own guard never fires, because every
// assignment is its own commit rather than a nested render.
// =============================================================================

describe('only a chemical can be told where it belongs', () => {
    class $Tagged extends $Chemical {
        held: $Held[] = [];
        // @ts-expect-error — the compiler refuses `on` on an html tag outright
        view() { return <div on={() => this.held} />; }
    }
    const Tagged = $($Tagged);

    it('a tag is refused rather than quietly ignored', () => {
        expect(() => show(Tagged)).toThrow(/no instance for a member to hold/);
    });
});

describe('a list stands in the order its parts are drawn', () => {
    class $Ordered extends $Chemical {
        many: $Held[] = [];
        $order = ['a', 'b', 'c'];
        view() {
            seen(this);
            return <div>{this.$order.map(k => <Held key={k} mark={k} on={() => this.many} />)}</div>;
        }
    }
    const Ordered = $($Ordered);

    it('and reordering the drawn things is refused, because the member cannot follow', async () => {
        show(Ordered);
        const page = drawing.page as $Ordered;
        expect(page.many.map(one => one.$mark)).toEqual(['a', 'b', 'c']);
        await expect(act(async () => { page.$order = ['c', 'b', 'a']; }))
            .rejects.toThrow(/no longer stands in the order they are drawn/);
    });

    it('but drawing MORE of them is not a reorder, and is allowed', async () => {
        show(Ordered);
        const page = drawing.page as $Ordered;
        await act(async () => { page.$order = ['a', 'b', 'c', 'd']; });
        expect(page.many.map(one => one.$mark)).toEqual(['a', 'b', 'c', 'd']);
    });
});

describe('a view cannot draw from what it is assigned', () => {
    class $Feeding extends $Chemical {
        many: $Held[] = [];
        view() {
            seen(this);
            const drawn = this.many.length + 1;
            return <div>{Array.from({ length: drawn }, (_, at) =>
                <Held key={at} mark={String(at)} on={() => this.many} />)}</div>;
        }
    }
    const Feeding = $($Feeding);

    it('IT SAYS SO INSTEAD OF HANGING', () => {
        expect(() => show(Feeding)).toThrow(/will not settle/);
    });
});

// =============================================================================
// ONE THING, TWO OWNERS.
//
// `on={[() => this.here, () => this.there.also]}` names more than one place, and
// every one of them holds THE SAME INSTANCE. That is the whole point: two owners
// are two views of one thing rather than two copies of it, so what either of
// them does to it, the other sees.
// =============================================================================

describe('an assignment can name more than one place', () => {
    class $Ledger {
        watched: $Held[] = [];
        latest?: $Held;
    }

    class $Shared extends $Chemical {
        mine: $Held[] = [];
        ledger = new $Ledger();
        $there = true;
        view() {
            seen(this);
            return <div>{this.$there
                ? <Held mark="one" on={[() => this.mine, () => this.ledger.watched, () => this.ledger.latest]} />
                : null}</div>;
        }
    }
    const Shared = $($Shared);

    it('every member named holds it, list and single alike', () => {
        show(Shared);
        const page = drawing.page as $Shared;
        expect(page.mine.length).toBe(1);
        expect(page.ledger.watched.length).toBe(1);
        expect(page.ledger.latest).toBeInstanceOf($Held);
    });

    it('AND IT IS ONE OBJECT, not three — the identity is shared', () => {
        show(Shared);
        const page = drawing.page as $Shared;
        expect(page.ledger.watched[0]).toBe(page.mine[0]);
        expect(page.ledger.latest).toBe(page.mine[0]);
    });

    // ITS STATE IS SHARED, and its PROPS are not — a prop is re-applied from the
    // element by whoever drew it, so the thing two owners share is what the
    // instance holds of its own, which is the honest half.
    it('so what one owner does to it, the other owner sees', async () => {
        show(Shared);
        const page = drawing.page as $Shared;
        await act(async () => { page.mine[0].note = ' · touched by the first owner'; });
        expect(page.ledger.latest!.note).toBe(' · touched by the first owner');
        await act(async () => { page.ledger.latest!.note = ' · and back by the second'; });
        expect(page.mine[0].note).toBe(' · and back by the second');
    });

    it('AND THE PAGE SHOWS IT — one owner writes, and the drawing follows', async () => {
        const container = show(Shared);
        const page = drawing.page as $Shared;
        await act(async () => { page.ledger.latest!.note = ' · seen'; });
        expect(container.querySelector('.held')!.textContent).toBe('one · seen');
    });

    it('and leaving the page takes it back out of EVERY place it was put', async () => {
        show(Shared);
        const page = drawing.page as $Shared;
        await act(async () => { page.$there = false; });
        expect(page.mine.length).toBe(0);
        expect(page.ledger.watched.length).toBe(0);
        expect(page.ledger.latest).toBeUndefined();
    });

    class $BadlyShared extends $Chemical {
        one?: $Held;
        view() {
            seen(this);
            return <div>
                <Held mark="a" on={[() => this.one]} />
                <Held mark="b" on={[() => this.one]} />
            </div>;
        }
    }
    const BadlyShared = $($BadlyShared);

    it('and the single-member rule still holds inside a list of arrows', () => {
        expect(() => show(BadlyShared)).toThrow(/Two are assigned to the same member/);
    });
});

// =============================================================================
// THE NULL LOOP — a view that draws something only while the member is empty.
//
// This is the shape a class reaches for when a part is OPTIONAL: draw it if I
// have not got one, and use it once I have. It is the second costume of the same
// mistake, and it flips rather than climbs — the count of assignments goes 1, 0,
// 1, 0 — so a check that only watched for growth would never see it.
// =============================================================================

describe('a view that draws a part only while it has none', () => {
    class $Flipping extends $Chemical {
        one?: $Held;
        view() {
            seen(this);
            return <div>{this.one ? <span className="using">{this.one.note}</span> : <Held on={() => this.one} />}</div>;
        }
    }
    const Flipping = $($Flipping);

    it('IS REFUSED rather than flipping forever', () => {
        expect(() => show(Flipping)).toThrow(/will not settle/);
    });

    // AND THE CURE IS THE ORDINARY ONE: draw it always, use it when it arrives.
    // The view's shape no longer depends on what was assigned, so there is
    // nothing to flip.
    class $Steady extends $Chemical {
        one?: $Held;
        view() {
            seen(this);
            return <div>
                <Held on={() => this.one} />
                <span className="using">{this.one ? 'held' : 'not yet'}</span>
            </div>;
        }
    }
    const Steady = $($Steady);

    it('while drawing it unconditionally settles, and the member is there to use', () => {
        const container = show(Steady);
        expect((drawing.page as $Steady).one).toBeInstanceOf($Held);
        expect(container.querySelector('.using')!.textContent).toBe('held');
    });

    // AND THE OTHER ORDINARY ONE, which is Doug's own: the bond constructor
    // makes what the caller did not write, so the member is never empty and
    // nothing is conditional on it.
    class $Made extends $Chemical {
        one!: $Held;
        $Made(..._given: unknown[]) { this.one = $($Held).$ as $Held; }
        view() { seen(this); return <span className="using">{this.one ? 'made in the bond' : 'nothing'}</span>; }
    }
    const Made = $($Made);

    it('and a part made in the bond constructor is simply there, with no assignment at all', () => {
        const container = show(Made);
        expect(container.querySelector('.using')!.textContent).toBe('made in the bond');
    });
});

// =============================================================================
// AN OWNER MAY TAKE BACK WHAT IT HANDED OUT, and the framework must not hold a
// stale claim over a member somebody cleared by hand. Without this, a maker that
// revokes, ends and remakes is refused on the remake for a claim nobody holds.
// =============================================================================

describe('a member cleared by hand is free again', () => {
    class $Maker extends $Chemical {
        one?: $Held;
        $there = true;
        view() {
            seen(this);
            return <div>{this.$there ? <Held on={() => this.one} /> : null}</div>;
        }
    }
    const Maker = $($Maker);

    it('revoke · end · make again is accepted', async () => {
        show(Maker);
        const page = drawing.page as $Maker;
        expect(page.one).toBeInstanceOf($Held);

        await act(async () => { page.one = undefined; });      // revoked by hand
        await act(async () => { page.$there = false; });        // ended
        await act(async () => { page.$there = true; });         // made again

        expect(page.one).toBeInstanceOf($Held);
    });
});

// =============================================================================
// THE WALK KEEPS ONE SCRATCH AND REUSES IT, because a pass object allocated on
// every render of every chemical is paid for by pages that assign nothing. That
// is only safe if no two chemicals can ever see each other's count — so it is
// promised rather than assumed.
// =============================================================================

describe('one chemical never reads the pass of another', () => {
    class $Few extends $Chemical {
        held: $Held[] = [];
        view() { return <div><Held on={() => this.held} /></div>; }
    }
    class $Many extends $Chemical {
        held: $Held[] = [];
        view() {
            return <div>{Array.from({ length: 6 }, (_, at) =>
                <Held key={at} on={() => this.held} />)}</div>;
        }
    }
    class $Both extends $Chemical {
        view() { seen(this); return <div><Few /><Many /><Few /></div>; }
    }
    const Few = $($Few); const Many = $($Many);
    $($Few); $($Many);
    const Both = $($Both);

    it('two chemicals assigning different numbers, drawn side by side, both settle', () => {
        const container = show(Both);
        expect(container.querySelectorAll('.held').length).toBe(8);
    });

    it('and neither is accused of running away', () => {
        expect(() => show(Both)).not.toThrow();
    });
});
