import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Writing, $Composition, Composition, $Annotation, $Level, Level, Strict, $Permissive, Permissive, Open, Closed, Inline, Block, CompositionSpecification, WritingSpecification, AnnotationSpecification } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Fourth extends $Composition {
    protected override $Define(): void {
        this.annotations.add(this,
            <Level>4</Level>,
            <Permissive />,
            <Open />
        );
    }
}
class $Fifth extends $Composition {
    protected override $Define(): void {
        this.annotations.add(this,
            <Level>5</Level>,
            <Permissive />,
            <Closed />
        );
    }
}
class $Top extends $Composition {
    protected override $Define(): void {
        this.annotations.add(this,
            <Level>6</Level>,
            <Strict />,
            <Closed />
        );
    }
}
class $Unleveled extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Level)
                writing.annotations.express(annotation, false);
    }
}
const Unleveled = $($Unleveled);
const Fourth = $($Fourth);
const Fifth = $($Fifth);
const Top = $($Top);

describe('a composition has a level, set by its Level annotation from what was written in it', () => {
    it('is a reading of its Level annotation, 1 until one says otherwise; a level class stands its own in $Define', () => {
        expect(built<$Composition>(<Composition />).level).toBe(1);
        expect(built<$Composition>(<Composition><Level>3</Level></Composition>).level).toBe(3);
        expect(built<$Fourth>(<Fourth />).level).toBe(4);
        expect(built<$Fourth>(<Fourth />).is(Level)).toBe(true);
        expect(built<$Fourth>(<Fourth><Level>6</Level></Fourth>).level).toBe(6);
    });

    it('a Level taken out of expression is not read', () => {
        expect(built<$Fourth>(<Fourth is={Unleveled} />).level).toBe(1);
    });
});

describe('parts are the compositions in its text', () => {
    it('keeps the compositions in order; other writing and calligraphy are not parts', () => {
        const fifth = built<$Fifth>(<Fifth>text <Fourth>a</Fourth><Writing /><Fourth>b</Fourth></Fifth>);
        expect([...fifth.text].length).toBe(4);
        expect(fifth.parts.length).toBe(2);
        expect(fifth.parts.every(part => part instanceof $Fourth)).toBe(true);
    });

    it('a child of the same class is not a part; its parts are flattened in', () => {
        const fifth = built<$Fifth>(<Fifth><Fifth><Fourth /></Fifth><Fourth /></Fifth>);
        expect(fifth.parts.length).toBe(2);
        expect(fifth.parts.some(part => part instanceof $Fifth)).toBe(false);
    });

    it('depth counts nesting in the same class, and is 0 under a different parent', () => {
        const fifth = built<$Fifth>(<Fifth><Fifth><Fourth /></Fifth></Fifth>);
        const inner = fifth.text.find($Fifth)[0];
        expect(fifth.depth).toBe(0);
        expect(inner.depth).toBe(1);
        expect(inner.text.find($Fourth)[0].depth).toBe(0);
    });

    it('the canonical is the first part, and none when there is none', () => {
        const fifth = built<$Fifth>(<Fifth>a <Fourth>b</Fourth><Fourth>c</Fourth></Fifth>);
        expect(fifth.canonical).toBe(fifth.parts[0]);
        expect(built<$Fifth>(<Fifth>a</Fifth>).canonical).toBeUndefined();
    });
});

describe('is asks whether an annotation of a kind is expressed, by class or by component', () => {
    it('answers the class and the component alike, and false once the annotation is taken out of expression', () => {
        const fourth = built<$Fourth>(<Fourth />);
        expect(fourth.is(Permissive)).toBe(true);
        expect(fourth.is($Permissive)).toBe(true);
        expect(fourth.is(Strict)).toBe(false);
        fourth.$is = Strict;
        fourth.annotations.define();
        expect(fourth.is(Permissive)).toBe(false);
    });

    it('a pair negates its opposite, so a written Strict wins over the permissive a class stands', () => {
        const fourth = built<$Fourth>(<Fourth><Strict /></Fourth>);
        expect(fourth.is(Strict)).toBe(true);
        expect(fourth.is(Permissive)).toBe(false);
        const opened = built<$Fifth>(<Fifth is={Open} />);
        expect(opened.is(Open)).toBe(true);
        expect(opened.is(Closed)).toBe(false);
    });

    it('a pair said of a writing that is not a composition throws when it specifies, and the assert reports it', () => {
        expect(built<$Writing>(<Writing><Strict /></Writing>).specify()).toEqual(['Writing: strict is said of a composition, and this is not one']);
        expect(built<$Writing>(<Writing><Permissive /></Writing>).specify()).toEqual(['Writing: permissive is said of a composition, and this is not one']);
    });
});

