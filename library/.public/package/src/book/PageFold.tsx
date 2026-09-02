import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $$Chapter, $TypeOf$Chapter } from './Chapter';

export class $PageFold extends $$Chapter {
    location = 0;

    $PageFold(block: $Block) {
        super.$$Chapter(block);
        this._type = $(<TypeOfPageFold />);
        this.persist = true;
    }
}

export class $TypeOfPageFold extends $TypeOf$Chapter {
    override get canonicalForm(): typeof $Writing { return $PageFold; }

    constructor() {
        super();
        this[cache]('PageFold');
    }
}

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
