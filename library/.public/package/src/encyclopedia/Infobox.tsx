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

    // A LINE IS A ROW OF TWO CELLS, and it is written as one. A grid made a cell of every run
    // between a row's links — "mathematics" and "(PhD)" stood in the label column — and taking the
    // label out of the flow instead left it unable to grow its row, so "Doctoral advisor" lay over
    // the row beneath it. A table sets the label in one cell and gathers everything written into
    // the other, which is what an infobox row has always been.
    @select('> .pd-line') line_display = 'table';
    line_width = '100%';
    line_margin = '0';
    line_padding = '0.2em 0.6em';
    line_boxSizing = 'border-box';
    get line_borderTop() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-line::before') label_content = 'attr(data-label)';
    label_display = 'table-cell';
    label_width = '5.4em';
    label_paddingRight = '0.6em';
    label_verticalAlign = 'top';
    label_fontWeight = '700';

    @select('> .pd-heading + .pd-paragraph') said_textAlign = 'center';
    said_margin = '0';
    said_padding = '0 0.5em 0.4em';
    said_fontWeight = '700';
    get said_color() { return this.theme.link; }

    @select('.pd-illustration') shown_float = 'none';
    shown_width = 'auto';
    shown_margin = '0';
    shown_padding = '0.5em';
    shown_textAlign = 'center';
    @select('.pd-illustration img') picture_display = 'block';
    picture_margin = '0 auto';
    picture_maxWidth = '100%';
    picture_height = 'auto';
    @select('.pd-illustration .pd-caption') caption_padding = '0.4em 0 0';
    caption_fontSize = '1em';
    caption_textAlign = 'center';

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
