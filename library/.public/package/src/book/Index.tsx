import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';
import { ColumnsFormat as columns } from '@/encyclopedia/ColumnsFormat';

export interface $Index$ extends $Chapter$ { }

export class $Index extends $Composition implements $Index$ {
    $Index(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfIndex)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfIndex, '!')];
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Columns = $(columns);

        return (
            <Columns>
                <Block />
            </Columns>
        );
    }
}

export class $TypeOfIndex extends $TypeOfChapter {
    override name = 'Index';
    protected override specification: Specification<$Writing> = new IndexSpecification();
}

export class IndexSpecification extends ChapterSpecification {
    @specify('an index is written as the book is read')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
const typeOfIndex = TypeOfIndex;
