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

    // A field's resting edge is the link colour lightened against the paper, so a theme that
    // changes what a link looks like changes every border drawn from one.
    get edge(): string { return `color-mix(in srgb, ${this.link} 76%, ${this.paper})`; }

    chevron(colour: string): string { return this.painted("%3Csvg width='12' height='8' viewBox='-1 -1 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='{ink}' stroke-width='1.11' d='M.56.55 5 4.9 9.44.54'/%3E%3C/svg%3E", colour); }
    magnifier(colour: string): string { return this.painted("%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' d='M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z'/%3E%3C/svg%3E", colour); }
    translation(colour: string): string { return this.painted("%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' fill-rule='evenodd' d='M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z'/%3E%3C/svg%3E", colour); }
    caret(colour: string): string { return this.painted("%3Csvg width='14' height='14' viewBox='-1 -1 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' d='M10.085 2.943 6.05 6.803l-3.947-3.86L1.05 3.996l5 5 5-5z'/%3E%3C/svg%3E", colour); }

    // An icon drawn into a data URI cannot inherit, so the colour is painted into it.
    // OPEN, and it is the next level's question: a format reads `theme` as the BASE $Theme,
    // so nothing outside this class can reach these yet — a format cannot see its own book's theme.
    protected painted(svg: string, colour: string): string {
        return `url("data:image/svg+xml,${svg.replaceAll('{ink}', encodeURIComponent(colour))}")`;
    }

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
