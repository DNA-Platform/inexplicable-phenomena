// CREATED 2026-09-16 · rating 1. ONE PARTICIPANT'S CONTRIBUTION — Doug, 2026-09-13: "Exchange is
// better", ruling the name for exactly this, and again 2026-09-16: "an Exchange is more like a
// turn." An exchange IS a section, so it holds everything a section holds: paragraphs, quotes,
// fenced code, lists, tables, figures, asides, and a dialogue nested inside it. None of that is
// declared here, because none of it has to be.
//
// ITS TYPE IS A SECTION TYPE, which is the same thing $Aside and $Quote are. An exchange is a
// COMPOSITION, so its type stands where the compositions' types stand.
//
// THIS WAS BUILT WRONG FIRST AND THE CORRECTION IS DOUG'S, 2026-09-16: "They are parts. They don't
// understand what annotative is. It's a more abstract form of annotation." The 2026-09-13 design
// called this kind's type ANNOTATIVE, meaning only that it stands outside the levels ladder — but
// annotative means what it says: $TypeOfFormat, $TypeOfPath, $TypeOfCatalogue and $TypeOfFold are
// types OF ANNOTATIONS, because $Format and the rest extend $Annotation. Parser.tokens filters
// annotations out before the parse begins, so an annotation is never a part at all. A quote in an
// exchange is a PART. The two questions are not the same question and this kind had them crossed.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $Participant, $TypeOfParticipant } from './Participant';

export interface $Exchange$ extends $Section$ {
    participants(): $Participant[];
}

export class $Exchange extends $Section implements $Exchange$ {
    // WHO IS SPEAKING, AND IT IS GENERALLY MORE THAN ONE — Doug, 2026-09-16: "An exchange can have a
    // sequence but generally one per conversation participant." So an exchange is a ROUND, not a
    // single contribution, and asking it for ONE participant would be asking the wrong question.
    // It reads the BLOCK rather than the parts, because a participant is an annotation an author
    // writes in and not something the parse makes — the same place $Section reads its annotations.
    participants(): $Participant[] { return this.searchFor<$Participant>($TypeOfParticipant); }

    $Exchange(block: $Block) {
        super.$Section(this.addType(block, $TypeOfExchange));
    }
}

export class $TypeOfExchange extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new ExchangeSpecification();
}

export class ExchangeSpecification extends SectionSpecification {
    // THE ONE RULE THAT IS NEVER WAIVED, AND IT COUNTS NOTHING. An exchange is somebody's; one
    // nobody spoke is a section that has been mislabelled, and a transcript made of those is not a
    // transcript. How MANY is not a rule — "generally one per conversation participant" is what a
    // conversation generally does, and a rule that demanded it would refuse the ordinary case where
    // somebody says two things before anyone answers.
    @specify('an exchange is spoken')
    $isSpoken(writing: $Writing): void {
        $check((writing as $Exchange).participants().length > 0,
            'an exchange is spoken, and nobody spoke this one');
    }
}

export const Exchange = $($Exchange);
export const TypeOfExchange = $($TypeOfExchange);
