// CREATED 2026-09-09 · rating 3. A FIGURE IS NOT AN ILLUSTRATION. Doug: "Figure should be the
// figure. We want semantics… In a book, is an illustration the same as a figure? No. We would style
// them differently. So maybe it should be its own thing that can be styled separately."
//
// AN ILLUSTRATION SHOWS SOMETHING; A FIGURE IS NUMBERED AND REFERRED TO. That is the whole
// difference, and it is enough — a book sets a plate one way and a paper sets Figure 3 another, and
// neither can be styled without a class to name it.
//
// IT IS A SHELL, VISIBLY ONE, and ch14's test asks what it does that its type could not confer.
// The honest answer is NOTHING, and that is the point: what it confers is its NAME, which is what a
// sheet selects. The number is not a member either — it is counted by the sheet, exactly as section
// numbers are, so a reading that does not number figures simply does not.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { FigureFormat as figureStyle } from '@/formatting/FigureFormat';
import { $Illustration$, $Illustration, $TypeOfIllustration, IllustrationSpecification } from './Illustration';

export interface $Figure$ extends $Illustration$ { }

export class $Figure extends $Illustration implements $Figure$ {
    $measure = '100%';

    $Figure(block: $Block) {
        super.$Illustration(this.addType(block, $TypeOfFigure).concat($check(figureStyle, '!')));
    }
}

export class $TypeOfFigure extends $TypeOfIllustration {
    override name = 'Figure';
    protected override specification: Specification<$Writing> = new FigureSpecification();
}

export class FigureSpecification extends IllustrationSpecification {
}

export const Figure = $($Figure);
export const TypeOfFigure = $($TypeOfFigure);
