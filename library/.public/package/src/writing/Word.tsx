import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$ } from './Composition';
import { $Letter, Letter } from './Letter';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Word extends $Writing implements $Composition$<$Letter> {
    protected graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    protected patterns = {
        alphanumeric: /[\p{L}\p{N}]/u
    };

    override get canonical(): boolean { return this.patterns.alphanumeric.test(this.copy); }

    parts(): $Letter[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Letter) ? $$(token, $Letter) : undefined,
            held => [...this.graphemes.segment(parser.text(held))].map(({ segment }) => $(<Letter>{segment}</Letter>) as $Letter));
    }

    $Word(block: $Html<'block'>) {
        super.$Writing(block);
        this.type = $(<TypeOfWord />) as $TypeOfWord;
    }

    where(match: (part: $Letter) => boolean): $Letter[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Letter) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Letter) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Letter) => boolean): $Letter {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $TypeOfWord extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Word; }

    constructor() {
        super();
        this[cache]('Word');
    }

    protected override specification: Specification<$Writing> = new WordSpecification();
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


export const Word = $($Word);
export const TypeOfWord = $($TypeOfWord);
