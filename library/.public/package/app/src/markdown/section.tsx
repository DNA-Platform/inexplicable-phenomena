import { $ } from '@dna-platform/chemistry';
import { $Section } from '@/writing/Section';
import { $Paragraph } from '@/writing/Paragraph';
import { $Figure } from '@/writing/Figure';

// What is left of this file after the notation moved into the framework, and
// it is the only thing here that was ever the demo's: what the reader is
// ATTENDING to. Everything else — fences, plates, breaks, quotes, items,
// display maths, the whole divide and compose — is `$Section`'s own now,
// because it is not a kind of writing, it is how writing is written.
//
// The part is held by the SECTION, the common renderer of both the prose and
// the figure that lists it. It is handed DOWN to both; neither climbs `parent`
// to find it, which would tell the truth at binding and lie on screen.
// A FIGURE IS A CAPTION; a subclass adds the view. These two are the demo's,
// because what a rule or a formula LOOKS like is a drawing question and the
// framework is right not to hold an opinion about it.
export class $Equation extends $Figure {
    get mathematics(): string { return this.caption.copy; }
}

export class $Rule extends $Figure {
    $parenthetical? = true;
}

const displayed = /^\$\$([\s\S]+?)\$\$$/;
const ruled = /^(-{3,}|\*{3,}|_{3,})$/;

export class $MarkdownSection extends $Section {
    attending = -1;

    attend(position: number) {
        this.attending = this.attending === position ? -1 : position;
    }

    // The notation says WHERE the pieces are; the demo says what draws them.
    compose(prose: string): $Paragraph {
        const trimmed = prose.trim();
        const asMath = displayed.exec(trimmed);
        if (asMath) {
            const Equation = $($Equation);
            return $(<Equation caption={asMath[1].trim()} />) as $Paragraph;
        }
        if (ruled.test(trimmed)) {
            const Rule = $($Rule);
            return $(<Rule caption={trimmed} />) as $Paragraph;
        }
        return super.compose(prose) as $Paragraph;
    }
}

export const MarkdownSection = $($MarkdownSection);
