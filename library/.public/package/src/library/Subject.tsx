import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

// WHAT THE BOOK IS ABOUT, AND IT NAMES ONE. A subject is a mention of the book that catalogues it,
// so a library can be asked whether every subject it holds has one — which no reading of a string
// could answer. It says one thing and names another the way an author does.
export interface $Subject$ extends $Catalogue$ { }

export class $Subject extends $Catalogue implements $Subject$ {
    $Subject(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfSubject));
    }
}

export class $TypeOfSubject extends $TypeOfCatalogue {
    protected override specification: Specification<$Writing> = new SubjectSpecification();
}

export class SubjectSpecification extends CatalogueSpecification { }

export const Subject = $($Subject);
export const TypeOfSubject = $($TypeOfSubject);
