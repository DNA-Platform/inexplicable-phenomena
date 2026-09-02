import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section } from '@/writing/Section';
import { $TypeOfChapter } from './Chapter';

export class $TableOfContents extends $Composition<$Section> {
    $TableOfContents(block: $Block) {
        super.$Composition(block);
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
