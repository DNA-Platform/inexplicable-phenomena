import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from './Writing';
import { $Composition$, $Composition } from './Composition';
import { $TypeOfSentence, SentenceSpecification } from './Sentence';

export class $Phrase extends $Composition implements $Composition$ {
    override indent = 1;

    override get canonical(): boolean { return false; }

    $Phrase(block: $Block) {
        const TypeOfPhrase = $(typeOfPhrase);
        this.type ??= $(<TypeOfPhrase />);
        super.$Composition(block);
    }
}

export class $TypeOfPhrase extends $TypeOfSentence {
    override name = 'Phrase';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new PhraseSpecification();
}

export class PhraseSpecification extends SentenceSpecification {
    protected lines = {
        broken: /[\r\n]/u
    };

    @specify('a phrase is written on one line')
    $onOneLine(writing: $Writing): void {
        $check(!this.lines.broken.test(writing.copy), 'a phrase is written on one line, and this one breaks across lines');
    }
}

export const Phrase = $($Phrase);
export const TypeOfPhrase = $($TypeOfPhrase);
const typeOfPhrase = TypeOfPhrase;
