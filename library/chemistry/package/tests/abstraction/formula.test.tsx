import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, $Formula } from '@/index';
import { $formula$, $keyOf$ } from '@/implementation/symbols';

// =============================================================================
// $Formula — a formula stands for something else, and the framework replaces it
// with what it symbolizes.
//
// A class carries a catalogue of named specimens. A key CLIMBS: it is filed in
// its own class's catalogue and in every formula ancestor's, up to the branch
// root — the first class below $Formula — and never into $Formula itself. So an
// ancestor answers to a descendant's name and a descendant never answers to an
// ancestor's, which is what a taxonomy is.
//
// The swap happens in the render walk, on what frame() returned, and it lifts
// and replaces the COMPONENT only: the text and every prop cross unchanged.
// =============================================================================

const stood: any[] = [];

function mark(f: any) {
    stood.push(f);
    return <span data-kind={f.constructor.name}>{f.children}</span>;
}

// Doug's specimen hierarchy, exactly:
//     $Type > $Book > $Biography > $Autobiography
//     $Type > $Book > $Dictionary
class $Type extends $Formula {
    constructor() { super(); this.cache(); }

    view() { return mark(this); }
}

class $Book extends $Type {
    constructor() { super(); this.cache('Book'); }
}

class $Biography extends $Book {
    constructor() { super(); this.cache('Biography'); }
}

class $Autobiography extends $Biography {
    constructor() { super(); this.cache('Autobiography'); this.cache('Auto-biography'); }
}

class $Dictionary extends $Book {
    constructor() { super(); this.cache('Dictionary'); }
}

const Type = $($Type);
const Book = $($Book);
const Biography = $($Biography);
const Autobiography = $($Autobiography);
const Dictionary = $($Dictionary);

// A page is an ordinary chemical whose VIEW writes the formula, which is where a
// formula is swapped. See "the boundary" at the bottom for what is not.
function page(drawn: () => React.ReactNode) {
    class $Page extends $Chemical {
        view() { return drawn(); }
    }
    return $($Page);
}

function drawn(node: React.ReactNode) {
    const Page = page(() => node);
    return render(<Page />);
}

function kind(node: React.ReactNode): string | null | undefined {
    return drawn(node).container.querySelector('[data-kind]')?.getAttribute('data-kind');
}

function hue(node: React.ReactNode): string | null | undefined {
    return drawn(node).container.querySelector('[data-hue]')?.getAttribute('data-hue');
}

// =============================================================================
// 1. The climb — a key reaches every ancestor and no sibling
// =============================================================================

describe('the climb', () => {
    it('a class stands for its own key', () => {
        expect(kind(<Biography>Biography</Biography>)).toBe('$Biography');
    });

    it('a key is found from every ancestor in the branch, and from the branch root', () => {
        expect(kind(<Biography>Autobiography</Biography>)).toBe('$Autobiography');
        expect(kind(<Book>Autobiography</Book>)).toBe('$Autobiography');
        expect(kind(<Type>Autobiography</Type>)).toBe('$Autobiography');
    });

    it('one class may claim several names, and both reach it', () => {
        expect(kind(<Type>Auto-biography</Type>)).toBe('$Autobiography');
    });

    it('A SIBLING IS NOT REACHABLE — a biography never stands for a dictionary', () => {
        expect(kind(<Biography>Dictionary</Biography>)).not.toBe('$Dictionary');
    });

    it('and the sibling IS reachable from the ancestor they share', () => {
        expect(kind(<Book>Dictionary</Book>)).toBe('$Dictionary');
        expect(kind(<Type>Dictionary</Type>)).toBe('$Dictionary');
    });

    it('an unrelated branch never sees another branch, so $Formula holds nothing', () => {
        class $Note extends $Formula {
            constructor() { super(); this.cache(); }

            view() { return mark(this); }
        }
        const Note = $($Note);
        expect(kind(<Note>Autobiography</Note>)).toBe('$Note');
    });
});

// =============================================================================
// 2. First one wins, and order does not decide it
// =============================================================================

