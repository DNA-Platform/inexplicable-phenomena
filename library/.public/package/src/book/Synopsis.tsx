import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $Synopsis$ extends $Chapter$ { }

export class $Synopsis extends $Composition implements $Synopsis$ {
    override parenthetical = true;

    $Synopsis(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSynopsis);
    }
}

export class $TypeOfSynopsis extends $TypeOfChapter {
    override name = 'Synopsis';
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class SynopsisSpecification extends ChapterSpecification {
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
