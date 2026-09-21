import { describe, it, expect } from 'vitest';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, WritingSpecification, $Annotation, Annotation, $Formal, Formal, $Informal, Informal, $Parenthetical, Parenthetical, $Narrative, Narrative, Collection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Tidying extends $Writing {
    $Tidying(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.annotations.remove($Annotation);
    }
}
const Mark = $($Mark);
const Stamp = $($Stamp);
const Tidying = $($Tidying);

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

    it('find answers by any class in the chain, in the order added, and the collection keeps its order through it all', () => {
        const writing = built<$Writing>(<Writing><Stamp /><Mark /><Annotation /></Writing>);
        expect(writing.annotations.find($Mark).length).toBe(2);
        expect(writing.annotations.find($Stamp).length).toBe(1);
        expect(writing.annotations.find($Annotation).length).toBe(3);
        writing.annotations.replace(built<$Mark>(<Mark />));
        expect(writing.annotations.at(0)).toBeInstanceOf($Mark);
        expect(writing.annotations.at(0)).not.toBeInstanceOf($Stamp);
        expect(writing.annotations.find($Stamp).length).toBe(0);
        expect(writing.annotations.length).toBe(3);
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

describe('an annotation is in force while it is enforced, and transparent while it is not', () => {
    it('enforced is a property of the annotation, true until set, and never a prop', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        const parenthetical = writing.annotations.find($Parenthetical)[0];
        expect(parenthetical.enforced).toBe(true);
        parenthetical.enforced = false;
        expect(writing.$parenthetical).toBe(false);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        parenthetical.enforced = true;
        expect(writing.$parenthetical).toBe(true);
    });

    it('a transparent entry is skipped and the next enforced one decides', () => {
        const writing = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        expect(writing.$parenthetical).toBe(false);
        writing.annotations.find($Narrative)[0].enforced = false;
        expect(writing.$parenthetical).toBe(true);
    });

    it('a transparent annotation does not apply itself when the writing specifies', () => {
        const writing = built<$Writing>(<Writing formal>a</Writing>);
        writing.annotations.find($Formal)[0].enforced = false;
        expect(() => writing.specify()).not.toThrow();
    });
});

describe('an opposite is found where its twin would be, and reads as absence', () => {
    it('Narrative written in front of Parenthetical makes the writing narrative, and the reverse order parenthetical', () => {
        expect(built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>).$narrative).toBe(true);
        expect(built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>).$parenthetical).toBe(true);
    });

    it('find answers instances only; an opposite is not one of what it opposes', () => {
        const writing = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        expect(writing.annotations.find($Parenthetical)[0]).toBeInstanceOf($Parenthetical);
        expect(writing.annotations.find($Narrative).length).toBe(1);
        expect(writing.annotations.find($Annotation).length).toBe(2);
    });

    it('removing the twin leaves the opposite standing, and dropping the opposite unfiles it from the twin', () => {
        const writing = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        writing.annotations.remove($Parenthetical);
        expect(writing.annotations.find($Narrative).length).toBe(1);
        expect(writing.$parenthetical).toBe(false);
        writing.annotations.drop(writing.annotations.find($Narrative)[0]);
        expect(writing.annotations.contains($Parenthetical)).toBe(false);
        expect(writing.annotations.length).toBe(0);
    });

    it('Informal is the opposite of Formal, and an informal writing is never checked', () => {
        const writing = built<$Writing>(<Writing><Informal /><Formal />a</Writing>);
        expect(writing.$formal).toBe(false);
        expect(() => writing.specify()).not.toThrow();
    });
});

describe('$is declares what a writing is from outside: one or many, at the front, changed by changing it', () => {
    it('takes one, or a list of a class, a component, an element or a chemical', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, Parenthetical]} />);
        expect(writing.$formal).toBe(true);
        expect(writing.$parenthetical).toBe(true);
        const elemental = built<$Writing>(<Writing is={[<Formal />, built<$Parenthetical>(<Parenthetical />)]} />);
        expect(elemental.$formal).toBe(true);
        expect(elemental.$parenthetical).toBe(true);
        expect(built<$Writing>(<Writing is={Narrative} />).$narrative).toBe(true);
        expect(built<$Writing>(<Writing is={$Formal} />).$formal).toBe(true);
    });

    it('changing it drops what it stood before and keeps what was written as a child', () => {
        const writing = built<$Writing>(<Writing is={$Formal}><Parenthetical /></Writing>);
        expect(writing.$formal).toBe(true);
        writing.$is = [];
        expect(writing.$formal).toBe(false);
        expect(writing.$parenthetical).toBe(true);
    });

    it('stands at the front in its order, shadows what is written, and is not made unique', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, $Parenthetical]}><Formal /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Formal);
        expect(writing.annotations.at(1)).toBeInstanceOf($Parenthetical);
        expect(writing.annotations.find($Formal).length).toBe(2);
        expect(writing.annotations.find($Formal)[0]).toBe(writing.annotations.at(0));
        expect(writing.$formal).toBe(true);
    });

    it('toggles: an opposite given from outside shadows the written twin, and the twin is in force again when it leaves', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        expect(writing.$parenthetical).toBe(false);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        writing.$is = [];
        expect(writing.$parenthetical).toBe(true);
        writing.$is = Narrative;
        expect(writing.$narrative).toBe(true);
    });

    it('what it stands is parented to the writing', () => {
        const writing = built<$Writing>(<Writing is={[$Formal, <Narrative />]} />);
        for (const annotation of writing.annotations)
            expect(annotation.parent).toBe(writing);
    });
});

