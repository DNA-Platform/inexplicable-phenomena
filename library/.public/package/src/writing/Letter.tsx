import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
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
        super.$Composition(this.addType(block, $TypeOfLetter));
    }
}

export class $$Letter extends $Catalogue { }

export class $TypeOfLetter extends $Type {
    protected patterns = {
        alphabetical: /^\p{L}\p{M}*$/u,
        numeric: /^\p{N}\p{M}*$/u,
        whitespace: /^\s$/u,
        punctuation: /^\p{P}\p{M}*$/u
    };
    protected override specification: Specification<$Writing> = new LetterSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Letter);

        return parser.letters(tokens).map(segment => $(<Made>{segment}</Made>));
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

export class LetterSpecification extends WritingSpecification {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    @specify('a letter is one grapheme')
    $oneCharacter(writing: $Writing): void {
        const copy = html.text(writing._block);
        $check(this.graphemes.segment(copy).containing(0)?.segment === copy,
            'a letter is one grapheme, and this one is not');
    }
}

export const Letter = $($Letter);
export const letter = $($$Letter);
export const TypeOfLetter = $($TypeOfLetter);
