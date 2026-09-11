import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';

export interface $References$ extends $Document$ { }

export class $References extends $Document implements $References$ {
    $References(block: $Block) {
        super.$Document(this.addType(block, $TypeOfReferences));
    }
}

export class $TypeOfReferences extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new ReferencesSpecification();
}

export class ReferencesSpecification extends DocumentSpecification {
}

export const References = $($References);
export const TypeOfReferences = $($TypeOfReferences);
