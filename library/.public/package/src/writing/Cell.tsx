import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Type, $Writing } from './Writing';
import { $Composition } from './Composition';

export class $Cell extends $Composition<$Writing> {
    $Cell(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfCell />);
    }
}

export class $TypeOfCell extends $Type {
    override seated = true;

    override get canonicalForm(): typeof $Writing { return $Cell; }

    constructor() {
        super();
        this[cache]('Cell');
    }
}

export const Cell = $($Cell);
export const TypeOfCell = $($TypeOfCell);
