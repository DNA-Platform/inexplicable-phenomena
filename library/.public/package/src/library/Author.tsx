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

    // AND AN AUTHOR WHO WROTE THE BOOK YOU ARE READING IS NOT A LINK. Wikipedia calls this a
    // self-link and draws it as plain text, because an anchor leading where the reader already is
    // takes them nowhere: on MY Library Log, "Author: Doug" pointed at MY Library Log. Only the
    // anchor is withdrawn — the label still stands, still copyable, and still MEANS the book.
    protected override leads(): string { return this.itself ? '' : super.leads(); }

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
