import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $TypeOfLetter } from './Letter';
import { $Type } from './Type';

export interface $Word$ extends $Composition$ { }

export class $Word extends $Composition implements $Word$ {
    $Word(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfWord));
    }
}

export class $$Word extends $Catalogue { }

export class $TypeOfWord extends $Type {
    protected override specification: Specification<$Writing> = new WordSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Word);
        const Representation = $($$Word);
        const words = parser.words(tokens).map(piece => $<$Word>(<Made>{piece}</Made>));
        for (const written of words) written._mention = $<$$Word>(<Representation />, written);

        return words;
    }

    override below(): new() => $Type { return $TypeOfLetter; }
}

export class WordSpecification extends WritingSpecification {
    protected patterns = {
        broken: /\s/u
    };

    @specify('a word is one unbroken stretch')
    $noWhitespace(writing: $Writing): void {
        $check(!this.patterns.broken.test(html.text(writing._block)),
            'a word is one unbroken stretch, and this one carries whitespace');
    }
}

export const Word = $($Word);
export const word = $($$Word);
export const TypeOfWord = $($TypeOfWord);
