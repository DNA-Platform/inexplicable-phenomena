import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfWord } from './Word';
import { $Type } from './Type';

export interface $Sentence$ extends $Composition$ { }

export class $Sentence extends $Composition implements $Sentence$ {
    $Sentence(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfSentence, '!')));
    }
}

export interface $$Sentence$ extends $Sentence$ {
    parts(): $Writing[];
}

export class $$Sentence extends $Catalogue implements $$Sentence$ {
    $$Sentence(block: $Block) {
        super.$Catalogue($check(block, $Block).concat($check($TypeOfSentence, '!')).concat($check($TypeOf$Sentence, '!')));
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

export class $TypeOf$Sentence extends $Type {
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

export class $SentenceSpecification extends WritingSpecification {
}

export const Sentence = $($Sentence);
const sentence = Sentence;
export const TypeOfSentence = $($TypeOfSentence);
export const TypeOf$Sentence = $($TypeOf$Sentence);
