import { ReactNode } from 'react';
import { $, $Block, $check, look, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Format$, $Format, $TypeOfFormat, FormatSpecification } from './Format';

export interface $Theme$ extends $Format$ {
    paper: string;
    desk: string;
    ink: string;
    quiet: string;
    shade: string;
    rule: string;
    pale: string;
    jet: string;
    pressed: string;
    link: string;
    measure: string;
    body: string;
    face: string;
    size: string;
    leading: string;
}

// IN PROGRESS · rating 2. The theme is a FORMAT that is a singleton with values: the annotation the walk finds, and the sheet worn once at the book. `face` is a proxy (`display` is a CSS property and would be emitted).
export class $Theme extends $Format implements $Theme$ {
    override selector: any = styled.main;
    paper = '#ffffff';
    // THE SURFACE A BOOK LIES ON, beside the sheet it is printed on. The base had one colour for
    // both and could therefore not say what a document viewer says with two — a page standing on a
    // ground. It is `paper` by default, so a theme that does not separate them sees no change at
    // all, and the encyclopedia's book, which is display:contents, has no box to paint either way.
    // `desk` IS A PROXY NAME, flagged for Doug.
    desk = '#ffffff';
    ink = '#1f2328';
    quiet = '#f6f8fa';
    shade = '#d1d9e0';
    rule = '#d1d9e0';
    pale = '#59636e';
    jet = '#1f2328';
    pressed = '#0550ae';
    link = '#0969da';
    measure = '57em';
    body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
    face = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
    size = '16px';
    leading = '1.5';
    wordWrap = 'break-word';

    get fontFamily() { return this.body; }
    get fontSize() { return this.size; }
    get lineHeight() { return this.leading; }
    get color() { return this.ink; }
    get background() { return this.desk; }
    minHeight = '100vh';
    // A MEASURE IS A CEILING, NOT A WIDTH. min(measure, 100%) is what makes one value serve a
    // desktop, a laptop and a phone — the column never exceeds its reading measure and never
    // exceeds the window, and no media query is needed to say it.
    get maxWidth() { return `min(${this.measure}, 100%)`; }
    margin = '0 auto';
    padding = '2rem';

    // AND THE GUTTER SHRINKS WHERE THERE IS NO ROOM FOR IT. 2rem each side of a 390px phone is a
    // sixth of the screen; below the fold of a laptop it is right.
    @select('@media (max-width: 640px)') narrow_padding = '1rem';

    // WIDE CONTENT SCROLLS INSIDE ITS OWN BOX AND NEVER PUSHES THE PAGE. Measured on a 390px phone:
    // one display equation was 594px wide and took the whole document with it. A formula, a table
    // and a code block are the three things that cannot be made narrower, so each carries its own
    // scroll instead.
    // A CONTENTS STEPS BY LEVEL, and the levels were already there — measured, every entry carried
    // the right pd-indent class and every entry sat at the same x, because nothing selected them.
    // AND THE SELECTOR NAMES THE PARAGRAPH, not the class alone: a prop's class reaches every part
    // the parse makes beneath it, so <p class="pd-indent-1"> holds <a class="pd-indent-1"> and the
    // step applied TWICE — measured 24px on the paragraph and another 24px on its anchor.
    @select('.pd-table-of-contents p.pd-indent-1') stepped_marginLeft = '1.5em';
    @select('.pd-table-of-contents p.pd-indent-2') deeper_marginLeft = '3em';
    @select('.pd-table-of-contents p.pd-indent-3') deepest_marginLeft = '4.5em';

    // AND A CONTENTS ENTRY IS A NAME, NOT PROSE. Both of these were in the article theme, and both
    // are about what a table of contents IS: the entries sit close together, and a first-line
    // indent belongs to a paragraph of prose rather than to a line naming a section. Measured on
    // the LaTeX reading, the indent leaked in and broke the very stepping above — the levels read
    // 355 / 379 / 427 instead of a ladder, because every entry but the first took the paper's
    // 23.4px first line. The markdown reading had the mirror fault: 1.25em of prose air per entry.
    @select('.pd-table-of-contents p.pd-paragraph') listed_textIndent = '0';
    listed_marginTop = '0';
    listed_marginBottom = '.15rem';
    @select('.pd-table-of-contents a') entry_textDecoration = 'none';
    get entry_color() { return this.ink; }

