import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, $Type, TypedSpecification } from '@/writing/Writing';

export class $Path extends $Writing {
    override parenthetical = true;

    override get canonical(): boolean { return false; }

    $Path(block: $Block) {
        const Asked = $(TypeOfPath);
        this.type ??= $(<Asked />);
        super.$Writing(block);
    }
}

export class $TypeOfPath extends $Type {
    resolve = false;
    override name = 'Path';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new PathSpecification();
}

export class PathSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        broken: /\s/u
    };

    @specify('a path reads as a url')
    $readsAsUrl(writing: $Writing): void {
        const copy = writing.copy;
        $check(!this.patterns.broken.test(copy) && URL.canParse(copy, 'https://library'), 'a path reads as a url, and this one does not');
    }
}

export const Path = $($Path);
export const TypeOfPath = $($TypeOfPath);
