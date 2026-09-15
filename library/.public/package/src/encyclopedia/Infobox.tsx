import { ReactNode } from 'react';
import { $, $Block, $check, select } from '@dna-platform/chemistry';
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
    line_boxSizing = 'border-box';

    // THE PREFIX IS RESTATED ON THE MEMBER THE BASE DECORATED. Restated on any other, the group
    // splits — measured, the cell's every property arrived but its display, which stayed under the
    // box's own heading selector and reached nothing.
    @select('> .pd-line::before') label_display = 'table-cell';
    label_content = 'attr(data-label)';
    label_width = '5.4em';
    label_paddingRight = '0.6em';
    label_verticalAlign = 'top';
    label_fontWeight = '700';

    // THE LINE UNDER AN INFOBOX'S NAME IS PROSE, NOT A LINK. It was painted in the link colour so it
    // would match Turing's, where "OBE FRS" is blue — but there it is blue because every word of it
    // IS a link, and here it is a subtitle somebody wrote. Doug, 2026-09-15: "sometimes the text is
    // still all blue and acts like a link… I wanted that as the default colour for links not for
    // everything." Measured on all five pages of his library: one blue non-link each, and this was
    // it. A link inside this line still draws in the link colour, because that rule belongs to links.
    @select('> .pd-heading + .pd-paragraph') said_textAlign = 'center';
    said_margin = '0';
    said_padding = '0 0.5em 0.4em';
    said_fontWeight = '700';
    get said_color() { return this.theme.ink; }

    @select('&.pd-infobox .pd-illustration') shown_display = 'block';
    shown_float = 'none';
    shown_width = 'auto';
    shown_margin = '0';
    shown_padding = '1px';
    shown_border = 'none';
    shown_background = 'transparent';
    shown_textAlign = 'center';
    @select('&.pd-infobox .pd-illustration img') picture_display = 'inline-block';
    picture_verticalAlign = 'middle';
    picture_margin = '0';
    picture_border = 'none';
    picture_background = 'transparent';
    picture_maxWidth = '100%';
    @select('&.pd-infobox .pd-illustration .pd-caption') caption_display = 'block';
    caption_fontSize = '1em';
    caption_textAlign = 'center';
    caption_padding = '0';
    caption_border = 'none';
    caption_background = 'transparent';

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
        return <p className={this.className} data-label={this.label}>{this.print()}</p>;
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
