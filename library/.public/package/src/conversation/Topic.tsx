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
    // A TOPIC DRAWS NOWHERE, AND THIS IS UNFINISHED. Doug, 2026-09-16: "Leave topic as an annotation.
    // We are going to use it to index parts of conversations." So it is carried by the writing and
    // read by whatever asks, and it puts nothing on the page.
    //
    // WHAT IT IS HEADED TOWARDS, in his words the same day: a topic is going to be a kind of ALTERNATE,
    // possibly AUTO-GENERATED catalogue — one that adds cohesion to a library by gathering the parts of
    // conversations that are about the same thing, without anybody shelving a book for each. None of
    // that is built. What stands here is the annotation it has to be first.
    //
    // AND DRAWING IT WAS WRONG, MEASURED: a subject names the book that catalogues it and leads to that
    // book's page. Seven topics of Semantics of Types name subjects no book catalogues, so each fell
    // back to a page fragment nothing answered — seven dead links, and the binder's proof gate stopped
    // the build on them. The eighth, which names Semantic Reference Theory, resolved cleanly, which is
    // how we know the inheritance is right and only the drawing was wrong.
    override parenthetical = true;

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
