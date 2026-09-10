import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $Heading$ extends $Paragraph$ { }

export class $Heading extends $Paragraph implements $Heading$ {
    $Heading(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfHeading));
    }

    // A HEADING HAS A LEVEL AND NOW WRITES IT. It wrote <h2> always, so the base sheet carried h1,
    // h3 and h1..h6 groups styling elements no kind produced — the census of a hole. The level was
    // already known: reflection.indent answers how deep a writing stands, and the table of contents
    // has been nesting by it. Nothing is added; an existing reading reaches the element it was for.
    override print(content: ReactNode): ReactNode {
        const levels = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
        const Level = levels[Math.min(reflection.indent(this), levels.length - 1)];

        return <Level id={html.text(this._block).replace(/\s+/gu, '_')} className={this.className}>{content}</Level>;
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
