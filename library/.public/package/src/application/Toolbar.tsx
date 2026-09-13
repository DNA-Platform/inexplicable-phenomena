import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';
import { $Section } from '@/writing/Section';

// THE TABS ACROSS THE TOP OF A PAGE: what it is on the left, what you may do with it on the right.
// Written, like the bar above it — each group a paragraph of links, and the last of them the menu
// holding the page's tools.
export class $Toolbar extends $Section {
    $Toolbar(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check(toolbarStyle, '!')));
    }
}

// MEASURED at 1280: the row is 752 wide and 33 tall, the first tab's word begins at the text's own
// left edge and the last group's ends at its right, so each group is pulled out by its tab padding.
export class $ToolbarFormat extends $Format {
    override selector: any = styled.nav;
    display = 'flex';
    flexWrap = 'wrap';
    alignItems = 'stretch';
    gap = '0';
    fontSize = '0.875em';
    lineHeight = '1.4';

    @select('> .pd-heading') name_display = 'none';
    @select('> .pd-paragraph:not(.pd-heading)') group_display = 'flex';
    group_alignItems = 'stretch';
    group_gap = '1.143em';
    group_margin = '0';
    @select('> .pd-paragraph:not(.pd-heading):last-of-type') closing_marginLeft = 'auto';
    @select('.pd-ref, > .pd-menu > .pd-summary') tab_display = 'flex';
    tab_alignItems = 'center';
    tab_padding = '0';
    tab_margin = '0';
    tab_textDecoration = 'none';
    tab_whiteSpace = 'nowrap';
    @select('> .pd-menu') tools_flex = '0 0 auto';
    @select('> .pd-menu::details-content') held_left = 'auto';
    held_right = '0';
}

export const Toolbar = $($Toolbar);
export const ToolbarFormat = $($ToolbarFormat);
const toolbarStyle = ToolbarFormat;
