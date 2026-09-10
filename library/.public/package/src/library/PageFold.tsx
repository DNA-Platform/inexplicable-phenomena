import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Fold$, $Fold, $TypeOfFold, FoldSpecification } from '@/reference/Fold';

export interface $PageFold$ extends $Fold$ { }

export class $PageFold extends $Fold implements $PageFold$ {
    $PageFold(block: $Block) {
        super.$Fold((block ?? new $Block()).concat($check(TypeOfPageFold, '!')));
    }
}

export class $TypeOfPageFold extends $TypeOfFold {
    protected override specification: Specification<$Writing> = new PageFoldSpecification();

    override specifically(fold: $PageFold): void {
        fold.persist = true;
        super.specifically(fold);
    }
}

export class PageFoldSpecification extends FoldSpecification { }

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
