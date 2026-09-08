// IN PROGRESS · rating 3. The encyclopedia's theme: Wikipedia's values and its whole look as groups over the base sheet — installed by registration, replacing the base Theme in a scope. The contents column is placed by grid LINES, not areas, because chapters drawn flat in one area stack (Sprint 52); the row span is the one smell, and it names what the base lacks — a reading of a block drawn without making a block.
import { $, select } from '@dna-platform/chemistry';
import { $Theme as $Sheet } from '@/formatting/Theme';

export class $Theme extends $Sheet {
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

    // THE INFOBOX, SAID BY THE SHEET AND NOT BY A WRAPPER. Every one of these is a rule about a
    // class, so nothing needs to stand around the writing to carry it — which is the whole reason
    // the demo's $Sidebar/$SidebarFormat pair could be deleted. A format is for what a sheet CANNOT
    // say, and float, width and a labelled row are all sayable.
    @select('.pd-infobox') box_float = 'right';
    box_clear = 'right';
    box_boxSizing = 'border-box';
    box_width = '22em';
    box_maxWidth = '100%';
    box_margin = '0 0 1em 1.4em';
    box_padding = '0.4em';
    box_fontSize = '0.88em';
    box_lineHeight = '1.4';
    get box_background() { return this.quiet; }
    get box_border() { return `1px solid ${this.shade}`; }

    @select('.pd-infobox > h2.pd-heading') boxName_display = 'block';
    boxName_fontSize = '1.3em';
    boxName_fontWeight = '700';
    boxName_textAlign = 'center';
    boxName_border = 'none';
    boxName_margin = '0';
    boxName_padding = '0.4em 0.5em';
    get boxName_fontFamily() { return this.body; }

    @select('.pd-line') row_display = 'grid';
    row_gridTemplateColumns = 'minmax(0, 6.5em) minmax(0, 1fr)';
    row_gap = '0 0.6em';
    row_padding = '0.35em 0.5em';
    row_margin = '0';
    row_alignItems = 'baseline';
    get row_borderTop() { return `1px solid ${this.shade}`; }

    @select('.pd-line::before') label_content = 'attr(data-label)';
    label_fontWeight = '700';

    override get maxWidth() { return '99.75em'; }
    override padding = '0 3em';
    display = 'grid';
    boxSizing = 'border-box';
    gridTemplateColumns = 'minmax(0, 11em) minmax(0, 1fr) minmax(0, 11em)';
    gridAutoRows = 'min-content';
    columnGap = '2.5em';
    @select('> .pd-book') book_display = 'contents';
    @select('.pd-book > header') top_gridColumn = '1 / -1';
    @select('.pd-book > nav') side_gridColumn = '1';
    side_gridRow = '2 / span 400';
    side_alignSelf = 'start';
    side_position = 'sticky';
    side_top = '1.5em';
    side_maxHeight = 'calc(100vh - 3em)';
    side_overflowY = 'auto';
    side_fontSize = '0.875em';
    @select('.pd-book > .pd-synopsis, .pd-book > article, .pd-book > .pd-index') text_gridColumn = '2';
    text_minWidth = '0';
    get text_maxWidth() { return this.measure; }
    @select('.pd-book > footer') foot_gridColumn = '1 / -1';
    foot_fontSize = '0.92em';
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1fr';
    narrow_padding = '1.5em';
    @select('@media (max-width: 1119px) {\n             .pd-book > nav {') narrowSide_display = 'none';
    @select('@media (max-width: 1119px) {\n             .pd-book > article, .pd-book > .pd-index, .pd-book > footer {') narrowText_gridColumn = '1';

    @select('.pd-book > header') cover_marginBottom = '1em';
    @select('header .pd-title h2') title_fontSize = '1.8em';
    title_borderBottom = 'none';
    title_lineHeight = '1.375';
    title_margin = '0';
    @select('header a.pd-title, header a.pd-author, header a.pd-subject') coverLink_color = 'inherit';
    coverLink_cursor = 'text';
    @select('header a.pd-title:hover, header a.pd-author:hover, header a.pd-subject:hover') coverHover_textDecoration = 'none';
    @select('header .pd-author, header .pd-subject') byline_display = 'block';
    byline_marginTop = '0.5em';
    @select('header .pd-author h2, header .pd-subject h2') bylineHeading_fontSize = '0.875em';
    bylineHeading_border = 'none';
    bylineHeading_margin = '0';
    get bylineHeading_fontFamily() { return this.body; }
    @select('header .pd-subject h2') get subject_color() { return this.pale; }
    @select('header .pd-author h2') get author_color() { return this.ink; }
    @select('.pd-synopsis h2') description_display = 'none';
    @select('.pd-title .pd-reference') meaning_display = 'none';

    @select('nav h2') contentsHeading_fontSize = '1em';
    contentsHeading_fontWeight = 'bold';
    contentsHeading_border = 'none';
    contentsHeading_margin = '0 0 0.9em';
    get contentsHeading_color() { return this.jet; }
    get contentsHeading_fontFamily() { return this.body; }
    @select('nav p') entry_fontSize = '1em';
    entry_margin = '0';
    entry_lineHeight = '2';
    @select('nav .pd-indent-1') sub_display = 'block';
    sub_paddingLeft = '0.9em';
    @select('nav .pd-indent-2') deep_display = 'block';
    deep_paddingLeft = '1.8em';
    @select('nav a') entryLink_display = 'block';
    entryLink_textDecoration = 'none';
    @select('nav a:hover') get entryHover_color() { return this.pressed; }

    @select('article') override chapter_marginBottom = '2em';
    @select('article > *:first-child') opening_marginTop = '0';
    @select('article h2') override h2_fontSize = '1.5em';
    h2_fontWeight = 'normal';
    h2_padding = '0.5em 0 0.17em';
    h2_margin = '0.25em 0';
    h2_lineHeight = '1.375';
    override get h2_borderBottom() { return `1px solid ${this.rule}`; }
    get h2_color() { return this.jet; }
    get h2_fontFamily() { return this.face; }
    @select('article .pd-indent-1 h2') sub2_fontSize = '1.2em';
    sub2_fontWeight = '700';
    sub2_lineHeight = '1.6';
    sub2_padding = '0.5em 0 0';
    sub2_borderBottom = 'none';
    get sub2_fontFamily() { return this.body; }
    @select('p') override p_marginTop = '0.5em';
    override p_marginBottom = '1em';
    @select('p p') nested_marginLeft = '1.6em';
    @select('ul, ol') override list_marginTop = '0.3em';
    override list_paddingLeft = '1.6em';
    @select('li') item_marginBottom = '0.1em';
    @select('p + .pd-list > ul') afterProse_marginTop = '-0.5em';
    @select('figure') override figure_margin = '0.5em 0 1.3em 1.4em';
    figure_float = 'right';
    figure_clear = 'right';
    figure_boxSizing = 'border-box';
    figure_width = '13.125em';
    figure_maxWidth = '100%';
    figure_padding = '3px';
    get figure_border() { return `1px solid ${this.shade}`; }
    @select('figure img') image_display = 'block';
    image_width = '100%';
    image_height = 'auto';
    @select('figcaption') caption_fontSize = '0.875em';
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
    @select('a:hover') override hover_textDecoration = 'underline';
    @select('a:hover, a:focus') get pressed_color() { return this.pressed; }
}

export const Theme = $($Theme);
