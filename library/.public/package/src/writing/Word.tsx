import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { Letter, $TypeOfLetter } from './Letter';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';

export interface $Word$ extends $Composition$ {
}

export class $Word extends $Composition implements $Composition$, $Word$ {
    protected patterns = {
        alphanumeric: /[\p{L}\p{N}]/u
    };

    override get canonical(): boolean { return this.patterns.alphanumeric.test(this.copy); }
    get letters(): $Composition { return this; }

    $Word(block: $Block) {
        const TypeOfWord = $(typeOfWord);
        this.type ??= $(<TypeOfWord />);
        super.$Composition(block);
    }
}

export class $$Word extends $Reference {
    $$Word(block: $Block) {
        const TypeOf$Word = $(typeOf$Word);
        this.type ??= $(<TypeOf$Word />);
        super.$Reference(block);
    }
}

export class $TypeOfWord extends $Type {
    resolve = false;
    override name = 'Word';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new WordSpecification();
}

export class $TypeOf$Word extends $TypeOfReference {
    override name = '$Word';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $WordSpecification();
}

export class WordSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        broken: /\s/u
    };

    @specify('a word is one unbroken stretch')
    $noWhitespace(writing: $Writing): void {
        $check(!this.patterns.broken.test(writing.copy), 'a word is one unbroken stretch, and this one carries whitespace');
    }
    @specify('a word is written as letters')
    $writtenAsLetters(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((writing): writing is $Writing => writing instanceof $Writing && !writing.parenthetical);
        $check(inside.every(one => reflection.is(one, $TypeOfLetter) || reflection.is(one, $TypeOfWord)),
            'a word is written as letters, and something in this one is not one');
    }
}


export class $WordSpecification extends ReferenceSpecification {
    @specify('a reference to a word lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Wd:'),
            'a reference to a word lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || reflection.is(held, $TypeOfWord),
            'a reference to a word lands on one, and what it holds is not one');
    }
}

export const Word = $($Word);
const word = Word;
parser.makes.set('Word', held => {
    const Word = $(word);
    return parser.words(held).map(piece => $(<Word>{piece}</Word>) as $Writing);
});
export const TypeOfWord = $($TypeOfWord);
const typeOfWord = TypeOfWord;
export const TypeOf$Word = $($TypeOf$Word);
const typeOf$Word = TypeOf$Word;
prints.set('Wd', $($$Word));
