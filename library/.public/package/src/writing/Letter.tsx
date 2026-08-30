import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, $TypedSpecification } from '@/notation/Type';
import { $Specification, specify } from '@/notation/Specification';
import { $Composition$ } from './Composition';
import { $Writing } from './Writing';

export class $Letter extends $Writing implements $Composition$<$Letter> {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic' = 'symbolic';
    case?: 'uppercase' | 'lowercase' = undefined;

    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };

    parts(): $Letter[] { return [this]; }
    override get canonical(): boolean { return this.kind === 'alphabetical'; }

    $Letter(block: $Html<'block'>) {
        super.$Writing($check(block, 'block'));
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

        this.case = undefined;
        if (this.kind !== 'alphabetical') return;
        if (copy !== copy.toLowerCase())
            this.case = 'uppercase';
        else if (copy !== copy.toUpperCase())
            this.case = 'lowercase';
    }
}

class $LetterSpecification extends $TypedSpecification<$Writing> {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    @specify('a letter is one grapheme')
    $grapheme(writing: $Writing): void {
        const copy = writing.copy;
        $check(this.graphemes.segment(copy).containing(0)?.segment === copy, 'a letter is one grapheme, and this one is not');
    }
}

export class $TypeOfLetter extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Letter; }

    constructor() {
        super();
        this[cache]('Letter');
    }

    override getSpecification(): $Specification<$Writing> {
        return new $LetterSpecification();
    }
}

export const Letter = $($Letter);
export const TypeOfLetter = $($TypeOfLetter);
