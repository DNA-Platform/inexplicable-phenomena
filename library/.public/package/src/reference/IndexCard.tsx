import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';
import { $TypeOfPath } from './Path';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';

export interface $IndexCard$ extends $Section$ {
    name(): string;
    lines(): $Writing[];
}

export class $IndexCard extends $Composition implements $IndexCard$ {
    name(): string { return html.text(this.heading()?._block); }
    lines(): $Writing[] { return this.parts().filter(part => part !== this.heading()); }
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $IndexCard(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfIndexCard)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfIndexCard, '!')];
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Anchor = $(anchor);
        const url = html.text(reflection.means(this.heading() ?? this)?.searchForOne($TypeOfPath)?._block);

        return (
            <Anchor href={url}>
                <Block />
            </Anchor>
        );
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
}

export const IndexCard = $($IndexCard);
export const TypeOfIndexCard = $($TypeOfIndexCard);
const typeOfIndexCard = TypeOfIndexCard;
