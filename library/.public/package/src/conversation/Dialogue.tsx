// CREATED 2026-09-16 · rating 1 · IN PROGRESS. A CONVERSATION, AS A DOCUMENT — Doug: "Maybe Dialogue
// is the document and leave conversation as the folder and one-day name of the book." So a dialogue
// stands wherever a document stands: a chapter's page, a section of an article, a quotation in a
// log, or inside another dialogue. There is no book kind and none is owed — "conversation" is the
// folder's name, and one day the book's.
//
// IT KNOWS THE CAST, AND THAT IS ITS JOB. Doug: "I'm a participant! And we likely don't have to
// write that over and over again. We can't have each message declaring us." Being a participant is
// a fact about the conversation, not about any one message, so the cast is declared here once.
//
// AND IT IS LAYOUT. $Book is layout and chapters are logical parts; this is that one rung down.
// Claude's own chat is the proof: it does not label messages, it PLACES them — one participant in a
// bubble, one full width, nobody named. The speaker is a position, decided by the thing that holds
// the cast, which is why $Participant can be parenthetical and still do all the work.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';
import { $Exchange } from './Exchange';
import { $Participant, $TypeOfParticipant } from './Participant';
import { $Topic, $TypeOfTopic } from './Topic';

export interface $Dialogue$ extends $Document$ {
    readonly participants: $Participant[];
    readonly topics: $Topic[];

    said(exchange: $Exchange): $Participant | undefined;
}

export class $Dialogue extends $Document implements $Dialogue$ {
    // THE CAST, DECLARED ONCE. Read off the BLOCK, where an author writes annotations, and not off
    // the parts — a participant is an annotation and annotations never reach a parse at all.
    get participants(): $Participant[] { return this.searchFor<$Participant>($TypeOfParticipant); }
    // WHAT THIS MOVEMENT IS ABOUT, and there may be several. Nothing demands one: an unlabelled
    // movement is still a movement.
    get topics(): $Topic[] { return this.searchFor<$Topic>($TypeOfTopic); }

    $Dialogue(block: $Block) {
        super.$Document(this.addType(block, $TypeOfDialogue));
    }

    // SCAFFOLDED — WHO SPOKE THIS ONE, which is the question the dress asks and the one Doug has not
    // ruled. Three readings were put to him and none chosen: every exchange names its key; the
    // author marks only CHANGES and this fills the run; or the cast is cycled by position. It lives
    // HERE rather than on $Exchange because the dialogue is the only thing that knows the cast.
    //
    // WHAT IT DEPENDS ON, and neither was designed for this: the per-document SCRATCHPAD Doug raised
    // in Sprint 59 — $Scratchpad stands on $Book today and a dialogue that is a document has no book
    // — and, if the answer is the run rule, a reading of sibling order that does not cost O(n²).
    said(exchange: $Exchange): $Participant | undefined {
        throw new Error('not implemented: $Dialogue.said — which participant spoke an exchange, and the rule is owed');
    }
}

export class $TypeOfDialogue extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new DialogueSpecification();
}

// OWED — 'a dialogue names its cast'. Not written while `said` is a shell: a rule that demanded
// participants before anything could read them would refuse every scaffold written against it.
export class DialogueSpecification extends DocumentSpecification {
}

export const Dialogue = $($Dialogue);
export const TypeOfDialogue = $($TypeOfDialogue);
