import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, $TypedSpecification } from '@/notation/Type';
import { $Specification, specify } from '@/notation/Specification';
import { $Composition$ } from './Composition';
import { $Writing } from './Writing';
import { $Document } from './Document';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $File extends $Writing implements $Composition$<$Document> {
    parts(): $Document[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Document) ? $$(token, $Document) : undefined,
            () => []);
    }

    $File(block: $Html<'block'>) {
        super.$Writing($check(block, 'block'));
        this.type = $(<TypeOfFile />) as $TypeOfFile;
    }

    where(match: (part: $Document) => boolean): $Document[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Document) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Document) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Document) => boolean): $Document {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

class $FileSpecification extends $TypedSpecification<$Writing> {
    @specify('a file is written as documents')
    $documents(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Document)), 'a file is written as documents, and something in this one is not one');
    }
}

export class $TypeOfFile extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $File; }

    constructor() {
        super();
        this[cache]('File');
    }

    override specification: $Specification<$Writing> = new $FileSpecification();
}

export const File = $($File);
export const TypeOfFile = $($TypeOfFile);