describe('first one wins', () => {
    it('a second claim on a taken name does not displace the first', () => {
        class $Root extends $Formula {
            constructor() { super(); this.cache('shared'); }

            view() { return mark(this); }
        }
        class $Leaf extends $Root {
            constructor() { super(); this.cache('leaf'); }
        }
        const Root = $($Root);
        const Leaf = $($Leaf);
        expect(kind(<Root>shared</Root>)).toBe('$Root');
        expect(kind(<Root>shared</Root>)).not.toBe('$Leaf');
    });

    it('CONSTRUCTING THE DEEPEST CLASS FIRST GIVES THE SAME TABLE', () => {
        class $Up extends $Formula {
            constructor() { super(); this.cache('up'); }

            view() { return mark(this); }
        }
        class $Mid extends $Up {
            constructor() { super(); this.cache('mid'); }
        }
        class $Low extends $Mid {
            constructor() { super(); this.cache('low'); }
        }
        // the deepest is asked for first — its super-chain re-runs 'up' and 'mid'
        const Low = $($Low);
        const Up = $($Up);
        const Mid = $($Mid);
        expect(kind(<Up>up</Up>)).toBe('$Up');
        expect(kind(<Up>mid</Up>)).toBe('$Mid');
        expect(kind(<Up>low</Up>)).toBe('$Low');
    });
});

// =============================================================================
// 3. Several specimens of ONE class — the catalogue holds specimens, not classes
// =============================================================================

describe('several specimens of one class', () => {
    class $Pigment extends $Formula {
        $hue = 0;

        file(hue: number, key: string) {
            this.$hue = hue;
            this.cache(key);
            return this;
        }

        view() { return <span data-hue={String(this.$hue)}>{this.children}</span>; }
    }
    const Pigment = $($Pigment);
    const rose = new $Pigment().file(10, 'rose');
    const sea = new $Pigment().file(200, 'sea');

    it('two names reach two different instances of the same class', () => {
        expect(hue(<Pigment>rose</Pigment>)).toBe('10');
        expect(hue(<Pigment>sea</Pigment>)).toBe('200');
        expect(rose).not.toBe(sea);
    });

    // FOUND BY THE DEMONSTRATION, NOT BY THIS SUITE. A specimen that is not its
    // class's registered template goes down $lift's direct path and BECOMES the
    // component — one shared instance behind every mention of its name — so a
    // prop written at one site was reaching every other.
    it('A PROP AT ONE SITE NEVER REACHES ANOTHER — a specimen is copied, not shared', () => {
        const { container } = drawn(<><Pigment>rose</Pigment><Pigment hue={999}>rose</Pigment></>);
        const hues = [...container.querySelectorAll('[data-hue]')].map(n => n.getAttribute('data-hue'));
        expect(hues).toEqual(['10', '999']);
    });

    it('AND EACH CARRIES ITS OWN STATE, drawn at once', () => {
        const { container } = drawn(<><Pigment>rose</Pigment><Pigment>sea</Pigment></>);
        const hues = [...container.querySelectorAll('[data-hue]')].map(n => n.getAttribute('data-hue'));
        expect(hues).toEqual(['10', '200']);
    });
});

// =============================================================================
// 4. The default, the refusal, and standing as written
// =============================================================================

describe('a miss', () => {
    it('falls to the specimen that stands when nothing is named', () => {
        expect(kind(<Biography>nothing at all</Biography>)).toBe('$Biography');
    });

    it('RAISES where a branch declared no default, naming what was asked and what it holds', () => {
        class $Metal extends $Formula {
            view() { return mark(this); }
        }
        class $Iron extends $Metal {
            constructor() { super(); this.cache('Iron'); }
        }
        $($Iron);
        const Metal = $($Metal);
        expect(() => (Metal as any).$[$formula$](<Metal>Unobtainium</Metal>))
            .toThrow(/stands for nothing called "Unobtainium" — it stands for Iron/);
    });

    it('and a class that claimed nothing at all stands as written, raising nothing', () => {
        class $Bare extends $Formula {}
        const Bare = $($Bare);
        expect((Bare as any).$[$formula$](<Bare>anything</Bare>)).toBeUndefined();
        const { container } = drawn(<Bare>anything</Bare>);
        expect(container.textContent).toBe('anything');
    });
});

// =============================================================================
// 5. The reading belongs to the formula
// =============================================================================

