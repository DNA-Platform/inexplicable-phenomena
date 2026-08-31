import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification } from '@/notation/Type';
import { Specification, specify } from '@/notation/Specification';
import { $Composition$ } from './Composition';
import { $Writing } from './Writing';
import { $Word } from './Word';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Sentence extends $Writing implements $Composition$<$Word> {
    parts(): $Word[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Word) ? $$(token, $Word) : undefined,
            () => []);
    }

    $Sentence(block: $Html<'block'>) {
        super.$Writing(block);
        this.type = $(<TypeOfSentence />) as $TypeOfSentence;
    }

    where(match: (part: $Word) => boolean): $Word[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Word) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Word) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Word) => boolean): $Word {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $TypeOfSentence extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Sentence; }

    constructor() {
        super();
        this[cache]('Sentence');
    }

    protected override specification: Specification<$Writing> = new SentenceSpecification();
}

class SentenceSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        stopped: /[.!?][^\S\n]*\S/u
    };

    @specify('a sentence stops once, at its end')
    $stopsAtItsEnd(writing: $Writing): void {
        $check(!this.patterns.stopped.test(writing.copy), 'a sentence stops once, at its end, and this one stops before it');
    }
}

export const Sentence = $($Sentence);
export const TypeOfSentence = $($TypeOfSentence);
