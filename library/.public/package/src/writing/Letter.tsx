import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $$ } from '@/utilities/Lib';

export const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

export class $Letter extends $Composition<$Letter> implements $Composition$<$Letter> {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic' = 'symbolic';
    case: 'uppercase' | 'lowercase' = 'lowercase';

    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };

    override parts(): $Letter[] { return [this]; }
    override get canonical(): boolean { return this.kind === 'alphabetical'; }

    $Letter(block: $Block) {
        super.$Composition(block);
        this.build();
        this._type = $(<TypeOfLetter />);
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

export class $$Letter extends $Reference implements $Reference$<$Letter> {
    $$Letter(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Letter />);
    }

    override async read(): Promise<$Letter> {
        return $$(await super.read(), $Letter);
    }
}

export class $TypeOfLetter extends $Type {
    resolve = false;

    override get shell(): typeof $Writing { return $Letter; }
    override code = 'Lr';

    override get canonicalForm(): typeof $Writing { return $Letter; }

    constructor() {
        super();
        this[cache]('Letter');
    }

    protected override specification: Specification<$Writing> = new LetterSpecification();
}

export class $TypeOf$Letter extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Letter; }

    constructor() {
        super();
        this[cache]('$Letter');
    }

    protected override specification: Specification<$Writing> = new $LetterSpecification();
}

class LetterSpecification extends TypedSpecification<$Writing> {
    @specify('a letter is one grapheme')
    $oneCharacter(writing: $Writing): void {
        const copy = writing.copy;
        $check(graphemes.segment(copy).containing(0)?.segment === copy, 'a letter is one grapheme, and this one is not');
    }
}

export class $LetterSpecification extends ReferenceSpecification {
    @specify('a reference to a letter lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Lr:'),
            'a reference to a letter lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Letter),
            'a reference to a letter lands on one, and what it holds is not one');
    }
}

export const Letter = $($Letter);
export const TypeOfLetter = $($TypeOfLetter);
export const TypeOf$Letter = $($TypeOf$Letter);
prints.set('Lr', $$Letter);
