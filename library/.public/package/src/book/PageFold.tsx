import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference } from '@/reference/Reference';
import { $TypeOf$Chapter, $ChapterSpecification } from './Chapter';

export interface $PageFold$ extends $Reference$ { }

export class $PageFold extends $Reference implements $PageFold$ {
    location = 0;

    $PageFold(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOfPageFold, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfPageFold extends $TypeOf$Chapter {
    override name = 'PageFold';
    protected override specification: Specification<$Writing> = new PageFoldSpecification();

    override specifically(fold: $Writing): void {
        fold.persist = true;
        super.specifically(fold);
    }
}

export class PageFoldSpecification extends $ChapterSpecification {
}

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
const typeOfPageFold = TypeOfPageFold;
