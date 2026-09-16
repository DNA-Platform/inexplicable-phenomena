// CREATED 2026-09-15 · rating 1. WHAT AN EXCHANGE IS ABOUT, AND IT NAMES A BOOK — Doug, 2026-09-13:
// "Topic should be more like an annotation. A type of subject for a conversation / dialogue. But
// they might correspond to secondary cataloguing books." A subject is already exactly that: a
// mention of the book that catalogues it, saying one thing and naming another. So a topic is a kind
// of subject and inherits the whole of it — where it leads, and its silence when it names the book
// being read — and adds only its own type, which is what lets an exchange be asked for its topics.
//
// AND AN EXCHANGE MAY CARRY SEVERAL — Doug, 2026-09-15: "an exchange is a chapter and it can have
// many topics", which is why nothing here demands one and why Subject's one-of-a-kind reading is
// not borrowed. A conversation that never named a topic is still a conversation.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Subject$, $Subject, $TypeOfSubject, SubjectSpecification } from '@/library/Subject';

export interface $Topic$ extends $Subject$ { }

export class $Topic extends $Subject implements $Topic$ {
    $Topic(block: $Block) {
        super.$Subject(this.addType(block, $TypeOfTopic));
    }
}

export class $TypeOfTopic extends $TypeOfSubject {
    protected override specification: Specification<$Writing> = new TopicSpecification();
}

export class TopicSpecification extends SubjectSpecification {
}

export const Topic = $($Topic);
export const TypeOfTopic = $($TypeOfTopic);
