import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfParagraph } from './Paragraph';

export class $Cell extends $Composition implements $Composition$ {
    $Cell(block: $Block) {
        const TypeOfCell = $(typeOfCell);
        this.type ??= $(<TypeOfCell />);
        super.$Composition(block);
    }
}

export class $TypeOfCell extends $TypeOfParagraph {
    override name = 'Cell';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Cell = $($Cell);
export const TypeOfCell = $($TypeOfCell);
const typeOfCell = TypeOfCell;
