import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

// WHO WROTE THE BOOK, AND IT NAMES ONE. An author is not a string on a cover: the arrow points at
// the book that is the account of them, so it is a mention like any other and says one thing while
// naming another — `[Doug](dougs-library-log)` draws Doug and names the log.
export interface $Author$ extends $Catalogue$ { }

export class $Author extends $Catalogue implements $Author$ {
    // AND THE BOOK IT NAMES IS A PAGE. An author is an autobiography — a book — so the arrow leads
    // out of this page and into that one, exactly as a book mention written in the prose does. Where
    // the library has not shelved it, the fragment stands: a name for a book that is not here yet
    // still says what it says, and will lead somewhere the day that book arrives.
    protected override address(): string { return this.standing() ?? super.address(); }

    $Author(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfAuthor));
    }
}

export class $TypeOfAuthor extends $TypeOfCatalogue {
    protected override specification: Specification<$Writing> = new AuthorSpecification();
}

export class AuthorSpecification extends CatalogueSpecification { }

export const Author = $($Author);
export const TypeOfAuthor = $($TypeOfAuthor);
