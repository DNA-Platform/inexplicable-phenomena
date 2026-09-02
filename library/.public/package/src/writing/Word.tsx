import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { $Letter, Letter } from './Letter';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $$ } from '@/utilities/Lib';

export class $Word extends $Composition<$Letter> implements $Composition$<$Letter> {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    protected patterns = {
        alphanumeric: /[\p{L}\p{N}]/u
    };

    override get canonical(): boolean { return this.patterns.alphanumeric.test(this.copy); }
    get letters(): $Composition<$Letter> { return this; }


    $Word(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfWord />);
    }

    protected override reduce(held: (string | $Writing)[]): $Letter[] {
        return [...this.graphemes.segment(parser.text(held))].map(({ segment }) => $(<Letter>{segment}</Letter>) as $Letter);
    }
}

export class $$Word extends $Reference implements $Reference$<$Word> {
    $$Word(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Word />);
    }

    override async read(): Promise<$Word> {
        return $$(await super.read(), $Word);
    }
}

export class $TypeOfWord extends $Type {
    resolve = false;
    override nests = true;
    override code = 'Wd';
    override get writtenAs(): new () => $Writing { return $Letter; }

    override get canonicalForm(): typeof $Writing { return $Word; }

    constructor() {
        super();
        this[cache]('Word');
    }

    protected override specification: Specification<$Writing> = new WordSpecification();
}

export class $TypeOf$Word extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Word; }

    constructor() {
        super();
        this[cache]('$Word');
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
}


export class $WordSpecification extends ReferenceSpecification {
    @specify('a reference to a word lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Wd:'),
            'a reference to a word lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Word),
            'a reference to a word lands on one, and what it holds is not one');
    }
}

export const Word = $($Word);
export const TypeOfWord = $($TypeOfWord);
export const TypeOf$Word = $($TypeOf$Word);
prints.set('Wd', $$Word);
