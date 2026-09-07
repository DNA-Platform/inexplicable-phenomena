import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { $, $Block, $Chemical, $Particle, children, select, styled, style } from '@/index';

afterEach(cleanup);

// The selector says what element a chemical is styled as, and its CSS fields
// are the stylesheet. The three spellings are the reactive law's own: _ is
// inert and bakes, a bare name is reactive, a $ name is a prop.
class $Body extends $Chemical {
    selector = styled.main;
    maxWidth = '60em';
    color = 'rgb(32, 17, 34)';
    override view(): ReactNode { return <main>{this[children]}</main>; }
}
const Body = $($Body);

class $Dress extends $Chemical {
    selector = styled.figure;
    padding = '7px';
}
const Dress = $($Dress);

class $Linked extends $Chemical {
    selector = styled.a;
    color = 'rgb(51, 102, 204)';
    $href: string | undefined = undefined;
}
const Linked = $($Linked);

class $Nested extends $Chemical {
    selector = styled.div;
    background = 'rgb(2, 4, 6)';
    @select('> span') first_background = 'rgb(8, 9, 10)';
    first_padding = '3px';
}
const Nested = $($Nested);

class $Written extends $Chemical {
    selector = styled.div;
    background = 'rgb(3, 3, 3)';
    ['> span: color'] = 'rgb(11, 22, 33)';
    ['_> span: padding'] = '5px';
    ['&:hover: outlineColor'] = 'rgb(44, 55, 66)';
}
const Written = $($Written);

class $Plain extends $Chemical {
    override view(): ReactNode { return <main>plain</main>; }
}
const Plain = $($Plain);

class $Wider extends $Body {
    override maxWidth = '80em';
}
const Wider = $($Wider);

class $Live extends $Chemical {
    selector = styled.section;
    background = 'rgb(1, 2, 3)';
    override view(): ReactNode { return <section />; }
}

class $Prop extends $Chemical {
    selector = styled.article;
    $background = 'rgb(4, 5, 6)';
    override view(): ReactNode { return <article />; }
}
const Prop = $($Prop);

class $Ordered extends $Chemical {
    selector = styled.aside;
    _background = 'rgb(9, 9, 9)';
    background = 'rgb(8, 8, 8)';
    $background = 'rgb(7, 7, 7)';
    override view(): ReactNode { return <aside />; }
}
const Ordered = $($Ordered);

class $Baked extends $Chemical {
    selector = styled.div;
    _background = 'rgb(10, 10, 10)';
    override view(): ReactNode { return <div />; }
}

class $Promoted extends $Baked {
    $background = 'rgb(11, 11, 11)';
}

class $Spot extends $Particle {
    selector = styled.span;
    color = 'rgb(3, 3, 3)';
    override view(): ReactNode { return <span />; }
}
const Spot = $($Spot);

// The chemical draws its own element, so a test asks about whatever the
// container holds — never a marker the view had to write.
function drawn(container: HTMLElement): HTMLElement {
    const one = container.firstElementChild as HTMLElement;
    expect(one).not.toBeNull();
    return one;
}

// Past the first construction: the first instance of a class becomes its
// template, and a template derives per mount rather than being the mount.
function standing<T>(make: () => T): T {
    make();
    return make();
}

describe('a chemical is styled by declaring what it is styled as', () => {
    it('the selector is the element, and it carries no style attribute', () => {
        const { container } = render(<Body />);
        const one = drawn(container);
        expect(one.tagName).toBe('MAIN');
        expect(one.getAttribute('style')).toBeNull();
        expect(one.className).not.toBe('');
        expect(getComputedStyle(one).maxWidth).toBe('960px');
    });

    it('a chemical that declares no selector is untouched', () => {
        const { container } = render(<Plain />);
        const one = drawn(container);
        expect(one.className).toBe('');
        expect(getComputedStyle(one).maxWidth).toBe('');
    });

    it('a subclass keeps what its base declared and replaces what it redeclares', () => {
        const { container } = render(<Wider />);
        const one = drawn(container);
        expect(getComputedStyle(one).maxWidth).toBe('1280px');
        expect(getComputedStyle(one).color).toBe('rgb(32, 17, 34)');
    });

    it('one component per class, and a subclass has its own', () => {
        const base = new $Body();
        const again = new $Body();
        const sub = new $Wider();
        expect((base as any)[style]).toBe((again as any)[style]);
        expect((sub as any)[style]).not.toBe((base as any)[style]);
    });

    it('a styled particle is styled too', () => {
        const { container } = render(<Spot />);
        const one = drawn(container);
        expect(one.tagName).toBe('SPAN');
        expect(getComputedStyle(one).color).toBe('rgb(3, 3, 3)');
    });

    it('a dress needs no view — it is handed the element and holds what it is given', () => {
        const { container } = render(<Dress>worn</Dress>);
        const one = drawn(container);
        expect(one.tagName).toBe('FIGURE');
        expect(one.textContent).toBe('worn');
        expect(getComputedStyle(one).padding).toBe('7px');
    });

    it('a styled chemical takes ordinary props too — the blend', () => {
        const { container } = render(<Linked href="/books/algebra">algebra</Linked>);
        const one = drawn(container);
        expect(one.tagName).toBe('A');
        expect(one.getAttribute('href')).toBe('/books/algebra');
        expect(getComputedStyle(one).color).toBe('rgb(51, 102, 204)');
    });

    it('@select writes a nested block, and a prefix frees the name', () => {
        const { container } = render(<Nested><span>inside</span></Nested>);
        const one = drawn(container);
        const inside = one.querySelector('span') as HTMLElement;
        expect(getComputedStyle(one).background).toContain('rgb(2, 4, 6)');
        expect(getComputedStyle(inside).background).toContain('rgb(8, 9, 10)');
        expect(getComputedStyle(inside).padding).toBe('3px');
    });

    it('a selector can be written into the name, split at its last colon', () => {
        const { container } = render(<Written><span>inside</span></Written>);
        const one = drawn(container);
        const inside = one.querySelector('span') as HTMLElement;
        expect(getComputedStyle(one).background).toContain('rgb(3, 3, 3)');
        expect(getComputedStyle(inside).color).toBe('rgb(11, 22, 33)');
        expect(getComputedStyle(inside).padding).toBe('5px');
    });

    it('what it is given is what it holds', () => {
        const { container } = render(<Body>held</Body>);
        expect(drawn(container).textContent).toBe('held');
    });
});