    @select('.pd-equation, .katex-display, .pd-table, pre') wide_overflowX = 'auto';
    wide_overflowY = 'hidden';
    wide_maxWidth = '100%';

    // THE LAYOUT A DOCUMENT TAKES, held as VALUES rather than written as rules. The base had a
    // vocabulary for colour and type and none for layout, so a theme wanting a different document
    // look had to write CSS for questions every document answers — measured 2026-09-09, the article
    // theme was 7 values against 36 properties in 16 groups, and the encyclopedia 21 against 129 in
    // 45. These four carry ten of the article theme's sixteen groups. What is left there is
    // genuinely kind-specific — the brackets round a citation, a hanging bibliography, a theorem's
    // italic — and belongs in a theme as a rule. `ruled`, `indent`, `between` and `titled` are
    // proxy names.
    // A DERIVED GETTER IS NOT A THEME'S KNOB. `ruled` was one for ten minutes and tsc refused the
    // article's override with "defined as an accessor... overridden here as an instance property" —
    // the same brittleness that broke the encyclopedia when p_marginBottom became a getter. So the
    // VALUE is the thickness, which a theme sets, and the rule derives from it and the rule colour.
    indent = '0';
    between = '1rem';
    titled = 'left';
    ruling = '1px';
    get ruled() { return `${this.ruling} solid ${this.rule}`; }

    // A COVER HAS A HIERARCHY — the title, then who wrote it, then what it is about — and that is
    // what a cover IS rather than anything LaTeX does. All of it lived in the article theme, so the
    // markdown reading drew three EQUAL headings: measured, title, author and subject were all
    // 1.5em at weight 600, indistinguishable from each other and from a section heading. A cover
    // heading is also not ruled — the base rules h1 and h2, which would draw a line under a name.
    // THE SHEET, and the strip above it — the two groups a theme needs to draw a document as a
    // PAGE rather than as a column of text. Neither says anything here beyond the colour, because
    // what a sheet MEASURES is `measure` and what a strip LOOKS LIKE is the theme's own business:
    // Doug, 2026-09-09, "developing a theme means all components ideally SHOULD look good in the
    // style", so every theme dresses these and the component carries only its structure.
    @select('.pd-book') get sheet_background() { return this.paper; }
    @select('.pd-header') get strip_background() { return this.quiet; }
    get strip_color() { return this.ink; }
    get strip_borderBottom() { return this.ruled; }
    strip_height = '48px';
    strip_padding = '0 1.25rem';
    get strip_fontFamily() { return this.body; }
    strip_fontSize = '13px';

    @select('.pd-cover') get cover_textAlign() { return this.titled; }
    cover_marginBottom = '3rem';
    @select('.pd-cover .pd-heading') titling_marginTop = '.4rem';
    titling_marginBottom = '.4rem';
    titling_borderBottom = 'none';
    titling_paddingBottom = '0';
    @select('.pd-title .pd-heading') title_fontSize = '2rem';
    title_fontWeight = '700';
    title_lineHeight = '1.15';
    @select('.pd-title a') titled_textDecoration = 'none';
    get titled_color() { return this.ink; }
    @select('.pd-author .pd-heading') author_fontSize = '1.05em';
    author_fontWeight = '400';
    // A DOCUMENT DOES NOT PRINT ITS SUBJECT AS A HEADING — it is a keyword line, so it is set as
    // one rather than hidden, because hiding is losing.
    @select('.pd-subject .pd-heading') subject_fontSize = '.9em';
    subject_fontStyle = 'italic';
    subject_fontWeight = '400';
    get subject_color() { return this.pale; }

