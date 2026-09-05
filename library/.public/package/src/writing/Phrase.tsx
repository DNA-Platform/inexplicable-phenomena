import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Sentence$, $TypeOfSentence, SentenceSpecification } from './Sentence';

export interface $Phrase$ extends $Sentence$ { }

export class $Phrase extends $Composition implements $Phrase$ {
    $Phrase(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfPhrase)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfPhrase, '!')];
    }
}

export class $TypeOfPhrase extends $TypeOfSentence {
    override name = 'Phrase';
    protected override specification: Specification<$Writing> = new PhraseSpecification();
}

export class PhraseSpecification extends SentenceSpecification {
    protected lines = {
        broken: /[\r\n]/u
    };

    @specify('a phrase is written on one line')
    $onOneLine(writing: $Writing): void {
        $check(!this.lines.broken.test(html.text(writing._block)),
            'a phrase is written on one line, and this one breaks across lines');
    }
}

export const Phrase = $($Phrase);
export const TypeOfPhrase = $($TypeOfPhrase);
const typeOfPhrase = TypeOfPhrase;
