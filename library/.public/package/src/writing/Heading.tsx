import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Heading$ extends $Paragraph$ { }

export class $Heading extends $Composition implements $Heading$ {
    $Heading(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfHeading, '!')));
    }

    override view(): ReactNode {
        const Block = $(this._block);

        return <h2 id={html.text(this._block).replace(/\s+/gu, '_')}><Block /></h2>;
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
