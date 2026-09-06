import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';

export interface $Summary$ extends $Section$ { }

export class $Summary extends $Composition implements $Summary$ {
    override parenthetical = true;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Summary(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSummary);
    }
}

export class $TypeOfSummary extends $TypeOfSection {
    override name = 'Summary';
    protected override specification: Specification<$Writing> = new SummarySpecification();
}

export class SummarySpecification extends SectionSpecification {
}

export const Summary = $($Summary);
export const TypeOfSummary = $($TypeOfSummary);
