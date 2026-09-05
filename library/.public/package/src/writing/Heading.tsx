import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { HeadingFormat as heading } from '@/encyclopedia/HeadingFormat';

export interface $Heading$ extends $Paragraph$ { }

export class $Heading extends $Composition implements $Heading$ {
    $Heading(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfHeading)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfHeading, '!')];
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Heading = $(heading);

        return (
            <Heading>
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
const typeOfHeading = TypeOfHeading;
