// IN PROGRESS · rating 3. The encyclopedia's theme: Wikipedia's values and its whole look as groups over the base sheet — installed by registration, replacing the base Theme in a scope. The contents column is placed by grid LINES, not areas, because documents drawn flat in one area stack (Sprint 52); the row span is the one smell, and it names what the base lacks — a reading of a block drawn without making a block.
import { $, select } from '@dna-platform/chemistry';
import { $Theme } from '@/writing/Theme';

export class $EncyclopediaTheme extends $Theme {
    override paper = '#ffffff';
    override ink = '#202122';
    override quiet = '#f8f9fa';
    override shade = '#eaecf0';
    override rule = '#a2a9b1';
    override pale = '#54595d';
    override jet = '#101418';
    override pressed = '#3056a9';
    override link = '#3366cc';
    override measure = '57em';
    override body = 'sans-serif';
    override face = "'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif";
    override size = '16px';
    override leading = '1.625';
    override between = '1em';
    override get maxWidth() { return '99.75em'; }
    override padding = '0 3em';
    display = 'grid';
    boxSizing = 'border-box';
    gridTemplateColumns = 'minmax(0, 11em) minmax(0, 1fr) minmax(0, 11em)';
    gridAutoRows = 'min-content';
    columnGap = '2.5em';
    @select('> .pd-book') book_display = 'contents';
    @select('.pd-book > .pd-chapter') chapter_display = 'contents';
    @select('.pd-book > .pd-chapter > .pd-cover') top_gridColumn = '1 / -1';
    @select('.pd-book > .pd-chapter > .pd-table-of-contents') side_gridColumn = '1';
    side_gridRow = '2 / span 400';
    side_alignSelf = 'start';
    side_position = 'sticky';
    side_top = '1.5em';
    side_maxHeight = 'calc(100vh - 3em)';
    side_overflowY = 'auto';
    side_fontSize = '0.875em';
    @select('.pd-book > .pd-chapter > .pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter), .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > .pd-index') text_gridColumn = '2';
    text_minWidth = '0';
    get text_maxWidth() { return this.measure; }
    @select('.pd-book > .pd-chapter > .pd-footer') foot_gridColumn = '1 / -1';
    foot_fontSize = '0.92em';
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1fr';
    narrow_padding = '1.5em';
    @select('@media (max-width: 1119px) {\n             .pd-book > .pd-chapter > nav {') narrowSide_display = 'none';
    @select('@media (max-width: 1119px) {\n             .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > article, .pd-book > .pd-chapter > .pd-index, .pd-book > .pd-chapter > footer {') narrowText_gridColumn = '1';

    @select('.pd-book > .pd-chapter > .pd-cover') cover_marginBottom = '1em';
    @select('.pd-cover .pd-title .pd-heading') title_fontSize = '1.8em';
    title_borderBottom = 'none';
    title_lineHeight = '1.375';
    title_margin = '0';
    @select('.pd-cover .pd-title .pd-meaning, .pd-cover .pd-author .pd-meaning, .pd-cover .pd-subject .pd-meaning') coverLink_color = 'inherit';
    coverLink_cursor = 'text';
    @select('.pd-cover .pd-title .pd-meaning:hover, .pd-cover .pd-author .pd-meaning:hover, .pd-cover .pd-subject .pd-meaning:hover') coverHover_textDecoration = 'none';
    @select('.pd-cover .pd-author, .pd-cover .pd-subject') byline_display = 'block';
    byline_marginTop = '0.5em';
    @select('.pd-cover .pd-author .pd-heading, .pd-cover .pd-subject .pd-heading') bylineHeading_fontSize = '0.875em';
    bylineHeading_border = 'none';
    bylineHeading_margin = '0';
    get bylineHeading_fontFamily() { return this.body; }
    @select('.pd-cover .pd-subject .pd-heading') get subject_color() { return this.pale; }
    @select('.pd-cover .pd-author .pd-heading') get author_color() { return this.ink; }
    @select('.pd-synopsis .pd-heading') description_display = 'none';
    @select('.pd-title .pd-reference') meaning_display = 'none';

    // A CITATION IS A SUPERSCRIPT IN BRACKETS, which is the one thing every reader recognises an
    // encyclopedia by. The mark writes its number and the sheet writes the brackets, so the number
    // stays the only thing the demo says.
    @select('.pd-citation') marker_fontSize = '.8em';
    marker_verticalAlign = 'super';
    marker_lineHeight = '1';
    marker_whiteSpace = 'nowrap';
    @select('.pd-citation::before') opened_content = "'['";
    @select('.pd-citation::after') closed_content = "']'";

