import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Word } from './Word';
import { $Letter } from './Letter';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $$ } from '@/utilities/Lib';

export class $Sentence extends $Composition<$Word> implements $Composition$<$Word> {
    get words(): $Composition<$Word> { return this; }
    get letters(): $Composition<$Letter> { return this.catalogue().comprehend(); }
    override get canonical(): boolean { return !this.copy.endsWith('\n'); }

    $Sentence(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfSentence />);
    }

}

export class $$Sentence extends $Reference implements $Reference$<$Sentence> {
    $$Sentence(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Sentence />);
    }

    override async read(): Promise<$Sentence> {
        return $$(await super.read(), $Sentence);
    }
}

export class $TypeOfSentence extends $Type {
    resolve = false;
    override nests = true;
    override code = 'Se';
    override get writtenAs(): new () => $Writing { return $Word; }

    override get canonicalForm(): typeof $Writing { return $Sentence; }

    constructor() {
        super();
        this[cache]('Sentence');
    }

    protected override specification: Specification<$Writing> = new SentenceSpecification();
}

export class $TypeOf$Sentence extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Sentence; }

    constructor() {
        super();
        this[cache]('$Sentence');
    }

    protected override specification: Specification<$Writing> = new $SentenceSpecification();
}

export class SentenceSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        stopped: /[.!?][^\S\n]*\S/u
    };

    @specify('a sentence stops once, at its end')
    $stopsAtItsEnd(writing: $Writing): void {
        $check(!this.patterns.stopped.test(writing.copy), 'a sentence stops once, at its end, and this one stops before it');
    }
}

export class $SentenceSpecification extends ReferenceSpecification {
    @specify('a reference to a sentence lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Se:'),
            'a reference to a sentence lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Sentence),
            'a reference to a sentence lands on one, and what it holds is not one');
    }
}

export const Sentence = $($Sentence);
export const TypeOfSentence = $($TypeOfSentence);
export const TypeOf$Sentence = $($TypeOf$Sentence);
prints.set('Se', $$Sentence);
