import { ReactNode } from 'react';
import { $, $Block, $check, look, select, styled } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
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
    link = '#3366cc';
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
    // A THEME CONTAINS ITS CHILDREN'S MARGINS. Without this the sheet's top margin COLLAPSES out
    // through the theme element and pushes the whole desk down — measured, main began at y91 rather
    // than y32 and the page behind it showed as a pale band under the strip. flow-root is the one
    // line that says "be a block formatting context" without the side effects overflow or a border
    // bring, and it is right for any theme, not only one that paints a ground.
    display = 'flow-root';
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
    // A CONTENTS IS A LIST OF LISTS and its indentation is the NESTING. Three rules stepping a
    // pd-indent class stood here and are gone with the class: the walk produces a tree, the
    // contents keeps it, and a <ul> inside an <li> indents itself. What is left is what a contents
    // IS — names set close together, not prose, and not underlined.
    @select('.pd-table-of-contents .pd-list') listed_listStyle = 'none';
    listed_paddingLeft = '1.5em';
    listed_marginTop = '0';
    listed_marginBottom = '0';
    @select('.pd-table-of-contents > .pd-section > .pd-list') outer_paddingLeft = '0';
    // AN ENTRY IS A ROW: a name on the left and the place it names on the right, with the space
    // between them led across. THIS IS IN THE BASE, not in the article theme, because it is what a
    // table of contents IS and not what LaTeX does — Doug: "ask if you are hurting yourself by not
    // taking some of this and moving it back into the main framework so markdown can inherit some."
    // The nested list takes a row of its own, which is what lets the row be a flex line at all.
    @select('.pd-table-of-contents .pd-row') entry_display = 'flex';
    entry_flexWrap = 'wrap';
    entry_alignItems = 'baseline';
    entry_marginTop = '0';
    entry_marginBottom = '.15rem';
    entry_textIndent = '0';
    @select('.pd-table-of-contents .pd-chapter > a') entryLink_flex = '0 1 auto';
    entryLink_order = '1';
    @select('.pd-table-of-contents .pd-row .pd-row') under_flex = '0 0 100%';
    under_order = '4';
    under_paddingLeft = '1.6em';

    // THE LEADER AND THE PLACE, drawn inside the anchor so the whole row follows the link. `leader`
    // and `place` are VALUES a theme sets: a documentleading with dots to a marker is one reading, a
    // document with neither is another, and the markdown theme takes the second by setting them to
    // none. The marker stands where a page number would stand, and becomes one the day a page does.
    // TWO BOXES, because they are two things: the leader GROWS to fill the row and belongs inside
    // the anchor so the whole run follows the link; the marker stands at the end of the row and is
    // the entry's own. Drawn as one box the dots ran underneath the marker.
    // `leader` is a background IMAGE rather than a dotted border: a 1px dotted border draws dots too
    // fine and too close to read as leaders — seen, it came out a hairline — where a repeated
    // radial gradient spaces them the way a typesetter does.
    leader = 'none';
    place = 'none';
    spacing = '.55em';
    @select('.pd-table-of-contents .pd-row::after') get leading_content() { return this.place; }
    leading_order = '3';
    leading_flex = '1 1 auto';
    leading_textAlign = 'right';
    leading_marginLeft = '.6em';
    leading_alignSelf = 'stretch';
    get leading_backgroundImage() { return this.leader; }
    get leading_backgroundSize() { return `${this.spacing} ${this.spacing}`; }
    leading_backgroundRepeat = 'repeat-x';
    leading_backgroundPosition = 'left bottom .3em';
    @select('.pd-table-of-contents a') named_textDecoration = 'none';
    get named_color() { return this.link; }

    landing = '#cfe3ff';
    @select('@keyframes landed { from {') get from_background() { return this.landing; }
    @select('@keyframes landed { to {') to_background = 'transparent';
    @select('.pd-entry > .pd-meaning:target') landed_animation = 'landed 2s ease-out';
    @select('.pd-footnote') footnote_verticalAlign = 'super';
    footnote_fontSize = '.75em';
    footnote_lineHeight = '0';

    @select('.pd-equation, .katex-display, .pd-table, .pd-code') wide_overflowX = 'auto';
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
    // THE SHEET, and the strip above it — the two groups a theme needs to draw a documented as a
    // PAGE rather than as a column of text. Neither says anything here beyond the colour, because
    // what a sheet MEASURES is `measure` and what a strip LOOKS LIKE is the theme's own business:
    // Doug, 2026-09-09, "developing a theme means all components ideally SHOULD look good in the
    // style", so every theme styles these and the component carries only its structure.
    @select('.pd-book') get sheet_background() { return this.paper; }
    sheet_counterReset = 'figure';
    @select('.pd-document, .pd-section, .pd-heading, .pd-meaning') get landing_scrollMarginTop() { return `calc(${this.strip_height} + 1rem)`; }
    @select('.pd-header') get strip_background() { return this.quiet; }
    get strip_color() { return this.ink; }
    get strip_borderBottom() { return this.ruled; }
    strip_height = '48px';
    strip_padding = '0 1.25rem';
    get strip_fontFamily() { return this.body; }
    strip_fontSize = '13px';

    // THE KINDS NOTHING STYLED. Measured on the probe page, which exists to find exactly this:
    // aside, note, summary, highlight and footer were named by NO theme — base, article, markdown or
    // encyclopedia — so each drew as the bare element it prints and a reader could not tell one from
    // a paragraph. These are the base's because they are what the kinds ARE, not what a paper does.
    @select('.pd-aside') aside_margin = '1.5rem 0';
    aside_padding = '.75rem 1rem';
    get aside_borderLeft() { return `3px solid ${this.shade}`; }
    get aside_background() { return this.quiet; }
    @select('.pd-note') noted_margin = '1rem 0';
    noted_fontSize = '.9em';
    get noted_color() { return this.pale; }
    @select('.pd-summary') summed_margin = '1rem 0';
    summed_fontStyle = 'italic';
    get summed_color() { return this.pale; }
    @select('.pd-highlight') lit_padding = '0 .15em';
    lit_background = 'rgba(255, 229, 100, .45)';
    @select('.pd-footer') foot_marginTop = '3rem';
    foot_paddingTop = '1rem';
    foot_fontSize = '.85em';
    get foot_color() { return this.pale; }
    get foot_borderTop() { return this.ruled; }

    // AND latex.css NUMBERS EVERY figcaption, so an illustration was drawn as "Figure 2." — the very
    // distinction $Figure exists to make, undone by an imported sheet. A caption is numbered only
    // where the KIND says figure.
    @select('figure:not(.pd-figure) figcaption::before') uncounted_content = "''";

    // A FIGURE STANDS CENTRED, CAPTION AND ALL — seen in the paper rather than assumed, where the
    // drawing sits on the measure's centre line and the caption under it. Ours drew flush left.
    // It is the base's because it is what a figure IS; a reading that wants one flush left says so.
    @select('.pd-illustration') shown_textAlign = 'center';
    shown_margin = '1.5rem auto';
    @select('.pd-illustration img') drawn_maxWidth = '100%';
    drawn_height = 'auto';
    @select('.pd-caption') told_textAlign = 'center';
    told_marginTop = '.6rem';
    told_fontSize = '.9em';

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
    get titled_color() { return this.link; }
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
    @select('.pd-level-1') h2_fontSize = '1.5em';
    h2_paddingBottom = '.3em';
    get h2_borderBottom() { return this.ruled; }
    @select('.pd-level-2') h3_fontSize = '1.25em';
    // THE SHEET STYLES KINDS, NOT MARKDOWN. Measured 2026-09-08: seventeen of eighteen groups here
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
    @select('.pd-paragraph:not(.pd-heading)') p_marginTop = '0';
    get p_marginBottom() { return this.between; }
    get p_textIndent() { return this.indent; }
    @select('.pd-list') list_marginTop = '0';
    list_marginBottom = '0';
    list_paddingLeft = '2em';
    @select('.pd-item + .pd-item') item_marginTop = '.25em';
    @select('.pd-code code') code_fontFamily = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
    code_fontSize = '85%';
    code_padding = '.2em .4em';
    code_borderRadius = '6px';
    get code_backgroundColor() { return this.quiet; }
    @select('.pd-code') pre_fontSize = '12px';
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
    @select('.pd-table .pd-cell') cell_padding = '6px 13px';
    get cell_border() { return `1px solid ${this.shade}`; }
    @select('.pd-illustration') figure_margin = '1rem 0';
    // AN ELEMENT HERE MEANS AN IMAGE THE LIBRARY DID NOT WRITE. A kind's picture answers .pd-image,
    // but a demo or a foreign sheet can put a bare <img> on the page and this is the guard for it -
    // the same reason figure:not(.pd-figure) above names an element.
    @select('img') img_maxWidth = '100%';
    @select('.pd-illustration img') figured_marginInline = 'auto';
    @select('.pd-meaning, .pd-ref') a_textDecoration = 'none';
    get a_color() { return this.link; }
    @select('.pd-meaning:hover, .pd-ref:hover') hover_textDecoration = 'underline';
    // AN ANCHOR THAT ONLY NAMES ITSELF IS NOT A LINK. A fold makes a writing POINTABLE, and
    // view() writes the id on the same anchor that carries an href when there is one - so a
    // reference entry with a page fold drew as twelve blue paragraphs nobody can follow.
    @select('.pd-meaning:not([href])') keyed_color = 'inherit';
    keyed_cursor = 'text';
    @select('.pd-meaning:not([href]):hover') keyedOver_textDecoration = 'none';
    @select('.pd-cover .pd-meaning') get naming_color() { return this.link; }
    @select('.pd-document') document_marginBottom = '2em';
    @select('.pd-index') index_columnCount = '3';

    // Machinery extending machinery, so the chain is called whole; a KIND would extend its level instead.
    $Theme(block: $Block) {
        super.$Format(this.addType(block, $TypeOfTheme));
    }

    // ONE REGISTRATION, TWO READINGS OF IT. There were two statics here and Doug's ruling is that
    // there is no reason for two: "It's a static member so they can collide on different classes.
    // Therefore they can just be merged." Registering with NO SCOPE makes the kind itself known,
    // which is what the composition root calls before every build — register.ts walks src for
    // `static $register` and emits the call. Registering WITH a scope makes THIS sheet the theme
    // for that scope, and a static's `this` IS the subclass, so every theme inherits its own
    // registration and no sheet says it again.
    //
    // THE CAST IS CHEMISTRY'S TYPING, not this. The registration form is `$(A, B)(C)` over
    // components and its scope parameter is Component<never> — the contravariant bottom — so
    // nothing a consumer holds goes in without one. A cast belongs where the variance is known.
    static $register(within?: unknown): void {
        if (within === undefined) return reflection.knows({ theme: $Theme });
        $(within as Component<never>, Theme)($(this as unknown as new() => $Theme));
    }
}

export class $TypeOfTheme extends $TypeOfFormat {
    protected override specification: Specification<$Writing> = new ThemeSpecification();
}

export class ThemeSpecification extends FormatSpecification {
}

export const Theme = $($Theme);
export const TypeOfTheme = $($TypeOfTheme);
