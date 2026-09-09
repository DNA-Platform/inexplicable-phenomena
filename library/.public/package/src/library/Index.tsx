import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Index$ extends $Document$ { }

export class $Index extends $Document implements $Index$ {
    override parenthetical = true;

    $Index(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check($TypeOfIndex, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <section className={this.className}>{content}</section>;
    }
}

export class $TypeOfIndex extends $TypeOfDocument {
    override name = 'Index';
    protected override specification: Specification<$Writing> = new IndexSpecification();
}

export class IndexSpecification extends DocumentSpecification {
    @specify('an index is written as the book is read')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }
}

export const Index = $($Index);
export const TypeOfIndex = $($TypeOfIndex);
