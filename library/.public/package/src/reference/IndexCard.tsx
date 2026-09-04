import { ReactNode } from 'react';
import { $, cache } from '@dna-platform/chemistry';
import { Anchor as anchor } from '@/writing/Writing';
import { $TypeOfReference } from './Reference';

export class $IndexCard extends $TypeOfReference {
    override name = 'IndexCard';

    constructor() {
        super();
        this[cache](this.name);
    }

    override view(): ReactNode {
        const Written = this.block ? $(this.block) : null;
        const target = this.means;
        if (target?.path === undefined) return Written && <Written />;
        const Anchor = $(anchor);

        return <Anchor href={target.path.copy}>{Written && <Written />}</Anchor>;
    }
}

export const IndexCard = $($IndexCard);