describe('the reading', () => {
    it('the written text is the key, and surrounding whitespace does not defeat it', () => {
        const { container } = drawn(<Type>{'  Autobiography  '}</Type>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Autobiography');
    });

    it('a formula that reads its content otherwise is asked, and its answer is used', () => {
        class $Cite extends $Formula {
            constructor() { super(); this.cache(); }

            override [$keyOf$](written: unknown) {
                const said = String((written as any) ?? '');
                return said.startsWith('see ') ? said.slice(4) : undefined;
            }

            view() { return mark(this); }
        }
        class $Long extends $Cite {
            constructor() { super(); this.cache('long'); }
        }
        const Cite = $($Cite);
        const Long = $($Long);
        expect((Cite as any).$[$formula$](<Cite>see long</Cite>)).toBe(Long);
    });

    it('and one that declines to answer is not swapped', () => {
        class $Quiet extends $Formula {
            constructor() { super(); this.cache('quiet'); }

            override [$keyOf$]() { return undefined; }

            view() { return mark(this); }
        }
        const Quiet = $($Quiet);
        expect((Quiet as any).$[$formula$](<Quiet>quiet</Quiet>)).toBeUndefined();
    });
});

// =============================================================================
// 6. The swap
// =============================================================================

describe('the swap', () => {
    it('a formula written in a drawing stands as the class its name resolves to', () => {
        const { container } = drawn(<Type>Autobiography</Type>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Autobiography');
    });

    it('a tag at any depth resolves to a descendant — subclasses are swappable', () => {
        const { container } = drawn(<Biography>Autobiography</Biography>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Autobiography');
    });

    it('THE TEXT CROSSES — the replacement is written with what the formula was', () => {
        const { container } = drawn(<Type>Autobiography</Type>);
        expect(container.textContent).toBe('Autobiography');
    });

    it('AND EVERY PROP CROSSES', () => {
        class $Shape extends $Formula {
            $weight = 0;

            constructor() { super(); this.cache(); }

            view() { return <span data-weight={String(this.$weight)}>{this.children}</span>; }
        }
        class $Round extends $Shape {
            constructor() { super(); this.cache('Round'); }
        }
        const Shape = $($Shape) as any;
        $($Round);
        const { container } = drawn(<Shape weight={7}>Round</Shape>);
        expect(container.querySelector('[data-weight]')?.getAttribute('data-weight')).toBe('7');
        expect(container.textContent).toBe('Round');
    });

    it('the part that stands IS an instance of what was written', () => {
        stood.length = 0;
        drawn(<Book>Autobiography</Book>);
        const it$ = stood[stood.length - 1];
        expect(it$ instanceof $Autobiography).toBe(true);
        expect(it$ instanceof $Book).toBe(true);
        expect(it$ instanceof $Dictionary).toBe(false);
    });

    it('a resolution to the very class written changes nothing', () => {
        stood.length = 0;
        drawn(<Autobiography>Autobiography</Autobiography>);
        expect(stood[stood.length - 1] instanceof $Autobiography).toBe(true);
    });

    it('AND IT TERMINATES — the resolution of a resolution is a fixed point in one step', () => {
        const { container } = drawn(<Type>Biography</Type>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Biography');
        // what $Type stood for is itself a formula; asking it the same name
        // answers itself, so there is nothing further to swap
        const first = (Type as any).$[$formula$](<Type>Biography</Type>);
        expect(first).toBe(Biography);
        expect((first as any).$[$formula$](<Biography>Biography</Biography>)).toBe(first);
    });
});

// =============================================================================
// 7. The surface — the component is stable, and $ still answers for it
// =============================================================================

describe('the surface', () => {
    it('$(instance) gives back the same component every time', () => {
        const it$ = (Autobiography as any).$;
        expect($(it$)).toBe($(it$));
    });

    it('and what a formula resolved to is an ordinary component the container answers for', () => {
        expect((Type as any).$[$formula$](<Type>Autobiography</Type>)).toBe(Autobiography);
    });

    // $ STILL APPLIES. The walk does not get to skip the representative: what a
    // name resolved to is ASKED FOR, so a scope can stand something else behind
    // it without touching the catalogue.
    it('A SCOPE MAY RE-DRESS WHAT A NAME RESOLVED TO, with no catalogue change', () => {
        class $Plain extends $Formula {
            constructor() { super(); this.cache(); }

            view() { return <span data-kind={this.constructor.name}>{this.children}</span>; }
        }
        class $Fancy extends $Plain {
            constructor() { super(); this.cache('Fancy'); }
        }
        class $Dressed extends $Plain {
            view() { return <span data-kind="dressed">{this.children}</span>; }
        }
        const Plain = $($Plain) as any;
        const Fancy = $($Fancy) as any;
        const Dressed = $($Dressed) as any;

        class $Room extends $Chemical {
            view() { return <Plain>Fancy</Plain>; }
        }
        const Room = $($Room) as any;

        const plain = render(<Room />);
        expect(plain.container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Fancy');
        plain.unmount();

        $(Room, Fancy)(Dressed);
        const dressed = render(<Room />);
        expect(dressed.container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('dressed');
        expect(kind(<Plain>Fancy</Plain>)).toBe('$Fancy');
    });
});

// =============================================================================
// 8. The boundary, named rather than found
// =============================================================================

describe('the boundary', () => {
    it('a formula mounted as a react root is NOT swapped — the walk never sees it', () => {
        const { container } = render(<Type>Autobiography</Type>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Type');
    });

    it('and a formula evaluated outside a drawing is not swapped either', () => {
        const made = $(<Type>Autobiography</Type>) as any;
        expect(made instanceof $Autobiography).toBe(false);
        expect(made instanceof $Type).toBe(true);
    });
});

// =============================================================================
// 9. THE BOUND PART IS THE RESOLVED CLASS — the claim the whole design rests on
//
// The walk recurses into props.children, so a formula written inside another
// chemical's element is replaced while it is still an element — before that
// chemical's component ever runs, and therefore before its bond constructor
// sees its children. What gets BOUND is what the name stood for.
// =============================================================================

describe('what a parent binds', () => {
    class $Shelf extends $Chemical {
        held: any[] = [];

        $Shelf(...parts: any[]) { this.held = parts; }

        view() { return <div data-held={this.held.map(p => p?.constructor?.name).join(',')} />; }
    }
    const Shelf = $($Shelf);

    it('a formula nested in a written child is swapped BEFORE its parent binds it', () => {
        const { container } = drawn(<Shelf><Type>Autobiography</Type></Shelf>);
        expect(container.querySelector('[data-held]')?.getAttribute('data-held')).toBe('$Autobiography');
    });

    it('and the bound part is the model, not only the drawing', () => {
        const { container } = drawn(<Shelf><Biography>Autobiography</Biography><Book>Dictionary</Book></Shelf>);
        expect(container.querySelector('[data-held]')?.getAttribute('data-held'))
            .toBe('$Autobiography,$Dictionary');
    });
});

// =============================================================================
// 9. resolve — a formula may be findable without being an asker
// =============================================================================

describe('resolve', () => {
    class $Root extends $Formula {
        constructor() { super(); this.cache(); }

        view() { return mark(this); }
    }
    class $Named extends $Root {
        override resolve = false;

        constructor() { super(); this.cache('Letter'); }
    }
    class $Deeper extends $Named {
        constructor() { super(); this.cache('Deep'); }
    }

    const Root = $($Root);
    const Named = $($Named);
    $($Deeper);

    it('an asker resolves a name that climbed into it', () => {
        const { container } = drawn(<Root>Deep</Root>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Deeper');
    });

    it('A CLASS WITH resolve=false NEVER LOOKS UP, even for a name its own catalogue holds', () => {
        const { container } = drawn(<Named>Deep</Named>);
        expect(container.querySelector('[data-kind]')?.getAttribute('data-kind')).toBe('$Named');
        expect(container.textContent).toBe('Deep');
    });

    it('and it is still findable by name, so caching is unaffected', () => {
        expect(kind(<Root>Letter</Root>)).toBe('$Named');
    });
});

// =============================================================================
// 10. Base classes back — a chemical anywhere in a hierarchy may become a formula
// =============================================================================

describe('base classes back', () => {
    class $Middle extends $Chemical {
        view() { return mark(this); }
    }
    class $Kind extends $Middle {
        override get formula() { return true; }

        constructor() { super(); this.cache(); }
    }
    class $Special extends $Kind {
        constructor() { super(); this.cache('Special'); }
    }

    const Middle = $($Middle);
    const Kind = $($Kind);
    $($Special);

    it('A CHEMICAL THAT NEVER EXTENDED $Formula CAN CACHE AND RESOLVE', () => {
        expect(kind(<Kind>Special</Kind>)).toBe('$Special');
    });

    it('and the branch stops where formula goes false, so a non-formula ancestor holds nothing', () => {
        expect(kind(<Middle>Special</Middle>)).toBe('$Middle');
    });

    it('and an ordinary chemical is never swapped at all', () => {
        expect(kind(<Middle>anything</Middle>)).toBe('$Middle');
    });
});
