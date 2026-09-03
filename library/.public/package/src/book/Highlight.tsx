import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { Specification, specify } from '@/utilities/Specification';
import { $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';

export class $Highlight extends $Reference {
    get pair(): [$Reference, $Reference] | undefined {
        const ends = (this.block?.$elements ?? []).filter((one): one is $Reference => one instanceof $Reference);
        return ends.length === 2 ? [ends[0], ends[1]] : undefined;
    }

    get beginning(): $Reference | undefined { return this.pair?.[0]; }
    get ending(): $Reference | undefined { return this.pair?.[1]; }

    $Highlight(block: $Block) {
        const Asked = $(TypeOfHighlight);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }

    override async read(): Promise<$Writing> {
        const beginning = this.beginning?.path?.copy.split('/').pop();
        const ending = this.ending?.path?.copy.split('/').pop();
        const on = this.parent;
        if (beginning !== undefined && ending !== undefined && on instanceof $Composition) {
            const [kind, first] = beginning.split(':');
            return on.catalogue().follow(`${kind}:${first}-${ending.split(':')[1]}`);
        }
        return super.read();
    }
}

export class $TypeOfHighlight extends $TypeOfReference {
    override name = 'Highlight';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new HighlightSpecification();
}

export class HighlightSpecification extends ReferenceSpecification {
    @specify('a highlight stands on its pair, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Highlight && writing.pair !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a highlight says nothing of its own — its pair is its substance')
    override $mustHaveText(writing: $Writing): boolean | void {
        if (writing instanceof $Highlight && writing.pair !== undefined) return false;
        return super.$mustHaveText(writing);
    }

    @specify('a highlight holds nothing but its pair')
    override $hasWriting(writing: $Writing): boolean | void {
        if (writing instanceof $Highlight && writing.pair !== undefined) return false;
        return super.$hasWriting(writing);
    }

    @specify('a highlight is a pair of references of the same kind')
    $sameKind(writing: $Writing): void {
        if (!(writing instanceof $Highlight)) return;
        const pair = writing.pair;
        $check(pair !== undefined, 'a highlight is a pair of references, and this one does not hold two');
        const kinds = (pair ?? []).map(end => end.path?.copy.split('/').pop()?.split(':')[0]);
        $check(kinds[0] !== undefined && kinds[0] === kinds[1],
            'a highlight is a pair of references of the same kind, and these two ends disagree');
    }
}

export const Highlight = $($Highlight);
export const TypeOfHighlight = $($TypeOfHighlight);
