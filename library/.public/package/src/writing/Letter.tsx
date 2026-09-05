import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';

export interface $Letter$ extends $Composition$ {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic';
    case: 'uppercase' | 'lowercase';
}

export interface $$Letter$ extends $Reference$ { }

export class $Letter extends $Composition implements $Letter$ {
    kind: 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic' = 'symbolic';
    case: 'uppercase' | 'lowercase' = 'lowercase';

    $Letter(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfLetter)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfLetter, '!')];
    }
}

export class $$Letter extends $Reference implements $$Letter$ {
    $$Letter(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Letter, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfLetter extends $Type {
    override name = 'Letter';
    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };
    protected override specification: Specification<$Writing> = new LetterSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Letter = $(letter);

        return parser.letters(tokens).map(segment => $(<Letter>{segment}</Letter>));
    }

    override specifically(letter: $Writing): void {
        if (letter instanceof $Letter) this.spell(letter);
        super.specifically(letter);
    }

    protected spell(letter: $Letter): void {
        const copy = html.text(letter._block);
        letter.kind = this.reads(copy);
        letter.case = copy !== copy.toLowerCase() ? 'uppercase' : 'lowercase';
    }

    protected reads(copy: string): $Letter['kind'] {
        if (this.patterns.alphabetical.test(copy)) return 'alphabetical';
        if (this.patterns.numeric.test(copy)) return 'numeric';
        if (this.patterns.whitespace.test(copy)) return 'whitespace';
        if (this.patterns.punctuation.test(copy)) return 'punctuation';
        return 'symbolic';
    }
}

export class $TypeOf$Letter extends $TypeOfReference {
    override name = '$Letter';
    protected override specification: Specification<$Writing> = new $LetterSpecification();
}

export class LetterSpecification extends WritingSpecification {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    @specify('a letter is one grapheme')
    $oneCharacter(writing: $Writing): void {
        const copy = html.text(writing._block);
        $check(this.graphemes.segment(copy).containing(0)?.segment === copy,
            'a letter is one grapheme, and this one is not');
    }
}

export class $LetterSpecification extends ReferenceSpecification {
}

export const Letter = $($Letter);
const letter = Letter;
export const TypeOfLetter = $($TypeOfLetter);
const typeOfLetter = TypeOfLetter;
export const TypeOf$Letter = $($TypeOf$Letter);
const typeOf$Letter = TypeOf$Letter;