class $Palette extends $Chemical {
    paper = 'rgb(51, 52, 53)';
}

class $Themed extends $Chemical {
    selector = styled.section;
    palette!: $Palette;
    get background() { return this.palette.paper; }

    $Themed(block: $Block) {
        void block;
        this.palette = new $Palette();
    }

    override view(): ReactNode { return <section />; }
}
const Themed = $($Themed);

class $Bonded extends $Chemical {
    selector = styled.section;
    background = 'rgb(0, 0, 0)';

    $Bonded(block: $Block) {
        void block;
        this.background = 'rgb(40, 41, 42)';
    }

    override view(): ReactNode { return <section /> ; }
}
const Bonded = $($Bonded);

describe('the three spellings differ where the reactive law says they do', () => {
    it('a getter is a live value, read per render', async () => {
        const { container } = render(<Themed>x</Themed>);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(51, 52, 53)');
    });

    it('a bond constructor may assign a styled property', () => {
        const { container } = render(<Bonded>x</Bonded>);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(40, 41, 42)');
    });

    it('a bare name is live: writing it restyles', async () => {
        const one = standing(() => new $Live());
        const Held = $(one);
        const { container } = render(<Held />);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(1, 2, 3)');
        await act(async () => { one.background = 'rgb(21, 22, 23)'; });
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(21, 22, 23)');
    });

    it('a $ name is live and arrives as a prop from outside', () => {
        const { container } = render(<Prop />);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(4, 5, 6)');
        cleanup();
        const { container: given } = render(<Prop background="rgb(31, 32, 33)" />);
        expect(getComputedStyle(drawn(given)).background).toContain('rgb(31, 32, 33)');
    });

    it('an _ name bakes and its write moves nothing', async () => {
        const one = standing(() => new $Baked());
        const Held = $(one);
        const { container } = render(<Held />);
        const before = getComputedStyle(drawn(container)).background;
        await act(async () => { (one as any)._background = 'rgb(99, 99, 99)'; });
        expect(getComputedStyle(drawn(container)).background).toBe(before);
    });

    it('$ over plain over _ — one property, emitted once, from the highest', () => {
        const { container } = render(<Ordered />);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(7, 7, 7)');
    });

    it('a subclass promotes a baked property to a live one', async () => {
        const one = standing(() => new $Promoted());
        const Held = $(one);
        const { container } = render(<Held />);
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(11, 11, 11)');
        await act(async () => { one.$background = 'rgb(12, 12, 12)'; });
        expect(getComputedStyle(drawn(container)).background).toContain('rgb(12, 12, 12)');
    });
});

// A SELECTOR SAYS WHERE A DECLARATION STANDS, and it may open more than one
// level. A prefix names one selector and says it once; every member of that
// prefix is under it. No prefix is the top of the class.
class $Levels extends $Chemical {
    selector = styled.section;
    padding = '1px';
    @select(`@media (max-width: 40em) {
             .inner {`) narrow_display = 'none';
    narrow_color = 'rgb(3, 3, 3)';
    @select('> span') inner_margin = '2px';
    _inner_borderWidth = '4px';
    get inner_outlineColor() { return this.edge; }
    edge = 'rgb(5, 5, 5)';

    override view(): ReactNode { return <section><span>inside</span></section>; }
}
const Levels = $($Levels);

class $Deeper extends $Levels {
    narrow_fontSize = '7px';
    @select(`@supports (display: grid) {
             @media (min-width: 10em) {
             > span {`) three_letterSpacing = '3px';
}
const Deeper = $($Deeper);

class $Moved extends $Levels {
    @select('> b') inner_margin = '2px';

    override view(): ReactNode { return <section><b>moved</b></section>; }
}
const Moved = $($Moved);

const stylesheet = () => [...document.querySelectorAll('style')].map(one => one.textContent).join('');

