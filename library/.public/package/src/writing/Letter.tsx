import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $Type } from './Type';

export interface $Letter$ extends $Composition$ { }

export class $Letter extends $Composition implements $Letter$ {
    $Letter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfLetter));
    }
}

export class $$Letter extends $Catalogue { }

export class $TypeOfLetter extends $Type {
    protected override specification: Specification<$Writing> = new LetterSpecification();

    makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Letter);

        return parser.letters(tokens).map(segment => $(<Made>{segment}</Made>));
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
