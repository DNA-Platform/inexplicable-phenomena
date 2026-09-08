import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $Synopsis$ extends $Chapter$ { }

export class $Synopsis extends $Composition implements $Synopsis$ {
    override parenthetical = true;

    $Synopsis(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfSynopsis, '!')));
    }
}

export class $TypeOfSynopsis extends $TypeOfChapter {
    override name = 'Synopsis';
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class SynopsisSpecification extends ChapterSpecification {
    @specify('a synopsis may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
