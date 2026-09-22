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
    protected override $Define(): void {
        this.annotations.add(Parenthetical);
    }
}
class $Section extends $Writing {
    $Section(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.container = 'section';
    }
}
class $Narrating extends $Writing {
    narrate(): void {
        this.annotations.add(Narrative);
    }
}
class $Growing extends $Writing {
    grow(): void {
        this.contents.add(<Writing> more</Writing>);
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
const Narrating = $($Narrating);
const Growing = $($Growing);

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

    it('the annotations say what they hold: each member\'s symbol in order, the genome of the writing, changing when one joins or leaves and not when expression does', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /><Mark /></Writing>);
        expect(String(writing.annotations)).toMatch(/^\$Chemistry\.\$Mark\[\d+\],\$Chemistry\.\$Parenthetical\[\d+\],$/);
        const before = String(writing.annotations);
        writing.annotations.find($Parenthetical)[0].enforced = false;
        expect(String(writing.annotations)).toBe(before);
        const [stamp] = writing.annotations.add(Stamp);
        expect(String(writing.annotations)).not.toBe(before);
        writing.annotations.drop(stamp);
        expect(String(writing.annotations)).toBe(before);
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

    it('reads as what was given; the annotations possess the edits, what it became, and the full set; setting it integrates at once, dropping what it stood before and keeping what was written; the same given again is nothing', () => {
        const writing = built<$Writing>(<Writing is={$Mark}><Parenthetical /></Writing>);
        expect(writing.$is).toBe($Mark);
        expect(writing.annotations.edits.length).toBe(1);
        expect(writing.annotations.edits[0]).toBe(writing.annotations.at(0));
        expect(writing.annotations.length).toBe(2);
        const mark = writing.annotations.edits[0];
        writing.$is = $Mark;
        expect(writing.annotations.edits[0]).toBe(mark);
        writing.$is = [$Mark];
        expect(writing.annotations.edits[0]).not.toBe(mark);
        const marked = writing.annotations.edits[0];
        writing.$is = [$Mark];
        expect(writing.annotations.edits[0]).toBe(marked);
        writing.$is = [];
        expect(writing.annotations.edits.length).toBe(0);
        expect(writing.annotations.length).toBe(1);
        expect(writing.annotations.at(0)).toBeInstanceOf($Parenthetical);
    });

    it('define applies what $is gives in front of everything before it walks, so what was given and what was written see each other when they define', () => {
        const given = built<$Writing>(<Writing is={Parenthetical}><Narrative /></Writing>);
        expect(given.annotations.find($Parenthetical)[0].enforced).toBe(false);
        given.view();
        expect(given.classes.has('pd-parenthetical')).toBe(false);
        const written = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        expect(written.classes.has('pd-parenthetical')).toBe(false);
        written.view();
        expect(written.annotations.find($Parenthetical)[0]).toBe(written.annotations.at(1));
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
    it('classes is a set each writing resets at its bond and its annotations fill at every pass; Parenthetical adds pd-parenthetical', () => {
        expect(built<$Writing>(<Writing />).classes.size).toBe(0);
        expect(built<$Writing>(<Writing>an aside <Parenthetical /></Writing>).classes.has('pd-parenthetical')).toBe(true);
        expect(built<$Writing>(<Writing is={Parenthetical}>an aside</Writing>).classes.has('pd-parenthetical')).toBe(true);
        const writing = built<$Writing>(<Writing><Parenthetical /><Tagged /></Writing>);
        expect([...writing.classes]).toEqual(['pd-tagged', 'pd-parenthetical']);
        expect(built<$Writing>(<Writing><Parenthetical /></Writing>).classes.has('pd-tagged')).toBe(false);
        writing.$is = Narrative;
        writing.view();
        expect([...writing.classes]).toEqual(['pd-tagged']);
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

    it('the order of a repressor and what it represses does not matter: one pass settles either way, since expression is computed before anything acts', () => {
        for (const writing of [
            built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>),
            built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>),
        ]) {
            expect(writing.classes.has('pd-parenthetical')).toBe(false);
            expect(writing.annotations.find($Parenthetical)[0].enforced).toBe(false);
        }
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

    it('a repressor that leaves lets what it repressed express again, since every pass computes expression from what the genome holds', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        expect(writing.classes.has('pd-parenthetical')).toBe(true);
        const [narrative] = writing.annotations.prepend(Narrative);
        writing.view();
        expect(writing.classes.has('pd-parenthetical')).toBe(false);
        expect(writing.annotations.find($Parenthetical)[0].enforced).toBe(false);
        writing.annotations.drop(narrative);
        writing.view();
        expect(writing.classes.has('pd-parenthetical')).toBe(true);
        expect(writing.annotations.find($Parenthetical)[0].enforced).toBe(true);
    });

    it('acting is idempotent, and an annotation acts on a copy of the list', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        writing.view();
        writing.view();
        expect(writing.annotations.length).toBe(2);
        expect(writing.classes.has('pd-parenthetical')).toBe(false);
    });

    it('a class stands its own annotations in $Define, before the first pass, and what $is gives stands in front of them', () => {
        const aside = built<$Aside>(<Aside is={Mark}>a</Aside>);
        expect(aside.annotations.at(0)).toBeInstanceOf($Mark);
        expect(aside.annotations.at(1)).toBeInstanceOf($Parenthetical);
        expect(aside.classes.has('pd-parenthetical')).toBe(true);
        const narrated = built<$Aside>(<Aside is={Narrative}>a</Aside>);
        expect(narrated.classes.has('pd-parenthetical')).toBe(false);
    });
});

describe('a writing draws through its container, which starts as a span', () => {
    it('is a span until a class or an annotation says otherwise', () => {
        expect(built<$Writing>(<Writing />).container).toBe('span');
        expect(built<$Section>(<Section />).container).toBe('section');
        expect(built<$Writing>(<Writing><Boxed /></Writing>).container).toBe('div');
        expect(built<$Writing>(<Writing is={Boxed} />).container).toBe('div');
    });

    it('drawn, the container is the element wearing the classes, and each annotation is rendered inside it as its own writing wearing pd-annotation', async () => {
        const writing = built<$Section>(<Section>a <Mark /><Tagged /><Parenthetical /></Section>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const section = container?.firstElementChild;
        expect(section?.tagName).toBe('SECTION');
        expect(section?.className).toBe('pd-parenthetical pd-tagged');
        expect(section?.querySelectorAll(':scope > span.pd-annotation').length).toBe(3);
        expect(section?.textContent).toContain('a');
    });

    it('an annotation is a note on the page: what someone wrote inside it is rendered at its writing, wearing pd-annotation, and its note renders at the level of that writing, nothing by default; the annotations render back to front, the front last', async () => {
        const writing = built<$Writing>(<Writing>a <Mark>because it was late</Mark><Tagged /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Tagged);
        expect(writing.annotations.find($Mark)[0].classes.has('pd-annotation')).toBe(true);
        expect(writing.annotations.find($Mark)[0].note()).toBeNull();
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const notes = container?.querySelectorAll('span.pd-annotation');
        expect(notes?.length).toBe(2);
        expect(notes?.[0].textContent).toBe('because it was late');
        expect(notes?.[1].textContent).toBe('');
        expect(container?.firstElementChild?.childElementCount).toBe(2);
    });

    it('Parenthetical renders, as its note, the styled global style that targets pd-parenthetical; an annotation that is not enforced renders no note', async () => {
        const writing = built<$Writing>(<Writing>an aside <Parenthetical /></Writing>);
        const parenthetical = writing.annotations.find($Parenthetical)[0];
        const style = parenthetical.note() as React.ReactElement;
        expect(style).not.toBeNull();
        expect(typeof style.type).toBe('object');
        expect((style.type as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.memo'));
        parenthetical.enforced = false;
        const drawn = parenthetical.view() as React.ReactElement<{ children: React.ReactNode[] }>;
        expect(drawn.props.children[1]).toBeNull();
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

    it('a repressor given through $is redraws the writing without the trait, and taking it away redraws with it again', async () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('pd-parenthetical');
        await act(async () => { writing.$is = Narrative; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
        await act(async () => { writing.$is = []; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('pd-parenthetical');
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

    it('the collections are live: a method of the writing adding an annotation redraws it, and one adding content shows the new text', async () => {
        const narrating = built<$Narrating>(<Narrating>an aside <Parenthetical /></Narrating>);
        const DrawnNarrating = $(narrating);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<DrawnNarrating />).container; });
        expect(container?.firstElementChild?.className).toBe('pd-parenthetical');
        await act(async () => { narrating.narrate(); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
        const growing = built<$Growing>(<Growing>some</Growing>);
        const DrawnGrowing = $(growing);
        let grown: HTMLElement | undefined;
        await act(async () => { grown = render(<DrawnGrowing />).container; });
        expect(grown?.textContent).toBe('some');
        await act(async () => { growing.grow(); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(grown?.textContent).toBe('some more');
    });
});

describe('specify is the assert the binder calls; it is called by nothing in the library and cascades down', () => {
    it('answers the failures of the writing, and nothing when it is up to code; Writing itself has no rule, a letter may hold anything', () => {
        expect(built<$Writing>(<Writing><Writing /></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing>a</Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Demanding /></Writing>).specify()).toEqual(['Writing: a demanding annotation wants something written']);
    });

    it('the bond does not specify; a writing holding a string is built, and refused only when asked', () => {
        expect(() => built<$Writing>(<Writing>a</Writing>)).not.toThrow();
    });

    it('every enforced annotation weighs in through specifies', () => {
        const wanting = built<$Writing>(<Writing><Demanding /></Writing>);
        expect(wanting.specify()).toEqual(['Writing: a demanding annotation wants something written']);
        wanting.annotations.find($Demanding)[0].enforced = false;
        expect(wanting.specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Demanding /><Writing /></Writing>).specify()).toEqual([]);
    });

    it('cascades through contents and annotations, so every failure in reach appears', () => {
        const writing = built<$Writing>(<Writing><Writing><Demanding /></Writing><Writing><Writing><Demanding /></Writing></Writing><Demanding /></Writing>);
        const failures = writing.specify();
        expect(failures).toEqual([
            'Writing / Writing 0: a demanding annotation wants something written',
            'Writing / Writing 1 / Writing 0: a demanding annotation wants something written',
        ]);
        const annotated = built<$Writing>(<Writing><Writing /><Mark><Demanding /></Mark></Writing>);
        expect(annotated.specify()).toEqual(['Writing / Mark 1: a demanding annotation wants something written']);
    });

    it('a subclass adjusts its collections in its own bond, after calling Writing\'s', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(writing.annotations.length).toBe(0);
        expect(writing.contents.length).toBe(1);
        expect(writing.specify()).toEqual([]);
    });
});
