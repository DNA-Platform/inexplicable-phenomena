import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, WritingSpecification, $Annotation, Annotation, $Formal, Formal, Informal, $Parenthetical, Parenthetical, $Narrative, Narrative, Collection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Silence extends $Annotation {
    override defines(writing: $Writing): void {
        for (const parenthetical of writing.annotations.find($Parenthetical))
            parenthetical.enforced = false;
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
const Silence = $($Silence);
const Tidying = $($Tidying);
const Aside = $($Aside);
const Counted = $($Counted);

describe('what comes into a writing is sorted once, into contents and annotations', () => {
    it('contents holds what is not an annotation, wherever the annotations stood', () => {
        const writing = built<$Writing>(<Writing><Annotation /><Writing>a</Writing><Annotation /></Writing>);
        expect(writing.contents.length).toBe(1);
        expect(writing.contents.at(0)).toBeInstanceOf($Writing);
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
});

describe('the collection carries the API, by type', () => {
    it('add goes to the end', () => {
        const writing = built<$Writing>(<Writing><Writing>a</Writing></Writing>);
        writing.annotations.add(built<$Mark>(<Mark />));
        expect(writing.annotations.find($Mark).length).toBe(1);
        expect(writing.annotations.at(-1)).toBeInstanceOf($Mark);
    });

    it('replace swaps the first instance of the type, and does nothing when there is none', () => {
        const writing = built<$Writing>(<Writing><Mark /><Mark /></Writing>);
        const mark = built<$Mark>(<Mark />);
        writing.annotations.replace(mark);
        expect(writing.annotations.find($Mark)[0]).toBe(mark);
        expect(writing.annotations.find($Mark).length).toBe(2);
        const empty = built<$Writing>(<Writing />);
        empty.annotations.replace(mark);
        expect(empty.annotations.find($Mark).length).toBe(0);
    });

    it('ensure adds when absent, replaces a parent class, and does nothing when a subclass is there', () => {
        const writing = built<$Writing>(<Writing />);
        writing.annotations.ensure(built<$Mark>(<Mark />));
        expect(writing.annotations.find($Mark).length).toBe(1);
        const stamp = built<$Stamp>(<Stamp />);
        writing.annotations.ensure(stamp);
        expect(writing.annotations.find($Mark)).toEqual([stamp]);
        writing.annotations.ensure(built<$Mark>(<Mark />));
        expect(writing.annotations.find($Mark)).toEqual([stamp]);
    });

    it('find answers by any class in the chain, in the list\'s order, and the collection keeps its order through a replace', () => {
        const writing = built<$Writing>(<Writing><Stamp /><Mark /><Annotation /></Writing>);
        expect(writing.annotations.find($Mark).length).toBe(2);
        expect(writing.annotations.find($Stamp).length).toBe(1);
        expect(writing.annotations.find($Annotation).length).toBe(3);
        expect(writing.annotations.find($Mark)[0]).toBe(writing.annotations.at(1));
        const mark = built<$Mark>(<Mark />);
        writing.annotations.replace(mark);
        expect(writing.annotations.at(1)).toBe(mark);
        expect(writing.annotations.find($Stamp).length).toBe(1);
        expect(writing.annotations.length).toBe(3);
    });

    it('an annotation written later stands nearer the front, and what $is stands is in front of them all', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Stamp /><Mark /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Narrative);
        expect(writing.annotations.at(1)).toBeInstanceOf($Mark);
        expect(writing.annotations.at(1)).not.toBeInstanceOf($Stamp);
        expect(writing.annotations.at(2)).toBeInstanceOf($Stamp);
    });

    it('contains halts on the first instance of a class, and containsOne asks that there be exactly one', () => {
        const writing = built<$Writing>(<Writing><Stamp /><Mark /></Writing>);
        expect(writing.annotations.contains($Mark)).toBe(true);
        expect(writing.annotations.contains($Annotation)).toBe(true);
        expect(writing.annotations.containsOne($Mark)).toBe(false);
        expect(writing.annotations.containsOne($Stamp)).toBe(true);
        writing.annotations.remove($Stamp);
        expect(writing.annotations.contains($Stamp)).toBe(false);
        expect(writing.annotations.containsOne($Mark)).toBe(true);
    });

    it('remove takes every instance of the type, subclasses included', () => {
        const writing = built<$Writing>(<Writing><Mark /><Stamp /><Writing>a</Writing></Writing>);
        writing.annotations.remove($Mark);
        expect(writing.annotations.find($Mark).length).toBe(0);
        expect(writing.contents.length).toBe(1);
    });
});

describe('$is declares what a writing is from outside: one or many, at the front, changed by changing it', () => {
    it('takes one, or a list of a class, a component, an element or a chemical', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, Parenthetical]} />);
        expect(writing.annotations.find($Formal).length).toBe(1);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        const elemental = built<$Writing>(<Writing is={[<Formal />, built<$Parenthetical>(<Parenthetical />)]} />);
        expect(elemental.annotations.length).toBe(2);
        expect(built<$Writing>(<Writing is={Narrative} />).annotations.at(0)).toBeInstanceOf($Narrative);
        expect(built<$Writing>(<Writing is={$Formal} />).annotations.at(0)).toBeInstanceOf($Formal);
    });

    it('changing it drops what it stood before and keeps what was written as a child', () => {
        const writing = built<$Writing>(<Writing is={$Formal}><Parenthetical /></Writing>);
        expect(writing.annotations.length).toBe(2);
        writing.$is = [];
        expect(writing.annotations.length).toBe(1);
        expect(writing.annotations.at(0)).toBeInstanceOf($Parenthetical);
    });

    it('stands at the front in its order, and is not made unique', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, $Parenthetical]}><Formal /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Formal);
        expect(writing.annotations.at(1)).toBeInstanceOf($Parenthetical);
        expect(writing.annotations.find($Formal).length).toBe(2);
        expect(writing.annotations.find($Formal)[0]).toBe(writing.annotations.at(0));
    });

    it('what it stands is parented to the writing', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, <Narrative />]} />);
        for (const annotation of writing.annotations)
            expect(annotation.parent).toBe(writing);
    });
});