describe('parenthetical is an annotation, narrative its opposite, and the pair is sugar over the two', () => {
    it('writing is narrative until the Parenthetical annotation is written, added, or set', () => {
        expect(built<$Writing>(<Writing />).$parenthetical).toBe(false);
        expect(built<$Writing>(<Writing />).$narrative).toBe(true);
        expect(built<$Writing>(<Writing><Parenthetical /></Writing>).$parenthetical).toBe(true);
        const added = built<$Writing>(<Writing />);
        added.annotations.add($Parenthetical);
        expect(added.$narrative).toBe(false);
    });

    it('either may be written as a prop, and setting one sets the other', () => {
        expect(built<$Writing>(<Writing parenthetical />).annotations.containsOne($Parenthetical)).toBe(true);
        expect(built<$Writing>(<Writing narrative />).$parenthetical).toBe(false);
        const writing = built<$Writing>(<Writing />);
        writing.$narrative = false;
        expect(writing.$parenthetical).toBe(true);
        writing.$narrative = true;
        expect(writing.$parenthetical).toBe(false);
    });

    it('toggling from a prop enforces the front entry or makes it transparent, and never grows the list', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        for (const parenthetical of [false, true, false, true]) {
            writing.$parenthetical = parenthetical;
            expect(writing.$parenthetical).toBe(parenthetical);
            expect(writing.annotations.length).toBe(1);
        }
        const bare = built<$Writing>(<Writing />);
        for (const narrative of [false, true, false, true]) {
            bare.$narrative = narrative;
            expect(bare.$narrative).toBe(narrative);
            expect(bare.annotations.length).toBe(1);
        }
    });

    it('a written opposite in front is toggled the same way, and its twin behind decides when it is transparent', () => {
        const writing = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        writing.$parenthetical = true;
        expect(writing.$parenthetical).toBe(true);
        expect(writing.annotations.find($Narrative)[0].enforced).toBe(false);
        writing.$parenthetical = false;
        expect(writing.annotations.find($Narrative)[0].enforced).toBe(true);
        expect(writing.annotations.length).toBe(2);
    });
});

describe('formal is an annotation, echoed into the specification, which checks only when enforced', () => {
    it('is the Formal annotation: written as one, added as a class, or set as a prop, and setting it cascades through the writing beneath', () => {
        expect(built<$Writing>(<Writing><Formal /></Writing>).$formal).toBe(true);
        const added = built<$Writing>(<Writing />);
        added.annotations.add($Formal);
        expect(added.$formal).toBe(true);
        const writing = built<$Writing>(<Writing><Writing><Writing /></Writing></Writing>);
        expect(writing.$formal).toBe(false);
        writing.$formal = true;
        expect(writing.annotations.containsOne($Formal)).toBe(true);
        expect(((writing.contents.at(0) as $Writing).contents.at(0) as $Writing).$formal).toBe(true);
        writing.$formal = false;
        expect(writing.$formal).toBe(false);
        expect((writing.contents.at(0) as $Writing).$formal).toBe(false);
    });

    it('may be written as a prop, which does not reach what bonds beneath it later; setting it afterwards does', () => {
        const writing = built<$Writing>(<Writing formal><Writing><Writing /></Writing></Writing>);
        expect(writing.$formal).toBe(true);
        const inner = (writing.contents.at(0) as $Writing).contents.at(0) as $Writing;
        expect(inner.$formal).toBe(false);
        writing.$formal = true;
        expect(inner.$formal).toBe(true);
    });

    it('a written Informal stands until an ancestor is set, whose cascade shadows it', () => {
        const writing = built<$Writing>(<Writing formal><Writing><Informal /></Writing></Writing>);
        const inner = writing.contents.at(0) as $Writing;
        expect(inner.$formal).toBe(false);
        writing.$formal = true;
        expect(inner.$formal).toBe(true);
        expect(inner.annotations.find($Informal)[0].enforced).toBe(false);
        expect(inner.annotations.length).toBe(2);
    });

    it('the bond does not specify; a formal writing holding a string is built, and refused only when asked', () => {
        const writing = built<$Writing>(<Writing formal>a</Writing>);
        expect(writing.$formal).toBe(true);
        expect(() => writing.specify()).toThrow(/holds only writing/);
    });

    it('setting it runs nothing, and an informal writing is never checked', () => {
        const writing = built<$Writing>(<Writing>a</Writing>);
        expect(() => writing.specify()).not.toThrow();
        expect(() => { writing.$formal = true; }).not.toThrow();
    });

    it('a formal writing is checked when it specifies, and refused when it holds what is not writing', () => {
        const writing = built<$Writing>(<Writing>a</Writing>);
        writing.$formal = true;
        expect(() => writing.specify()).toThrow(/holds only writing/);
        const sound = built<$Writing>(<Writing><Writing /></Writing>);
        sound.$formal = true;
        expect(() => sound.specify()).not.toThrow();
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
        writing.$formal = true;
        expect(() => writing.specify()).not.toThrow();
    });
});
