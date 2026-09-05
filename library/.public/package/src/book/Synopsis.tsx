import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Reference$, $Reference } from '@/reference/Reference';
import {
    $Chapter$, $TypeOfChapter, $TypeOf$Chapter, ChapterSpecification, $ChapterSpecification
} from './Chapter';

export interface $Synopsis$ extends $Chapter$ { }

export interface $$Synopsis$ extends $Reference$ { }

export class $Synopsis extends $Composition implements $Synopsis$ {
    $Synopsis(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfSynopsis)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfSynopsis, '!')];
    }
}

export class $$Synopsis extends $Reference implements $$Synopsis$ {
    $$Synopsis(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Synopsis, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfSynopsis extends $TypeOfChapter {
    override name = 'Synopsis';
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class $TypeOf$Synopsis extends $TypeOf$Chapter {
    override name = '$Synopsis';
    protected override specification: Specification<$Writing> = new $SynopsisSpecification();
}

export class SynopsisSpecification extends ChapterSpecification {
}

export class $SynopsisSpecification extends $ChapterSpecification {
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
const typeOfSynopsis = TypeOfSynopsis;
export const TypeOf$Synopsis = $($TypeOf$Synopsis);
const typeOf$Synopsis = TypeOf$Synopsis;
