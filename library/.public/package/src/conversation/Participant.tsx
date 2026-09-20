// CREATED 2026-09-15 · rating 1. WHO IS SPEAKING, AND IT NAMES THE BOOK THAT IS THE ACCOUNT OF THEM
// — Doug, 2026-09-13: "A reference the exchange carries, like the author tag, that points to a
// biography." · "In my library, I write about you and you get a participant link to my story of you
// whereas I am the author and my participant link goes to my story of me — which is my author
// infrastructure." So a participant is an author's twin and is written the same way: it SAYS a name
// and NAMES a book, `[Claude](Claude & Our Projects)`.
//
// EVERYONE IN A CONVERSATION HAS A BIOGRAPHY HERE; THE AUTHOR IS THE ONE WHO WROTE THEM. That is
// the whole of the difference between this kind and $Author, and it is why they are two kinds
// rather than one with a flag: an author is the participant the book's cover names.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

export interface $Participant$ extends $Catalogue$ { }

export class $Participant extends $Catalogue implements $Participant$ {
    $Participant(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfParticipant));
    }
}

export class $TypeOfParticipant extends $TypeOfCatalogue {
    protected override specification: Specification<$Writing> = new ParticipantSpecification();
}

export class ParticipantSpecification extends CatalogueSpecification {
}

export const Participant = $($Participant);
export const TypeOfParticipant = $($TypeOfParticipant);
