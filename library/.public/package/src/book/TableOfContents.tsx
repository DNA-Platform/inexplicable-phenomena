import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $TableOfContents$ extends $Chapter$ { }

export class $TableOfContents extends $Composition implements $TableOfContents$ {
    $TableOfContents(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfTableOfContents, '!')));
    }
}

export class $TypeOfTableOfContents extends $TypeOfChapter {
    override name = 'TableOfContents';
    protected override specification: Specification<$Writing> = new TableOfContentsSpecification();
}

export class TableOfContentsSpecification extends ChapterSpecification {
}

export const TableOfContents = $($TableOfContents);
export const TypeOfTableOfContents = $($TypeOfTableOfContents);
