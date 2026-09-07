import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$ } from '@/reference/Reference';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Title, $TypeOfTitle } from '@/book/Title';

export interface $IndexCard$ extends $Composition$ {
    title(): $Title | undefined;
}

export class $IndexCard extends $Composition implements $IndexCard$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $IndexCard(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfIndexCard, '!')));
    }

    override get meaning(): $Reference$ | undefined { return this.title()?.meaning; }
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

    @specify('an index card carries what it stands for, and composes nothing of its own')
    override $composesWhatItHolds(): boolean | void {
        return false;
    }

    @specify('an index card carries a title that means something')
    $titleMeansSomething(writing: $Writing): void {
        $check(writing.searchForOne<$Title>($TypeOfTitle)?.meaning !== undefined,
            'an index card carries a title that means something, and this one carries none that does');
    }
}

export const IndexCard = $($IndexCard);
export const TypeOfIndexCard = $($TypeOfIndexCard);
