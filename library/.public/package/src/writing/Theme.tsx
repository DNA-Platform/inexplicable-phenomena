import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from './Writing';
import { $Annotation$, $Annotation } from './Annotation';
import { $Type } from './Type';

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
    display: string;
    size: string;
    leading: string;
}

export class $Theme extends $Annotation implements $Theme$ {
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
    display = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
    size = '16px';
    leading = '1.5';

    $Theme(block: $Block) {
        super.$Writing($check(block, $Block).concat($check($TypeOfTheme, '!')));
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
