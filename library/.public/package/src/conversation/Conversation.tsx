// CREATED 2026-09-16 · rating 1 · IN PROGRESS. THE BOOK A CONVERSATION IS — Doug: "Do have the
// Conversation book made." It was deleted earlier the same day on his word that a conversation was
// the FOLDER and one day the book's name; the day it stopped being one day is the day the app
// arrived, because everything he then asked for is a book's job.
//
// BOOK IS LAYOUT, AND THIS IS THE LAYOUT THAT HAS TO MOVE. Doug: "Let's have chapters too that
// appear in and out, so you can switch between the chapters of your exchange with the breadcrumbs.
// That way the whole thing won't have to load. Conversations are huge. We have to be performance."
// A chapter answers WHAT; a book answers WHERE — and here it also answers WHEN, because which
// chapters stand is the one thing a conversation cannot decide per chapter.
//
// THE NUMBER THAT MAKES IT NECESSARY, measured 2026-09-16 on the first conversation imported:
// 185 KB of source across eight chapters, the largest of them 52 KB and 23 exchanges, against a
// whole library page of ~100 KB today. One conversation outweighs every other book here together,
// and there are 465 of them.
//
// `$Conversation` IS A PROXY NAME, flagged for Doug.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Book$, $Book, $TypeOfBook, BookSpecification } from '@/library/Book';

export interface $Conversation$ extends $Book$ { }

export class $Conversation extends $Book implements $Conversation$ {
    $Conversation(block: $Block) {
        super.$Book(this.addType(block, $TypeOfConversation));
    }
}

export class $TypeOfConversation extends $TypeOfBook {
    protected override specification: Specification<$Writing> = new ConversationSpecification();
}

// OWED — 'a conversation names its cast'. Not written while the cast still stands on the DIALOGUE
// rather than on the book, which is where a reader looks for it and where a sidebar would ask.
export class ConversationSpecification extends BookSpecification {
}

export const Conversation = $($Conversation);
export const TypeOfConversation = $($TypeOfConversation);
