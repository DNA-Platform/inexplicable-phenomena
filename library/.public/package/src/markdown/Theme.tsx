// CREATED 2026-09-09 · rating 3. MARKDOWN DEPENDS ON ARTICLE AND IS PURE STYLE.
//
// Doug: "Markdown can integrate with article. It's allowed to register formats for article and
// encyclopedia components. We can assume that the more fundamental the writing type, the more the
// component libraries would cross-style. Maybe markdown is an alternative style for latex, and we
// make it like that. Depends on article, but is pure style. That's a nice way to imagine the
// dependency." So this extends the ARTICLE theme rather than the base, and every structural
// decision — the cover's hierarchy, a contents entry as a row, the abstract as a quotation, a
// figure's number — arrives already made. What is left is what a rendered document LOOKS like.
//
// AND THE DEPENDENCY COSTS SOMETHING, worth knowing before it is copied: a subclass theme must
// OUT-SPECIFY its parent, and an override of a group member has to RE-APPLY the parent's @select
// or it lands in no group at all. Written without them this file changed nothing — measured: h2
// stayed 14.4pt and centred, the body stayed Latin Modern, and all 64 section numbers still drew.
// Every group below therefore names the selector it is answering.
//
// THE VALUES ARE @tailwindcss/typography's, read out of its own styles.js: 1rem on 1.75, 65ch,
// oklch colours with a real hue rather than neutral greys, ul/ol at 1.625em, li at 0.5em, a
// blockquote inset 1em. Its most considered decision is that LINKS ARE THE HEADING COLOUR —
// distinguished by weight and underline rather than by turning blue.
import { $, select } from '@dna-platform/chemistry';
import { $Theme as $Sheet } from '@/article/Theme';
import { Theme as Base } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    override face = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Helvetica, Arial, sans-serif";
    override body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Helvetica, Arial, sans-serif";
    override size = '16px';
    override leading = '1.75';
    override measure = '65ch';
    override ink = 'oklch(37.3% 0.034 259.733)';
    override link = 'oklch(21% 0.034 264.665)';
    override rule = 'oklch(92.8% 0.006 264.531)';
    override pale = 'oklch(55.1% 0.027 264.364)';
    override shade = 'oklch(87.2% 0.01 258.338)';
    override paper = '#ffffff';
    override desk = 'oklch(98.4% 0.003 247.858)';

    override indent = '0';
    override between = '1.25em';
    override titled = 'left';
    override ruling = '0';

    // NO LEADERS AND NO MARKER — a rendered document has no pages, and drawing a place for one it
    // does not have is ceremony a README never has.
    override leader = 'none';
    override place = 'none';

    // THE SHEET IS A CARD ON A DESK rather than a US Letter page.
    @select('.pd-book') override sheet_width = 'auto';
    override sheet_maxWidth = 'min(72ch, 100%)';
    override sheet_marginTop = '4rem';
    override sheet_marginBottom = '2.5rem';
    override sheet_padding = '3rem';
    override sheet_boxShadow = 'none';
    sheet_borderRadius = '.75rem';
    get sheet_border() { return `1px solid ${this.rule}`; }

    @select('.pd-header') override get strip_background() { return this.paper; }
    override get strip_color() { return this.ink; }
    override strip_height = '48px';
    override get strip_fontFamily() { return this.body; }
    override get strip_borderBottom() { return `1px solid ${this.rule}`; }

    // A COVER, LEFT AND UNCENTRED, at markdown's own scale.
    @select('.pd-title .pd-heading') override title_fontSize = '1.5em';
    override title_fontWeight = '700';
    override title_marginBottom = '.25rem';
    @select('.pd-author .pd-heading') override author_fontSize = '1em';
    @select('.pd-cover') override cover_marginTop = '0';
    override cover_marginBottom = '2rem';

    // HEADINGS A LITTLE CLOSER TO LaTeX, EVEN LEFT-ALIGNED, which is what Doug asked for. The SCALE
    // keeps a paper's proportions — much flatter than a README's 1.5 / 1.25 / 1.1 — and only the
    // face, the alignment and the air change. LaTeX at 11pt runs 14.4 / 12 / 11, which is
    // 1.31 / 1.09 / 1 against the body; these sit just above it.
    @select('h2.pd-heading') override head_fontSize = '1.25em';
    override head_fontWeight = '700';
    override head_marginTop = '2em';
    override head_marginBottom = '.75em';
    @select('h3.pd-heading') override deep_fontSize = '1em';
    override deep_marginTop = '1.6em';
    override deep_marginBottom = '.5em';
    @select('h4.pd-heading') override deepest_fontSize = '.875em';
    override deepest_marginTop = '1.4em';
    override deepest_marginBottom = '.4em';
    @select('h1') override h1_fontSize = '1.5em';

    // NUMBERS ARE THE ONE STRUCTURAL THING A RENDERED DOCUMENT DROPS — a README does not say
    // "1.2.1" — and dropping them is four empty strings rather than undoing the counters.
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > section > .pd-heading::before') override numbered_content = "''";
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > section > section > .pd-heading::before') override deepNumbered_content = "''";
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > section > section > section > .pd-heading::before') override deepestNumbered_content = "''";
    @select('.pd-table-of-contents .pd-item > a::before') override listedNumber_content = "''";
    override listedNumber_minWidth = '0';

    // PROSE IS RAGGED RIGHT. Justification without TeX's paragraph optimiser is worse than not
    // justifying, and a rendered document has never pretended otherwise.
    @select('.pd-paragraph:not(.pd-heading), .pd-item') override justified_textAlign = 'left';
    override justified_hyphens = 'manual';

    // THE ABSTRACT IS NOT A QUOTATION HERE; it is the opening of the document.
    @select('.pd-abstract') override abstract_margin = '0 0 2rem';
    override abstract_fontSize = '1em';
    override abstract_lineHeight = '1.75';
    @select('.pd-abstract .pd-heading') override abstracted_fontSize = '1.25em';
    override abstracted_textAlign = 'left';
    override abstracted_marginBottom = '.75em';

    @select('.pd-paragraph:not(.pd-heading)') prose_marginTop = '1.25em';
    @select('.pd-list') list_marginTop = '1.25em';
    list_marginBottom = '1.25em';
    list_paddingInlineStart = '1.625em';
    @select('.pd-item') item_marginTop = '.5em';
    item_marginBottom = '.5em';
    @select('.pd-quote') quote_marginTop = '1.6em';
    quote_marginBottom = '1.6em';
    quote_paddingInlineStart = '1em';
    quote_fontStyle = 'italic';
    get quote_borderLeft() { return `.25rem solid ${this.shade}`; }
    @select('code') override code_fontSize = '.875em';
    @select('pre') override pre_fontSize = '.875em';
    override pre_lineHeight = '1.7142857';
    override pre_borderRadius = '.375rem';
    @select('figcaption') caption_fontSize = '.875em';
    get caption_color() { return this.pale; }

}

export const Theme = $($Theme);
