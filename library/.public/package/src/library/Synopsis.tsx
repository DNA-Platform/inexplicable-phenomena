import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Synopsis$ extends $Document$ { }

export class $Synopsis extends $Document implements $Synopsis$ {
    override parenthetical = true;

    $Synopsis(block: $Block) {
        super.$Document(this.addType(block, $TypeOfSynopsis));
    }
}

export class $TypeOfSynopsis extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class SynopsisSpecification extends DocumentSpecification {
    @specify('written, its parts specify; empty, it stands')
    override $holdsSpecifiedParts(writing: $Writing): boolean | void {
        return reflection.composition(writing) && writing.parts().length === 0 ? false : super.$holdsSpecifiedParts(writing);
    }

    @specify('a synopsis may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
