import { ReactNode } from 'react';
import { $, $Block, $check, cache } from '@dna-platform/chemistry';
import { Body as body } from '@/encyclopedia/Body';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Type, TypedSpecification, $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $TypeOfChapter } from './Chapter';
import { $Index, Index as index } from './Index';
import { $References, References as references } from '@/reference/References';

export interface $Book$ extends $Composition$ {
}

export class $Book extends $Composition implements $Composition$, $Book$ {
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
        const TypeOfBook = $(typeOfBook);
        this.type ??= $(<TypeOfBook />);
        super.$Composition(block);
    }

    override frame(): ReactNode {
        const Body = $(body);

        return <Body>{super.frame()}</Body>;
    }
}

export class $$Book extends $Reference {
    $$Book(block: $Block) {
        const TypeOf$Book = $(typeOf$Book);
        this.type ??= $(<TypeOf$Book />);
        super.$Reference(block);
    }
}

export class $TypeOfBook extends $Type {
    resolve = false;
    override name = 'Book';

    override specifically(writing: $Writing): void {
        if (writing.block && !(writing.block.$elements ?? []).some(index => index instanceof $Index)) {
            const Index = $(index);
            const References = $(references);
            writing.block.$elements = [...(writing.block.$elements ?? []), $<$Index>(<Index />, $<$References>(<References />))];
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
        const at = elements.findIndex(index => index instanceof $Index);
        $check(at >= 0 && at === elements.length - 1,
            'a book ends with its index, and this one does not');
    }

    @specify('a book is written as chapters')
    $writtenAsChapters(writing: $Writing): void {
        const elements = (writing.block?.$elements ?? []) as unknown[];
        $check(elements.every(one => typeof one !== 'string' || one.trim() === ''),
            'a book is written as chapters, and this one carries loose text');
        const inside = elements
            .filter((writing): writing is $Writing => writing instanceof $Writing && !writing.parenthetical);
        $check(inside.every(one => reflection.is(one, $TypeOfChapter)),
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
        const target = (writing.block?.$elements ?? []).find((part): part is $Writing => part instanceof $Writing && !part.parenthetical);
        $check(target === undefined || reflection.is(target, $TypeOfBook),
            'a reference to a book lands on one, and what it holds is not one');
    }
}

export const Book = $($Book);
export const TypeOfBook = $($TypeOfBook);
const typeOfBook = TypeOfBook;
export const TypeOf$Book = $($TypeOf$Book);
const typeOf$Book = TypeOf$Book;
prints.set('Bk', $($$Book));
