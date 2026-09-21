import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Writing, WritingSpecification, $Annotation, Annotation, $Formal, Formal, Collection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Tidying extends $Writing { protected override $Reorganize(): void { this.annotations.remove($Annotation); } }
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

describe('parenthetical and narrative are a pair', () => {
    it('writing is narrative and an annotation is parenthetical by default', () => {
        expect(built<$Writing>(<Writing />).$parenthetical).toBe(false);
        expect(built<$Writing>(<Writing />).$narrative).toBe(true);
        expect(built<$Annotation>(<Annotation />).$parenthetical).toBe(true);
    });

    it('either may be written, and setting one sets the other', () => {
        expect(built<$Writing>(<Writing parenthetical />).$parenthetical).toBe(true);
        expect(built<$Annotation>(<Annotation narrative />).$parenthetical).toBe(false);
        const writing = built<$Writing>(<Writing />);
        writing.$narrative = false;
        expect(writing.$parenthetical).toBe(true);
    });
});

describe('formal is a gene, echoed into the specification, which checks only when enforced', () => {
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

    it('may be written as a prop, and what bonds beneath a formal writing carries the gene at its own bond', () => {
        const writing = built<$Writing>(<Writing formal><Writing><Writing /></Writing></Writing>);
        expect(writing.$formal).toBe(true);
        expect(((writing.contents.at(0) as $Writing).contents.at(0) as $Writing).annotations.contains($Formal)).toBe(true);
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

    it('reorganizing runs before the specification, and a subclass adjusts its collections there', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(writing.annotations.length).toBe(0);
        writing.$formal = true;
        expect(() => writing.specify()).not.toThrow();
    });
});
