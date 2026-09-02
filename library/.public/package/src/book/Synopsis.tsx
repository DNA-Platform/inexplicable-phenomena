import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $Synopsis extends $Chapter {
    $Synopsis(block: $Block) {
        super.$Chapter(block);
        this._type = $(<TypeOfSynopsis />);
    }
}

export class $TypeOfSynopsis extends $TypeOfChapter {
    override get canonicalForm(): typeof $Writing { return $Synopsis; }

    constructor() {
        super();
        this[cache]('Synopsis');
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
