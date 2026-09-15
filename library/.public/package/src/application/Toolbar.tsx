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
    // A MENTION IN THE TAB ROW IS A TAB. A written ref lays itself out as a flex item the full height
    // of the row; a MENTION arrives as a span with an inline anchor inside it, so it sat sixteen
    // pixels tall against thirty-two and floated above the baseline of the tabs beside it — measured
    // 2026-09-15 with `Book` at 138 against `Subject` at 139. A toolbar that can only seat the links
    // somebody typed cannot carry a relation the library already knows, which is the one thing a
    // library's tabs are for. Nothing about a mention changes here; only how the row seats it.
    @select('.pd-ref, .pd-catalogue, > .pd-menu > .pd-summary') tab_display = 'flex';
    tab_alignItems = 'center';
    tab_padding = '0';
    tab_margin = '0';
    tab_textDecoration = 'none';
    tab_whiteSpace = 'nowrap';
    @select('.pd-catalogue > .pd-meaning') said_display = 'block';
    said_lineHeight = '1';
    @select('> .pd-menu') tools_flex = '0 0 auto';
    @select('> .pd-menu::details-content') held_left = 'auto';
    held_right = '0';
}

export const Toolbar = $($Toolbar);
export const ToolbarFormat = $($ToolbarFormat);
const toolbarStyle = ToolbarFormat;
