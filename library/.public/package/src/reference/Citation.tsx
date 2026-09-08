// CREATED 2026-09-08 · rating 2 · shell. LaTeX's \cite and Wikipedia's [1] are one kind: writing that MEANS an entry and is drawn as that entry's number. OWED BY THE BASE and the reason this is the sprint's sharpest finding: the number is the entry's position, so a citation must read the References that holds it — the INVERSE of pointing, which nothing here computes. A reference knows where it points; nothing knows what points at it.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from './Reference';

export interface $Citation$ extends $Reference$ {
    number(): number | undefined;
}

export class $Citation extends $Reference implements $Citation$ {
    // ACROSS THE BOOK, because a citation's number is the same wherever in the text it stands.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Citation(block: $Block) {
        super.$Reference($check(block, $Block, '!').concat($check($TypeOfCitation, '!')));
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
