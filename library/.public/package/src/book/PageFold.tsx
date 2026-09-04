import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $$Chapter, $TypeOf$Chapter } from './Chapter';

export class $PageFold extends $$Chapter {
    location = 0;

    $PageFold(block: $Block) {
        const TypeOfPageFold = $(typeOfPageFold);
        this.type ??= $(<TypeOfPageFold />);
        super.$$Chapter(block);
        this.persist = true;
    }
}

export class $TypeOfPageFold extends $TypeOf$Chapter {
    override name = 'PageFold';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
const typeOfPageFold = TypeOfPageFold;
