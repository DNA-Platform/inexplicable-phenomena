// CREATED 2026-09-08 · rating 3 · shell. LaTeX's \footnote — writing that stands at a phrase and is drawn at the foot. Two places, one piece of writing, and the base has no word for that yet: a $PageFold and a $Bookmark stand where they are, and this one does not. THAT is the finding this shell exists to make.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';

export interface $Footnote$ extends $Phrase$ {
    number(): number | undefined;
}

export class $Footnote extends $Composition implements $Footnote$ {
    // ACROSS THE BOOK for now. A paper restarts its footnotes per page and this reading cannot see
    // pages, which is the honest limit: numbering wants a HOLDER, and a page is not one here.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Footnote(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfFootnote, '!')));
    }

    // OWED: a mark where it stands and the note at the foot. Whether the foot is drawn by the chapter or by the theme is the open question, and it is the same one $Margin asks.
}

export class $TypeOfFootnote extends $TypeOfPhrase {
    override name = 'Footnote';
    protected override specification: Specification<$Writing> = new FootnoteSpecification();
}

export class FootnoteSpecification extends PhraseSpecification {
}

export const Footnote = $($Footnote);
export const TypeOfFootnote = $($TypeOfFootnote);
