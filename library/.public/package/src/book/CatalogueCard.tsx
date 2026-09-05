import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference } from '@/reference/Reference';
import { $Composition } from '@/writing/Composition';
import { $IndexCard$, $TypeOfIndexCard, IndexCardSpecification } from '@/reference/IndexCard';
import { $TypeOfHeading } from '@/writing/Heading';
import { $Title, $TypeOfTitle } from './Title';

export interface $CatalogueCard$ extends $IndexCard$ {
    title(): $Title | undefined;
    reference(): $Reference$ | undefined;
}

export class $CatalogueCard extends $Composition implements $CatalogueCard$ {
    name(): string { return html.text(this.title()?._block); }
    lines(): $Writing[] { return this.parts().filter(part => part !== this.title()); }
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    reference(): $Reference$ | undefined {
        return this.heading()?.searchForOne<$Reference>($TypeOfReference)
            ?? this.searchForOne<$Reference>($TypeOfReference);
    }

    $CatalogueCard(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfCatalogueCard)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfCatalogueCard, '!')];
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Anchor = $(anchor);
        const url = html.text(this.reference()?.path()?._block);

        return (
            <Anchor href={url}>
                <Block />
            </Anchor>
        );
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
const typeOfCatalogueCard = TypeOfCatalogueCard;
