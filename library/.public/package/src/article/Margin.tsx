// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the article sprint.
// THE MARGIN IS THE PART THAT HOLDS WHAT IS NOT THE ARTICLE — header, sidebar, footer — "the stuff that would go in the Margin of the page" (Doug, Sprint 51). It retired the words frame and apparatus.
// Its chapters are parenthetical: not drawn where they stand but by the parts that use them. Sprint 51 measured the gap: "parenthetical means invisible, not drawn elsewhere — a $Margin holding a header and a footer draws NOTHING, because parenthetical has no way to ask whether something else is using it." THAT IS A BASE FINDING, and the shell carries it until the base answers.
// DEPENDS ON: $Composition, $TypeOfPart / PartSpecification (book/Part) — designed for it as a Part; NOT yet designed for the drawn-elsewhere half.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Part$, $TypeOfPart, PartSpecification } from '@/book/Part';

export interface $Margin$ extends $Part$ { }

export class $Margin extends $Composition implements $Margin$ {
    partitions = [];
    chapters = [];
    sections = [];

    $Margin(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfMargin, '!')));
    }
}

export class $TypeOfMargin extends $TypeOfPart {
    override name = 'Margin';
    protected override specification: Specification<$Writing> = new MarginSpecification();
}

export class MarginSpecification extends PartSpecification {
}

export const Margin = $($Margin);
export const TypeOfMargin = $($TypeOfMargin);
