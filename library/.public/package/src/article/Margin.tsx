// CREATED 2026-09-08 · rating 3 · shell. The part holding what is not the article — header, sidebar, footer — drawn by the parts that use them. Base finding it waits on: parenthetical means invisible, not drawn elsewhere.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Part$, $TypeOfPart, PartSpecification } from '@/library/Part';

export interface $Margin$ extends $Part$ { }

export class $Margin extends $Composition implements $Margin$ {
    partitions = [];
    chapters = [];
    sections = [];

    $Margin(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfMargin, '!')));
    }
}

export class $TypeOfMargin extends $TypeOfPart {
    override name = 'Margin';
    protected override specification: Specification<$Writing> = new MarginSpecification();
}

export class MarginSpecification extends PartSpecification {
}

export const Margin = $($Margin);
export const TypeOfMargin = $($TypeOfMargin);
