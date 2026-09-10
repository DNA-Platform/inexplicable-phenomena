// CREATED 2026-09-08 · rating 1. WRITING ABOUT THE WRITING, standing away from what it is about —
// a hatnote at the top, a footnote at the foot, a marginal note beside. It is in the base because
// TWO book types reached for it separately and neither could see the other: encyclopedia/Hatnote was
// built on $Paragraph and article/Footnote on $Phrase, which is one idea expressed twice unevenly.
//
// AND THE STRETCH PAYS TWICE. A footnote looked like it stood in two places at once — a mark in the
// prose and its text at the foot — which the base had no word for. It does not: THE NOTE IS THE
// WRITING and the mark is a REFERENCE to it, which the framework already has. Nothing new is needed
// for the hardest thing here, which is the test of whether the stretch was the right size.
// ===========================================================================================
// GREEN AS A PRIMITIVE — a note against this file, written 2026-09-08 and owed to Doug's test.
//
// If the primitives are red, yellow and blue and you meet green, adding green to the list because
// it tidies things up is the wrong move: the SEMANTICS OF COLOUR say green is a MIXTURE, and that
// orange and purple are coming. You complete the mixing rule, not the primitive list.
//
// THIS KIND IS GREEN. It is a level the framework already has, mixed with WHERE IT IS DRAWN — a
// dimension the framework never named. Five kinds are the same mixture and each was invented
// separately: $Aside (a section drawn beside), $Note (a paragraph drawn away), $Hatnote (a note
// drawn above), $Footnote (a note drawn at the foot), and $Margin, which was deleted for being
// nothing BUT that. Orange and purple are already visible: an endnote, a sidenote, an epigraph.
//
// The dimension is half-present and spelled three ways: `parenthetical` is a BOOLEAN saying not
// drawn HERE without saying where instead; $Book PLACES its cover, contents, index and footer by
// hand; and a format wraps a drawing to move it. One idea, three mechanisms, none of them named.
//
// IT EARNS ITS KEEP MEANWHILE — $Aside deleted four demo classes and two formats and the infobox
// now draws as a real <aside> — so it stands until the mixing rule exists, and this note is here
// so nobody mistakes it for a primitive.
// ===========================================================================================
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Note$ extends $Paragraph$ { }

export class $Note extends $Paragraph implements $Note$ {
    $Note(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfNote));
    }

    // It draws where it stands by default, which is a hatnote. A note drawn ELSEWHERE says so by
    // being parenthetical — the base's own word for writing that is present and not shown here.
}

export class $TypeOfNote extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new NoteSpecification();
}

export class NoteSpecification extends ParagraphSpecification {
}

export const Note = $($Note);
export const TypeOfNote = $($TypeOfNote);
