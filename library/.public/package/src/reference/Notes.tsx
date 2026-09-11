import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';

export interface $Notes$ extends $Document$ { }

export class $Notes extends $Document implements $Notes$ {
    $Notes(block: $Block) {
        super.$Document(this.addType(block, $TypeOfNotes));
    }
}

export class $TypeOfNotes extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new NotesSpecification();
}

export class NotesSpecification extends DocumentSpecification {
}

export const Notes = $($Notes);
export const TypeOfNotes = $($TypeOfNotes);
