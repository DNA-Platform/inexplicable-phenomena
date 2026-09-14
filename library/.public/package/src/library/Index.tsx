import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Index$ extends $Document$ { }

export class $Index extends $Document implements $Index$ {
    definition = 'section';
    override parenthetical = true;

    $Index(block: $Block) {
        super.$Document(this.addType(block, $TypeOfIndex));
    }
}

export class $TypeOfIndex extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new IndexSpecification();
}

export class IndexSpecification extends DocumentSpecification {
    @specify('written, its parts specify; empty, it stands')
    override $holdsSpecifiedParts(writing: $Writing): boolean | void {
        return reflection.composition(writing) && writing.parts().length === 0 ? false : super.$holdsSpecifiedParts(writing);
    }

    @specify('an index is written as the book is read')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
