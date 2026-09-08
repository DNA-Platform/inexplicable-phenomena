import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';


export interface $PageFold$ extends $Reference$ { }

export class $PageFold extends $Reference implements $PageFold$ {
    location = 0;

    $PageFold(block: $Block) {
        super.$Reference((block ?? new $Block()).concat($check(typeOfPageFold, '!')));
    }
}

export class $TypeOfPageFold extends $TypeOfReference {
    override name = 'PageFold';
    protected override specification: Specification<$Writing> = new PageFoldSpecification();

    override specifically(fold: $PageFold): void {
        fold.persist = true;
        super.specifically(fold);
    }
}

export class PageFoldSpecification extends ReferenceSpecification {
}

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
const typeOfPageFold = TypeOfPageFold;
