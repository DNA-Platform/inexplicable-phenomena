import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { Word, $TypeOfWord } from './Word';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';

export interface $Sentence$ extends $Composition$ {
}

export class $Sentence extends $Composition implements $Composition$, $Sentence$ {
    get words(): $Composition { return this; }
    get letters(): $Composition { return this.catalogue().comprehend(); }
    override get canonical(): boolean { return !this.copy.endsWith('\n'); }

    $Sentence(block: $Block) {
        const TypeOfSentence = $(typeOfSentence);
        this.type ??= $(<TypeOfSentence />);
        super.$Composition(block);
    }
}

export class $$Sentence extends $Reference {
    $$Sentence(block: $Block) {
        const TypeOf$Sentence = $(typeOf$Sentence);
        this.type ??= $(<TypeOf$Sentence />);
        super.$Reference(block);
    }
}

export class $TypeOfSentence extends $Type {
    resolve = false;
    override name = 'Sentence';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new SentenceSpecification();
}

export class $TypeOf$Sentence extends $TypeOfReference {
    override name = '$Sentence';

    constructor() {
        super();
        this[cache](this.name);
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
    @specify('a sentence is written as words')
    $writtenAsWords(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((writing): writing is $Writing => writing instanceof $Writing && !writing.parenthetical);
        $check(inside.every(one => reflection.is(one, $TypeOfWord) || reflection.is(one, $TypeOfSentence)),
            'a sentence is written as words, and something in this one is not one');
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
        $check(held === undefined || reflection.is(held, $TypeOfSentence),
            'a reference to a sentence lands on one, and what it holds is not one');
    }
}

export const Sentence = $($Sentence);
const sentence = Sentence;
parser.makes.set('Sentence', held => {
    const Sentence = $(sentence);
    return parser.sentences(held).map(line => $(<Sentence>{parser.elements(line)}</Sentence>) as $Writing);
});
export const TypeOfSentence = $($TypeOfSentence);
const typeOfSentence = TypeOfSentence;
export const TypeOf$Sentence = $($TypeOf$Sentence);
const typeOf$Sentence = TypeOf$Sentence;
prints.set('Se', $($$Sentence));
