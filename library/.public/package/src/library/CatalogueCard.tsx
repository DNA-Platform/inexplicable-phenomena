import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Title, $TypeOfTitle } from './Title';

export interface $CatalogueCard$ extends $Composition$ {
    title(): $Title | undefined;
}

export class $CatalogueCard extends $Composition implements $CatalogueCard$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $CatalogueCard(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfCatalogueCard));
    }
}

export class $TypeOfCatalogueCard extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new CatalogueCardSpecification();
}

export class CatalogueCardSpecification extends SectionSpecification {
    @specify('a catalogue card stands without a heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }

    @specify('a catalogue card carries the title of a book')
    $carriesTitle(writing: $Writing): void {
        $check(writing.searchFor($TypeOfTitle).length > 0,
            'a catalogue card carries the title of a book, and this one carries none');
    }
}

export const CatalogueCard = $($CatalogueCard);
export const TypeOfCatalogueCard = $($TypeOfCatalogueCard);
