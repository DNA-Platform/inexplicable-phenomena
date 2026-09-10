import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Fold$, $Fold, $TypeOfFold, FoldSpecification } from '@/reference/Fold';

export interface $Highlight$ extends $Fold$ {
    pair(): [$Fold, $Fold] | undefined;
}

export class $Highlight extends $Fold implements $Highlight$ {
    pair(): [$Fold, $Fold] | undefined {
        const ends = (this._block.$elements ?? []).filter((end): end is $Fold => end instanceof $Fold);
        return ends.length === 2 ? [ends[0], ends[1]] : undefined;
    }
    beginning(): $Fold | undefined { return this.pair()?.[0]; }
    ending(): $Fold | undefined { return this.pair()?.[1]; }

    $Highlight(block: $Block) {
        super.$Fold((block ?? new $Block()).concat($check(TypeOfHighlight, '!')));
    }
}

export class $TypeOfHighlight extends $TypeOfFold {
    override name = 'Highlight';
    protected override specification: Specification<$Writing> = new HighlightSpecification();
}

export class HighlightSpecification extends FoldSpecification {
    @specify('a highlight is a pair of folds in the same writing')
    $sameWriting(writing: $Writing): void {
        if (!(writing instanceof $Highlight)) return;
        const pair = writing.pair();
        if (pair === undefined) return;
        const kinds = pair.map(end => end.key().split('/')[0]);
        $check(kinds[0] === kinds[1],
            'a highlight is a pair of folds in the same writing, and these two ends disagree');
    }
}

export const Highlight = $($Highlight);
export const TypeOfHighlight = $($TypeOfHighlight);
