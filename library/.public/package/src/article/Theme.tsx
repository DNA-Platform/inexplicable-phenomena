// CREATED 2026-09-08, MEASURED 2026-09-09 · rating 3. The article's theme: a page on a desk, set
// the way LaTeX sets one, installed by registration and carrying no formats.
import { $, select } from '@dna-platform/chemistry';
import { $Theme as $Sheet, Theme as Base } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    // EVERY VALUE HERE WAS MEASURED OFF THE REAL THING, 2026-09-09. Doug: "You might need to open a
    // REAL chrome instance and REALLY open aaronsen as a pdf and REALLY make something look like
    // that... a human couldn't tell it isn't a pdf." So the paper was fetched, opened in the
    // installed Chrome, screenshotted, and the screenshot sampled pixel by pixel:
    //
    //   toolbar #3c3c3c 56px tall    ground #282828    sheet #ffffff, 816px = 8.5in at 96dpi
    //   text column 6.5in, so 1in margins             abstract inset about 40px each side
    //   body line pitch 18px = 13.6pt                 abstract line pitch 16px = 12pt
    //
    // THOSE TWO PITCHES ARE article.cls's OWN NUMBERS at 11pt: a baselineskip of 13.6pt for the
    // body, and an abstract set small, which is 10pt on 12pt. So the sizes below are LaTeX's scale
    // rather than a fit to the pixels — small 10, normalsize 11, large 12, Large 14.4, LARGE 17.28
    // — and they are written in POINTS, because a point is what puts them on the same 96dpi grid
    // Chrome draws the PDF on. This is what the previous values got wrong: 16px on 1.8 leading is a
    // web article's proportions, and no amount of tuning a web article turns it into a page.
    //
    // THE FACE IS COMPUTER MODERN AND IT COSTS NOTHING. KaTeX ships it — its stylesheet is already
    // loaded for the mathematics and it defines KaTeX_Main in regular, bold and italic. Naming it
    // first sets the prose and the formulas in ONE family, which is the thing a reader notices
    // without being able to say why. Latin Modern stays behind it for a machine that has the
    // desktop font installed.
    // LATIN MODERN FIRST, because latex.css brings the real webfont — LM-regular.woff2 and its
    // bold and italic — so the name now resolves to the face instead of falling through to Georgia.
    // KaTeX_Main stays behind it: it is the same design, and it is what the formulas are set in.
    override face = "'Latin Modern', 'KaTeX_Main', Georgia, Cambria, 'Times New Roman', Times, serif";
    override body = "'Latin Modern', 'KaTeX_Main', Georgia, Cambria, 'Times New Roman', Times, serif";
    override size = '11pt';
    override leading = '1.2364';
    override measure = '6.5in';
    override ink = '#000000';
    override paper = '#ffffff';
    override desk = '#282828';
    override link = '#000000';
    override rule = 'hsl(0, 0%, 80%)';

    // THE FOUR LAYOUT VALUES THE BASE CARRIES. parindent for an 11pt article is 17pt, parskip is
    // zero, a title block is centred, and LaTeX rules nothing.
    override indent = '17pt';
    override between = '0';
    override titled = 'center';
    override ruling = '0';

    // THE DESK. The theme element is the surface the sheet stands on rather than the column itself,
    // which is the whole difference between a document and a web page.
    //
    // AND IT ESCAPES latex.css's BODY. That sheet sets `body { max-width: 80ch; margin: 0 auto }`,
    // because it is styling a web article and not a page — so the desk would have been a 80ch strip
    // down the middle of the window. The escape is the ordinary full-bleed one and needs no rule on
    // body, which nothing here is allowed to write: take the viewport's width and pull left by half
    // the difference.
    override padding = '0';
    override margin = '0';
    width = '100vw';
    marginLeft = 'calc(50% - 50vw)';
    // AND ITS PADDING. latex.css also sets `body { padding: 2rem 1.25rem }`, which the desk cannot
    // paint over and nothing here may write a rule for, so it is cancelled — measured, it pushed
    // the sheet 32px further from the strip than Chrome's own 3px.
    marginTop = '-2rem';
    marginBottom = '-2rem';
    override get maxWidth() { return '100vw'; }

    // THE SHEET IS US LETTER. 8.5in is exactly what Chrome draws at 100% zoom and 1in margins are
    // what article.cls sets, leaving the 6.5in measure above. A FIXED WIDTH, not a fixed margin —
    // Doug: "You have fixed margin not fixed width at breakpoints that support full width."
    // The margin narrows at STANDARD breakpoints rather than by a min() trick, on his instruction:
    // "Just be standard on breakpoints... I am looking on desktop and mobile."
    @select('.pd-book') sheet_width = '8.5in';
    sheet_maxWidth = '100%';
    sheet_marginLeft = 'auto';
    sheet_marginRight = 'auto';
    sheet_marginTop = '59px';
    sheet_marginBottom = '2rem';
    sheet_padding = '1in';
    sheet_boxSizing = 'border-box';
    sheet_boxShadow = '0 1px 5px rgba(0, 0, 0, .55)';
    @select('@media (max-width: 768px) {\n            .pd-book {') tablet_padding = '2rem';
    tablet_marginTop = '56px';
    tablet_marginBottom = '0';
    @select('@media (max-width: 640px) {\n            .pd-book {') phone_padding = '1.25rem';

    // THE STRIP is Chrome's own bar, measured rather than chosen.
    // OVERRIDDEN AS GETTERS BECAUSE THE BASE DECLARED THEM AS GETTERS. tsc refuses the other way —
    // "defined as an accessor... overridden here as an instance property" — which is the same
    // brittleness that broke `ruled`. A strip follows the palette by default and this one does not,
    // because it is not the document's colour; it is the viewer's.
    // ONLY SLIGHTLY LIGHTER THAN THE DESK. Chrome's own bar is #3c3c3c on #282828 and it is loud
    // because it carries controls; ours carries a name and a toggle, so Doug: "make its color only
    // slightly lighter than the background in general, as ours doesn't truly do anything at the
    // moment so shouldn't be called out."
    @select('.pd-header') override get strip_background() { return '#2f2f2f'; }
    override get strip_color() { return '#e8eaed'; }
    override strip_height = '56px';
    strip_border = 'none';
    override get strip_fontFamily() { return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"; }

    // A PAPER'S TITLE IS NOT A LINK EVEN WHEN IT IS ONE, and neither is a contents entry: hyperref's
    // red is for a CITATION in running text, where it has to be found. The cover's hierarchy lives
    // in the base now — what is left here is the scale, and article.cls sets a title LARGE ROMAN
    // rather than bold, with the author large.
    @select('.pd-title .pd-heading') title_fontSize = '17.28pt';
    title_fontWeight = '400';
    title_marginBottom = '15px';
    @select('.pd-author .pd-heading') author_fontSize = '12pt';
    @select('.pd-subject .pd-heading') subject_fontSize = '10pt';
    @select('.pd-cover') cover_marginTop = '37px';
    cover_marginBottom = '1.5rem';

    // A section is Large bold with 3.5ex above and 2.3ex below; a subsection is large with 3.25ex
    // and 1.5ex. At 11pt an ex is about 4.3pt, which is where these numbers come from.
    @select('.pd-level-1') head_fontWeight = '700';
    head_fontSize = '14.4pt';
    head_marginTop = '15pt';
    head_marginBottom = '10pt';
    @select('.pd-level-2') deep_fontWeight = '700';
    deep_fontSize = '12pt';
    deep_marginTop = '14pt';
    deep_marginBottom = '6.5pt';
    // A subsubsection is normalsize bold — the level where LaTeX stops growing the type.
    @select('.pd-level-3') deepest_fontWeight = '700';
    deepest_fontSize = '11pt';
    deepest_marginTop = '13pt';
    deepest_marginBottom = '5pt';

    // SECTIONS ARE NUMBERED, and it turned out to need no ruling and no change to src. The blocker
    // recorded here for two sprints was "every part of a book is a .pd-document, so counting documents
    // would number the cover 1" — which is FALSE, and one look at the page says so: the apparatus
    // each writes its own class beside pd-document, so pd-synopsis, pd-references and pd-appendix
    // name themselves and :not() excludes them. Numbering belongs to the THEME because numbering is
    // what article.cls does and what a README does not, so the markdown reading simply has none.
    // The counters ride the SECTION NESTING, which is the same tree the contents walks.
    @select('.pd-book') counted_counterReset = 'depth1';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section') one_counterIncrement = 'depth1';
    one_counterReset = 'depth2';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section > .pd-section') two_counterIncrement = 'depth2';
    two_counterReset = 'depth3';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section > .pd-section > .pd-section') three_counterIncrement = 'depth3';
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section > .pd-heading::before') numbered_content = "counter(depth1) '\\00a0\\00a0'";
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section > .pd-section > .pd-heading::before') deepNumbered_content = "counter(depth1) '.' counter(depth2) '\\00a0\\00a0'";
    @select('.pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-synopsis):not(.pd-references):not(.pd-appendix) > .pd-section > .pd-section > .pd-section > .pd-heading::before') deepestNumbered_content = "counter(depth1) '.' counter(depth2) '.' counter(depth3) '\\00a0\\00a0'";

    // AND THE CONTENTS CARRIES THE SAME NUMBERS, said the same way. counters() — the plural — walks
    // every level of a nested list and joins them, so one rule gives 1, then 1.1, then 1.2.1, from
    // the NESTING rather than from anything an entry declares. The apparatus is excluded here by
    // the very classes the documents write, which each entry now carries: the same :not() as above,
    // so the two numberings cannot drift apart because they are the same sentence twice.
    // LEADERS TO A MARKER. There is no page to lead to, so the marker is LaTeX's own empty
    // square rather than a number — it says honestly that a page is missing while keeping the
    // shape and the rhythm of a real contents, and it is inside the anchor, so it follows the
    // link. The day the document paginates, `place` becomes the number and nothing else here
    // changes. Both are BASE values, so this theme sets two words rather than writing rules.
    override leader = 'radial-gradient(circle at center, currentColor 1px, transparent 1.1px)';
    override place = "'\\25A1'";

    // A TOP-LEVEL ENTRY IS BOLD, name and marker alike, which is what article.cls does.
    @select('.pd-table-of-contents > .pd-row > .pd-chapter > a, .pd-table-of-contents > .pd-row::before') top_fontWeight = '800';
    // A CONTENTS ROW IS 18px WHATEVER THE BODY'S LEADING IS, because the page sets it that way
    // and a row is one line by construction.
    @select('.pd-table-of-contents .pd-row') paced_lineHeight = '18px';
    override entry_marginBottom = '0';
    @select('.pd-table-of-contents > .pd-row + .pd-row') group_marginTop = '18px';

    // EACH LEVEL HAS ITS OWN NUMBER COLUMN AND ITS OWN STEP, which is what makes a `1` and a
    // `1.2.1` both sit right. Read off the paper's text layer: numbers at 96, 118, 151 and
    // titles at 118, 151, 198, so the columns are 22, 33 and 47 and the steps are 22 then 33.
    override under_paddingLeft = '22px';
    @select('.pd-table-of-contents > .pd-row > .pd-row > .pd-row') deepUnder_paddingLeft = '33px';

    @select('.pd-table-of-contents') counting_counterReset = 'listed1 listed2 listed3';
    @select('.pd-table-of-contents > .pd-row') tallied_counterIncrement = 'listed1';
    tallied_counterReset = 'listed2 listed3';
    @select('.pd-table-of-contents > .pd-row > .pd-row') deepTallied_counterIncrement = 'listed2';
    deepTallied_counterReset = 'listed3';
    @select('.pd-table-of-contents > .pd-row > .pd-row > .pd-row') deepestTallied_counterIncrement = 'listed3';
    @select('.pd-table-of-contents .pd-row.pd-references, .pd-table-of-contents .pd-row.pd-appendix') apart_counterIncrement = 'none';
    @select('.pd-table-of-contents > .pd-row::before') listedNumber_content = "counter(listed1)";
    @select('.pd-table-of-contents > .pd-row > .pd-row::before') deepNumber_content = "counter(listed1) '.' counter(listed2)";
    deepNumber_flex = '0 0 auto';
    deepNumber_minWidth = '33px';
    @select('.pd-table-of-contents > .pd-row > .pd-row > .pd-row::before') deepestNumber_content = "counter(listed1) '.' counter(listed2) '.' counter(listed3)";
    deepestNumber_flex = '0 0 auto';
    deepestNumber_minWidth = '47px';
    listedNumber_flex = '0 0 auto';
    listedNumber_minWidth = '22px';
    @select('.pd-table-of-contents .pd-row.pd-references::before, .pd-table-of-contents .pd-row.pd-appendix::before') apartNumber_content = "''";

    // A FIGURE IS NUMBERED, and by the sheet, exactly as a section is — so a reading that does not
    // number figures simply does not, and $Figure stays a shell with no member for it. latex.css
    // numbers a bare <figcaption>; this names the KIND, so an illustration standing in the same
    // document is left alone, which is the whole reason a figure is its own thing.
    @select('.pd-figure') figured_counterIncrement = 'figure';
    @select('.pd-figure .pd-caption::before') figuring_content = "'Figure ' counter(figure) '. '";
    figuring_fontWeight = '700';

    // A PAPER IS SET JUSTIFIED AND HYPHENATED, which is the difference nobody names when they say a
    // page looks typeset.
    @select('.pd-paragraph:not(.pd-heading), .pd-item') justified_textAlign = 'justify';
    justified_hyphens = 'auto';
    justified_textRendering = 'optimizeLegibility';

    // THE ABSTRACT is a quotation environment set small: 10pt on 12pt, inset both sides — measured
    // at 40px, which is the 30pt those margins come to.
    // .pd-abstract RATHER THAN .pd-synopsis, which is the point of there being an $Abstract: a
    // paper's abstract is set as a quotation and a book's synopsis is not, and until now one
    // selector had to serve both.
    @select('.pd-abstract') abstract_margin = '54px 27pt 1.5rem';
    @select('.pd-abstract .pd-paragraph:not(.pd-heading)') indented_textIndent = '20px';
    indented_marginTop = '0';
    abstract_fontSize = '10pt';
    abstract_lineHeight = '1.2';
    @select('.pd-abstract .pd-math') summarised_fontSize = '.75em';
    @select('.pd-abstract .pd-heading') abstracted_fontSize = '10pt';
    abstracted_fontWeight = '700';
    abstracted_textAlign = 'center';
    abstracted_marginTop = '0';
    abstracted_marginBottom = '5px';

    @select('.pd-heading + .pd-paragraph') opening_textIndent = '0';

    // A CITATION IS SET AS [n], which is what a cite draws.
    // THE BRACKETS ARE WRITTEN AS ESCAPES. As literal '[' and ']' the rule never reached the
    // page — measured, ::before computed to `none` — because an unbalanced bracket inside a
    // content string is read by the CSS tokeniser as the start of an attribute selector and the
    // declaration is discarded. The unicode escapes say the same thing and parse.
    @select('.pd-citation::before') opened_content = "'\\005B'";
    @select('.pd-citation::after') closed_content = "'\\005D'";
    @select('.pd-citation') get marked_color() { return 'hsl(0, 100%, 33%)'; }

    // AN EQUATION stands centred on its own line.
    @select('.pd-equation') equation_textAlign = 'center';
    equation_margin = '1rem 0';
    equation_textIndent = '0';

    // A THEOREM states itself in italic under a bold label.
    @select('.pd-theorem .pd-paragraph') theorem_fontStyle = 'italic';

    // THE BIBLIOGRAPHY hangs.
    // A BIBLIOGRAPHY HANGS, AND IT IS NOT SET IN LINK RED. hyperref's red is for a CITATION in
    // running text, where it has to be found; an entry that is itself the target has nothing to
    // find. Doug: "I don't think we need red references!"
    @select('.pd-references .pd-paragraph') bibliography_textIndent = '-1.5em';
    bibliography_paddingLeft = '1.5em';
    @select('.pd-references a') cited_textDecoration = 'none';
    get cited_color() { return this.ink; }

}

export const Theme = $($Theme);
