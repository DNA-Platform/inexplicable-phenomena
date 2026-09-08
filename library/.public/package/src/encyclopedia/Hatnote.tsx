// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the encyclopedia sprint.
// A HATNOTE IS A PARAGRAPH that stands before a section's prose and points elsewhere ("This page is about…; for…, see…"). Today it lives in the demo (.wiki/.article/.hatnote.tsx) as $Hatnote extends $Paragraph with a format; promoted here as a kind, its look a group in EncyclopediaTheme (italic, indented).
// DEPENDS ON: $Composition, $TypeOfParagraph / ParagraphSpecification — designed for it (a kind is a shell over its level).
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';

export interface $Hatnote$ extends $Paragraph$ { }

export class $Hatnote extends $Composition implements $Hatnote$ {
    $Hatnote(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfHatnote, '!')));
    }
}

export class $TypeOfHatnote extends $TypeOfParagraph {
    override name = 'Hatnote';
    protected override specification: Specification<$Writing> = new HatnoteSpecification();
}

export class HatnoteSpecification extends ParagraphSpecification {
}

export const Hatnote = $($Hatnote);
export const TypeOfHatnote = $($TypeOfHatnote);
