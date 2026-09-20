import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

// WHAT A WRITING IS FOR, AND IT NAMES ONE BOOK. Doug, 2026-09-15: "canonicals are uniquely
// associated with something so they are always FOR it" — which is why the element is `For` and the
// kind is the canonical. A synopsis says the book it is the synopsis OF, so a synopsis printed in
// some other book still knows what to link back to, and a book's own synopsis is the one that
// names it. It is a mention like an author or a subject: it names a book and it draws what it says.
export interface $Canonical$ extends $Catalogue$ { }

export class $Canonical extends $Catalogue implements $Canonical$ {
    $Canonical(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfCanonical));
    }
}

export class $TypeOfCanonical extends $TypeOfCatalogue {
    protected override specification: Specification<$Writing> = new CanonicalSpecification();
}

export class CanonicalSpecification extends CatalogueSpecification { }

export const For = $($Canonical);
export const TypeOfCanonical = $($TypeOfCanonical);
