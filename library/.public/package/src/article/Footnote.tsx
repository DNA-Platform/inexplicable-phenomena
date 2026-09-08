// CREATED 2026-09-08 · rating 3 · shell. LaTeX's \footnote — writing that stands at a phrase and is drawn at the foot. Two places, one piece of writing, and the base has no word for that yet: a $PageFold and a $Bookmark stand where they are, and this one does not. THAT is the finding this shell exists to make.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Note$, $Note, $TypeOfNote, NoteSpecification } from '@/writing/Note';

export interface $Footnote$ extends $Note$ {
    number(): number | undefined;
}

export class $Footnote extends $Note implements $Footnote$ {
    // DRAWN AT THE FOOT AND NOT WHERE IT STANDS, which is what parenthetical already means.
    override parenthetical = true;

    // ACROSS THE BOOK for now. A paper restarts its footnotes per page and this reading cannot see
    // pages, which is the honest limit: numbering wants a HOLDER, and a page is not one here.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Footnote(block: $Block) {
        super.$Note($check(block, $Block, '!').concat($check($TypeOfFootnote, '!')));
    }

    // THE MARK IS NOT HERE and does not need to be: a footnote is ONE piece of writing, drawn at the
    // foot, and what stands in the prose is a $Reference to it — which the framework already has. The
    // question this shell used to carry, "two places, one writing", was the wrong question.
}

export class $TypeOfFootnote extends $TypeOfNote {
    override name = 'Footnote';
    protected override specification: Specification<$Writing> = new FootnoteSpecification();
}

export class FootnoteSpecification extends NoteSpecification {
}

export const Footnote = $($Footnote);
export const TypeOfFootnote = $($TypeOfFootnote);
