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
    edge = '#c8ccd1';
    mark = '#404244';
    field = '#72777d';
    tint = '#ddeeff';
    black = '#000000';
    faint = '#aaaaaa';
    override measure = '57em';
    override body = 'sans-serif';
    override face = "'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif";
    override size = '16px';
    override leading = '1.625';
    override between = '1em';
    override get maxWidth() { return '99.75em'; }
    override padding = '0 2.75em';
    display = 'grid';
    boxSizing = 'border-box';
    // THE FRAME IN THREE TRACKS, read off en.wikipedia.org at 1280, 1536, 1920 and 2560: the
    // contents at 12.25em, the text capped at 59.25em, the rail at 12.25em, 1.5em apart and packed
    // to the left inside a container capped at 1596px, padded 2.75em; from 1600 the side tracks are
    // 15.5em and the padding 3.25em. At 1280 that is the contents at x32, the text at x264 and 752
    // wide, the rail at x1040; at 1920 the text is 948 wide and the rail stands at x1458.
    gridTemplateColumns = '12.25em minmax(0, 59.25em) minmax(12.25em, 1fr)';
    gridAutoRows = 'min-content';
    columnGap = '1.5em';
    @select('@media (min-width: 1601px)') broad_padding = '0 3.25em';
    broad_gridTemplateColumns = '15.5em minmax(0, 59.25em) minmax(15.5em, 1fr)';
    @select('@media (min-width: 1601px) {\n             .pd-appearance {') broadRail_width = '15.5rem';
    @select('@media (min-width: 1601px) {\n             .pd-header {') wideBar_padding = '0 3.25em';
    wideBar_marginLeft = '-3.25em';
    wideBar_marginRight = '-3.25em';
    @select('@media (min-width: 1601px) {\n             .pd-header .pd-search {') wideField_marginLeft = '5.375rem';
    @select('> .pd-book') book_display = 'contents';
    @select('.pd-book > .pd-chapter, .pd-body > .pd-chapter') chapter_display = 'contents';
    // A COVER HOLDS THE TITLE BLOCK AND IS NOT A BOX. Its parts are placed by the frame one row
    // each — the bar, the title, the tabs — so the cover itself draws nothing.
    @select('.pd-book > .pd-chapter > .pd-cover') top_display = 'contents';
    // THE BAR, MEASURED at 1280: 1280x66 across the whole frame, the menu opening at x44, the
    // wordmark standing 84..224, the field 266..740 and who-you-are ending at 1236.
    @select('.pd-header') override get strip_background() { return this.paper; }
    strip_gridColumn = '1 / -1';
    strip_width = 'auto';
    strip_marginLeft = '-2.75em';
    strip_marginRight = '-2.75em';
    strip_gridRow = '1';
    strip_height = '4.125em';
    strip_padding = '0 2.75em';
    strip_gap = '0.5em';
    strip_fontSize = '1rem';
    strip_marginBottom = '1.5em';
    override get strip_borderBottom() { return 'none'; }
    @select('.pd-cover > .pd-title') title_gridColumn = '2';
    title_gridRow = '2';
    title_boxSizing = 'border-box';
    title_paddingRight = '9.5em';
    title_position = 'relative';
    @select('.pd-cover > .pd-title::after') underline_content = "''";
    underline_position = 'absolute';
    underline_left = '0';
    underline_right = '0';
    underline_bottom = '0';
    underline_height = '1px';
    get underline_background() { return this.rule; }
    // THE TITLE IS ITS REFERENCE'S ANCHOR; inline, its line box stood the block 7px taller than Wikipedia's 40.
    @select('.pd-cover > .pd-title') named_display = 'block';
    @select('.pd-cover > .pd-menu') tongue_gridColumn = '2';
    tongue_gridRow = '2';
    tongue_justifySelf = 'end';
    tongue_alignSelf = 'center';
    tongue_marginRight = '-0.8em';
    tongue_padding = '0';
    tongue_borderRadius = '2px';
    tongue_border = 'none';
    @select('.pd-toolbar') tabs_gridColumn = '2';
    tabs_gridRow = '3';
    tabs_marginTop = '0';
    get tabs_boxShadow() { return `0 1px 0 ${this.edge}`; }
    tabs_paddingBottom = '1px';
    @select('.pd-toolbar > .pd-paragraph') tabGroup_margin = '0';
    @select('.pd-toolbar > .pd-paragraph > .pd-ref') tab_height = '2.2857em';
    tab_position = 'relative';
    @select('.pd-book > .pd-chapter > .pd-table-of-contents') side_gridColumn = '1';
    side_gridRow = '3 / span 400';
    side_alignSelf = 'start';
    side_position = 'sticky';
    side_top = '1.5em';
    side_maxHeight = 'calc(100vh - 3em)';
    side_overflowY = 'auto';
    side_fontSize = '0.875em';
    side_marginTop = '0.5em';
    side_padding = '0 1.143em';
    side_marginLeft = '-0.857em';
    @select('.pd-body, .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > .pd-index') text_gridColumn = '2';
    text_minWidth = '0';

    @select('.pd-appearance') rail_gridColumn = '3';
    rail_gridRow = '3 / span 400';
    rail_alignSelf = 'start';
    rail_position = 'sticky';
    rail_top = '1.5em';
    rail_marginTop = '0.5em';
    rail_justifySelf = 'start';
    rail_width = '12.25rem';
    @select('.pd-appearance h3') paneName_width = 'fit-content';
    @select('.pd-appearance h4') railName_margin = '6px 0';
    railName_padding = '6px 0';
    get railName_color() { return this.pale; }
    get railName_borderBottom() { return `1px solid ${this.shade}`; }

    // THE THREE MENUS ABOVE THE FOLD, each pressed by a different mark: the bar's opens with three
    // rules, the languages with the script that means language, the page's tools with three dots.
    // The word each one is named by stays in the markup and is read out; only its drawing changes.
    @select('.pd-menu::details-content') panel_padding = '0.6em 0.8em';
    panel_borderRadius = '2px';
    get panel_background() { return this.paper; }
    get panel_border() { return `1px solid ${this.rule}`; }
    get panel_boxShadow() { return '0 2px 6px rgba(0, 0, 0, 0.12)'; }
    // A NAME INSIDE A MENU IS A LABEL, not a heading in an article: small, upright and in the
    // body's face, because it names a group of links rather than opening a piece of writing.
    @select('.pd-header .pd-menu > .pd-heading:not(.pd-summary), .pd-toolbar .pd-menu > .pd-heading:not(.pd-summary), .pd-cover > .pd-menu > .pd-heading:not(.pd-summary)') group_margin = '0.7em 0 0.2em';
    group_padding = '0';
    group_border = 'none';
    group_fontSize = '0.875em';
    group_fontWeight = '700';
    get group_fontFamily() { return this.body; }
    get group_color() { return this.pale; }
    @select('.pd-menu > .pd-summary + .pd-heading') topmost_marginTop = '0';
    @select('.pd-header .pd-menu > .pd-paragraph .pd-ref, .pd-toolbar .pd-menu > .pd-paragraph .pd-ref, .pd-cover > .pd-menu > .pd-paragraph .pd-ref') held_display = 'block';
    held_overflowWrap = 'anywhere';
    held_padding = '0.4286em 0';
    held_fontSize = '0.875em';
    held_lineHeight = '1.143';
    @select('.pd-section.pd-menu > .pd-paragraph') option_margin = '0';
    @select('.pd-toolbar .pd-menu > .pd-paragraph .pd-ref') toolRow_fontSize = '1em';
    @select('.pd-header > .pd-menu > .pd-summary') burger_width = '2rem';
    burger_height = '2rem';
    burger_justifyContent = 'center';
    @select('.pd-header > .pd-menu > .pd-summary > .pd-sentence') burgerSaid_display = 'none';
    @select('.pd-header > .pd-menu') mainMenu_margin = '0 0.375rem 0 -0.375rem';
    @select('.pd-header > .pd-menu > .pd-summary::before') mark_content = "''";
    mark_width = '1.25rem';
    mark_height = '1.25rem';
    mark_backgroundRepeat = 'no-repeat';
    mark_backgroundSize = '100%';
    get mark_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='{ink}' d='M1 3h18v2H1zm0 6h18v2H1zm0 6h18v2H1z'/></svg>", this.mark); }
    @select('.pd-cover > .pd-menu > .pd-summary') picker_fontSize = '0.875em';
    picker_fontWeight = '700';
    picker_border = '1px solid transparent';
    picker_margin = '0';
    picker_padding = '0 0.786em';
    get picker_color() { return this.link; }
    get picker_fontFamily() { return this.body; }
    picker_minHeight = '2.2857em';
    picker_boxSizing = 'border-box';
    picker_gap = '0.4286em';
    @select('.pd-cover > .pd-menu > .pd-summary::before') script_content = "''";
    script_width = '1.4286em';
    script_height = '1.4286em';
    script_flex = '0 0 auto';
    script_backgroundRepeat = 'no-repeat';
    script_backgroundSize = '100%';
    get script_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='{ink}' d='m17.835 19-1.248-3h-4.174l-1.248 3.001H9l4.577-11.005h1.846L20 19zm-4.59-5h2.51L14.5 10.982zM7.618 3H12v2H9.991a8.5 8.5 0 0 1-1.423 4.02q-.24.358-.528.707.634.367 1.379.711l.908.42-.839 1.816-.907-.42a18 18 0 0 1-2.026-1.09c-1.255.979-2.912 1.8-5.076 2.31l-.973.228-.458-1.946.973-.23c1.631-.383 2.885-.954 3.85-1.608C3.29 8.527 2.317 6.884 2.065 5H0V3h5.382l-.724-1.447 1.79-.895L7.617 3ZM4.094 5c.243 1.282.974 2.489 2.29 3.586A6.54 6.54 0 0 0 7.98 5z'/></svg>", this.link); }
    @select('.pd-cover > .pd-menu > .pd-summary::after') chevron_content = "''";
    chevron_width = '0.857em';
    chevron_height = '0.857em';
    chevron_flex = '0 0 auto';
    chevron_backgroundRepeat = 'no-repeat';
    chevron_backgroundSize = '100%';
    get chevron_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path fill='{ink}' d='m11.05 3.996-.965-1.053-4.035 3.86-3.947-3.86L1.05 3.996l5 5z'/></svg>", this.link); }
    @select('.pd-cover > .pd-menu::details-content') tongues_right = '0';
    tongues_left = 'auto';
    tongues_width = 'min(30em, calc(100vw - 3em))';
    tongues_columns = '3';
    @select('.pd-toolbar > .pd-paragraph > .pd-ref:first-child') get here_color() { return this.ink; }
    @select('.pd-toolbar > .pd-paragraph > .pd-ref:first-child::after') bar_content = "''";
    bar_position = 'absolute';
    bar_left = '0';
    bar_bottom = '0';
    bar_width = '100%';
    bar_height = '2px';
    get bar_background() { return this.ink; }
    @select('.pd-toolbar > .pd-menu') tools_marginRight = '-0.5714em';
    @select('.pd-toolbar > .pd-menu > .pd-summary') dots_width = '2.2857em';
    dots_height = '2.2857em';
    dots_boxSizing = 'border-box';
    dots_justifyContent = 'center';
    dots_fontWeight = '400';
    get dots_color() { return this.mark; }
    dots_border = '1px solid transparent';
    dots_margin = '0';
    get dots_fontFamily() { return this.body; }
    @select('.pd-toolbar > .pd-menu > .pd-summary > .pd-sentence') dotsSaid_display = 'none';
    @select('.pd-toolbar > .pd-menu > .pd-summary::before') dotted_content = "''";
    dotted_width = '1.4286em';
    dotted_height = '1.4286em';
    dotted_backgroundRepeat = 'no-repeat';
    dotted_backgroundSize = '100%';
    get dotted_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='{ink}' d='M8 0h4v4H8zm0 8h4v4H8zm0 8h4v4H8z'/></svg>", this.mark); }

    // THE LINE UNDER THE TABS, which says where the words came from, is set small and tight.
    @select('.pd-book > .pd-chapter > .pd-synopsis') siteline_fontSize = '0.875em';
    siteline_margin = '0';
    get siteline_color() { return this.ink; }
    @select('.pd-book > .pd-chapter > .pd-synopsis .pd-paragraph:not(.pd-image)') sited_margin = '0.5714em 0 0';
    sited_flex = '1 1 auto';
    // THE SITE LINE'S ROW: the line at the left, the page's indicators at its right, the subpage line beneath.
    @select('.pd-book > .pd-chapter > .pd-document.pd-synopsis') siteRow_display = 'flex';
    siteRow_flexWrap = 'wrap';
    siteRow_columnGap = '0.5em';
    siteRow_alignItems = 'start';
    siteRow_marginBottom = '1.0714em';
    @select('.pd-book > .pd-chapter > .pd-synopsis .pd-image') indicator_display = 'block';
    indicator_height = '1.375em';
    indicator_width = 'auto';
    indicator_margin = '0.5714em 0 0';
    @select('.pd-book > .pd-chapter > .pd-synopsis .pd-paragraph:not(.pd-image):nth-of-type(2)') subpage_flex = '0 0 100%';
    subpage_marginTop = '0';
    get subpage_color() { return this.pale; }

    // A GROUP'S SELECTOR BELONGS TO WHOEVER DECLARED IT: narrowing the paragraph group to spare
    // the infobox's rows changed nothing, because the base names that selector and a subclass
    // only says the values. The rows take a group of their own — measured, twelve of them at
    // half a line apart and a whole one beneath, 212 pixels the real box does not spend.
    @select('.pd-infobox .pd-line') row_marginTop = '0';
    row_marginBottom = '0';
    row_padding = '1px';
    row_border = 'none';
    get row_color() { return this.black; }

    // THE CONTENTS OPENS IN PLACE. Its rows that hold rows are the same Menu the bar and the
    // tools are — one disclosure for the whole encyclopedia — and the only thing the contents
    // says differently is that what opens stands under the row instead of floating over it.
    @select('.pd-table-of-contents .pd-menu::details-content') opens_position = 'static';
    opens_padding = '0 0 0 1.714em';
    opens_margin = '0';
    opens_minWidth = '0';
    opens_maxHeight = 'none';
    opens_border = 'none';
    opens_borderRadius = '0';
    opens_background = 'transparent';
    opens_boxShadow = 'none';
    @select('.pd-table-of-contents .pd-summary') opener_display = 'flex';
    opener_alignItems = 'center';
    opener_gap = '0.0714em';
    opener_paddingLeft = '0.857em';
    opener_whiteSpace = 'normal';
    get opener_fontFamily() { return this.body; }
    @select('.pd-table-of-contents .pd-summary .pd-ref') rowWord_padding = '0.43em 0';
    rowWord_lineHeight = '1.143';
    rowWord_fontWeight = '400';
    rowWord_flex = '1 1 auto';
    rowWord_minWidth = '0';
    rowWord_whiteSpace = 'normal';
    @select('.pd-table-of-contents > .pd-section > .pd-paragraph:first-of-type .pd-ref') first_fontWeight = '700';
    get first_color() { return this.ink; }
    @select('.pd-table-of-contents .pd-summary::before') arrow_content = "''";
    arrow_width = '1.571em';
    arrow_height = '1.571em';
    arrow_flex = '0 0 auto';
    arrow_marginLeft = '-1.643em';
    arrow_backgroundRepeat = 'no-repeat';
    arrow_backgroundPosition = 'center';
    arrow_backgroundSize = '0.857em';
    arrow_transform = 'rotate(-90deg)';
    get arrow_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path fill='{ink}' d='m11.05 3.996-.965-1.053-4.035 3.86-3.947-3.86L1.05 3.996l5 5z'/></svg>", this.pale); }
    @select('.pd-table-of-contents .pd-menu[open] > .pd-summary::before') turned_transform = 'none';
    @select('.pd-table-of-contents > .pd-section > .pd-paragraph:not(.pd-heading)') flat_paddingLeft = '0.857em';
    @select('.pd-table-of-contents .pd-paragraph:not(.pd-heading) .pd-ref') rowLink_padding = '0.43em 0';
    rowLink_lineHeight = '1.143';

    // THE WORDMARK IS NOT A PARAGRAPH OF PROSE. An image is a paragraph by kind, so the space set
    // between paragraphs stood above and below it — measured, 24 pixels inside a 38 pixel bar.
    @select('.pd-header .pd-image') wordmark_margin = '0';
    @select('.pd-header > .pd-section:not(.pd-menu) > .pd-image + .pd-image') taglineMark_margin = '5px 0 0';

    // A SUMMARY IN AN ENCYCLOPEDIA IS A WORD YOU PRESS, not an abstract set in italic — the base
    // names that kind for what a summary usually is, and here every menu wears it.
    // THE MANUAL'S BANDS: every group's title on the blue Wikipedia tints a sidebar's with.
    @select('.pd-manual .pd-summary') get band_background() { return this.tint; }
    @select('.pd-manual > .pd-section > .pd-paragraph:nth-last-child(2)') get manualFoot_borderTop() { return `1px solid ${this.faint}`; }
    get manualFoot_borderBottom() { return `1px solid ${this.faint}`; }
    @select('.pd-summary') override summed_margin = '0';
    override summed_fontStyle = 'normal';
    override get summed_color() { return this.ink; }
    // A HATNOTE STANDS IN FROM THE MARGIN AND LEANS, which is how a reader tells it from the
    // article's own first words.
    @select('.pd-note.pd-hatnote') hat_fontStyle = 'italic';
    hat_fontSize = '1em';
    hat_margin = '0 0 0.5em';
    hat_paddingLeft = '1.6em';
    get hat_color() { return this.ink; }
    @select('.pd-note.pd-hatnote + .pd-hatnote') hats_marginTop = '-0.5em';

    @select('.pd-search .pd-field') field_fontSize = '0.875em';
    field_lineHeight = '1.5714';
    field_padding = '0.2857em 0.5714em 0.2857em 2.4286em';
    get field_border() { return `1px solid ${this.field}`; }
    field_borderRadius = '2px 0 0 2px';
    get field_backgroundImage() { return this.painted("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='{ink}' d='M12.2 13.6a7 7 0 1 1 1.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1 0 10 0A5 5 0 0 0 3 8'/></svg>", this.pale); }
    field_backgroundRepeat = 'no-repeat';
    field_backgroundPosition = '0.5714em center';
    field_backgroundSize = '1.2857em';
    get field_color() { return this.ink; }
    get field_backgroundColor() { return this.paper; }
    @select('.pd-search .pd-button') press_fontSize = '0.875em';
    press_fontWeight = '700';
    press_padding = '0 0.786em';
    get press_border() { return `1px solid ${this.field}`; }
    press_borderRadius = '0 2px 2px 0';
    press_marginLeft = '-1px';
    get press_color() { return this.mark; }
    get press_background() { return this.quiet; }
    // THE INFOBOX, in Wikipedia's own numbers, said here because a theme's rule outranks a worn
    // format's at what reads as equal specificity — the third feature request in the sprint.
    @select('.pd-infobox.pd-aside') box_margin = '0.5em 0 0.5em 1em';
    box_padding = '0.2em';
    get box_color() { return this.black; }
    get box_border() { return `1px solid ${this.rule}`; }
    @select('.pd-book .pd-document .pd-infobox.pd-aside > .pd-heading.pd-level-1') boxName_fontSize = '1.25em';
    boxName_fontWeight = '700';
    boxName_lineHeight = '1.2';
    get boxName_color() { return this.black; }
    boxName_background = 'transparent';
    boxName_border = 'none';
    boxName_margin = '0';
    boxName_padding = '1px';
    get boxName_fontFamily() { return this.body; }
    @select('.pd-infobox .pd-caption') boxCaption_lineHeight = '1.5';
    get boxCaption_color() { return this.black; }
    boxCaption_background = 'transparent';
    boxCaption_border = 'none';
    boxCaption_margin = '0';
    boxCaption_padding = '0';
    @select('.pd-book .pd-appearance') pane_padding = '0 1.143em';

    @select('.pd-book > .pd-chapter > .pd-footer') foot_gridColumn = '1 / -1';
    foot_margin = '0';
    foot_fontSize = '1em';
    foot_padding = '0.75em 0';
    get foot_color() { return this.ink; }
    @select('.pd-book > .pd-chapter > .pd-footer > .pd-heading') footName_display = 'none';
    @select('.pd-book > .pd-chapter > .pd-footer .pd-paragraph:not(.pd-heading)') footLine_fontSize = '0.75em';
    footLine_lineHeight = '1.4';
    footLine_padding = '0.5em 0';
    footLine_margin = '0';
    @select('.pd-book > .pd-chapter > .pd-footer .pd-ref') footLink_display = 'inline-block';
    footLink_marginRight = '1em';
    footLink_lineHeight = '2';
    // NARROW IS ONE COLUMN. The five tracks collapse to the text's, and the gaps with them —
    // left standing they added 96 pixels of nothing and the page scrolled sideways at 360.
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1.5em 0 minmax(0, 1fr) 0 1.5em';
    narrow_columnGap = '0';
    narrow_padding = '0';
    @select('@media (max-width: 1119px) {\n             .pd-table-of-contents, .pd-appearance {') narrowSide_display = 'none';
    @select('@media (max-width: 1119px) {\n             .pd-cover > .pd-title, .pd-cover > .pd-menu, .pd-toolbar, .pd-book > .pd-chapter > .pd-synopsis, .pd-body, .pd-book > .pd-chapter > .pd-index {') narrowText_gridColumn = '1';
    @select('@media (max-width: 1119px) {\n             .pd-cover > .pd-menu::details-content {') narrowTongues_columns = '1';
    narrowTongues_width = 'calc(100vw - 3em)';
    // THE BAR WRAPS RATHER THAN SPILLS. At 360 the menu, the wordmark and who-you-are come to 409
    // pixels and the page scrolled sideways; the row is allowed a second line instead.
    @select('@media (max-width: 1119px) {\n             .pd-header {') narrowBar_padding = '0.5em 1.5em';
    narrowBar_marginLeft = '0';
    narrowBar_marginRight = '0';
    narrowBar_flexWrap = 'wrap';
    narrowBar_rowGap = '0.4em';
    narrowBar_height = 'auto';
    narrowBar_minHeight = '4.125em';
    @select('@media (max-width: 1119px) {\n             .pd-infobox {') narrowBox_float = 'none';
    narrowBox_width = '100%';
    narrowBox_margin = '0 0 1em';

    @select('.pd-cover .pd-title .pd-heading') name_fontSize = '1.8em';
    name_fontWeight = '400';
    name_borderBottom = 'none';
    name_lineHeight = '1.375';
    name_margin = '0';
    get name_fontFamily() { return this.face; }
    get name_color() { return this.jet; }
    @select('.pd-cover .pd-title.pd-meaning, .pd-cover .pd-author.pd-meaning, .pd-cover .pd-subject.pd-meaning') coverLink_color = 'inherit';
    coverLink_cursor = 'text';
    @select('.pd-cover .pd-title.pd-meaning:hover, .pd-cover .pd-author.pd-meaning:hover, .pd-cover .pd-subject.pd-meaning:hover') coverHover_textDecoration = 'none';
    // AN ENCYCLOPEDIA KNOWS ITS AUTHOR AND SUBJECT AND PRINTS NEITHER. A cover carries both by
    // specification, and rightly — the article has them; a Wikipedia page simply never shows them
    // above the title, so the theme is where they stop rather than the book.
    @select('.pd-cover > .pd-author, .pd-cover > .pd-subject') byline_display = 'none';
    @select('.pd-synopsis > .pd-heading') description_display = 'none';
    @select('.pd-title .pd-reference') meaning_display = 'none';

    // A CITATION IS A SUPERSCRIPT, and it writes its own brackets — the writer controls them — so
    // the sheet only sets it small and high.
    @select('.pd-citation') marker_fontSize = '.8em';
    marker_verticalAlign = 'super';
    marker_lineHeight = '1';
    marker_whiteSpace = 'nowrap';

    @select('.pd-table-of-contents > .pd-section > .pd-heading') contentsHeading_fontSize = '1em';
    contentsHeading_fontWeight = 'bold';
    contentsHeading_lineHeight = '1.6';
    contentsHeading_border = 'none';
    contentsHeading_margin = '0 0 0.43em 0.857em';
    contentsHeading_paddingBottom = '0.43em';
    contentsHeading_width = 'fit-content';
    get contentsHeading_color() { return this.jet; }
    get contentsHeading_fontFamily() { return this.body; }
    @select('.pd-table-of-contents .pd-section .pd-paragraph') entry_fontSize = '1em';
    entry_margin = '0';
    entry_lineHeight = '2';
    // THE CONTENTS INDENTS BY NESTING, not by a pd-indent class — a list inside an item.
    @select('.pd-table-of-contents .pd-list .pd-list') sub_paddingLeft = '0.9em';
    @select('.pd-table-of-contents .pd-meaning, .pd-table-of-contents .pd-ref, .pd-table-of-contents .pd-reference') entryLink_display = 'block';
    entryLink_textDecoration = 'none';
    @select('.pd-table-of-contents .pd-meaning:hover, .pd-table-of-contents .pd-ref:hover, .pd-table-of-contents .pd-reference:hover') get entryHover_color() { return this.pressed; }

    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter)') override document_marginBottom = '2em';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter):not(.pd-synopsis) > *:first-child:not(.pd-aside)') opening_marginTop = '0';
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
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter) .pd-section .pd-section .pd-level-2') sub2_fontSize = '1.2em';
    sub2_fontWeight = '700';
    sub2_lineHeight = '1.6';
    sub2_padding = '0.5em 0 0';
    sub2_borderBottom = 'none';
    sub2_margin = '0 0 0.3em';
    get sub2_color() { return this.jet; }
    get sub2_fontFamily() { return this.body; }
    // THE SPACE BETWEEN PARAGRAPHS IS A VALUE NOW, not a rule of its own — the base carries it as
    // `between` and its own group reads it.
    @select('.pd-document.pd-manual > .pd-section > .pd-heading.pd-level-1') manualName_fontSize = '1.45em';
    manualName_fontWeight = '700';
    manualName_lineHeight = '1.2';
    manualName_padding = '0.2em 0.8em';
    manualName_margin = '0';
    manualName_borderBottom = 'none';
    get manualName_color() { return this.ink; }
    get manualName_fontFamily() { return this.body; }
    @select('.pd-book .pd-body .pd-chapter .pd-document.pd-manual') manualBox_marginBottom = '1em';
    @select('.pd-paragraph:not(.pd-heading)') override p_marginTop = '0.5em';
    @select('.pd-paragraph:not(.pd-heading) .pd-paragraph:not(.pd-heading)') nested_marginLeft = '1.6em';
    @select('.pd-list') override list_marginTop = '0.3em';
    override list_paddingLeft = '1.6em';
    @select('.pd-item') item_marginBottom = '0.1em';
    @select('.pd-paragraph:not(.pd-heading) + .pd-list') afterProse_marginTop = '-0.5em';
    @select('.pd-body .pd-illustration:not(.pd-infobox .pd-illustration)') override figure_margin = '0.5em 0 1.3em 1.4em';
    figure_lineHeight = '0';
    figure_float = 'right';
    figure_clear = 'right';
    figure_display = 'table';
    figure_boxSizing = 'border-box';
    figure_maxWidth = '100%';
    figure_padding = '0';
    get figure_border() { return `1px solid ${this.edge}`; }
    get figure_borderBottom() { return 'none'; }
    get figure_background() { return this.quiet; }
    @select('.pd-illustration .pd-image') image_display = 'inline';
    image_verticalAlign = 'middle';
    image_margin = '3px';
    get image_border() { return `1px solid ${this.edge}`; }
    get image_background() { return this.paper; }
    @select('.pd-caption') caption_display = 'table-caption';
    caption_captionSide = 'bottom';
    caption_marginTop = '0';
    get caption_borderBottom() { return `1px solid ${this.edge}`; }
    caption_fontSize = '0.884em';
    caption_lineHeight = '1.4';
    caption_padding = '0 0.43em 0.43em';
    get caption_fontFamily() { return this.body; }
    get caption_background() { return this.quiet; }
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
