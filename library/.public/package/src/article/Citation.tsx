// CREATED 2026-09-08 · rating 3 · shell. LaTeX's \cite — writing that MEANS a bibliography entry and is drawn as its number. A citation is a reference (Sprint 48: a mention that also knows where), so it extends one rather than inventing a second way to point. Owed by the base: a numbering that is a READING over the bibliography, never a stored field — the shape $Equation and $Theorem also want.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';

export interface $Citation$ extends $Reference$ {
    number(): number | undefined;
}

export class $Citation extends $Reference implements $Citation$ {
    number(): number | undefined {
        throw new Error('not implemented: $Citation.number — the entry it means, read in the bibliography, in the order the bibliography holds them');
    }

    $Citation(block: $Block) {
        super.$Reference($check(block, $Block).concat($check($TypeOfCitation, '!')));
    }

    // OWED: <a class="pd-citation" href="#entry">[n]</a> — the number is drawn, the copy is not.
}

export class $TypeOfCitation extends $TypeOfReference {
    override name = 'Citation';
    protected override specification: Specification<$Writing> = new CitationSpecification();
}

export class CitationSpecification extends ReferenceSpecification {
    // OWED: 'a citation means an entry its bibliography holds' — a citation of nothing is not admitted, which is what makes the number answerable.
}

export const Citation = $($Citation);
export const TypeOfCitation = $($TypeOfCitation);
