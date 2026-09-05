import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfWord } from './Word';

export interface $Sentence$ extends $Composition$ { }

export interface $$Sentence$ extends $Reference$ { }

export class $Sentence extends $Composition implements $Sentence$ {
    $Sentence(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfSentence)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfSentence, '!')];
    }
}

export class $$Sentence extends $Reference implements $$Sentence$ {
    $$Sentence(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Sentence, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfSentence extends $Type {
    override name = 'Sentence';
    protected override specification: Specification<$Writing> = new SentenceSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Sentence = $(sentence);

        return parser.sentences(tokens).map(line => $(<Sentence>{parser.elements(line)}</Sentence>));
    }

    override below(): new() => $TypeOfWord { return $TypeOfWord; }
}

export class $TypeOf$Sentence extends $TypeOfReference {
    override name = '$Sentence';
    protected override specification: Specification<$Writing> = new $SentenceSpecification();
}

export class SentenceSpecification extends WritingSpecification {
    protected patterns = {
        stopped: /[.!?][^\S\n]*\S/u
    };

    @specify('a sentence stops once, at its end')
    $stopsAtItsEnd(writing: $Writing): void {
        $check(!this.patterns.stopped.test(html.text(writing._block)),
            'a sentence stops once, at its end, and this one stops before it');
    }
}

export class $SentenceSpecification extends ReferenceSpecification {
}

export const Sentence = $($Sentence);
const sentence = Sentence;
export const TypeOfSentence = $($TypeOfSentence);
const typeOfSentence = TypeOfSentence;
export const TypeOf$Sentence = $($TypeOf$Sentence);
const typeOf$Sentence = TypeOf$Sentence;
