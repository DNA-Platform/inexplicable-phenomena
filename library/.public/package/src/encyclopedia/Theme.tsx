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
    override padding = '0';
    display = 'grid';
    boxSizing = 'border-box';
    // THE FRAME IN FIVE TRACKS, measured off en.wikipedia.org at 1280: a gutter, the contents at
    // 208, the text, the rail at 196, a gutter — which puts the contents at x32, the text at x264
    // and 752 wide, and the rail at x1040. The gutters are tracks rather than padding so that the
    // bar can span the whole of it without taking any margin back.
    gridTemplateColumns = 'minmax(0, 0.5em) minmax(0, 13em) minmax(0, 1fr) minmax(0, 12.25em) minmax(0, 1.25em)';
    gridAutoRows = 'min-content';
    columnGap = '1.5em';
    @select('> .pd-book') book_display = 'contents';
    @select('.pd-book > .pd-chapter') chapter_display = 'contents';
    // A COVER HOLDS THE TITLE BLOCK AND IS NOT A BOX. Its parts are placed by the frame one row
    // each — the bar, the title, the tabs — so the cover itself draws nothing.
    @select('.pd-book > .pd-chapter > .pd-cover') top_display = 'contents';
    // THE BAR, MEASURED at 1280: 1280x66 across the whole frame, the menu opening at x44, the
    // wordmark standing 84..224, the field 266..740 and who-you-are ending at 1236.
    @select('.pd-header') override get strip_background() { return this.paper; }
    strip_gridColumn = '1 / -1';
    strip_gridRow = '1';
    strip_height = '4.125em';
    strip_padding = '0 2.75em';
    strip_gap = '0.5em';
    strip_fontSize = '1rem';
    get strip_borderBottom() { return `1px solid ${this.shade}`; }
    @select('.pd-cover > .pd-title') title_gridColumn = '3';
    title_gridRow = '2';
    title_marginTop = '1.5em';
    title_maxWidth = 'calc(100% - 9.5em)';
    @select('.pd-cover > .pd-menu') tongue_gridColumn = '3';
    tongue_gridRow = '2';
    tongue_justifySelf = 'end';
    tongue_alignSelf = 'center';
    tongue_marginTop = '1.5em';
    tongue_marginRight = '-0.8em';
    @select('.pd-toolbar') tabs_gridColumn = '3';
    tabs_gridRow = '3';
    tabs_marginTop = '0';
    get tabs_borderBottom() { return `1px solid ${this.shade}`; }
    @select('.pd-book > .pd-chapter > .pd-table-of-contents') side_gridColumn = '2';
    side_gridRow = '3 / span 400';
    side_alignSelf = 'start';
    side_position = 'sticky';
    side_top = '1.5em';
    side_maxHeight = 'calc(100vh - 3em)';
    side_overflowY = 'auto';
    side_fontSize = '0.875em';
    @select('.pd-book > .pd-chapter > .pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter):not(.pd-footer), .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > .pd-index') text_gridColumn = '3';
    text_minWidth = '0';

    @select('.pd-appearance') rail_gridColumn = '4';
    rail_gridRow = '3 / span 400';
    rail_alignSelf = 'start';
    rail_position = 'sticky';
    rail_top = '1.5em';
    @select('.pd-appearance h4') railName_margin = '0 0 0.5rem';
    railName_paddingBottom = '0.35rem';
    get railName_color() { return this.pale; }
    get railName_borderBottom() { return `1px solid ${this.shade}`; }

    // THE THREE MENUS ABOVE THE FOLD, each pressed by a different mark: the bar's opens with three
    // rules, the languages with the script that means language, the page's tools with three dots.
    // The word each one is named by stays in the markup and is read out; only its drawing changes.
    @select('.pd-menu > .pd-panel') panel_padding = '0.6em 0.8em';
    panel_borderRadius = '2px';
    get panel_background() { return this.paper; }
    get panel_border() { return `1px solid ${this.rule}`; }
    get panel_boxShadow() { return '0 2px 6px rgba(0, 0, 0, 0.12)'; }
    // A NAME INSIDE A MENU IS A LABEL, not a heading in an article: small, upright and in the
    // body's face, because it names a group of links rather than opening a piece of writing.
    @select('.pd-menu > .pd-panel .pd-heading') group_margin = '0.7em 0 0.2em';
    group_padding = '0';
    group_border = 'none';
    group_fontSize = '0.875em';
    group_fontWeight = '700';
    get group_fontFamily() { return this.body; }
    get group_color() { return this.pale; }
    @select('.pd-menu > .pd-panel > .pd-heading:first-child') topmost_marginTop = '0';
    @select('.pd-menu .pd-ref') held_display = 'block';
    held_overflowWrap = 'anywhere';
    held_padding = '0.3em 0';
    @select('.pd-header > .pd-menu > .pd-summary') burger_width = '2rem';
    burger_height = '2rem';
    burger_justifyContent = 'center';
    burger_fontSize = '0';
    @select('.pd-header > .pd-menu > .pd-summary::before') mark_content = "'☰'";
    mark_fontSize = '1.25rem';
    mark_lineHeight = '1';
    @select('.pd-cover > .pd-menu > .pd-summary') picker_padding = '0.35em 0.75em';
    picker_borderRadius = '2px';
    picker_fontSize = '0.875em';
    get picker_color() { return this.link; }
    get picker_border() { return `1px solid ${this.rule}`; }
    @select('.pd-cover > .pd-menu > .pd-summary::before') script_content = "'文A  '";
    @select('.pd-cover > .pd-menu > .pd-summary::after') chevron_content = "'  ▾'";
    @select('.pd-cover > .pd-menu > .pd-panel') tongues_right = '0';
    tongues_left = 'auto';
    tongues_width = 'min(30em, calc(100vw - 3em))';
    tongues_columns = '3';
    @select('.pd-toolbar > .pd-menu > .pd-summary') dots_width = '2em';
    dots_justifyContent = 'center';
    dots_fontSize = '0';
    @select('.pd-toolbar > .pd-menu > .pd-summary::before') dotted_content = "'⋮'";
    dotted_fontSize = '1rem';

    // THE LINE UNDER THE TABS, which says where the words came from, is set small and tight.
    @select('.pd-book > .pd-chapter > .pd-synopsis') siteline_fontSize = '0.875em';
    siteline_margin = '0.5em 0 1em';
    get siteline_color() { return this.pale; }
    @select('.pd-book > .pd-chapter > .pd-synopsis .pd-paragraph') sited_margin = '0';

    // A GROUP'S SELECTOR BELONGS TO WHOEVER DECLARED IT: narrowing the paragraph group to spare
    // the infobox's rows changed nothing, because the base names that selector and a subclass
    // only says the values. The rows take a group of their own — measured, twelve of them at
    // half a line apart and a whole one beneath, 212 pixels the real box does not spend.
    @select('.pd-infobox .pd-line') row_marginTop = '0';
    row_marginBottom = '0';

    // THE CONTENTS OPENS IN PLACE. Its rows that hold rows are the same Menu the bar and the
    // tools are — one disclosure for the whole encyclopedia — and the only thing the contents
    // says differently is that what opens stands under the row instead of floating over it.
    @select('.pd-table-of-contents .pd-menu > .pd-panel') opens_position = 'static';
    opens_padding = '0 0 0 0.9em';
    opens_margin = '0';
    opens_minWidth = '0';
    opens_maxHeight = 'none';
    opens_border = 'none';
    opens_borderRadius = '0';
    opens_background = 'transparent';
    opens_boxShadow = 'none';
    @select('.pd-table-of-contents .pd-summary') opener_display = 'flex';
    opener_alignItems = 'baseline';
    opener_gap = '0.4em';
    opener_lineHeight = '2';
    @select('.pd-table-of-contents .pd-summary::before') arrow_content = "'›'";
    arrow_width = '0.8em';
    arrow_flex = '0 0 auto';
    get arrow_color() { return this.pale; }
    @select('.pd-table-of-contents .pd-menu[open] > .pd-summary::before') turned_transform = 'rotate(90deg)';
    @select('.pd-table-of-contents > .pd-section > .pd-paragraph:not(.pd-heading)') flat_paddingLeft = '1.2em';

    // THE WORDMARK IS NOT A PARAGRAPH OF PROSE. An image is a paragraph by kind, so the space set
    // between paragraphs stood above and below it — measured, 24 pixels inside a 38 pixel bar.
    @select('.pd-header .pd-image') wordmark_margin = '0';

    // A SUMMARY IN AN ENCYCLOPEDIA IS A WORD YOU PRESS, not an abstract set in italic — the base
    // names that kind for what a summary usually is, and here every menu wears it.
    @select('.pd-summary') override summed_margin = '0';
    override summed_fontStyle = 'normal';
    // A HATNOTE STANDS IN FROM THE MARGIN AND LEANS, which is how a reader tells it from the
    // article's own first words.
    @select('.pd-hatnote') hat_fontStyle = 'italic';
    hat_margin = '0 0 0.5em 1.6em';

    @select('.pd-book .pd-appearance') pane_padding = '0 1em';

    @select('.pd-book > .pd-chapter > .pd-footer') foot_gridColumn = '1 / -1';
    foot_margin = '2rem 2.75rem 0';
    foot_fontSize = '0.92em';
    // NARROW IS ONE COLUMN. The five tracks collapse to the text's, and the gaps with them —
    // left standing they added 96 pixels of nothing and the page scrolled sideways at 360.
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1.5em 0 minmax(0, 1fr) 0 1.5em';
    narrow_columnGap = '0';
    narrow_padding = '0';
    @select('@media (max-width: 1119px) {\n             .pd-table-of-contents, .pd-appearance {') narrowSide_display = 'none';
    @select('@media (max-width: 1119px) {\n             .pd-cover > .pd-title, .pd-cover > .pd-menu, .pd-toolbar, .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > .pd-document:not(.pd-cover), .pd-book > .pd-chapter > .pd-index {') narrowText_gridColumn = '3';
    @select('@media (max-width: 1119px) {\n             .pd-cover > .pd-menu > .pd-panel {') narrowTongues_columns = '1';
    narrowTongues_width = 'calc(100vw - 3em)';
    // THE BAR WRAPS RATHER THAN SPILLS. At 360 the menu, the wordmark and who-you-are come to 409
    // pixels and the page scrolled sideways; the row is allowed a second line instead.
    @select('@media (max-width: 1119px) {\n             .pd-header {') narrowBar_padding = '0.5em 1em';
    narrowBar_flexWrap = 'wrap';
    narrowBar_rowGap = '0.4em';
    narrowBar_height = 'auto';
    narrowBar_minHeight = '4.125em';
    @select('@media (max-width: 1119px) {\n             .pd-infobox {') narrowBox_float = 'none';
    narrowBox_width = '100%';
    narrowBox_margin = '0 0 1em';

    @select('.pd-cover .pd-title .pd-heading') name_fontSize = '1.8em';
    name_borderBottom = 'none';
    name_lineHeight = '1.375';
    name_margin = '0';
    get name_fontFamily() { return this.face; }
    @select('.pd-cover .pd-title .pd-meaning, .pd-cover .pd-author .pd-meaning, .pd-cover .pd-subject .pd-meaning') coverLink_color = 'inherit';
    coverLink_cursor = 'text';
    @select('.pd-cover .pd-title .pd-meaning:hover, .pd-cover .pd-author .pd-meaning:hover, .pd-cover .pd-subject .pd-meaning:hover') coverHover_textDecoration = 'none';
    // AN ENCYCLOPEDIA KNOWS ITS AUTHOR AND SUBJECT AND PRINTS NEITHER. A cover carries both by
    // specification, and rightly — the article has them; a Wikipedia page simply never shows them
    // above the title, so the theme is where they stop rather than the book.
    @select('.pd-cover > .pd-author, .pd-cover > .pd-subject') byline_display = 'none';
    @select('.pd-synopsis > .pd-heading') description_display = 'none';
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
