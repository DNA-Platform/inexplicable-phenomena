import { $, $Html, cache } from '@dna-platform/chemistry';
import { $Composition$ } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';
import { $File, $TypeOfFile } from '@/writing/File';
import { $Chapter } from './Chapter';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Book extends $File implements $Composition$<$Chapter> {
    override parts(): $Chapter[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Chapter) ? $$(token, $Chapter) : undefined,
            () => []);
    }

    $Book(block: $Html<'block'>) {
        super.$File(block);
        this.type = $(<TypeOfBook />) as $TypeOfBook;
    }

    override where(match: (part: $Chapter) => boolean): $Chapter[] { return this.parts().filter(match); }
    override select<U>(pick: (part: $Chapter) => U): U[] { return this.parts().map(pick); }
    override selectMany<U>(pick: (part: $Chapter) => U[]): U[] { return this.parts().flatMap(pick); }
    override single(match: (part: $Chapter) => boolean): $Chapter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $TypeOfBook extends $TypeOfFile {
    override get canonicalForm(): typeof $Writing { return $Book; }

    constructor() {
        super();
        this[cache]('Book');
    }
}

export const Book = $($Book);
export const TypeOfBook = $($TypeOfBook);
