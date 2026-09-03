import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Paragraph, $TypeOfParagraph } from './Paragraph';
import { Heading } from '@/encyclopedia/Heading';

export class $Title extends $Paragraph {
    override get canonical(): boolean { return false; }

    $Title(block: $Block) {
        const Asked = $(TypeOfTitle);
        this.type ??= $(<Asked />);
        super.$Paragraph(block);
    }

    override view(): ReactNode {
        if (!this.block) return null;
        const Block = $(this.block as never);
        return <Heading><Block /></Heading>;
    }

    override frame(): ReactNode {
        return this.view();
    }
}

export class $TypeOfTitle extends $TypeOfParagraph {
    override name = 'Title';

    constructor() {
        super();
        this[cache](this.name);
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