describe('an annotation defines the writing it stands in, when the writing defines itself', () => {
    it('a trait starts at the class default and is defined by an enforced annotation', () => {
        const bare = built<$Writing>(<Writing />);
        bare.define();
        expect(bare.parenthetical).toBe(false);
        expect(bare.formal).toBe(false);
        const writing = built<$Writing>(<Writing><Parenthetical /><Formal /></Writing>);
        writing.define();
        expect(writing.parenthetical).toBe(true);
        expect(writing.formal).toBe(true);
    });

    it('the front defines last: what $is stands wins over what was written, and a later child wins over an earlier one', () => {
        const shadowed = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        shadowed.define();
        expect(shadowed.parenthetical).toBe(false);
        const written = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        written.define();
        expect(written.parenthetical).toBe(true);
        const reversed = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        reversed.define();
        expect(reversed.parenthetical).toBe(false);
    });

    it('a class that stands its own annotation in its bond enters last, and so has the last word, even over $is', () => {
        const aside = built<$Aside>(<Aside is={Narrative}>a</Aside>);
        expect(aside.annotations.at(0)).toBeInstanceOf($Parenthetical);
        aside.define();
        expect(aside.parenthetical).toBe(true);
    });

    it('an annotation that leaves, or is not enforced, does not make the cut; the trait falls back to its default', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        writing.$is = [];
        writing.define();
        expect(writing.parenthetical).toBe(true);
        writing.annotations.find($Parenthetical)[0].enforced = false;
        writing.define();
        expect(writing.parenthetical).toBe(false);
        writing.annotations.find($Parenthetical)[0].enforced = true;
        writing.$is = Narrative;
        writing.define();
        expect(writing.parenthetical).toBe(false);
    });

    it('defining is idempotent, and an annotation may act on its siblings but not on the list', () => {
        const writing = built<$Writing>(<Writing is={Silence}><Parenthetical /></Writing>);
        writing.define();
        writing.define();
        expect(writing.parenthetical).toBe(false);
        expect(writing.annotations.find($Parenthetical)[0].enforced).toBe(false);
        expect(writing.annotations.length).toBe(2);
    });
});

describe('drawn, a writing defines itself at every draw and settles', () => {
    it('a parenthetical writing wears the class, a narrative one does not, and one draw is one draw', async () => {
        const writing = built<$Counted>(<Counted><Parenthetical />a</Counted>);
        const Drawn = $(writing);
        draws = 0;
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.querySelector('span.parenthetical')?.textContent).toContain('a');
        expect(draws).toBeLessThanOrEqual(3);
    });

    it('flipping enforced on an annotation redraws the writing without it', async () => {
        const writing = built<$Writing>(<Writing><Parenthetical />a</Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('parenthetical');
        await act(async () => { writing.annotations.find($Parenthetical)[0].enforced = false; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
    });
});

describe('formal is a trait the Formal annotation defines, echoed into the specification, which checks only when enforced', () => {
    it('is defined by a written Formal, undone by an Informal in front, and set directly by a suite', () => {
        expect((() => { const writing = built<$Writing>(<Writing><Formal /></Writing>); writing.define(); return writing.formal; })()).toBe(true);
        const shadowed = built<$Writing>(<Writing is={Informal}><Formal /></Writing>);
        shadowed.define();
        expect(shadowed.formal).toBe(false);
        const writing = built<$Writing>(<Writing><Writing /></Writing>);
        writing.formal = true;
        expect(writing.formal).toBe(true);
    });

    it('does not reach what stands beneath it; each writing is defined by its own annotations', () => {
        const writing = built<$Writing>(<Writing><Formal /><Writing><Writing /></Writing></Writing>);
        writing.define();
        const inner = (writing.contents.at(0) as $Writing).contents.at(0) as $Writing;
        inner.define();
        expect(writing.formal).toBe(true);
        expect(inner.formal).toBe(false);
    });

    it('the bond does not specify; a formal writing holding a string is built, and refused only when asked', () => {
        const writing = built<$Writing>(<Writing><Formal />a</Writing>);
        expect(() => writing.specify()).toThrow(/holds only writing/);
        const informal = built<$Writing>(<Writing>a</Writing>);
        expect(() => informal.specify()).not.toThrow();
        const sound = built<$Writing>(<Writing><Formal /><Writing /></Writing>);
        expect(() => sound.specify()).not.toThrow();
    });

    it('specifying defines first, so an Informal given from outside silences the check', () => {
        const writing = built<$Writing>(<Writing><Formal />a</Writing>);
        writing.$is = Informal;
        expect(() => writing.specify()).not.toThrow();
        writing.$is = [];
        expect(() => writing.specify()).toThrow(/holds only writing/);
    });

    it('a detached specification checks only when enforced, and names each rule it ran', () => {
        const specification = new WritingSpecification();
        const writing = built<$Writing>(<Writing>a</Writing>);
        expect(specification.check(writing)).toEqual([]);
        specification.enforced = true;
        expect(() => specification.check(writing)).toThrow(/holds only writing/);
        expect(specification.check(built<$Writing>(<Writing />))).toEqual(['a piece of writing holds only writing']);
    });

    it('a subclass adjusts its collections in its own bond, after calling Writing\'s', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(writing.annotations.length).toBe(0);
        expect(writing.contents.length).toBe(1);
        expect(() => writing.specify()).not.toThrow();
    });
});
