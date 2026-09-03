import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Paragraph, $TypeOfParagraph } from './Paragraph';
import { html } from '@/utilities/Html';
import { Bullets } from '@/encyclopedia/Bullets';

export class $List extends $Paragraph {
    $List(block: $Block) {
        const Asked = $(TypeOfList);
        this.type ??= $(<Asked />);
        super.$Paragraph(block);
    }

    override view(): ReactNode {
        const lines = html.text(this.block).split('\n').filter(line => line.trim() !== '');
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
