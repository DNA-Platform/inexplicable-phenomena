import { ReactNode } from 'react';
import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { Type } from '@/notation/Type';
import { $Writing, Writing } from './Writing';
import { $Paragraph, $TypeOfParagraph } from './Paragraph';

export class $Title extends $Paragraph {
    override get canonical(): boolean { return false; }

    $Title(block: $Html<'block'>) {
        super.$Paragraph(block);
        this.type = $(<TypeOfTitle />) as $TypeOfTitle;
    }

    override view(): ReactNode {
        const Block = $(this.block as never);
        return (
            <Writing>
                <Block />
                <Type>Sentence</Type>
            </Writing>
        );
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
