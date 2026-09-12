import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';
import { $Section } from '@/writing/Section';

// THE BAR AN ENCYCLOPEDIA STANDS UNDER, and the first thing a reader of one sees: the menu, the
// wordmark and its line, the field, and who you are. It is a $Section wearing a format, because it
// is written — the demo says what is in it and the format says where each part stands.
export class $Header extends $Section {
    $Header(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check(headerStyle, '!')));
    }
}

// STRUCTURE ONLY. How tall the bar stands, what pads it and what paints it are the theme's, which
// already names `.pd-header` as its strip — so what is here is the one thing a bar IS: a row whose
// parts sit in an order, with who-you-are pushed to the far end of it.
export class $HeaderFormat extends $Format {
    override selector: any = styled.section;
    boxSizing = 'border-box';
    width = '100%';
    display = 'flex';
    alignItems = 'center';

    @select('> .pd-section:not(.pd-menu)') mark_display = 'flex';
    mark_flexDirection = 'column';
    mark_justifyContent = 'center';
    mark_flex = '0 0 auto';
    mark_margin = '0';
    mark_width = '8.75rem';
    mark_lineHeight = '0';
    @select('> .pd-section:not(.pd-menu) > div') box_display = 'block';
    box_lineHeight = '0';
    @select('> .pd-heading') name_display = 'none';
    @select('.pd-image') wordmark_display = 'block';
    wordmark_width = '8.75em';
    wordmark_height = 'auto';
    @select('> .pd-section:not(.pd-menu) > .pd-heading') tagline_display = 'none';
    @select('.pd-search') field_flex = '0 0 29.625rem';
    field_minWidth = '29.625rem';
    field_marginLeft = '2.125rem';
    @select('> .pd-paragraph:not(.pd-search):not(.pd-heading)') links_flex = '0 0 auto';
    links_display = 'flex';
    links_gap = '0.5714em';
    links_paddingRight = '0.2857em';
    links_margin = '0';
    links_marginLeft = 'auto';
    links_fontSize = '0.875em';

    @select('@media (max-width: 1000px) {\n            & {') narrow_padding = '0 1em';
    narrow_gap = '0.75em';
    @select('@media (max-width: 1000px) {\n            & .pd-search {') narrowField_display = 'none';
}

export const Header = $($Header);
export const HeaderFormat = $($HeaderFormat);
const headerStyle = HeaderFormat;
