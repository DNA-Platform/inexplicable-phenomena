import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, Annotation, $Parenthetical, Parenthetical, $Narrative, Narrative, Collection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Demanding extends $Annotation {
    override specifies(writing: $Writing): void {
        $check(writing.contents.length > 0, 'a demanding annotation wants something written');
    }
}
class $Boxed extends $Annotation {
    override defines(writing: $Writing): void {
        writing.container = 'div';
    }
}
class $Tidying extends $Writing {
    $Tidying(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.annotations.remove($Annotation);
    }
}
class $Aside extends $Writing {
    $Aside(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.annotations.prepend(Parenthetical);
        this.define();
    }
}
class $Section extends $Writing {
    $Section(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.container = 'section';
    }
}
let draws = 0;
class $Counted extends $Writing {
    override view(): React.ReactNode {
        draws++;
        return super.view();
    }
}
const Mark = $($Mark);
const Stamp = $($Stamp);
const Demanding = $($Demanding);
const Boxed = $($Boxed);
const Tidying = $($Tidying);
const Aside = $($Aside);
const Section = $($Section);
const Counted = $($Counted);

describe('what comes into a writing is sorted once, into contents and annotations', () => {
    it('contents holds what is not an annotation, in its order, wherever the annotations stood', () => {
        const writing = built<$Writing>(<Writing><Annotation /><Tidying /><Annotation /><Counted /></Writing>);
        expect(writing.contents.length).toBe(2);
        expect(writing.contents.at(0)).toBeInstanceOf($Tidying);
        expect(writing.contents.at(1)).toBeInstanceOf($Counted);
        expect(writing.annotations.length).toBe(2);
    });

    it('an annotation written inside the prose stands beside the prose, and is found', () => {
        const writing = built<$Writing>(<Writing>before <Annotation /> after</Writing>);
        expect(writing.annotations.length).toBe(1);
        expect(writing.contents.every(chemical => !(chemical instanceof $Annotation))).toBe(true);
    });

    it('both are collections, and each writing has its own', () => {
        const writing = built<$Writing>(<Writing><Writing /></Writing>);
        expect(writing.contents).toBeInstanceOf(Collection);
        expect(writing.annotations).toBeInstanceOf(Collection);
        expect((writing.contents.at(0) as $Writing).contents).not.toBe(writing.contents);
    });

    it('an annotation written later stands nearer the front, and what $is stands is in front of them all', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Stamp /><Mark /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Narrative);
        expect(writing.annotations.at(1)).toBeInstanceOf($Mark);
        expect(writing.annotations.at(1)).not.toBeInstanceOf($Stamp);
        expect(writing.annotations.at(2)).toBeInstanceOf($Stamp);
    });
});

describe('$is declares what a writing is from outside: one or many, at the front, changed by changing it', () => {
    it('takes one, or a list of a class, a component, an element or a chemical', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, Parenthetical]} />);
        expect(writing.annotations.find($Mark).length).toBe(1);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        const elemental = built<$Writing>(<Writing is={[<Mark />, built<$Parenthetical>(<Parenthetical />)]} />);
        expect(elemental.annotations.length).toBe(2);
        expect(built<$Writing>(<Writing is={Narrative} />).annotations.at(0)).toBeInstanceOf($Narrative);
        expect(built<$Writing>(<Writing is={$Mark} />).annotations.at(0)).toBeInstanceOf($Mark);
    });

    it('changing it drops what it stood before and keeps what was written as a child', () => {
        const writing = built<$Writing>(<Writing is={$Mark}><Parenthetical /></Writing>);
        expect(writing.annotations.length).toBe(2);
        writing.$is = [];
        expect(writing.annotations.length).toBe(1);
        expect(writing.annotations.at(0)).toBeInstanceOf($Parenthetical);
    });

    it('stands at the front in its order, and is not made unique', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, $Parenthetical]}><Mark /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Mark);
        expect(writing.annotations.at(1)).toBeInstanceOf($Parenthetical);
        expect(writing.annotations.find($Mark).length).toBe(2);
        expect(writing.annotations.find($Mark)[0]).toBe(writing.annotations.at(0));
    });

    it('what it stands is parented to the writing', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, <Narrative />]} />);
        for (const annotation of writing.annotations)
            expect(annotation.parent).toBe(writing);
    });
});

