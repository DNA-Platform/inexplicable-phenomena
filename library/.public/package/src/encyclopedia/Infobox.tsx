import { ReactNode } from 'react';
import { $, $Block, $check, select } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';
import { $Box$, $Box, $TypeOfBox, BoxSpecification, $BoxFormat } from './Box';

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

export class $InfoboxFormat extends $BoxFormat {
    float = 'right';
    clear = 'right';
    width = 'min(22em, 100%)';
    override margin = '0 0 1em 1.4em';

    @select('> .pd-line') line_display = 'grid';
    line_gridTemplateColumns = 'minmax(0, 6.5em) minmax(0, 1fr)';
    line_gap = '0 0.6em';
    line_margin = '0';
    line_padding = '0.35em 0.5em';
    line_alignItems = 'baseline';
    get line_borderTop() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-line::before') label_content = 'attr(data-label)';
    label_fontWeight = '700';

    @select('@media (max-width: 640px) {\n            & {') narrow_float = 'none';
    narrow_margin = '0 0 1em';
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
export const InfoboxFormat = $($InfoboxFormat);
export const Line = $($Line);
export const TypeOfLine = $($TypeOfLine);
const infoboxStyle = InfoboxFormat;
