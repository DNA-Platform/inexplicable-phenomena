import { $, cache } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';

// A BOOK THAT CATALOGUES OTHER BOOKS, and its chapters are synopses of them. It is exported from
// `@dna-platform/public/library` and from nowhere else: `$Catalogue` is also what a mention is
// called one floor down in `reference`, and the two never meet because only that one is re-exported
// by `index`. The element is `Catalogues`, so a book says what it catalogues without colliding.
export class $Catalogue extends $Type {
    protected override specification: Specification<$Writing> = new CatalogueSpecification();

    constructor() {
        super();
        this[cache]('Catalogue');
    }
}

export class CatalogueSpecification extends WritingSpecification { }

export const Catalogues = $($Catalogue);
