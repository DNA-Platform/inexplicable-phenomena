import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Type, $Writing, Writing } from './Writing';
import { $Paragraph, $TypeOfParagraph } from './Paragraph';
import { Heading } from '@/encyclopedia/Heading';

export class $Title extends $Paragraph {
    override get canonical(): boolean { return false; }

    $Title(block: $Block) {
        super.$Paragraph(block);
        this._type = $(<TypeOfTitle />);
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
    override get canonicalForm(): typeof $Writing { return $Title; }

    constructor() {
        super();
        this[cache]('Title');
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
