import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from './Writing';
import { $Composition } from './Composition';
import { $Word } from './Word';
import { $TypeOfSentence, SentenceSpecification } from './Sentence';

export class $Phrase extends $Composition<$Word> {
    override get canonical(): boolean { return false; }

    $Phrase(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfPhrase />);
    }
}

export class $TypeOfPhrase extends $TypeOfSentence {
    override get canonicalForm(): typeof $Writing { return $Phrase; }

    constructor() {
        super();
        this[cache]('Phrase');
    }

    protected override specification: Specification<$Writing> = new PhraseSpecification();
}

export class PhraseSpecification extends SentenceSpecification {
    protected lines = {
        broken: /[\r\n]/u
    };

    @specify('a phrase is written on one line')
    $onOneLine(writing: $Writing): void {
        $check(!this.lines.broken.test(html.surface(writing.block)), 'a phrase is written on one line, and this one breaks across lines');
    }
}

export const Phrase = $($Phrase);
export const TypeOfPhrase = $($TypeOfPhrase);
