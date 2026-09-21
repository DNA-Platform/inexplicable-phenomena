import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Writing, WritingSpecification, $Annotation, Annotation } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Declaring extends $Writing { static override declared = [$Mark]; }
class $Tidying extends $Writing { protected override $Reorganize(): void { this.remove($Annotation); } }
const Mark = $($Mark);
const Stamp = $($Stamp);
const Declaring = $($Declaring);
const Tidying = $($Tidying);

describe('source is the one stored thing, and everything is read from it', () => {
    it('contents is a scan that ignores annotations wherever they stand', () => {
        const held = built<$Writing>(<Writing><Annotation /><Writing>a</Writing><Annotation /></Writing>);
        expect(held.contents.length).toBe(1);
        expect(held.contents[0]).toBeInstanceOf($Writing);
        expect(held.annotations.length).toBe(2);
        expect(held.writing.length).toBe(3);
    });

    it('an annotation written inside the prose is found as one', () => {
        const held = built<$Writing>(<Writing>before <Annotation /> after</Writing>);
        expect(held.annotations.length).toBe(1);
        expect(held.contents.every(piece => !(piece instanceof $Annotation))).toBe(true);
    });
});

describe('the writing API modifies source by type', () => {
    it('add goes to the end', () => {
        const held = built<$Writing>(<Writing><Writing>a</Writing></Writing>);
        held.add(built<$Mark>(<Mark />));
        expect(held.find($Mark).length).toBe(1);
        expect(held.annotations.at(-1)).toBeInstanceOf($Mark);
    });

    it('replace swaps the first instance of the type, and does nothing when there is none', () => {
        const held = built<$Writing>(<Writing><Mark /><Mark /></Writing>);
        const fresh = built<$Mark>(<Mark />);
        held.replace(fresh);
        expect(held.find($Mark)[0]).toBe(fresh);
        expect(held.find($Mark).length).toBe(2);
        const empty = built<$Writing>(<Writing />);
        empty.replace(fresh);
        expect(empty.find($Mark).length).toBe(0);
    });

    it('ensure adds when absent, replaces a parent class, and does nothing when a subclass is there', () => {
        const held = built<$Writing>(<Writing />);
        held.ensure(built<$Mark>(<Mark />));
        expect(held.find($Mark).length).toBe(1);
        const stamp = built<$Stamp>(<Stamp />);
        held.ensure(stamp);
        expect(held.find($Mark)).toEqual([stamp]);
        held.ensure(built<$Mark>(<Mark />));
        expect(held.find($Mark)).toEqual([stamp]);
    });

    it('remove takes every instance of the type, subclasses included', () => {
        const held = built<$Writing>(<Writing><Mark /><Stamp /><Writing>a</Writing></Writing>);
        held.remove($Mark);
        expect(held.find($Mark).length).toBe(0);
        expect(held.contents.length).toBe(1);
    });

    it('the annotations a class declares are built at bond, once', () => {
        expect(built<$Writing>(<Declaring />).find($Mark).length).toBe(1);
        expect(built<$Writing>(<Declaring><Mark /></Declaring>).find($Mark).length).toBe(1);
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
        const held = built<$Writing>(<Writing />);
        held.$narrative = false;
        expect(held.$parenthetical).toBe(true);
    });
});

describe('formal is echoed into the specification, which checks only when enforced', () => {
    it('is false until flipped, and flipping cascades through the writing beneath', () => {
        const held = built<$Writing>(<Writing><Writing><Writing /></Writing></Writing>);
        expect(held.formal).toBe(false);
        held.formal = true;
        expect(held.writing.every(one => one.formal)).toBe(true);
        expect(held.writing[0].writing[0].formal).toBe(true);
    });

    it('may be written, and then holds for everything beneath', () => {
        const held = built<$Writing>(<Writing formal><Writing /></Writing>);
        expect(held.formal).toBe(true);
        expect(held.writing[0].formal).toBe(true);
    });

    it('flipping runs nothing; an informal writing is never checked; a formal one is checked when it specifies', () => {
        const loose = built<$Writing>(<Writing>a</Writing>);
        expect(() => { loose.formal = true; }).not.toThrow();
        expect(() => built<$Writing>(<Writing>a</Writing>).specify()).not.toThrow();
        expect(() => loose.specify()).toThrow(/holds only writing/);
        const sound = built<$Writing>(<Writing><Writing /></Writing>);
        sound.formal = true;
        expect(() => sound.specify()).not.toThrow();
    });

    it('a detached specification checks only when enforced, and names each rule it ran', () => {
        const specification = new WritingSpecification();
        const loose = built<$Writing>(<Writing>a</Writing>);
        expect(specification.check(loose)).toEqual([]);
        specification.enforced = true;
        expect(() => specification.check(loose)).toThrow(/holds only writing/);
        expect(specification.check(built<$Writing>(<Writing />))).toEqual([
            'a piece of writing holds only writing',
            'the annotations a piece of writing declares are built'
        ]);
    });

    it('reorganizing runs before the specification, and a subclass adjusts its source there', () => {
        const held = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(held.annotations.length).toBe(0);
        held.formal = true;
        expect(() => held.specify()).not.toThrow();
    });
});