describe('an annotation acts on the writing it stands in, at the bond and at every draw', () => {
    it('a writing is parenthetical when it carries an enforced Parenthetical, which the view asks by type', () => {
        expect(built<$Writing>(<Writing />).annotations.contains($Parenthetical)).toBe(false);
        expect(built<$Writing>(<Writing>an aside <Parenthetical /></Writing>).annotations.contains($Parenthetical)).toBe(true);
        expect(built<$Writing>(<Writing is={Parenthetical}>an aside</Writing>).annotations.contains($Parenthetical)).toBe(true);
    });

    it('Narrative inactivates the Parentheticals of its writing, written before or after it, or given from outside', () => {
        expect(built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>).annotations.contains($Parenthetical)).toBe(false);
        expect(built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>).annotations.contains($Parenthetical)).toBe(false);
        expect(built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>).annotations.contains($Parenthetical)).toBe(false);
        const writing = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        expect(writing.annotations.find($Parenthetical)[0].enforced).toBe(false);
        expect(writing.annotations.length).toBe(2);
    });

    it('an annotation that is not enforced does not act, and one that leaves acts no more; what it did to a sibling lasts', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        const [narrative] = writing.annotations.prepend(Narrative);
        narrative.enforced = false;
        writing.view();
        expect(writing.annotations.contains($Parenthetical)).toBe(true);
        narrative.enforced = true;
        writing.view();
        expect(writing.annotations.contains($Parenthetical)).toBe(false);
        writing.annotations.drop(narrative);
        writing.view();
        expect(writing.annotations.contains($Parenthetical)).toBe(false);
    });

    it('acting is idempotent, and an annotation acts on a copy of the list', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        writing.view();
        writing.view();
        expect(writing.annotations.length).toBe(2);
        expect(writing.annotations.contains($Parenthetical)).toBe(false);
    });

    it('a class that stands its own annotation in its bond defines again, and stands in front of $is', () => {
        const aside = built<$Aside>(<Aside is={Mark}>a</Aside>);
        expect(aside.annotations.at(0)).toBeInstanceOf($Parenthetical);
        expect(aside.annotations.at(1)).toBeInstanceOf($Mark);
        expect(aside.annotations.contains($Parenthetical)).toBe(true);
    });
});

describe('a writing draws through its container, which starts as a span', () => {
    it('is a span until a class or an annotation says otherwise', () => {
        expect(built<$Writing>(<Writing />).container).toBe('span');
        expect(built<$Section>(<Section />).container).toBe('section');
        expect(built<$Writing>(<Writing><Boxed /></Writing>).container).toBe('div');
        expect(built<$Writing>(<Writing is={Boxed} />).container).toBe('div');
    });

    it('drawn, the container is the element, and the annotations stand inside it in their own span wearing pd-annotations', async () => {
        const writing = built<$Section>(<Section>a <Mark /></Section>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const section = container?.firstElementChild;
        expect(section?.tagName).toBe('SECTION');
        expect(section?.querySelector('span.pd-annotations')).not.toBeNull();
        expect(section?.className).toBe('');
        expect(section?.textContent).toContain('a');
    });
});

describe('drawn, a writing defines itself at every draw and settles', () => {
    it('a parenthetical writing wears pd-parenthetical, and one draw is one draw', async () => {
        const writing = built<$Counted>(<Counted>a <Parenthetical /></Counted>);
        const Drawn = $(writing);
        draws = 0;
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.querySelector('span.pd-parenthetical')?.textContent).toContain('a');
        expect(draws).toBeLessThanOrEqual(3);
    });

    it('flipping enforced on an annotation redraws the writing without it', async () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('pd-parenthetical');
        await act(async () => { writing.annotations.find($Parenthetical)[0].enforced = false; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
    });

    it('setting $is from outside redraws the writing as what it now is', async () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('pd-parenthetical');
        await act(async () => { writing.$is = Narrative; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
    });
});

describe('specify is the assert the binder calls; it is called by nothing in the library and cascades down', () => {
    it('answers the failures of the writing, and nothing when it is up to code', () => {
        expect(built<$Writing>(<Writing><Writing /></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing>a</Writing>).specify()).toEqual(['a piece of writing holds only writing, and this one holds something else']);
    });

    it('the bond does not specify; a writing holding a string is built, and refused only when asked', () => {
        expect(() => built<$Writing>(<Writing>a</Writing>)).not.toThrow();
    });

    it('every enforced annotation weighs in through specifies', () => {
        const wanting = built<$Writing>(<Writing><Demanding /></Writing>);
        expect(wanting.specify()).toEqual(['a demanding annotation wants something written']);
        wanting.annotations.find($Demanding)[0].enforced = false;
        expect(wanting.specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Demanding /><Writing /></Writing>).specify()).toEqual([]);
    });

    it('cascades through contents and annotations, so every failure in reach appears', () => {
        const writing = built<$Writing>(<Writing><Writing>a</Writing><Writing><Writing>b</Writing></Writing><Demanding /></Writing>);
        const failures = writing.specify();
        expect(failures.length).toBe(2);
        expect(failures.every(failure => /holds only writing/.test(failure))).toBe(true);
        const annotated = built<$Writing>(<Writing><Writing /><Mark><Demanding /></Mark></Writing>);
        expect(annotated.specify()).toEqual(['a demanding annotation wants something written']);
    });

    it('a subclass adjusts its collections in its own bond, after calling Writing\'s', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(writing.annotations.length).toBe(0);
        expect(writing.contents.length).toBe(1);
        expect(writing.specify()).toEqual([]);
    });
});
