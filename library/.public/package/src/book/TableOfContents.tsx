import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $TableOfContents extends $Chapter {
    $TableOfContents(block: $Block) {
        const Asked = $(TypeOfTableOfContents);
        this.type ??= $(<Asked />);
        super.$Chapter(block);
    }
}

export class $TypeOfTableOfContents extends $TypeOfChapter {
    override name = 'TableOfContents';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
