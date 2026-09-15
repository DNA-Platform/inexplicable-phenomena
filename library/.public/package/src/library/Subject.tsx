import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Catalogue$, $Catalogue, $TypeOfCatalogue, CatalogueSpecification } from '@/reference/Catalogue';

// WHAT THE BOOK IS ABOUT, AND IT NAMES ONE. A subject is a mention of the book that catalogues it,
// so a library can be asked whether every subject it holds has one — which no reading of a string
// could answer. It says one thing and names another the way an author does.
export interface $Subject$ extends $Catalogue$ { }

export class $Subject extends $Catalogue implements $Subject$ {
    // AND THE CATALOGUE IT NAMES IS A PAGE. A subject exists as a catalogue of the same name, and a
    // catalogue is a book — Doug, 2026-09-15: "the subject has to be a link to the subject
    // catalogue… we need it to have a connected library." So the arrow leads to that book's page,
    // and falls back to the fragment where the library has not shelved one.
    protected override address(): string { return this.standing() ?? super.address(); }

    // AND A SUBJECT CATALOGUED BY THE BOOK YOU ARE READING IS NOT A LINK. The one book filed under
    // its own subject is the summit of a personal library, so on that page the subject names the
    // page itself — measured 2026-09-15, `<a href="/">Doug</a>` served from `/`. It says what it
    // says and means what it means; only the anchor goes.
    protected override leads(): string { return this.itself ? '' : super.leads(); }

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
