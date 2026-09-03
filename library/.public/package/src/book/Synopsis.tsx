import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $Synopsis extends $Chapter {
    $Synopsis(block: $Block) {
        const Asked = $(TypeOfSynopsis);
        this.type ??= $(<Asked />);
        super.$Chapter(block);
    }
}

export class $TypeOfSynopsis extends $TypeOfChapter {
    override name = 'Synopsis';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