// Doug, 2026-09-27: "Maybe we want to make Inline and Block annotations and have the composition elements use them to
// control what their base element is" — "Yes, the third pair."
describe('inline and block are the third pair, and block draws the composition as a div', () => {
    class $Blocked extends $Composition {
        protected override $Define(): void {
            this.annotations.add(this,
                <Level>4</Level>,
                <Block />
            );
        }
    }
    const Blocked = $($Blocked);

    it('a composition is a span until a Block says otherwise, and its own element is the first container', () => {
        expect([...built<$Fourth>(<Fourth />).containers][0]).toBe('span');
        expect([...built<$Fourth>(<Fourth><Block /></Fourth>).containers][0]).toBe('div');
        expect([...built<$Blocked>(<Blocked />).containers][0]).toBe('div');
    });

    it('a written Inline wins over the Block a class stands, and $is in front of both', () => {
        const inlined = built<$Blocked>(<Blocked><Inline /></Blocked>);
        expect(inlined.is(Inline)).toBe(true);
        expect(inlined.is(Block)).toBe(false);
        expect([...inlined.containers][0]).toBe('span');
        const blocked = built<$Blocked>(<Blocked />);
        blocked.$is = Inline;
        blocked.annotations.define();
        expect([...blocked.containers][0]).toBe('span');
        blocked.$is = [];
        blocked.annotations.define();
        expect([...blocked.containers][0]).toBe('div');
    });

    it('either said of a writing that is not a composition says so when asked', () => {
        expect(built<$Writing>(<Writing><Block /></Writing>).specify()).toEqual(['Writing: block is said of a composition, and this is not one']);
        expect(built<$Writing>(<Writing><Inline /></Writing>).specify()).toEqual(['Writing: inline is said of a composition, and this is not one']);
    });
});

describe('the specification is a property each class reassigns, and specify never changes', () => {
    it('Writing, Annotation and Composition each check with their own', () => {
        expect(built<$Writing>(<Writing />).specification).toBeInstanceOf(WritingSpecification);
        expect(built<$Writing>(<Writing />).specification).not.toBeInstanceOf(CompositionSpecification);
        expect(built<$Fourth>(<Fourth />).specification).toBeInstanceOf(CompositionSpecification);
        expect([...built<$Fourth>(<Fourth />).annotations][0].specification).toBeInstanceOf(AnnotationSpecification);
    });

    it('a bare composition is up to code, a letter by default', () => {
        expect(built<$Composition>(<Composition />).specify()).toEqual([]);
        expect(built<$Fourth>(<Fourth />).specify()).toEqual([]);
    });

    it('strict holds parts at its level or one below; permissive at or below', () => {
        expect(built<$Top>(<Top><Fifth /></Top>).specify()).toEqual([]);
        expect(built<$Top>(<Top><Fourth /></Top>).specify()).toContain('Top: a strict composition holds parts at its level or one below, and this one holds another');
        expect(built<$Fifth>(<Fifth><Fourth /></Fifth>).specify()).toEqual([]);
        expect(built<$Fifth>(<Fifth><Top /></Fifth>).specify()).toContain('Fifth: a permissive composition holds parts at or below its level, and this one holds one above');
    });

    it('closed holds only writing; open lifts the rule a piece of writing has by default; the cascade reaches a nested one', () => {
        expect(built<$Fifth>(<Fifth>prose</Fifth>).specify()).toEqual(['Fifth: a closed composition holds only writing, and this one holds something else']);
        expect(built<$Top>(<Top><Fifth><Fifth>prose</Fifth></Fifth></Top>).specify()).toEqual(['Top / Fifth 0 / Fifth 0: a closed composition holds only writing, and this one holds something else']);
        expect(built<$Fourth>(<Fourth>prose</Fourth>).specify()).toEqual([]);
        expect(built<$Fifth>(<Fifth is={Open}>prose</Fifth>).specify()).toEqual([]);
    });

    it('open and closed are said of a composition, as their pair and inline and block are, and refuse a plain writing by name', () => {
        expect(built<$Writing>(<Writing>prose<Open /></Writing>).specify()).toContain('Writing: open is said of a composition, and this is not one');
        expect(built<$Writing>(<Writing>prose<Closed /></Writing>).specify()).toContain('Writing: closed is said of a composition, and this is not one');
        expect(built<$Fourth>(<Fourth><Closed /></Fourth>).specify()).toEqual([]);
    });
});
