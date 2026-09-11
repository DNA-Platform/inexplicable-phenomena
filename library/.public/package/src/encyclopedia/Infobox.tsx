import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';
import { $Box$, $Box, $TypeOfBox, BoxSpecification } from './Box';
import { InfoboxFormat as infoboxStyle } from './InfoboxFormat';

export interface $Infobox$ extends $Box$ { }

export class $Infobox extends $Box implements $Infobox$ {
    $Infobox(block: $Block) {
        super.$Box(this.addType(block, $TypeOfInfobox).concat($check(infoboxStyle, '!')));
    }
}

export class $TypeOfInfobox extends $TypeOfBox {
    protected override specification: Specification<$Writing> = new InfoboxSpecification();
}

export class InfoboxSpecification extends BoxSpecification {
}

export interface $Line$ extends $Paragraph$ {
    label: string;
}

export class $Line extends $Paragraph implements $Line$ {
    $label = '';

    get label(): string { return this.$label; }

    $Line(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfLine));
    }

    override view(): ReactNode {
        return reflection.formatted(this, <p className={this.className} data-label={this.label}>{this.print()}</p>);
    }
}

export class $TypeOfLine extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new LineSpecification();
}

export class LineSpecification extends ParagraphSpecification {
}

export const Infobox = $($Infobox);
export const TypeOfInfobox = $($TypeOfInfobox);
export const Line = $($Line);
export const TypeOfLine = $($TypeOfLine);
