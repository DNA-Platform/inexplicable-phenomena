import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';

export interface $Highlight$ extends $Reference$ {
    pair(): [$Reference, $Reference] | undefined;
}

export class $Highlight extends $Reference implements $Highlight$ {
    pair(): [$Reference, $Reference] | undefined {
        const ends = (this._block.$elements ?? [])
            .filter((reference): reference is $Reference => reference instanceof $Reference);
        return ends.length === 2 ? [ends[0], ends[1]] : undefined;
    }
    beginning(): $Reference | undefined { return this.pair()?.[0]; }
    ending(): $Reference | undefined { return this.pair()?.[1]; }

    $Highlight(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOfHighlight, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfHighlight extends $TypeOfReference {
    override name = 'Highlight';
    protected override specification: Specification<$Writing> = new HighlightSpecification();
}

export class HighlightSpecification extends ReferenceSpecification {
    @specify('a highlight stands on its pair, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Highlight && writing.pair() !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a highlight says nothing of its own — its pair is its substance')
    override $saysSomething(writing: $Writing): boolean | void {
        if (writing instanceof $Highlight && writing.pair() !== undefined) return false;
        return super.$saysSomething(writing);
    }

    @specify('a highlight is a pair of references of the same kind')
    $sameKind(writing: $Writing): void {
        if (!(writing instanceof $Highlight)) return;
        const pair = writing.pair();
        $check(pair !== undefined, 'a highlight is a pair of references, and this one does not hold two');
        const kinds = (pair ?? []).map(end => html.text(end.path()?._block).split('/').pop()?.split(':')[0]);
        $check(kinds[0] !== undefined && kinds[0] === kinds[1],
            'a highlight is a pair of references of the same kind, and these two ends disagree');
    }
}

export const Highlight = $($Highlight);
export const TypeOfHighlight = $($TypeOfHighlight);
const typeOfHighlight = TypeOfHighlight;