    @select('.pd-heading') heading_marginTop = '1.5rem';
    heading_marginBottom = '1rem';
    heading_fontWeight = '600';
    heading_lineHeight = '1.25';
    get heading_fontFamily() { return this.face; }
    @select('h1') h1_fontSize = '2em';
    h1_paddingBottom = '.3em';
    get h1_borderBottom() { return this.ruled; }
    // ONLY h1 AND h2 CARRY A RULE, which is what github-markdown-css does and what the documents
    // that shipped looked like. The selector was `.pd-heading`, which is EVERY heading, so an h3 and
    // an h4 were ruled too — the thing that made the plain look read as a README rather than an
    // article.
    @select('h2.pd-heading') h2_fontSize = '1.5em';
    h2_paddingBottom = '.3em';
    get h2_borderBottom() { return this.ruled; }
    @select('h3.pd-heading') h3_fontSize = '1.25em';
    // THE SHEET DRESSES KINDS, NOT MARKDOWN. Measured 2026-09-08: seventeen of eighteen groups here
    // selected a raw ELEMENT and one selected a kind, so the theme was styling markdown's output
    // while every kind wrote a pd- class the sheet ignored. Two kinds writing the same tag could not
    // be told apart, and a consumer could restyle a TAG but never a KIND. Six are converted.
    //
    // WHAT IS LEFT ON AN ELEMENT, and each is a finding rather than a leftover:
    //   a, a:hover  — the base writes the meaning anchor with NO CLASS ($Writing.view), so there is
    //                 nothing to select. Giving that anchor a class is the fix and is not done here.
    //   li + li, table th/td, img, code — PARTS of a kind's own element, which is legitimate.
    //   h1, h3, h1..h6, pre, hr — no kind writes these. They arrive from markdown inside copy, and
    //                 that is the gap $Code and a heading level beyond h2 would close.
    @select('p.pd-paragraph') p_marginTop = '0';
    get p_marginBottom() { return this.between; }
    get p_textIndent() { return this.indent; }
    @select('.pd-list') list_marginTop = '0';
    list_marginBottom = '0';
    list_paddingLeft = '2em';
    @select('li + li') item_marginTop = '.25em';
    @select('code') code_fontFamily = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
    code_fontSize = '85%';
    code_padding = '.2em .4em';
    code_borderRadius = '6px';
    get code_backgroundColor() { return this.quiet; }
    @select('pre') pre_fontSize = '12px';
    pre_padding = '1rem';
    pre_borderRadius = '6px';
    pre_overflow = 'auto';
    pre_lineHeight = '1.45';
    get pre_backgroundColor() { return this.quiet; }
    @select('.pd-quote') quote_padding = '0 1em';
    get quote_color() { return this.pale; }
    get quote_borderLeft() { return `.25em solid ${this.shade}`; }
    @select('hr') hr_margin = '1.5rem 0';
    hr_border = '0';
    hr_height = '.25em';
    get hr_backgroundColor() { return this.shade; }
    @select('table th, table td') cell_padding = '6px 13px';
    get cell_border() { return `1px solid ${this.shade}`; }
    @select('.pd-illustration') figure_margin = '1rem 0';
    @select('img') img_maxWidth = '100%';
    @select('.pd-meaning, .pd-ref, .pd-reference') a_textDecoration = 'none';
    get a_color() { return this.link; }
    @select('.pd-meaning:hover, .pd-ref:hover, .pd-reference:hover') hover_textDecoration = 'underline';
    @select('.pd-chapter') chapter_marginBottom = '2em';
    @select('.pd-index') index_columnCount = '3';

    // Machinery extending machinery, so the chain is called whole; a KIND would extend its level instead.
    $Theme(block: $Block) {
        super.$Format($check(block, $Block, '!').concat($check($TypeOfTheme, '!')));
    }

    static $register(): void {
        reflection.knows({ theme: $Theme });
    }
}

export class $TypeOfTheme extends $TypeOfFormat {
    override name = 'Theme';
    protected override specification: Specification<$Writing> = new ThemeSpecification();
}

export class ThemeSpecification extends FormatSpecification {
}

export const Theme = $($Theme);
export const TypeOfTheme = $($TypeOfTheme);
