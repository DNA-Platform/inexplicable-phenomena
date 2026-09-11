import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Box$, $Box, $TypeOfBox, BoxSpecification } from './Box';
import { NavboxFormat as navboxStyle } from './NavboxFormat';

export interface $Navbox$ extends $Box$ { }

export class $Navbox extends $Box implements $Navbox$ {
    override definition = 'nav';

    $Navbox(block: $Block) {
        super.$Box(this.addType(block, $TypeOfNavbox).concat($check(navboxStyle, '!')));
    }
}

export class $TypeOfNavbox extends $TypeOfBox {
    protected override specification: Specification<$Writing> = new NavboxSpecification();
}

export class NavboxSpecification extends BoxSpecification {
}

export const Navbox = $($Navbox);
export const TypeOfNavbox = $($TypeOfNavbox);
