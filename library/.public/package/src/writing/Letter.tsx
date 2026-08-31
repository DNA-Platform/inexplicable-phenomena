import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$ } from './Composition';

export class $Letter extends $Writing implements $Composition$<$Letter> {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic' = 'symbolic';
    case: 'uppercase' | 'lowercase' = 'lowercase';

    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };

    parts(): $Letter[] { return [this]; }
    override get canonical(): boolean { return this.kind === 'alphabetical'; }

    $Letter(block: $Html<'block'>) {
        super.$Writing(block);
        this.build();
        this.type = $(<TypeOfLetter />) as $TypeOfLetter;
    }

    where(match: (part: $Letter) => boolean): $Letter[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Letter) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Letter) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Letter) => boolean): $Letter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    override bind(writing: $Writing) {
        super.bind(writing);
        this.build();
    }

    protected build(): void {
        const copy = this.copy;
        this.kind = 'symbolic';
        if (this.patterns.alphabetical.test(copy))
            this.kind = 'alphabetical';
        else if (this.patterns.numeric.test(copy))
            this.kind = 'numeric';
        else if (this.patterns.whitespace.test(copy))
            this.kind = 'whitespace';
        else if (this.patterns.punctuation.test(copy))
            this.kind = 'punctuation';

        this.case = copy !== copy.toLowerCase() ? 'uppercase' : 'lowercase';
    }
}

export class $TypeOfLetter extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Letter; }

    constructor() {
        super();
        this[cache]('Letter');
    }

    protected override specification: Specification<$Writing> = new LetterSpecification();
}

class LetterSpecification extends TypedSpecification<$Writing> {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    @specify('a letter is one grapheme')
    $oneCharacter(writing: $Writing): void {
        const copy = writing.copy;
        $check(this.graphemes.segment(copy).containing(0)?.segment === copy, 'a letter is one grapheme, and this one is not');
    }
}

export const Letter = $($Letter);
export const TypeOfLetter = $($TypeOfLetter);
