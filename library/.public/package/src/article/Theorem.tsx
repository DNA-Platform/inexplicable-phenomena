// CREATED 2026-09-08 · rating 3 · shell. A section whose heading is its label, numbered by a reading like $Equation; $kind (theorem / lemma / proof) is a proxy.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';

export interface $Theorem$ extends $Section$ {
    number(): number | undefined;
}

export class $Theorem extends $Composition implements $Theorem$ {
    $kind = 'theorem';

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    // ACROSS THE BOOK: a paper's Theorem 3 is the third in the paper, not the third in its section.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Theorem(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfTheorem, '!')));
    }
}

export class $TypeOfTheorem extends $TypeOfSection {
    override name = 'Theorem';
    protected override specification: Specification<$Writing> = new TheoremSpecification();
}

export class TheoremSpecification extends SectionSpecification {
}

export const Theorem = $($Theorem);
export const TypeOfTheorem = $($TypeOfTheorem);
