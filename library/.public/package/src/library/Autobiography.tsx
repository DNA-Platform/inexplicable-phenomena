import { $, cache } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Biography, BiographySpecification } from './Biography';

// THE BIOGRAPHY WHOSE AUTHOR DOES NOT LEAVE IT. It specialises $Biography, so a book carrying it is
// a biography by ordinary inheritance and `<Biography>Autobiography</Biography>` answers one — a key
// climbs into every type above it, which is what makes the hierarchy askable without a member.
export class $Autobiography extends $Biography {
    protected override specification: Specification<$Writing> = new AutobiographySpecification();

    constructor() {
        super();
        this[cache]('Autobiography');
    }
}

export class AutobiographySpecification extends BiographySpecification { }

export const Autobiography = $($Autobiography);
