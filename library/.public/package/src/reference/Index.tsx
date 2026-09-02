import { $, $Block, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $References, $TypeOfReferences } from './References';

export class $Index extends $References {
    $Index(block: $Block) {
        this.$pid ??= 'Index';
        super.$References(block);
        this._type = $(<TypeOfIndex />);
    }
}

export class $TypeOfIndex extends $TypeOfReferences {
    override get canonicalForm(): typeof $Writing { return $Index; }

    constructor() {
        super();
        this[cache]('Index');
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
