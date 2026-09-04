import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Writing, $Trait } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Reference, $TypeOfReference, ReferenceSpecification } from './Reference';
import { $Path } from './Path';

export interface $ReferenceCard$ {
    get references(): $Reference[];
    get first(): $Reference | undefined;
    get rest(): $Reference[];
}

export class $ReferenceCard extends $Reference implements $ReferenceCard$ {
    get references(): $Reference[] {
        return (this.block?.$elements ?? []).filter((one): one is $Reference => one instanceof $Reference);
    }

    get first(): $Reference | undefined { return this.references[0]; }
    get rest(): $Reference[] { return this.references.slice(1); }

    override get path(): $Path | undefined { return super.path ?? this.first?.path; }

    $ReferenceCard(block: $Block) {
        const Asked = $(TypeOfReferenceCard);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }

    override read(): Promise<$Writing> {
        const first = this.first;
        return first !== undefined ? first.read() : super.read();
    }
}

export class $TypeOfReferenceCard extends $TypeOfReference {
    override name = 'ReferenceCard';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new ReferenceCardSpecification();
}

export class $Card extends $Trait {
    override name = 'Card';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new CardSpecification();
}

export class ReferenceCardSpecification extends ReferenceSpecification {
    @specify('a reference card is a list of references, the first canonical')
    $listOfReferences(writing: $Writing): void {
        const inside = (writing.block?.$elements ?? []).filter((one): one is $Writing => one instanceof $Writing);
        $check(inside.every(one => one instanceof $Reference || one.parenthetical),
            'a reference card is a list of references, and this one holds something else');
        $check(inside.some(one => one instanceof $Reference),
            'a reference card is a list of references, and this one holds none');
    }

    @specify('a card wears its first reference — the canonical one')
    override $carriesPath(writing: $Writing): boolean | void {
        const first = (writing.block?.$elements ?? []).find((one): one is $Reference => one instanceof $Reference);
        if (first?.path !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a card says nothing of its own — its references are its substance')
    override $mustHaveText(writing: $Writing): boolean | void {
        const held = (writing.block?.$elements ?? []).some(one => one instanceof $Reference);
        if (held) return false;
        return super.$mustHaveText(writing);
    }

    @specify('a card holds nothing but its references')
    override $hasWriting(writing: $Writing): boolean | void {
        const held = (writing.block?.$elements ?? []).some(one => one instanceof $Reference);
        if (held) return false;
        return super.$hasWriting(writing);
    }
}

export class CardSpecification extends ReferenceCardSpecification {
    @specify('a card is worn by a reference')
    $wornByAReference(writing: $Writing): void {
        $check(reflection.is(writing, $TypeOfReference) || writing instanceof $Reference,
            'a card is worn by a reference, and this writing is not one');
    }
}

export const ReferenceCard = $($ReferenceCard);
export const TypeOfReferenceCard = $($TypeOfReferenceCard);
export const Card = $($Card);
