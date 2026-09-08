import { ReactNode } from 'react';
import { $, $Block, $check, look, select, styled } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';

export interface $Theme$ extends $Annotation$ {
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

// IN PROGRESS · rating 2. The theme is the annotation the walk finds AND the sheet worn once per book as a FRESH instance of its class with the drawing as $content — a parented annotation mounted with a prop loops (probes P1–P7, Sprint 53 § where things stand). $content and face are proxies.
export class $Theme extends $Annotation implements $Theme$ {
    selector = styled.main;
    $content: ReactNode = null;
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

    @select('h1, h2, h3, h4, h5, h6') heading_marginTop = '1.5rem';
    heading_marginBottom = '1rem';
    heading_fontWeight = '600';
    heading_lineHeight = '1.25';
    get heading_fontFamily() { return this.face; }
    @select('h1') h1_fontSize = '2em';
    h1_paddingBottom = '.3em';
    get h1_borderBottom() { return `1px solid ${this.rule}`; }
    @select('h2') h2_fontSize = '1.5em';
    h2_paddingBottom = '.3em';
    get h2_borderBottom() { return `1px solid ${this.rule}`; }
    @select('h3') h3_fontSize = '1.25em';
    @select('p') p_marginTop = '0';
    p_marginBottom = '10px';
    @select('ul, ol') list_marginTop = '0';
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
    @select('blockquote') quote_padding = '0 1em';
    get quote_color() { return this.pale; }
    get quote_borderLeft() { return `.25em solid ${this.shade}`; }
    @select('hr') hr_margin = '1.5rem 0';
    hr_border = '0';
    hr_height = '.25em';
    get hr_backgroundColor() { return this.shade; }
    @select('table th, table td') cell_padding = '6px 13px';
    get cell_border() { return `1px solid ${this.shade}`; }
    @select('figure') figure_margin = '1rem 0';
    @select('img') img_maxWidth = '100%';
    @select('a') a_textDecoration = 'none';
    get a_color() { return this.link; }
    @select('a:hover') hover_textDecoration = 'underline';
    @select('article') chapter_marginBottom = '2em';
    @select('.pd-index') index_columnCount = '3';

    $Theme(block: $Block) {
        super.$Writing($check(block, $Block).concat($check($TypeOfTheme, '!')));
    }

    override view(): ReactNode {
        return null;
    }

    @look('sheet')
    override $view(): ReactNode {
        return <main>{this.$content}</main>;
    }

    override frame(drawn: ReactNode): ReactNode {
        return this.$look === 'sheet' ? drawn : null;
    }

    override format(drawn: ReactNode): ReactNode {
        const Sheet = reflection.sheet(this.constructor as new() => $Theme);

        return <Sheet look="sheet" content={drawn} />;
    }

    static $register(): void {
        reflection.knows({ theme: $Theme });
    }
}

export class $TypeOfTheme extends $Type {
    override name = 'Theme';
    protected override specification: Specification<$Writing> = new ThemeSpecification();
}

export class ThemeSpecification extends WritingSpecification {
    @specify('a theme says nothing of its own; it is worn')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Theme = $($Theme);
export const TypeOfTheme = $($TypeOfTheme);
