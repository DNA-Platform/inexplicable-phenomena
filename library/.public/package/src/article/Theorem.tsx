// CREATED 2026-09-08 · rating 3 · shell. A section whose heading is its label, numbered by a reading like $Equation; $kind (theorem / lemma / proof) is a proxy.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';

export interface $Theorem$ extends $Section$ {
    number(): number | undefined;
}

export class $Theorem extends $Section implements $Theorem$ {
    $kind = 'theorem';

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    // ACROSS THE BOOK: a paper's Theorem 3 is the third in the paper, not the third in its section.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Theorem(block: $Block) {
        super.$Section(this.addType(block, $TypeOfTheorem));
    }
}

export class $TypeOfTheorem extends $TypeOfSection {

    // NO HEADING IS READ OUT OF IT. $TypeOfSection supplies one to any section opening without a
    // heading, which is right for a SECTION and wrong for everything that merely extends one — seen
    // on the probe page: this drew its own first sentence as a heading above itself, elided with an
    // ellipsis, and then said the whole thing again. $Quote met this first and the answer is the
    // same: the rule and the supply are two statements of one demand, and both have to be answered.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
    override name = 'Theorem';
    protected override specification: Specification<$Writing> = new TheoremSpecification();
}

export class TheoremSpecification extends SectionSpecification {
}

export const Theorem = $($Theorem);
export const TypeOfTheorem = $($TypeOfTheorem);
