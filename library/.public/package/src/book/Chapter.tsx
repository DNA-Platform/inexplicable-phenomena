import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Article } from '@/encyclopedia/Article';
import { $Writing } from '@/writing/Writing';
import { $Document, $TypeOfDocument } from '@/writing/Document';
import { Specification, specify } from '@/utilities/Specification';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $$ } from '@/utilities/Lib';

export class $Chapter extends $Document {
    $Chapter(block: $Block) {
        super.$Document(block);
        this._type = $(<TypeOfChapter />);
    }

    override frame(): ReactNode {
        return <Article>{super.frame()}</Article>;
    }
}

export class $$Chapter extends $Reference implements $Reference$<$Chapter> {
    $$Chapter(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Chapter />);
    }

    override async read(): Promise<$Chapter> {
        return $$(await super.read(), $Chapter);
    }
}

export class $TypeOfChapter extends $TypeOfDocument {
    override code = 'Cr';

    override get canonicalForm(): typeof $Writing { return $Chapter; }

    constructor() {
        super();
        this[cache]('Chapter');
    }
}

export class $TypeOf$Chapter extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Chapter; }

    constructor() {
        super();
        this[cache]('$Chapter');
    }

    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class $ChapterSpecification extends ReferenceSpecification {
    @specify('a reference to a chapter lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Cr:'),
            'a reference to a chapter lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Chapter),
            'a reference to a chapter lands on one, and what it holds is not one');
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
export const TypeOf$Chapter = $($TypeOf$Chapter);
prints.set('Cr', $$Chapter);
