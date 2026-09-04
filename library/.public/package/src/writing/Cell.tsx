import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Type } from './Writing';
import { $Composition$, $Composition } from '@/writing/Composition';

export class $Cell extends $Composition implements $Composition$ {
    $Cell(block: $Block) {
        const Asked = $(TypeOfCell);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }
}

export class $TypeOfCell extends $Type {
    override name = 'Cell';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Cell = $($Cell);
export const TypeOfCell = $($TypeOfCell);
