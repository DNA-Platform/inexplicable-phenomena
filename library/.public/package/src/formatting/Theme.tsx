import { ReactNode } from 'react';
import { $, $Block, $check, look, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Format$, $Format, $TypeOfFormat, FormatSpecification } from './Format';

export interface $Theme$ extends $Format$ {
    paper: string;
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
    get background() { return this.paper; }
    get maxWidth() { return this.measure; }
    margin = '0 auto';
    padding = '2rem';

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

    @select('.pd-cover') get cover_textAlign() { return this.titled; }

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
