import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, $TypedSpecification } from '@/notation/Type';
import { $Specification, specify } from '@/notation/Specification';
import { $Composition$ } from './Composition';
import { $Writing } from './Writing';
import { $Sentence } from './Sentence';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Paragraph extends $Writing implements $Composition$<$Sentence> {
    parts(): $Sentence[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Sentence) ? $$(token, $Sentence) : undefined,
            () => []);
    }

    $Paragraph(block: $Html<'block'>) {
        super.$Writing($check(block, 'block'));
        this.type = $(<TypeOfParagraph />) as $TypeOfParagraph;
    }

    where(match: (part: $Sentence) => boolean): $Sentence[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Sentence) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Sentence) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Sentence) => boolean): $Sentence {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $ParagraphSpecification extends $TypedSpecification<$Writing> {
    protected patterns = {
        divided: /\n[^\S\n]*\n/u
    };

    @specify('a paragraph is unbroken by a blank line')
    $unbroken(writing: $Writing): void {
        $check(!this.patterns.divided.test(writing.copy), 'a paragraph is unbroken by a blank line, and this one carries one');
    }
}

export class $TypeOfParagraph extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Paragraph; }

    constructor() {
        super();
        this[cache]('Paragraph');
    }

    override getSpecification(): $Specification<$Writing> {
        return new $ParagraphSpecification();
    }
}

export const Paragraph = $($Paragraph);
export const TypeOfParagraph = $($TypeOfParagraph);
