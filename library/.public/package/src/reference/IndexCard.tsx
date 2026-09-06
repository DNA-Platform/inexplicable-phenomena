import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$ } from '@/reference/Reference';
import { $Composition } from '@/writing/Composition';
import { $TypeOfHeading } from '@/writing/Heading';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Title, $TypeOfTitle } from '@/book/Title';

export interface $IndexCard$ extends $Section$ {
    title(): $Title | undefined;
}

export class $IndexCard extends $Composition implements $IndexCard$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $IndexCard(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfIndexCard);
    }

    override meaning(): $Reference$ | undefined {
        return this.title()?.meaning();
    }
}

export class $TypeOfIndexCard extends $TypeOfSection {
    override name = 'IndexCard';
    protected override specification: Specification<$Writing> = new IndexCardSpecification();
}

export class IndexCardSpecification extends SectionSpecification {
    @specify('an index card stands without a heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }

    @specify('an index card carries a title that means something')
    $titleMeansSomething(writing: $Writing): void {
        $check(writing.searchForOne<$Title>($TypeOfTitle)?.meaning() !== undefined,
            'an index card carries a title that means something, and this one carries none that does');
    }
}

export const IndexCard = $($IndexCard);
export const TypeOfIndexCard = $($TypeOfIndexCard);
