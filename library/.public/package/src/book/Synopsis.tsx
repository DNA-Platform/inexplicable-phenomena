import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section } from '@/writing/Section';
import { $TypeOfChapter } from './Chapter';

export class $Synopsis extends $Composition<$Section> {
    $Synopsis(block: $Block) {
        super.$Composition(block);
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
