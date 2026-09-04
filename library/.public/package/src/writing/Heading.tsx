import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Composition } from './Composition';
import { $TypeOfParagraph } from './Paragraph';
import { Heading as heading } from '@/encyclopedia/Heading';

export class $Heading extends $Composition {
    override get canonical(): boolean { return false; }

    $Heading(block: $Block) {
        const TypeOfHeading = $(typeOfHeading);
        this.type ??= $(<TypeOfHeading />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        if (!this.block) return null;
        const Block = $(this.block as never);
        const Heading = $(heading);

        return <Heading><Block /></Heading>;
    }

    override frame(): ReactNode {
        return this.view();
    }
}

export class $TypeOfHeading extends $TypeOfParagraph {
    override name = 'Heading';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Heading = $($Heading);
export const TypeOfHeading = $($TypeOfHeading);
const typeOfHeading = TypeOfHeading;
