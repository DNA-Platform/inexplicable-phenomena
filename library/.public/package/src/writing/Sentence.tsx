import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfWord } from './Word';

export interface $Sentence$ extends $Composition$ { }

export interface $$Sentence$ extends $Sentence$ {
    parts(): $Writing[];
}

export class $Sentence extends $Composition implements $Sentence$ {
    $Sentence(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSentence);
    }
}

export class $$Sentence extends $Composition implements $$Sentence$ {
    parts(): $Writing[] {
        const sentence = this.searchForOne<$Sentence>($TypeOfSentence);

        return sentence === undefined ? [] : sentence.parts()
            .filter((part): part is $Composition => part instanceof $Composition)
            .map(part => part.mention);
    }

    $$Sentence(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSentence);
        this.addType($TypeOf$Sentence);
    }
}

export class $TypeOfSentence extends $Type {
    override name = 'Sentence';
    protected override specification: Specification<$Writing> = new SentenceSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Sentence = $(sentence);
        const Representation = $($$Sentence);
        const sentences = parser.sentences(tokens)
            .map(line => $<$Sentence>(<Sentence>{parser.elements(line)}</Sentence>));
        for (const written of sentences) written.mention = $<$$Sentence>(<Representation />, written);

        return sentences;
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
export const TypeOf$Sentence = $($TypeOf$Sentence);
