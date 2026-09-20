import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

// WHO WROTE THE BOOK, AND IT NAMES ONE. An author is not a string on a cover: the arrow points at
// the book that is the account of them, so it is a mention like any other and says one thing while
// naming another — `[Doug](dougs-library-log)` draws Doug and names the log.
export interface $Author$ extends $Catalogue$ { }

export class $Author extends $Catalogue implements $Author$ {
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
