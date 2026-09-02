import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Trait, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from './Composition';
import { $Sentence } from './Sentence';
import { $TypeOfParagraph } from './Paragraph';
import { html } from '@/utilities/Html';
import { Bullets } from '@/encyclopedia/Bullets';

export class $List extends $Composition<$Sentence> {
    $List(block: $Block) {
        super.$Composition(block);
        this._type = this.carried ?? $(<TypeOfList />);
    }

    override view(): ReactNode {
        const lines = html.text(this.block).split('\n').filter(line => line.trim() !== '');
        return <Bullets className={this.labels.join(' ')}>{lines.map((line, at) => <li key={at}>{line}</li>)}</Bullets>;
    }

    override frame(): ReactNode {
        return this.view();
    }
}

export class $TypeOfList extends $TypeOfParagraph {
    override code = 'Ls';

    override get canonicalForm(): typeof $Writing { return $List; }

    constructor() {
        super();
        this[cache]('List');
    }
}

export class $ListTrait extends $Trait {
    override get canonicalForm(): typeof $Writing { return $List; }

    constructor() {
        super();
        this[cache]('List');
    }

    protected override specification: Specification<$Writing> = new ListTraitSpecification();
}

export class ListTraitSpecification extends Specification<$Writing> {
    @specify('a list arranges a composition')
    $arrangesComposition(writing: $Writing): void {
        $check(writing instanceof $Composition, 'a list arranges a composition, and this writing is not one');
    }
}

export const List = $($List);
export const TypeOfList = $($TypeOfList);
export const ListTrait = $($ListTrait);
