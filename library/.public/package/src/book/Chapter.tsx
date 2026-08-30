import { $, $Html, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Document, $TypeOfDocument } from '@/writing/Document';

export class $Chapter extends $Document {
    $Chapter(block: $Html<'block'>) {
        super.$Document(block);
        this.type = $(<TypeOfChapter />) as $TypeOfChapter;
    }
}

export class $TypeOfChapter extends $TypeOfDocument {
    override get canonicalForm(): typeof $Writing { return $Chapter; }

    constructor() {
        super();
        this[cache]('Chapter');
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
