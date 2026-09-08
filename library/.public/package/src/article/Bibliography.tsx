// CREATED 2026-09-08 · rating 3 · shell. The chapter of entries a paper's citations mean — LaTeX's \bibliography, Wikipedia's reference list, one kind. Its entries are $ReferenceCards, which already exist, so this holds the ORDER that gives every citation its number and nothing else.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';
import { $TypeOfReferenceCard } from '@/reference/ReferenceCard';

export interface $Bibliography$ extends $Chapter$ {
    entries(): $Writing[];
}

export class $Bibliography extends $Composition implements $Bibliography$ {
    entries(): $Writing[] { return this.searchFor($TypeOfReferenceCard); }

    $Bibliography(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfBibliography, '!')));
    }

    // OWED: <section class="pd-bibliography"><ol> — an ordered list, because the order IS the numbering.
}

export class $TypeOfBibliography extends $TypeOfChapter {
    override name = 'Bibliography';
    protected override specification: Specification<$Writing> = new BibliographySpecification();
}

export class BibliographySpecification extends ChapterSpecification {
}

export const Bibliography = $($Bibliography);
export const TypeOfBibliography = $($TypeOfBibliography);
