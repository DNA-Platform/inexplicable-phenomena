import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';

export class $Letter extends $Composition implements $Composition$ {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic' = 'symbolic';
    case: 'uppercase' | 'lowercase' = 'lowercase';

    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };

    override parts(): $Writing[] { return [this]; }
    override get canonical(): boolean { return this.kind === 'alphabetical'; }

    $Letter(block: $Block) {
        const Asked = $(TypeOfLetter);
        this.type ??= $(<Asked />);
        super.$Composition(block);
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

export class $$Letter extends $Reference {
    $$Letter(block: $Block) {
        const Asked = $(TypeOf$Letter);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }
}

export class $TypeOfLetter extends $Type {
    resolve = false;
    override name = 'Letter';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new LetterSpecification();
}

export class $TypeOf$Letter extends $TypeOfReference {
    override name = '$Letter';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $LetterSpecification();
}

class LetterSpecification extends TypedSpecification<$Writing> {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    @specify('a letter is one grapheme')
    $oneCharacter(writing: $Writing): void {
        const copy = writing.copy;
        $check(this.graphemes.segment(copy).containing(0)?.segment === copy, 'a letter is one grapheme, and this one is not');
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
        $check(held === undefined || reflection.stands(held, 'Letter'),
            'a reference to a letter lands on one, and what it holds is not one');
    }
}

export const Letter = $($Letter);
parser.makes.set('Letter', held => {
    const Asked = $(Letter);
    return parser.letters(held).map(segment => $(<Asked>{segment}</Asked>) as $Writing);
});
export const TypeOfLetter = $($TypeOfLetter);
export const TypeOf$Letter = $($TypeOf$Letter);
prints.set('Lr', $($$Letter));
