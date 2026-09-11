import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';
import { $Entry, $TypeOfEntry } from './Entry';

export interface $References$ extends $Document$ {
    entries(): $Entry[];
}

export class $References extends $Document implements $References$ {
    entries(): $Entry[] { return reflection.within<$Entry>(this, $TypeOfEntry); }

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
