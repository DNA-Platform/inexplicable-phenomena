import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Heading$, $Heading, $TypeOfHeading, HeadingSpecification } from '@/writing/Heading';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Menu$ extends $Section$ { }

// A MENU IS A SECTION THAT OPENS. Its summary names it and the rest of it is what opening shows,
// which is <details> and <summary> exactly: the open state belongs to the element, the browser
// draws what opens in one box of its own, and nothing here keeps or wraps anything.
export class $Menu extends $Section implements $Menu$ {
    override definition = 'details';

    $Menu(block: $Block) {
        super.$Section(this.addType(block, $TypeOfMenu).concat($check(menuStyle, '!')));
    }
}

export class $TypeOfMenu extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new MenuSpecification();
}

export class MenuSpecification extends SectionSpecification {
}

export interface $Summary$ extends $Heading$ { }

// THE HEADING OF A MENU, which is the word you press. It is a heading — a section opens with one,
// and this is that one — and the only thing it says differently is its element.
export class $Summary extends $Heading implements $Summary$ {
    $Summary(block: $Block) {
        super.$Heading(this.addType(block, $TypeOfSummary));
    }

    override view(): ReactNode {
        return reflection.formatted(this, <summary className={this.className}>{this.print()}</summary>);
    }
}

export class $TypeOfSummary extends $TypeOfHeading {
    protected override specification: Specification<$Writing> = new SummarySpecification();
}

export class SummarySpecification extends HeadingSpecification {
}

export interface $Option$ extends $Paragraph$ { }

// A ROW OF A MENU, which is one thing you may choose there. It is a paragraph — a menu holds
// paragraphs — written as one by whoever writes the menu: the page's tools, the contents'
// sections, the manual's links. Registered instead, so that for a menu a paragraph is an option,
// it took the menu's summary too — measured: every menu lost its word.
export class $Option extends $Paragraph implements $Option$ {
    $Option(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfOption));
    }
}

export class $TypeOfOption extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new OptionSpecification();
}

export class OptionSpecification extends ParagraphSpecification {
}

// ONLY THE STRUCTURE IS HERE: the marker a browser draws beside a summary is taken off, and what
// opens is taken out of the flow. Where it opens and what paints it are a theme's to say.
export class $MenuFormat extends $Format {
    override selector: any = styled.details;
    position = 'relative';

    @select('> .pd-summary') said_display = 'inline-flex';
    said_alignItems = 'center';
    said_gap = '0.35em';
    said_whiteSpace = 'nowrap';
    said_cursor = 'pointer';
    said_listStyle = 'none';
    said_userSelect = 'none';
    said_margin = '0';
    said_padding = '0';
    said_border = 'none';
    said_fontSize = 'inherit';
    said_fontWeight = 'inherit';
    said_fontFamily = 'inherit';
    @select('> .pd-summary::-webkit-details-marker') marker_display = 'none';
    // A SHUT MENU SHOWS NOTHING OF ITS PANEL. The browser hides a shut panel's contents and not
    // the panel's own box, so a border or a ground painted on it would stand empty on the page.
    @select('&:not([open])::details-content') shut_display = 'none';
    @select('&::details-content') panel_position = 'absolute';
    panel_top = 'calc(100% + 0.4em)';
    panel_left = '0';
    panel_zIndex = '30';
    panel_boxSizing = 'border-box';
    panel_minWidth = '15em';
    panel_maxWidth = 'calc(100vw - 2em)';
    panel_maxHeight = '75vh';
    panel_overflowY = 'auto';
}

export const Menu = $($Menu);
export const TypeOfMenu = $($TypeOfMenu);
export const Summary = $($Summary);
export const TypeOfSummary = $($TypeOfSummary);
export const Option = $($Option);
export const TypeOfOption = $($TypeOfOption);
export const MenuFormat = $($MenuFormat);
const menuStyle = MenuFormat;
