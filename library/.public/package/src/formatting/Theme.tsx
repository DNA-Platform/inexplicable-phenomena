import { ReactNode } from 'react';
import { $, $Block, $check, look, styled } from '@dna-platform/chemistry';
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
