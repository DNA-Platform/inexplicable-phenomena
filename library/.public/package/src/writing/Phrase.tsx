import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from './Writing';
import { $Word, $TypeOfWord, WordSpecification } from './Word';

export class $Phrase extends $Word {
    override get canonical(): boolean { return false; }

    $Phrase(block: $Block) {
        super.$Word(block);
        this._type = $(<TypeOfPhrase />);
    }
}

export class $TypeOfPhrase extends $TypeOfWord {
    override get canonicalForm(): typeof $Writing { return $Phrase; }

    constructor() {
        super();
        this[cache]('Phrase');
    }

    protected override specification: Specification<$Writing> = new PhraseSpecification();
}

export class PhraseSpecification extends WordSpecification {
    protected lines = {
        broken: /[\r\n]/u
    };

    @specify('a phrase may carry spaces')
    override $noWhitespace(writing: $Writing): boolean { return false; }

    @specify('a phrase is written on one line')
    $onOneLine(writing: $Writing): void {
        $check(!this.lines.broken.test(writing.copy), 'a phrase is written on one line, and this one breaks across lines');
    }
}

export const Phrase = $($Phrase);
export const TypeOfPhrase = $($TypeOfPhrase);
