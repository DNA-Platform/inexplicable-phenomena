import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfChapter } from './Chapter';
import { $TypeOfCover } from './Cover';
import { $TypeOfSynopsis } from './Synopsis';
import { $TypeOfTableOfContents } from './TableOfContents';
import { $TypeOfIndex, Index as index } from './Index';
import { BodyFormat as body } from '@/encyclopedia/BodyFormat';

export interface $Book$ extends $Composition$ {
    cover(): $Writing | undefined;
    synopsis(): $Writing | undefined;
    tableOfContents(): $Writing | undefined;
    index(): $Writing | undefined;
}

export interface $$Book$ extends $Reference$ { }

export class $Book extends $Composition implements $Book$ {
    cover(): $Writing | undefined { return this.searchForOne($TypeOfCover); }
    synopsis(): $Writing | undefined { return this.searchForOne($TypeOfSynopsis); }
    tableOfContents(): $Writing | undefined { return this.searchForOne($TypeOfTableOfContents); }
    index(): $Writing | undefined { return this.searchForOne($TypeOfIndex); }

    $Book(block: $Block) {
        super.$Composition(block);
        if (!reflection.is(this, $TypeOfBook))
            this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfBook, '!')];
        if (this.searchFor($TypeOfIndex).length === 0)
            this._block.$elements = [...(this._block.$elements ?? []), $check(index, '!')];
    }

    override frame(): ReactNode {
        const Body = $(body);

        return <Body>{super.frame()}</Body>;
    }
}

export class $$Book extends $Reference implements $$Book$ {
    $$Book(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Book, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfBook extends $Type {
    override name = 'Book';
    protected override specification: Specification<$Writing> = new BookSpecification();

    override below(): new() => $TypeOfChapter { return $TypeOfChapter; }
}

export class $TypeOf$Book extends $TypeOfReference {
    override name = '$Book';
    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class BookSpecification extends WritingSpecification {
    @specify('a book opens with its cover')
    $opensWithCover(writing: $Writing): void {
        $check(reflection.instanceOf(this.composed(writing)[0], $TypeOfCover),
            'a book opens with its cover, and this one opens with something else');
    }

    @specify('a book carries its synopsis second')
    $synopsisStandsSecond(writing: $Writing): void {
        $check(this.standing(writing, $TypeOfSynopsis, 1),
            'a book carries its synopsis second, and this one carries it elsewhere');
    }

    @specify('a book carries its table of contents third')
    $contentsStandThird(writing: $Writing): void {
        $check(this.standing(writing, $TypeOfTableOfContents, 2),
            'a book carries its table of contents third, and this one carries it elsewhere');
    }

    @specify('a book ends with its index')
    $endsWithIndex(writing: $Writing): void {
        const parts = this.composed(writing);
        $check(reflection.instanceOf(parts[parts.length - 1], $TypeOfIndex),
            'a book ends with its index, and this one ends with something else');
    }

    protected standing(writing: $Writing, kind: new() => $Type, place: number): boolean {
        const at = this.composed(writing).findIndex(part => reflection.instanceOf(part, kind));
        return at < 0 || at === place;
    }
}

export class $BookSpecification extends ReferenceSpecification {
}

export const Book = $($Book);
export const TypeOfBook = $($TypeOfBook);
const typeOfBook = TypeOfBook;
export const TypeOf$Book = $($TypeOf$Book);
const typeOf$Book = TypeOf$Book;
