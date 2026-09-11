import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';

export const folded = (key: string): string => `#${key}`;

export interface $Fold$ extends $Annotation$ {
    key(): string;
}

export class $Fold extends $Annotation implements $Fold$ {
    key(): string { return html.text(this._block).trim(); }

    $Fold(block: $Block) {
        super.$Writing(this.addType(block, $TypeOfFold));
        const named = this.parent;
        if (reflection.writing(named)) this.book?.scratchpad.keep(folded(this.key()), named);
    }

    static $register(): void {
        reflection.knows({ fold: $Fold });
    }
}

export class $TypeOfFold extends $Type {
    protected override specification: Specification<$Writing> = new FoldSpecification();
}

export class FoldSpecification extends WritingSpecification { }

export const Fold = $($Fold);
export const TypeOfFold = $($TypeOfFold);
