// CREATED 2026-09-08 · rating 1. WRITING ABOUT THE WRITING, standing away from what it is about —
// a hatnote at the top, a footnote at the foot, a marginal note beside. It is in the base because
// TWO book types reached for it separately and neither could see the other: encyclopedia/Hatnote was
// built on $Paragraph and article/Footnote on $Phrase, which is one idea expressed twice unevenly.
//
// AND THE STRETCH PAYS TWICE. A footnote looked like it stood in two places at once — a mark in the
// prose and its text at the foot — which the base had no word for. It does not: THE NOTE IS THE
// WRITING and the mark is a REFERENCE to it, which the framework already has. Nothing new is needed
// for the hardest thing here, which is the test of whether the stretch was the right size.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Note$ extends $Paragraph$ { }

export class $Note extends $Composition implements $Note$ {
    $Note(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfNote, '!')));
    }

    // It draws where it stands by default, which is a hatnote. A note drawn ELSEWHERE says so by
    // being parenthetical — the base's own word for writing that is present and not shown here.
}

export class $TypeOfNote extends $TypeOfParagraph {
    override name = 'Note';
    protected override specification: Specification<$Writing> = new NoteSpecification();
}

export class NoteSpecification extends ParagraphSpecification {
}

export const Note = $($Note);
export const TypeOfNote = $($TypeOfNote);
