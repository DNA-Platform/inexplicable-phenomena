// CREATED · rating 4. A format is an annotation written INTO the writing it formats, found by formatted(), and it is a DRESS — chemistry's word: a styled chemical with no view, handed what it dresses and standing it in its selector, or restyling it in place where the tags agree, adding NOTHING. A theme is a format that is a singleton with values.
import { ReactNode } from 'react';
import { $, $Block, $check, children, styled } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';
import type { $Theme } from './Theme';

export interface $Format$ extends $Annotation$ { }

export class $Format extends $Annotation implements $Format$ {
    override selector: any = styled.div;
    $of: $Format | null = null;

    override get theme(): $Theme { return this.$of === null ? reflection.theme(this) : this.$of.theme; }

    $Format(block: $Block) {
        super.$Writing($check(block, $Block, '!').concat($check($TypeOfFormat, '!')));
    }

    // A DRESS NEEDS NO VIEW — chemistry promises it: handed the element, it holds what it is
    // given. This override exists only to UN-INHERIT $Writing.view(), which draws a block, and a
    // format has no block to draw. What stood here instead was a second look writing a <div> the
    // selector was going to write anyway, and a $content prop standing in for the children a
    // chemical already carries — the framework's own mechanism, rebuilt by hand after being
    // switched off. A format whose selector is the tag of what it dresses adds no element at all.
    override view(): ReactNode {
        return this[children];
    }

    // CHEMISTRY MEMOISES $(class) — measured, $($Probe) === $($Probe) — so the WeakMap that stood
    // behind this, guarding against React remounting what is worn every draw, was a second cache
    // over chemistry's own. Its comment said to delete it under exactly this condition.
    override format(drawn: ReactNode): ReactNode {
        const Worn = $(this.constructor as new() => $Format);

        return <Worn of={this} {...this.handed()}>{drawn}</Worn>;
    }

    // What the worn instance is handed besides the drawing; a format that carries a prop says so here.
    protected handed(): Record<string, unknown> {
        return {};
    }

    // A MARK A FORMAT DRAWS, painted in a colour it chooses. An icon written into a data URI
    // cannot inherit one, so the colour is put into the source. This is here because a format
    // is where a mark belongs: a theme holds VALUES, and a mark is a drawing. Before it, a
    // format that needed one kept it at module scope, which is where the demo's six constants
    // came from and why they read as cruft.
    protected painted(mark: string, colour: string): string {
        return `url("data:image/svg+xml,${mark.replaceAll('{ink}', encodeURIComponent(colour))}")`;
    }
}

export class $TypeOfFormat extends $Type {
    override name = 'Format';
    protected override specification: Specification<$Writing> = new FormatSpecification();
}

export class FormatSpecification extends WritingSpecification {
    @specify('a format says nothing of its own; it is worn')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Format = $($Format);
export const TypeOfFormat = $($TypeOfFormat);
