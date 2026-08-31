import { ReactNode } from 'react';
import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { Type, $Writing, Writing } from './Writing';
import { $Paragraph, $TypeOfParagraph } from './Paragraph';

export class $Title extends $Paragraph {
    override get canonical(): boolean { return false; }

    $Title(block: $Html<'block'>) {
        super.$Paragraph(block);
        this.type = $(<TypeOfTitle />);
    }

    override view(): ReactNode {
        if (!this.block) return null;
        const Block = $(this.block as never);
        return <>
            <Block />
        </>
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
