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

// IN PROGRESS — Sprint 53 U2/U3 (public-code-design). THE THEME IS THE SHEET: an annotation
// found in a writing's block by the walk (reflection.theme), AND a styled chemical whose
// compiled component is worn once per book mount. MEASURED 2026-09-08, probes P1–P7:
//   - the annotation standing in a block draws nothing and is harmless (P2)
//   - the PARENTED annotation mounted as the sheet with a prop LOOPS the page (P4 — a write
//     to a held chemical wakes its ancestry; Solutions 16/29/52)
//   - a fresh instance of the theme's CLASS mounted with the drawing as CHILDREN draws nothing,
//     because a writing takes its children as its block (P5 — ch13's old finding)
//   - the bare [style] component nests right but reads no live values; `given` is not
//     exported (P6) — no chemistry change needed after P7, so no pitch
//   - a fresh class instance handed the drawing as a $content PROP: nested, live, no loop (P7)
// So format() below mounts the CLASS component with content={drawn}; `$content` and `face`
// are PROXY names, Doug's to rename (`display` collided: a styled chemical emits any member
// named like a CSS property). The default look draws null; frame() answers null unless the
// sheet look is on — a conditional on the instance's own look, the same shape as $print.
// OWED: the class component memoised per class (reflection.component?) so a subclass's
// format() need not name its own exported component; the sheet's @select groups (U6).
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

    // The sheet is a FRESH, UNPARENTED instance of this theme's class (P7), never `$(this)`,
    // which is the parented annotation and loops (P4). reflection.sheet memoises $(class).
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
