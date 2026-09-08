// CREATED 2026-09-08 · rating 3 · shell. A paragraph before a section's prose that points elsewhere, promoted from the demo.
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
