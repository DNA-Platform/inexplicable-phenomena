import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Composition$, $Composition } from './Composition';
import { $TypeOfParagraph } from './Paragraph';
import { html } from '@/utilities/Html';
import { Bullets as bullets } from '@/encyclopedia/Bullets';

export class $List extends $Composition implements $Composition$ {
    $List(block: $Block) {
        const TypeOfList = $(typeOfList);
        this.type ??= $(<TypeOfList />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        const lines = html.text(this.block).split('\n').filter(line => line.trim() !== '');
        const Bullets = $(bullets);

        return <Bullets>{lines.map((line, at) => <li key={at}>{line}</li>)}</Bullets>;
    }

    override frame(): ReactNode {
        return this.view();
    }
}

export class $TypeOfList extends $TypeOfParagraph {
    override name = 'List';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const List = $($List);
export const TypeOfList = $($TypeOfList);
const typeOfList = TypeOfList;
