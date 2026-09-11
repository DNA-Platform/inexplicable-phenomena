import { $, $Block, $check, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Box$, $Box, $TypeOfBox, BoxSpecification, $BoxFormat } from './Box';

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

export class $NavboxFormat extends $BoxFormat {
    override selector: any = styled.nav;
    clear = 'both';
    width = '100%';
    override margin = '1em 0 0';
}

export const Navbox = $($Navbox);
export const TypeOfNavbox = $($TypeOfNavbox);
export const NavboxFormat = $($NavboxFormat);
const navboxStyle = NavboxFormat;
