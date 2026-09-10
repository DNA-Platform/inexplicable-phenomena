import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { $Section } from '@/writing/Section';

export interface $Summary$ extends $Section$ { }

export class $Summary extends $Section implements $Summary$ {
    override parenthetical = true;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Summary(block: $Block) {
        super.$Section(this.addType(block, $TypeOfSummary));
    }
}

export class $TypeOfSummary extends $TypeOfSection {

    // NO HEADING IS READ OUT OF IT. $TypeOfSection supplies one to any section opening without a
    // heading, which is right for a SECTION and wrong for everything that merely extends one — seen
    // on the probe page: this drew its own first sentence as a heading above itself, elided with an
    // ellipsis, and then said the whole thing again. $Quote met this first and the answer is the
    // same: the rule and the supply are two statements of one demand, and both have to be answered.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
    protected override specification: Specification<$Writing> = new SummarySpecification();
}

export class SummarySpecification extends SectionSpecification {
}

export const Summary = $($Summary);
export const TypeOfSummary = $($TypeOfSummary);