    @select('.pd-table-of-contents .pd-heading') contentsHeading_fontSize = '1em';
    contentsHeading_fontWeight = 'bold';
    contentsHeading_border = 'none';
    contentsHeading_margin = '0 0 0.9em';
    get contentsHeading_color() { return this.jet; }
    get contentsHeading_fontFamily() { return this.body; }
    @select('.pd-table-of-contents .pd-paragraph') entry_fontSize = '1em';
    entry_margin = '0';
    entry_lineHeight = '2';
    // THE CONTENTS INDENTS BY NESTING, not by a pd-indent class — a list inside an item.
    @select('.pd-table-of-contents .pd-list .pd-list') sub_paddingLeft = '0.9em';
    @select('.pd-table-of-contents .pd-meaning, .pd-table-of-contents .pd-ref, .pd-table-of-contents .pd-reference') entryLink_display = 'block';
    entryLink_textDecoration = 'none';
    @select('.pd-table-of-contents .pd-meaning:hover, .pd-table-of-contents .pd-ref:hover, .pd-table-of-contents .pd-reference:hover') get entryHover_color() { return this.pressed; }

    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter)') override document_marginBottom = '2em';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter) > *:first-child') opening_marginTop = '0';
    // AND A CONTENTS ROW WEARS ITS DOCUMENT'S CLASSES, which is how the appendices tell
    // themselves apart in the contents - so a row answers .pd-document too, and every rule here
    // that means a document had to say it is not a row. Measured: ten rows took a document's
    // 2em margin.
    // A LEVEL IS THE ONE THING A CLASS LIST DOES NOT CARRY. Every other selector in this theme
    // names a kind; these two name h2 because a heading's DEPTH is not in `pd-heading`, and
    // `.pd-heading` alone restyles every sub-heading beneath it - measured, 22 of them.
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter) .pd-level-1') override h2_fontSize = '1.5em';
    h2_fontWeight = 'normal';
    h2_padding = '0.5em 0 0.17em';
    h2_margin = '0.25em 0';
    h2_lineHeight = '1.375';
    override get h2_borderBottom() { return `1px solid ${this.rule}`; }
    get h2_color() { return this.jet; }
    get h2_fontFamily() { return this.face; }
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter) .pd-section .pd-section .pd-level-1') sub2_fontSize = '1.2em';
    sub2_fontWeight = '700';
    sub2_lineHeight = '1.6';
    sub2_padding = '0.5em 0 0';
    sub2_borderBottom = 'none';
    get sub2_fontFamily() { return this.body; }
    // THE SPACE BETWEEN PARAGRAPHS IS A VALUE NOW, not a rule of its own — the base carries it as
    // `between` and its own group reads it.
    @select('.pd-paragraph:not(.pd-heading)') override p_marginTop = '0.5em';
    @select('.pd-paragraph:not(.pd-heading) .pd-paragraph:not(.pd-heading)') nested_marginLeft = '1.6em';
    @select('.pd-list') override list_marginTop = '0.3em';
    override list_paddingLeft = '1.6em';
    @select('.pd-item') item_marginBottom = '0.1em';
    @select('.pd-paragraph:not(.pd-heading) + .pd-list') afterProse_marginTop = '-0.5em';
    @select('.pd-illustration') override figure_margin = '0.5em 0 1.3em 1.4em';
    figure_float = 'right';
    figure_clear = 'right';
    figure_boxSizing = 'border-box';
    figure_width = '13.125em';
    figure_maxWidth = '100%';
    figure_padding = '3px';
    get figure_border() { return `1px solid ${this.shade}`; }
    @select('.pd-illustration .pd-image') image_display = 'block';
    image_width = '100%';
    image_height = 'auto';
    @select('.pd-caption') caption_fontSize = '0.875em';
    caption_lineHeight = '1.4';
    caption_padding = '0.4em 0.6em';
    get caption_fontFamily() { return this.body; }
    get caption_background() { return this.quiet; }
    get caption_borderTop() { return `1px solid ${this.shade}`; }
    @select('@media (max-width: 480px) {\n             figure {') narrowFigure_float = 'none';
    narrowFigure_width = '100%';
    narrowFigure_margin = '0.5em 0 1.3em';
    @select('.pd-index') override index_columnCount = '3';
    index_columnGap = '2em';
    index_padding = '0.5em 1em';
    get index_columnRuleColor() { return this.rule; }
    get index_background() { return this.quiet; }
    get index_border() { return `1px solid ${this.rule}`; }
    @select('.pd-cited') cited_fontSize = '90%';
    @select('.pd-meaning:hover, .pd-ref:hover, .pd-reference:hover') override hover_textDecoration = 'underline';
    @select('.pd-meaning:hover, .pd-ref:hover, .pd-reference:hover, .pd-meaning:focus, .pd-ref:focus, .pd-reference:focus') get pressed_color() { return this.pressed; }
}

export const EncyclopediaTheme = $($EncyclopediaTheme);
