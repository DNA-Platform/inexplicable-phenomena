import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Phrase, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';

export class $Path extends $Phrase {
    override parenthetical = true;

    override get canonical(): boolean { return false; }

    $Path(block: $Html<'block'>) {
        super.$Phrase(block);
        this.type = $(<TypeOfPath />) as $TypeOfPath;
    }
}

export class $TypeOfPath extends $TypeOfPhrase {
    override get canonicalForm(): typeof $Writing { return $Path; }

    constructor() {
        super();
        this[cache]('Path');
    }

    protected override specification: Specification<$Writing> = new PathSpecification();
}

export class PathSpecification extends PhraseSpecification {
    @specify('a path reads as a url')
    $readsAsUrl(writing: $Writing): void {
        const copy = writing.copy;
        $check(!this.patterns.broken.test(copy) && URL.canParse(copy, 'https://library'), 'a path reads as a url, and this one does not');
    }
}

export const Path = $($Path);
export const TypeOfPath = $($TypeOfPath);
