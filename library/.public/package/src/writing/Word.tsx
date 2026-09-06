import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfLetter } from './Letter';

export interface $Word$ extends $Composition$ { }

export interface $$Word$ extends $Word$ { }

export class $Word extends $Composition implements $Word$ {
    $Word(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfWord);
    }
}

export class $$Word extends $Composition implements $$Word$ {
    $$Word(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfWord);
        this.addType($TypeOf$Word);
    }
}

export class $TypeOfWord extends $Type {
    override name = 'Word';
    protected override specification: Specification<$Writing> = new WordSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Word = $(word);
        const Representation = $($$Word);
        const words = parser.words(tokens).map(piece => $<$Word>(<Word>{piece}</Word>));
        for (const written of words) written.mention = $<$$Word>(<Representation />, written);

        return words;
    }

    override below(): new() => $TypeOfLetter { return $TypeOfLetter; }
}

export class $TypeOf$Word extends $TypeOfReference {
    override name = '$Word';
    protected override specification: Specification<$Writing> = new $WordSpecification();
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

export class $WordSpecification extends ReferenceSpecification {
}

export const Word = $($Word);
const word = Word;
export const TypeOfWord = $($TypeOfWord);
export const TypeOf$Word = $($TypeOf$Word);
