import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $Cover extends $Chapter {
    $Cover(block: $Block) {
        const Asked = $(TypeOfCover);
        this.type ??= $(<Asked />);
        super.$Chapter(block);
    }
}

export class $TypeOfCover extends $TypeOfChapter {
    override name = 'Cover';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Cover = $($Cover);
export const TypeOfCover = $($TypeOfCover);
