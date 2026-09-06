import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$ } from '@/reference/Reference';
import { $Composition } from '@/writing/Composition';
import { $IndexCard$, $TypeOfIndexCard, IndexCardSpecification } from '@/reference/IndexCard';
import { $Title, $TypeOfTitle } from './Title';

export interface $CatalogueCard$ extends $IndexCard$ { }

export class $CatalogueCard extends $Composition implements $CatalogueCard$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $CatalogueCard(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfCatalogueCard);
    }

    override meaning(): $Reference$ | undefined {
        return this.title()?.meaning();
    }
}

export class $TypeOfCatalogueCard extends $TypeOfIndexCard {
    override name = 'CatalogueCard';
    protected override specification: Specification<$Writing> = new CatalogueCardSpecification();
}

export class CatalogueCardSpecification extends IndexCardSpecification {
    @specify('a catalogue card carries the title of a book')
    $carriesTitle(writing: $Writing): void {
        $check(writing.searchFor($TypeOfTitle).length > 0,
            'a catalogue card carries the title of a book, and this one carries none');
    }
}

export const CatalogueCard = $($CatalogueCard);
export const TypeOfCatalogueCard = $($TypeOfCatalogueCard);
