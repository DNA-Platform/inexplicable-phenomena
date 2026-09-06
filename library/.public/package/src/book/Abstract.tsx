import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from './Chapter';

export interface $Abstract$ extends $Chapter$ { }

export class $Abstract extends $Composition implements $Abstract$ {
    override parenthetical = true;

    $Abstract(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfAbstract);
    }
}

export class $TypeOfAbstract extends $TypeOfChapter {
    override name = 'Abstract';
    protected override specification: Specification<$Writing> = new AbstractSpecification();
}

export class AbstractSpecification extends ChapterSpecification {
}

export const Abstract = $($Abstract);
export const TypeOfAbstract = $($TypeOfAbstract);
