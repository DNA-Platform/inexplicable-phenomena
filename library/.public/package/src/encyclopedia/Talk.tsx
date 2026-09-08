// CREATED 2026-09-08 · rating 3 · shell. THE TALK PAGE — the account of how an article came to say
// what it says, which every Wikipedia article is paired with by construction. A topic is an ordinary
// $Section; what the base has no word for is the COMMENT: signed, and holding the replies to it.
//
// THREADING IS COMPOSITION, NOT INDENTATION. Wikipedia writes depth with leading colons and the
// framework would let us copy that with $indent — but a reply IS part of the comment it answers, so
// it composes. That fits the seven levels instead of fighting them, and it is the one thing here
// worth checking before any of it is built.
//
// OWED BY THE BASE, and it is the same gap the References has: nothing reads backwards. A comment is
// signed by a user page it MEANS, and a user's contributions are every comment that means them —
// which is the inverse of pointing, and nothing computes it.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';

export interface $Talk$ extends $Chapter$ {
    topics(): $Writing[];
}

export class $Talk extends $Composition implements $Talk$ {
    topics(): $Writing[] { throw new Error('not implemented: $Talk.topics — the sections it holds, each one a discussion'); }

    $Talk(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfTalk, '!')));
    }
}

export class $TypeOfTalk extends $TypeOfChapter {
    override name = 'Talk';
    protected override specification: Specification<$Writing> = new TalkSpecification();
}

export class TalkSpecification extends ChapterSpecification {
}

export interface $Comment$ extends $Paragraph$ {
    replies(): $Comment[];
}

// A COMMENT IS SIGNED AND HOLDS ITS REPLIES. The signature is a $Reference to a user page plus a
// time — OPEN: is that a kind of its own, or two props here? A kind, if a signature is ever read
// on its own; two props, if it is only ever drawn. Nothing in the demos decides it yet.
export class $Comment extends $Composition implements $Comment$ {
    replies(): $Comment[] { throw new Error('not implemented: $Comment.replies — the comments composed into this one, which is what threading IS'); }

    $Comment(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfComment, '!')));
    }
}

export class $TypeOfComment extends $TypeOfParagraph {
    override name = 'Comment';
    protected override specification: Specification<$Writing> = new CommentSpecification();
}

export class CommentSpecification extends ParagraphSpecification {
    // OWED: 'a comment is signed' — an unsigned comment is the one thing a talk page does not admit.
}

export const Talk = $($Talk);
export const TypeOfTalk = $($TypeOfTalk);
export const Comment = $($Comment);
export const TypeOfComment = $($TypeOfComment);
