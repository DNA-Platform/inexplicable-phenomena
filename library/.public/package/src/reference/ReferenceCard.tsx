import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Annotation, $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from './Reference';
import { $Path } from './Path';

export interface $ReferenceCard$ extends $Reference$ {
    references(): $Reference[];
    first(): $Reference | undefined;
    rest(): $Reference[];
}

export class $ReferenceCard extends $Reference implements $ReferenceCard$ {
    references(): $Reference[] {
        return (this._block.$elements ?? [])
            .filter((part): part is $Reference => part instanceof $Reference);
    }
    first(): $Reference | undefined { return this.references()[0]; }
    rest(): $Reference[] { return this.references().slice(1); }

    override path(): $Path | undefined { return super.path() ?? this.first()?.path(); }

    $ReferenceCard(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOfReferenceCard, '!')];
        super.$Reference(held);
    }

    override read(): Promise<$Writing> {
        const first = this.first();
        return first !== undefined ? first.read() : super.read();
    }
}

export class $TypeOfReferenceCard extends $TypeOfReference {
    override name = 'ReferenceCard';
    protected override specification: Specification<$Writing> = new ReferenceCardSpecification();
}

export class ReferenceCardSpecification extends ReferenceSpecification {
    @specify('a reference card is a list of references, the first canonical')
    $listOfReferences(writing: $Writing): void {
        const parts = (writing._block.$elements ?? [])
            .filter((part): part is $Writing => part instanceof $Writing);
        $check(parts.every(part => part instanceof $Reference || part instanceof $Annotation),
            'a reference card is a list of references, and this one holds something else');
        $check(parts.some(part => part instanceof $Reference),
            'a reference card is a list of references, and this one holds none');
    }

    @specify('a card wears its first reference — the canonical one')
    override $carriesPath(writing: $Writing): boolean | void {
        const first = (writing._block.$elements ?? [])
            .find((reference): reference is $Reference => reference instanceof $Reference);
        if (first?.path() !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a card says nothing of its own — its references are its substance')
    override $saysSomething(writing: $Writing): boolean | void {
        if ((writing._block.$elements ?? []).some(part => part instanceof $Reference)) return false;
        return super.$saysSomething(writing);
    }
}

export const ReferenceCard = $($ReferenceCard);
export const TypeOfReferenceCard = $($TypeOfReferenceCard);
const typeOfReferenceCard = TypeOfReferenceCard;
