import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section } from '@/writing/Section';
import { $TypeOfChapter } from './Chapter';

export class $Cover extends $Composition<$Section> {
    $Cover(block: $Block) {
        super.$Composition(block);
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
