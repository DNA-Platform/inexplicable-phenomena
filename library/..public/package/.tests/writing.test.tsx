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
        const writing = built<$Writing>(<Writing><Annotation /><Writing>a</Writing><Annotation /></Writing>);
        expect(writing.contents.length).toBe(1);
        expect(writing.contents[0]).toBeInstanceOf($Writing);
        expect(writing.annotations.length).toBe(2);
        expect(writing.writing.length).toBe(3);
    });

    it('an annotation written inside the prose stands beside the prose, and is found', () => {
        const writing = built<$Writing>(<Writing>before <Annotation /> after</Writing>);
        expect(writing.annotations.length).toBe(1);
        expect(writing.contents.every(chemical => !(chemical instanceof $Annotation))).toBe(true);
    });
});

describe('the writing API modifies source by type', () => {
    it('add goes to the end', () => {
        const writing = built<$Writing>(<Writing><Writing>a</Writing></Writing>);
        writing.add(built<$Mark>(<Mark />));
        expect(writing.find($Mark).length).toBe(1);
        expect(writing.annotations.at(-1)).toBeInstanceOf($Mark);
    });

    it('replace swaps the first instance of the type, and does nothing when there is none', () => {
        const writing = built<$Writing>(<Writing><Mark /><Mark /></Writing>);
        const mark = built<$Mark>(<Mark />);
        writing.replace(mark);
        expect(writing.find($Mark)[0]).toBe(mark);
        expect(writing.find($Mark).length).toBe(2);
        const empty = built<$Writing>(<Writing />);
        empty.replace(mark);
        expect(empty.find($Mark).length).toBe(0);
    });

    it('ensure adds when absent, replaces a parent class, and does nothing when a subclass is there', () => {
        const writing = built<$Writing>(<Writing />);
        writing.ensure(built<$Mark>(<Mark />));
        expect(writing.find($Mark).length).toBe(1);
        const stamp = built<$Stamp>(<Stamp />);
        writing.ensure(stamp);
        expect(writing.find($Mark)).toEqual([stamp]);
        writing.ensure(built<$Mark>(<Mark />));
        expect(writing.find($Mark)).toEqual([stamp]);
    });

    it('remove takes every instance of the type, subclasses included', () => {
        const writing = built<$Writing>(<Writing><Mark /><Stamp /><Writing>a</Writing></Writing>);
        writing.remove($Mark);
        expect(writing.find($Mark).length).toBe(0);
        expect(writing.contents.length).toBe(1);
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
        const writing = built<$Writing>(<Writing />);
        writing.$narrative = false;
        expect(writing.$parenthetical).toBe(true);
    });
});

describe('formal is echoed into the specification, which checks only when enforced', () => {
    it('is a prop, false until set, and setting it cascades through the writing beneath', () => {
        const writing = built<$Writing>(<Writing><Writing><Writing /></Writing></Writing>);
        expect(writing.$formal).toBe(false);
        writing.$formal = true;
        expect(writing.$formal).toBe(true);
        expect(writing.writing[0].writing[0].$formal).toBe(true);
    });

    it('may be written', () => {
        expect(built<$Writing>(<Writing formal />).$formal).toBe(true);
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
        expect(specification.check(built<$Writing>(<Writing />))).toEqual([
            'a piece of writing holds only writing',
            'the annotations a piece of writing declares are built'
        ]);
    });

    it('reorganizing runs before the specification, and a subclass adjusts its source there', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        expect(writing.annotations.length).toBe(0);
        writing.$formal = true;
        expect(() => writing.specify()).not.toThrow();
    });
});
