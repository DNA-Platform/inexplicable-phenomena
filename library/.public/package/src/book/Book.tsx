import { ReactNode } from 'react';
import { $, $Block, $check, cache } from '@dna-platform/chemistry';
import { Body } from '@/encyclopedia/Body';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Type, TypedSpecification, $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $Index, Index } from './Index';
import { $References, References } from '@/reference/References';

export class $Book extends $Composition implements $Composition$ {
    get chapters(): $Composition { return this; }
    get cover(): $Writing { return this.parts()[0]; }
    get synopsis(): $Synopsis | undefined { return this.parts().find((one): one is $Synopsis => one instanceof $Synopsis); }
    get tableOfContents(): $TableOfContents | undefined { return this.parts().find((one): one is $TableOfContents => one instanceof $TableOfContents); }
    get sections(): $Composition { return this.catalogue().comprehend(); }
    get paragraphs(): $Composition { return this.sections.catalogue().comprehend(); }
    get sentences(): $Composition { return this.paragraphs.catalogue().comprehend(); }
    get words(): $Composition { return this.sentences.catalogue().comprehend(); }
    get letters(): $Composition { return this.words.catalogue().comprehend(); }

    $Book(block: $Block) {
        const Asked = $(TypeOfBook);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

    override frame(): ReactNode {
        return <Body>{super.frame()}</Body>;
    }
}

export class $$Book extends $Reference {
    $$Book(block: $Block) {
        const Asked = $(TypeOf$Book);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }
}

export class $TypeOfBook extends $Type {
    resolve = false;
    override name = 'Book';

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(one => one instanceof $Index)) {
            const AskedIndex = $(Index);
            const AskedReferences = $(References);
            const index = $<$Index>(<AskedIndex />, $<$References>(<AskedReferences />));
            writing.block.$elements = [...(writing.block.$elements ?? []), index];
        }
        super.specifically(writing);
    }

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new BookSpecification();
}

export class $TypeOf$Book extends $TypeOfReference {
    override name = '$Book';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class BookSpecification extends TypedSpecification<$Writing> {
    @specify('a book ends with its index')
    $endsWithIndex(writing: $Writing): void {
        const elements = (writing.block?.$elements ?? []);
        const at = elements.findIndex(one => one instanceof $Index);
        $check(at >= 0 && at === elements.length - 1,
            'a book ends with its index, and this one does not');
    }

    @specify('a book is written as chapters')
    $writtenAsChapters(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => reflection.stands(one, 'Chapter')),
            'a book is written as chapters, and something in this one could never be one');
    }
}

export class $BookSpecification extends ReferenceSpecification {
    @specify('a reference to a book lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Bk:'),
            'a reference to a book lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || reflection.stands(held, 'Book'),
            'a reference to a book lands on one, and what it holds is not one');
    }
}

export const Book = $($Book);
export const TypeOfBook = $($TypeOfBook);
export const TypeOf$Book = $($TypeOf$Book);
prints.set('Bk', $($$Book));
