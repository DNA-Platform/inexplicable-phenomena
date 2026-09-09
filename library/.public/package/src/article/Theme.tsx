// CREATED 2026-09-08, MEASURED 2026-09-09 · rating 3. The article's theme: a page on a desk, set
// the way LaTeX sets one, installed by registration and carrying no formats.
import { $, select } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
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
    override face = "'KaTeX_Main', 'Latin Modern Roman', 'Latin Modern', 'CMU Serif', Georgia, 'Times New Roman', Times, serif";
    override body = "'KaTeX_Main', 'Latin Modern Roman', 'Latin Modern', 'CMU Serif', Georgia, 'Times New Roman', Times, serif";
    override size = '11pt';
    override leading = '1.2364';
    override measure = '6.5in';
    override ink = '#000000';
    override paper = '#ffffff';
    override desk = '#282828';
    override link = 'hsl(0, 100%, 33%)';
    override rule = 'hsl(0, 0%, 80%)';

    // THE FOUR LAYOUT VALUES THE BASE CARRIES. parindent for an 11pt article is 17pt, parskip is
    // zero, a title block is centred, and LaTeX rules nothing.
    override indent = '17pt';
    override between = '0';
    override titled = 'center';
    override ruling = '0';

    // THE DESK. The theme element is the surface the sheet stands on rather than the column itself,
    // which is the whole difference between a document and a web page.
    override padding = '0';
    override margin = '0';
    override get maxWidth() { return '100%'; }

    // THE SHEET IS US LETTER. 8.5in is exactly what Chrome draws at 100% zoom and 1in margins are
    // what article.cls sets, leaving the 6.5in measure above. The padding shrinks below a 960px
    // window through min() rather than a media query, so a laptop and a desktop both get a true
    // inch and a phone gets a readable margin — the same argument as min(measure, 100%).
    @select('.pd-book') sheet_width = '8.5in';
    sheet_maxWidth = '100%';
    sheet_marginLeft = 'auto';
    sheet_marginRight = 'auto';
    sheet_marginTop = '59px';
    sheet_marginBottom = '2rem';
    sheet_padding = 'min(1in, 10vw)';
    sheet_boxSizing = 'border-box';
    sheet_boxShadow = '0 1px 5px rgba(0, 0, 0, .55)';

    // THE STRIP is Chrome's own bar, measured rather than chosen.
    // OVERRIDDEN AS GETTERS BECAUSE THE BASE DECLARED THEM AS GETTERS. tsc refuses the other way —
    // "defined as an accessor... overridden here as an instance property" — which is the same
    // brittleness that broke `ruled`. A strip follows the palette by default and this one does not,
    // because it is not the document's colour; it is the viewer's.
    @select('.pd-header') override get strip_background() { return '#3c3c3c'; }
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
    title_marginBottom = '0';
    @select('.pd-author .pd-heading') author_fontSize = '12pt';
    @select('.pd-subject .pd-heading') subject_fontSize = '10pt';
    @select('.pd-cover') cover_marginTop = '1.5rem';
    cover_marginBottom = '1.5rem';

    // A section is Large bold with 3.5ex above and 2.3ex below; a subsection is large with 3.25ex
    // and 1.5ex. At 11pt an ex is about 4.3pt, which is where these numbers come from.
    @select('h2.pd-heading') head_fontWeight = '700';
    head_fontSize = '14.4pt';
    head_marginTop = '15pt';
    head_marginBottom = '10pt';
    @select('h3.pd-heading') deep_fontWeight = '700';
    deep_fontSize = '12pt';
    deep_marginTop = '14pt';
    deep_marginBottom = '6.5pt';

    // A PAPER IS SET JUSTIFIED AND HYPHENATED, which is the difference nobody names when they say a
    // page looks typeset.
    @select('p.pd-paragraph, .pd-item') justified_textAlign = 'justify';
    justified_hyphens = 'auto';
    justified_textRendering = 'optimizeLegibility';

    // THE ABSTRACT is a quotation environment set small: 10pt on 12pt, inset both sides — measured
    // at 40px, which is the 30pt those margins come to.
    @select('.pd-synopsis') abstract_margin = '0 30pt 1.5rem';
    abstract_fontSize = '10pt';
    abstract_lineHeight = '1.2';
    @select('.pd-synopsis .pd-heading') abstracted_fontSize = '10pt';
    abstracted_fontWeight = '700';
    abstracted_textAlign = 'center';
    abstracted_marginTop = '0';
    abstracted_marginBottom = '6pt';

    @select('.pd-heading + p.pd-paragraph') opening_textIndent = '0';

    // A CITATION IS SET AS [n], which is what a cite draws.
    @select('.pd-citation::before') opened_content = "'['";
    @select('.pd-citation::after') closed_content = "']'";

    // AN EQUATION stands centred on its own line.
    @select('.pd-equation') equation_textAlign = 'center';
    equation_margin = '1rem 0';
    equation_textIndent = '0';

    // A THEOREM states itself in italic under a bold label.
    @select('.pd-theorem .pd-paragraph') theorem_fontStyle = 'italic';

    // THE BIBLIOGRAPHY hangs.
    @select('.pd-references .pd-paragraph') bibliography_textIndent = '-1.5em';
    bibliography_paddingLeft = '1.5em';

    // OWED, and it needs a structural decision first: sections numbered "1", "1.1" by CSS counters.
    // $Book.chapters already filters the cover, the synopsis, the contents, the index and the
    // footer, so the book knows its body — what is undecided is what an appendix and a bibliography
    // number as, and whether the walk that builds the contents writes the number or the sheet
    // counts it. Doug's ruling is owed on the second.
    // A THEME DRESSES A SCOPE. Doug proposed $register for this and the name is already taken by a
    // different act: `static $register()` is the composition root's wiring hook — register.ts walks
    // src for it and EMITS the call into index.ts before every build — and it takes no scope, while
    // applying a theme is a per-book choice. So this is its own static, and `$dresses` is a proxy
    // name. Chemistry's registration is `$(A, B)(C)` — for A, a B is a C — and there is no bare
    // form: `$(B)(C)` CALLS the component and answers "Cannot read properties of null" from React.
    static $dresses(within: Component<never>): void {
        $(within, Base)(Theme);
    }
}

export const Theme = $($Theme);
