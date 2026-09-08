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
        super.$Section($check(block, $Block, '!').concat($check($TypeOfSummary, '!')));
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
