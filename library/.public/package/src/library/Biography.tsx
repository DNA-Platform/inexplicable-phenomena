import { $, cache } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';

// A KIND OF BOOK, CARRIED RATHER THAN DERIVED — a book does not become a class to be a biography, it
// carries the type. It stands under $Type and NOT under $TypeOfBook, because a type beneath the
// composition hierarchy is a LEVEL, and a cover carrying one stands as two kinds at once. It files
// itself under its name, so an author may write `<Type>Biography</Type>` and the name resolves here.
export class $Biography extends $Type {
    protected override specification: Specification<$Writing> = new BiographySpecification();

    constructor() {
        super();
        this[cache]('Biography');
    }
}

export class BiographySpecification extends WritingSpecification { }

export const Biography = $($Biography);