describe('a selector opens the levels it needs, and a prefix names one selector once', () => {
    it('A MEMBER WITH NO PREFIX AND NO SELECTOR STANDS AT THE TOP OF ITS CLASS', () => {
        const { container } = render(<Levels />);
        expect(getComputedStyle(drawn(container)).padding).toBe('1px');
    });

    it('and a one-level selector puts its declarations on what it names', () => {
        const { container } = render(<Levels />);
        const inside = drawn(container).querySelector('span') as HTMLElement;
        expect(getComputedStyle(inside).margin).toBe('2px');
    });

    it('A MEDIA QUERY MAY HOLD A DESCENDANT RULE — the thing one level could not say', () => {
        render(<Levels />);
        const css = stylesheet();
        expect(css).toMatch(/@media \(max-width: 40em\)\{[^{}]*\.inner\{[^{}]*display:none;/u);
        expect((css.match(/\{/gu) ?? []).length).toBe((css.match(/\}/gu) ?? []).length);
    });

    it('AND A MEMBER OF THAT PREFIX THAT SAYS NOTHING IS UNDER IT TOO — the selector is written once', () => {
        render(<Levels />);
        expect(stylesheet()).toMatch(/@media \(max-width: 40em\)\{[^{}]*\.inner\{[^}]*color:rgb\(3, 3, 3\)/u);
    });

    it('A BARE GETTER IS UNDER THE PREFIX A FIELD DECLARED — the group crosses the storage boundary', () => {
        const { container } = render(<Levels />);
        const inside = drawn(container).querySelector('span') as HTMLElement;
        expect(getComputedStyle(inside).outlineColor).toBe('rgb(5, 5, 5)');
        expect(getComputedStyle(drawn(container)).outlineColor).not.toBe('rgb(5, 5, 5)');
    });

    it('a selector may open three levels, and every one of them is closed', () => {
        render(<Deeper />);
        const css = stylesheet();
        expect(css).toMatch(/@supports \(display: grid\)\{@media \(min-width: 10em\)\{[^{}]*span\{[^}]*letter-spacing:3px;/u);
        expect((css.match(/\{/gu) ?? []).length).toBe((css.match(/\}/gu) ?? []).length);
    });

    it('AND A SUBCLASS JOINS ITS PARENT PREFIX WITHOUT REPEATING THE SELECTOR', () => {
        render(<Deeper />);
        expect(stylesheet()).toMatch(/@media \(max-width: 40em\)\{[^{}]*\.inner\{[^}]*font-size:7px/u);
    });

    it('AND A SUBCLASS MAY SAY IT AGAIN, WHICH MOVES THE WHOLE GROUP', () => {
        const { container } = render(<Moved />);
        const inside = drawn(container).querySelector('b') as HTMLElement;
        expect(getComputedStyle(inside).margin).toBe('2px');
    });

    it('A BARE INERT FIELD JOINS A PREFIX WHOSE SELECTOR A FIELD DECLARED — and still bakes', () => {
        const { container } = render(<Levels />);
        const inside = drawn(container).querySelector('span') as HTMLElement;
        expect(getComputedStyle(inside).borderWidth).toBe('4px');
    });

    it('AND SO DOES A BARE GETTER, WHICH LIVES ON THE PROTOTYPE WHERE THE SELECTOR LIVES ON THE TEMPLATE', async () => {
        const one = standing(() => new $Levels());
        const Held = $(one);
        const { container } = render(<Held />);
        const inside = drawn(container).querySelector('span') as HTMLElement;
        expect(getComputedStyle(inside).outlineColor).toContain('rgb(5, 5, 5)');
        await act(async () => { one.edge = 'rgb(6, 6, 6)'; });
        expect(getComputedStyle(inside).outlineColor).toContain('rgb(6, 6, 6)');
    });

    it('A PREFIX SAYS ITS SELECTOR ONCE — saying it twice in one class is refused', () => {
        expect(() => {
            class $Again extends $Chemical {
                selector = styled.div;
                @select('a') one_color = 'red';
                @select('a') one_margin = '1px';
            }
            return $Again;
        }).toThrow(/says its selector once/u);
    });

    it('and one prefix naming two selectors in one class is refused', () => {
        expect(() => {
            class $Twice extends $Chemical {
                selector = styled.div;
                @select('a') two_color = 'red';
                @select('b') two_margin = '1px';
            }
            return $Twice;
        }).toThrow(/names two/u);
    });

    it('and a selector that says nothing at all is refused', () => {
        expect(() => {
            class $Empty extends $Chemical {
                selector = styled.div;
                @select('   ') three_color = 'red';
            }
            return $Empty;
        }).toThrow(/says nothing/u);
    });

    it('AND THE AUTHOR NEVER CLOSES A LEVEL — the emit owns the closing', () => {
        class $Closed extends $Chemical {
            selector = styled.div;
            @select('@media (min-width: 1em) { a { } }') four_color = 'rgb(1, 1, 1)';
            override view(): ReactNode { return <div />; }
        }
        expect(() => render(React.createElement($($Closed)))).toThrow(/closes none of them/u);
    });
});
