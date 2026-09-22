import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, Annotation, Annotations, $Parenthetical, Parenthetical, $Narrative, Narrative, Collection } from '@dna-platform/public';

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
class $Tagged extends $Annotation {
    override defines(writing: $Writing): void {
        writing.classes.add('pd-tagged');
    }
}
class $Tidying extends $Writing {
    $Tidying(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.annotations.remove($Annotation);
    }
}
class $Aside extends $Writing {
    protected override $Redefine(): void {
        this.annotations.add(Parenthetical);
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
const Tagged = $($Tagged);
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

    it('both are collections, the annotations their own kind, and each writing has its own', () => {
        const writing = built<$Writing>(<Writing><Writing /></Writing>);
        expect(writing.contents).toBeInstanceOf(Collection);
        expect(writing.annotations).toBeInstanceOf(Annotations);
        expect((writing.contents.at(0) as $Writing).contents).not.toBe(writing.contents);
    });

    it('in the annotations, add means the front, and the two questions count only what is enforced', () => {
        const writing = built<$Writing>(<Writing><Stamp /></Writing>);
        const [mark] = writing.annotations.add(Mark);
        expect(writing.annotations.at(0)).toBe(mark);
        expect(writing.annotations.contains($Mark)).toBe(true);
        expect(writing.annotations.containsOne($Stamp)).toBe(true);
        expect(writing.annotations.containsOne($Mark)).toBe(false);
        mark.enforced = false;
        expect(writing.annotations.containsOne($Mark)).toBe(true);
        writing.annotations.find($Stamp)[0].enforced = false;
        expect(writing.annotations.contains($Mark)).toBe(false);
        expect(writing.annotations.find($Mark).length).toBe(2);
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
    it('classes is a set the annotations fill at every pass, cleared first; Parenthetical adds pd-parenthetical', () => {
        expect(built<$Writing>(<Writing />).classes.size).toBe(0);
        expect(built<$Writing>(<Writing>an aside <Parenthetical /></Writing>).classes.has('pd-parenthetical')).toBe(true);
        expect(built<$Writing>(<Writing is={Parenthetical}>an aside</Writing>).classes.has('pd-parenthetical')).toBe(true);
        const writing = built<$Writing>(<Writing><Parenthetical /><Tagged /></Writing>);
        expect([...writing.classes]).toEqual(['pd-tagged', 'pd-parenthetical']);
        writing.annotations.remove($Tagged);
        writing.view();
        expect([...writing.classes]).toEqual(['pd-parenthetical']);
    });

    it('an annotation that is not enforced erases what it defined; Narrative only flips enforced, and written after what it negates it settles in the bond\'s one pass', () => {
        const parenthetical = built<$Writing>(<Writing>an aside <Parenthetical /></Writing>);
        parenthetical.annotations.find($Parenthetical)[0].erase(parenthetical);
        expect(parenthetical.classes.has('pd-parenthetical')).toBe(false);
        expect(built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>).classes.has('pd-parenthetical')).toBe(false);
        const natural = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        expect(natural.classes.has('pd-parenthetical')).toBe(false);
        expect(natural.annotations.find($Parenthetical)[0].enforced).toBe(false);
        expect(natural.annotations.length).toBe(2);
    });

    it('written before what it negates, Narrative acts after it, and the next pass settles it', () => {
        const reversed = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        expect(reversed.classes.has('pd-parenthetical')).toBe(true);
        reversed.view();
        expect(reversed.classes.has('pd-parenthetical')).toBe(false);
        expect(reversed.annotations.find($Parenthetical)[0].enforced).toBe(false);
    });

    it('the pass is idempotent: what the view\'s pass leaves is what the bond\'s pass left', () => {
        for (const writing of [
            built<$Writing>(<Writing>a <Parenthetical /><Tagged /></Writing>),
            built<$Writing>(<Writing is={Narrative}><Parenthetical /><Tagged /></Writing>),
            built<$Aside>(<Aside is={Mark}>a</Aside>),
        ]) {
            const classes = [...writing.classes];
            const enforced = [...writing.annotations].map(annotation => annotation.enforced);
            writing.view();
            expect([...writing.classes]).toEqual(classes);
            expect([...writing.annotations].map(annotation => annotation.enforced)).toEqual(enforced);
        }
    });

    it('an annotation that is not enforced does not act, and one that leaves acts no more; what it did to a sibling lasts', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        const [narrative] = writing.annotations.prepend(Narrative);
        narrative.enforced = false;
        writing.view();
        expect(writing.classes.has('pd-parenthetical')).toBe(true);
        narrative.enforced = true;
        writing.view();
        expect(writing.classes.has('pd-parenthetical')).toBe(false);
        writing.annotations.drop(narrative);
        writing.view();
        expect(writing.classes.has('pd-parenthetical')).toBe(false);
    });

    it('acting is idempotent, and an annotation acts on a copy of the list', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        writing.view();
        writing.view();
        expect(writing.annotations.length).toBe(2);
        expect(writing.classes.has('pd-parenthetical')).toBe(false);
    });

    it('a class stands its own annotations in $Redefine, before the first pass, and they stand in front of $is', () => {
        const aside = built<$Aside>(<Aside is={Mark}>a</Aside>);
        expect(aside.annotations.at(0)).toBeInstanceOf($Parenthetical);
        expect(aside.annotations.at(1)).toBeInstanceOf($Mark);
        expect(aside.classes.has('pd-parenthetical')).toBe(true);
    });
});

describe('a writing draws through its container, which starts as a span', () => {
    it('is a span until a class or an annotation says otherwise', () => {
        expect(built<$Writing>(<Writing />).container).toBe('span');
        expect(built<$Section>(<Section />).container).toBe('section');
        expect(built<$Writing>(<Writing><Boxed /></Writing>).container).toBe('div');
        expect(built<$Writing>(<Writing is={Boxed} />).container).toBe('div');
    });

    it('drawn, the container is the element wearing the classes, and the annotations stand inside it in their own span wearing pd-annotations', async () => {
        const writing = built<$Section>(<Section>a <Mark /><Tagged /><Parenthetical /></Section>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const section = container?.firstElementChild;
        expect(section?.tagName).toBe('SECTION');
        expect(section?.className).toBe('pd-parenthetical pd-tagged');
        expect(section?.querySelector('span.pd-annotations')).not.toBeNull();
        expect(section?.textContent).toContain('a');
    });

    it('an annotation is not rendered by default; one that has something to render overrides its view', async () => {
        const writing = built<$Writing>(<Writing>a <Mark /><Tagged /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.querySelector('span.pd-annotations')?.childElementCount).toBe(0);
        expect(container?.querySelector('span.pd-annotations')?.textContent).toBe('');
    });

    it('Parenthetical renders, as its own view, the styled global style that targets pd-parenthetical', () => {
        const writing = built<$Writing>(<Writing>an aside <Parenthetical /></Writing>);
        const style = writing.annotations.find($Parenthetical)[0].view() as React.ReactElement;
        expect(style).not.toBeNull();
        expect(typeof style.type).toBe('object');
        expect((style.type as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.memo'));
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
