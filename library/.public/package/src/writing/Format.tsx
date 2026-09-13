import { ReactNode } from 'react';
import { $, $Block, $check, children, styled } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';

export interface $Format$ extends $Annotation$ { }

export class $Format extends $Annotation implements $Format$ {
    override selector: any = styled.div;
    $as?: string;
    $href?: string;
    $id?: string;

    $Format(block: $Block) {
        super.$Writing(this.addType(block, $TypeOfFormat));
    }

    override specifically(writing: $Writing): void {
        const worn = writing.searchFor($TypeOfFormat).length;
        $check(worn === 1, `a format is worn alone, and this writing wears ${worn}`);
    }

    override view(): ReactNode {
        return this[children];
    }

    // A MARK A FORMAT DRAWS, painted in a colour it chooses. An icon written into a data URI
    // cannot inherit one, so the colour is put into the source. This is here because a format
    // is where a mark belongs: a theme holds VALUES, and a mark is a drawing. Before it, a
    // format that needed one kept it at module scope, which is where the demo's six constants
    // came from and why they read as cruft.
    protected painted(mark: string, colour: string): string {
        return `url("data:image/svg+xml,${mark.replaceAll('{ink}', encodeURIComponent(colour))}")`;
    }

    static $register(): void {
        reflection.knows({ format: $Format });
    }
}

export class $TypeOfFormat extends $Type {
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
