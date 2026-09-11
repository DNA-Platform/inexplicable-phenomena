import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Citation$, $Citation, $TypeOfCitation, CitationSpecification } from '@/reference/Citation';

export interface $Footnote$ extends $Citation$ { }

export class $Footnote extends $Citation implements $Footnote$ {
    $Footnote(block: $Block) {
        super.$Citation(this.addType(block, $TypeOfFootnote));
    }
}

export class $TypeOfFootnote extends $TypeOfCitation {
    protected override specification: Specification<$Writing> = new FootnoteSpecification();
}

export class FootnoteSpecification extends CitationSpecification {
}

export const Footnote = $($Footnote);
export const TypeOfFootnote = $($TypeOfFootnote);
