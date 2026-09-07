import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { parser } from '@/utilities/Parser';
import { $Type } from './Type';

type SortOfLetter = 'alphabetical' | 'numeric' | 'punctuation' | 'whitespace' | 'symbolic';
type CaseOfLetter = 'uppercase' | 'lowercase';

export interface $Letter$ extends $Composition$ {
    sort: SortOfLetter;
    case: CaseOfLetter;
}

export class $Letter extends $Composition implements $Letter$ {
    sort!: SortOfLetter;
    case: CaseOfLetter = 'lowercase';

    $Letter(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfLetter, '!')));
    }
}

export interface $$Letter$ extends $Letter$ { }

export class $$Letter extends $Catalogue implements $$Letter$ {
    sort!: SortOfLetter;
    case: CaseOfLetter = 'lowercase';

    $$Letter(block: $Block) {
        super.$Catalogue($check(block, $Block).concat($check($TypeOfLetter, '!')).concat($check($TypeOf$Letter, '!')));
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

    override specifically(letter: $Letter): void {
        this.spell(letter);
        super.specifically(letter);
    }

    protected spell(letter: $Letter): void {
        const copy = html.text(letter._block);
        letter.sort = this.reads(copy);
        letter.case = copy !== copy.toLowerCase() ? 'uppercase' : 'lowercase';
    }

    protected reads(copy: string): $Letter['sort'] {
        if (this.patterns.alphabetical.test(copy)) return 'alphabetical';
        if (this.patterns.numeric.test(copy)) return 'numeric';
        if (this.patterns.whitespace.test(copy)) return 'whitespace';
        if (this.patterns.punctuation.test(copy)) return 'punctuation';
        return 'symbolic';
    }
}

export class $TypeOf$Letter extends $Type {
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

export class $LetterSpecification extends WritingSpecification { }

export const Letter = $($Letter);
const letter = Letter;
export const TypeOfLetter = $($TypeOfLetter);
export const TypeOf$Letter = $($TypeOf$Letter);
