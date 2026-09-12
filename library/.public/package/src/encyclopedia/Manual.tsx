import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';

export interface $Manual$ extends $Document$ { }

// A MANUAL IS A DOCUMENT OF MENUS: one section whose heading is its title, holding a field to search
// it by, its groups — each a menu opening on the links it holds, with groups of its own inside —
// and the lines at its foot. It is Wikipedia's sidebar, standing right of the lead the way the
// infobox does; a document inside a document is kept whole, which is what lets it stand there.
export class $Manual extends $Document implements $Manual$ {
    override definition = 'aside';

    $Manual(block: $Block) {
        super.$Document(this.addType(block, $TypeOfManual).concat($check(manualStyle, '!')));
    }
}

export class $TypeOfManual extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new ManualSpecification();
}

export class ManualSpecification extends DocumentSpecification {
}

// MEASURED on the Manual of Style at 1280: 310 wide at 14px, floated right with 7px above and 14px
// to its left, its title 20px bold and centred, each group's title a band with its toggle at the
// right, and what a group opens a centred run of links. What a menu opens is taken back into the
// flow here, since a box's menus open in place and not over the page.
export class $ManualFormat extends $Format {
    override selector: any = styled.aside;
    float = 'right';
    clear = 'right';
    width = 'min(22em, 100%)';
    boxSizing = 'border-box';
    margin = '0.5em 0 1em 1em';
    padding = '0.2em';
    fontSize = '0.88em';
    lineHeight = '1.4';
    get background() { return this.theme.paper; }
    get border() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-section') held_margin = '0';
    held_padding = '0';
    @select('> .pd-section > .pd-heading') name_display = 'block';
    name_margin = '0';
    name_padding = '0.2em 0.8em';
    name_textAlign = 'center';
    name_fontSize = '1.45em';
    name_fontWeight = '700';
    name_border = 'none';
    get name_fontFamily() { return this.theme.body; }

    @select('> .pd-section > .pd-search') field_margin = '0.3em 0';
    field_justifyContent = 'center';

    @select('.pd-menu') group_margin = '0.3em 0 0';
    @select('.pd-menu > .pd-summary') opener_display = 'grid';
    opener_gridTemplateColumns = 'minmax(0, 1fr) auto';
    opener_alignItems = 'baseline';
    opener_margin = '0';
    opener_padding = '0 0.4em 0 0.15em';
    opener_fontSize = '1.05em';
    opener_fontWeight = '700';
    get opener_fontFamily() { return this.theme.body; }
    @select('.pd-menu .pd-menu > .pd-summary') under_textAlign = 'center';
    @select('.pd-menu > .pd-summary::after') toggle_content = "'[show]'";
    toggle_fontWeight = '400';
    toggle_fontSize = '0.9em';
    get toggle_color() { return this.theme.link; }
    @select('.pd-menu[open] > .pd-summary::after') shown_content = "'[hide]'";
    @select('.pd-menu::details-content') opens_position = 'static';
    opens_padding = '0 0.5em 0.4em';
    opens_minWidth = '0';
    opens_maxWidth = 'none';
    opens_maxHeight = 'none';
    opens_overflow = 'visible';
    opens_border = 'none';
    opens_boxShadow = 'none';
    opens_background = 'transparent';
    @select('.pd-menu .pd-paragraph') listed_margin = '0';
    listed_textAlign = 'center';
    @select('> .pd-section > .pd-paragraph') foot_margin = '0.3em 0 0';
    foot_textAlign = 'center';
}

export const Manual = $($Manual);
export const TypeOfManual = $($TypeOfManual);
export const ManualFormat = $($ManualFormat);
const manualStyle = ManualFormat;
