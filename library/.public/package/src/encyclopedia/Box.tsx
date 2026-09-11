import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Aside$, $Aside, $TypeOfAside, AsideSpecification } from '@/writing/Aside';

export interface $Box$ extends $Aside$ { }

export class $Box extends $Aside implements $Box$ {
    $Box(block: $Block) {
        super.$Aside(this.addType(block, $TypeOfBox));
    }
}

export class $TypeOfBox extends $TypeOfAside {
    protected override specification: Specification<$Writing> = new BoxSpecification();
}

export class BoxSpecification extends AsideSpecification {
}

export const Box = $($Box);
export const TypeOfBox = $($TypeOfBox);
