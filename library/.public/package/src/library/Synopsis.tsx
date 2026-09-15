import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from './Document';
import { $Canonical, $TypeOfCanonical } from './Canonical';

export interface $Synopsis$ extends $Document$ {
    canonical(): $Canonical | undefined;
}

// A SYNOPSIS IS FOR A BOOK, and says which one. That is what makes one reusable: printed inside some
// other book it still names the book it is the synopsis OF, and can link back to it.
export class $Synopsis extends $Document implements $Synopsis$ {
    override parenthetical = true;
    canonical(): $Canonical | undefined { return this.searchForOne<$Canonical>($TypeOfCanonical); }

    $Synopsis(block: $Block) {
        super.$Document(this.addType(block, $TypeOfSynopsis));
    }
}

export class $TypeOfSynopsis extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new SynopsisSpecification();
}

export class SynopsisSpecification extends DocumentSpecification {
    @specify('a synopsis may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }

    // A SYNOPSIS SAYS WHAT IT IS FOR, AND IT IS DEMANDED — Doug, 2026-09-15: "have the specification
    // of Synopsis require the For, because it needs to work as a link". A synopsis is the one
    // document written to be read somewhere else, so the book it belongs to has to travel with it.
    @specify('a synopsis says the book it is for')
    $isFor(writing: $Writing): void {
        $check(writing.searchFor($TypeOfCanonical).length > 0,
            'a synopsis says the book it is for, and this one says nothing');
    }
}

export const Synopsis = $($Synopsis);
export const TypeOfSynopsis = $($TypeOfSynopsis);
