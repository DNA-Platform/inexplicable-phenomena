// CREATED 2026-09-08 · rating 3. A NOTE AT THE TOP, pointing elsewhere — "For other uses, see…".
// It extends writing/Note rather than $Paragraph, because a hatnote and a footnote are one idea and
// were built twice: what is Wikipedia's is WHERE it stands and what it says, not that it is a note.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Note$, $Note, $TypeOfNote, NoteSpecification } from '@/writing/Note';

export interface $Hatnote$ extends $Note$ { }

export class $Hatnote extends $Note implements $Hatnote$ {
    $Hatnote(block: $Block) {
        super.$Note($check(block, $Block).concat($check($TypeOfHatnote, '!')));
    }
}

export class $TypeOfHatnote extends $TypeOfNote {
    override name = 'Hatnote';
    protected override specification: Specification<$Writing> = new HatnoteSpecification();
}

export class HatnoteSpecification extends NoteSpecification {
}

export const Hatnote = $($Hatnote);
export const TypeOfHatnote = $($TypeOfHatnote);
