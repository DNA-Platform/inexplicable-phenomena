// CREATED 2026-09-08 · rating 2 · shell. The chapter of entries a text's citations mean — LaTeX calls it a bibliography, Wikipedia a reference list, and they are one kind. IT LIVES IN reference/ RATHER THAN IN A BOOK TYPE, because cataloguing across levels is what this folder is for. Its entries are $ReferenceCards, which already exist, so this holds the ORDER that gives every citation its number and nothing else.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $Chapter, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';
import { $TypeOfReferenceCard } from '@/reference/ReferenceCard';

export interface $References$ extends $Chapter$ {
    entries(): $Writing[];
}

export class $References extends $Chapter implements $References$ {
    entries(): $Writing[] { return this.searchFor($TypeOfReferenceCard); }

    $References(block: $Block) {
        super.$Chapter($check(block, $Block, '!').concat($check($TypeOfReferences, '!')));
    }

    // OWED: <section class="pd-bibliography"><ol> — an ordered list, because the order IS the numbering.
}

export class $TypeOfReferences extends $TypeOfChapter {
    override name = 'References';
    protected override specification: Specification<$Writing> = new ReferencesSpecification();
}

export class ReferencesSpecification extends ChapterSpecification {
}

export const References = $($References);
export const TypeOfReferences = $($TypeOfReferences);
