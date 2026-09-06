import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { HeadingFormat as heading } from '@/encyclopedia/HeadingFormat';

export interface $Heading$ extends $Paragraph$ { }

export class $Heading extends $Composition implements $Heading$ {
    $Heading(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfHeading);
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Heading = $(heading);

        return (
            <Heading id={html.text(this._block).replace(/\s+/gu, '_')}>
                <Block />
            </Heading>
        );
    }
}

export class $TypeOfHeading extends $TypeOfParagraph {
    override name = 'Heading';
    protected override specification: Specification<$Writing> = new HeadingSpecification();
}

export class HeadingSpecification extends ParagraphSpecification {
}

export const Heading = $($Heading);
export const TypeOfHeading = $($TypeOfHeading);
