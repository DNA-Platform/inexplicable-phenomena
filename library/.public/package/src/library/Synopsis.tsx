import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Synopsis$ extends $Document$ { }

export class $Synopsis extends $Document implements $Synopsis$ {
    override parenthetical = true;

    $Synopsis(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check($TypeOfSynopsis, '!')));
    }
}

export class $TypeOfSynopsis extends $TypeOfDocument {
    override name = 'Synopsis';
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class SynopsisSpecification extends DocumentSpecification {
    @specify('a synopsis may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
