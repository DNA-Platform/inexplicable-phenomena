import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { Letter } from './Letter';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';

export class $Word extends $Composition implements $Composition$ {
    protected patterns = {
        alphanumeric: /[\p{L}\p{N}]/u
    };

    override get canonical(): boolean { return this.patterns.alphanumeric.test(this.copy); }
    get letters(): $Composition { return this; }

    $Word(block: $Block) {
        const Asked = $(TypeOfWord);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }
}

export class $$Word extends $Reference {
    $$Word(block: $Block) {
        const Asked = $(TypeOf$Word);
        this.type ??= $(<Asked />);
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
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => reflection.stands(one, 'Letter') || reflection.stands(one, 'Word')),
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
        $check(held === undefined || reflection.stands(held, 'Word'),
            'a reference to a word lands on one, and what it holds is not one');
    }
}

export const Word = $($Word);
parser.makes.set('Word', held => {
    const Asked = $(Word);
    return parser.words(held).map(piece => $(<Asked>{piece}</Asked>) as $Writing);
});
export const TypeOfWord = $($TypeOfWord);
export const TypeOf$Word = $($TypeOf$Word);
prints.set('Wd', $($$Word));
