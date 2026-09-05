import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfLetter } from './Letter';

export interface $Word$ extends $Composition$ { }

export interface $$Word$ extends $Reference$ { }

export class $Word extends $Composition implements $Word$ {
    $Word(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfWord)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfWord, '!')];
    }
}

export class $$Word extends $Reference implements $$Word$ {
    $$Word(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Word, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfWord extends $Type {
    override name = 'Word';
    protected override specification: Specification<$Writing> = new WordSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Word = $(word);

        return parser.words(tokens).map(piece => $(<Word>{piece}</Word>));
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
const typeOfWord = TypeOfWord;
export const TypeOf$Word = $($TypeOf$Word);
const typeOf$Word = TypeOf$Word;
