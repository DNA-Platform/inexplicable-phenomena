import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $Cover extends $Chapter {
    $Cover(block: $Block) {
        super.$Chapter(block);
        this._type = $(<TypeOfCover />);
    }
}

export class $TypeOfCover extends $TypeOfChapter {
    override get canonicalForm(): typeof $Writing { return $Cover; }

    constructor() {
        super();
        this[cache]('Cover');
    }
}

export const Cover = $($Cover);
export const TypeOfCover = $($TypeOfCover);
