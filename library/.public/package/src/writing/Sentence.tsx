import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $TypeOfWord } from './Word';
import { $Type } from './Type';

export interface $Sentence$ extends $Composition$ { }

export class $Sentence extends $Composition implements $Sentence$ {
    $Sentence(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfSentence));
    }
}

export class $$Sentence extends $Catalogue { }

export class $TypeOfSentence extends $Type {
    protected override specification: Specification<$Writing> = new SentenceSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Sentence);
        const Representation = $($$Sentence);
        const sentences = parser.sentences(tokens)
            .map(line => $<$Sentence>(<Made />, ...line as never[]));
        for (const written of sentences) written._mention = $<$$Sentence>(<Representation />, written);

        return sentences;
    }

    override below(): new() => $Type { return $TypeOfWord; }
}

// THE RULE THAT STOPPED THE PAGE, struck 2026-09-08 with the reason beside it. It refused any
// stop with text after it, so `Dr. Smith went home.`, `the U.S. Navy` and `e.g. this` were all
// refused, and the Turing article is full of them. A pattern cannot tell a sentence's terminal
// stop from an abbreviation's period, and it did not have to try: THE PARSER ALREADY DECIDED
// WHERE THE SENTENCE ENDED. A sentence the parse made is well bounded by construction and a
// sentence an author wrote is the author's, so the rule re-derived a boundary it was handed and
// then disagreed with it. WHAT WOULD MAKE IT BETTER: a rule saying something about a sentence
// that the PARSE cannot say — and if there is none, a sentence carries no rule of its own,
// which is an honest answer rather than a gap.
export class SentenceSpecification extends WritingSpecification {
}

export const Sentence = $($Sentence);
export const sentence = $($$Sentence);
export const TypeOfSentence = $($TypeOfSentence);
