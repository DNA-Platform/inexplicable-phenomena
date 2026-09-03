import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Chapter, $TypeOfChapter } from './Chapter';

export class $TableOfContents extends $Chapter {
    $TableOfContents(block: $Block) {
        super.$Chapter(block);
        this._type = $(<TypeOfTableOfContents />);
    }
}

export class $TypeOfTableOfContents extends $TypeOfChapter {
    override get canonicalForm(): typeof $Writing { return $TableOfContents; }

    constructor() {
        super();
        this[cache]('TableOfContents');
    }
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
