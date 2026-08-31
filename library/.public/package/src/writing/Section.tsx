import { $, $check, $Html, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$ } from './Composition';
import { $Paragraph, Paragraph } from './Paragraph';
import { $TypeOfTitle } from './Title';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';

export class $Section extends $Writing implements $Composition$<$Paragraph> {
    parts(): $Paragraph[] {
        const from = this.bound ? this.inside! : this;
        return parser.parse(from,
            token => $$(token)($Paragraph) ? $$(token, $Paragraph) : undefined,
            held => [$(<Paragraph>{parser.elements(held)}</Paragraph>) as $Paragraph]);
    }

    $Section(block: $Html<'block'>) {
        super.$Writing(block);
        this.type = $(<TypeOfSection />) as $TypeOfSection;
    }

    where(match: (part: $Paragraph) => boolean): $Paragraph[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Paragraph) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Paragraph) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Paragraph) => boolean): $Paragraph {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }
}

export class $TypeOfSection extends $Type {
    resolve = false;
    override code = 'S';

    override get canonicalForm(): typeof $Writing { return $Section; }

    constructor() {
        super();
        this[cache]('Section');
    }

    protected override specification: Specification<$Writing> = new SectionSpecification();
}

class SectionSpecification extends TypedSpecification<$Writing> {
    @specify('a section is written as paragraphs')
    $writtenAsParagraphs(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => $$(one)($Paragraph)), 'a section is written as paragraphs, and something in this one is not one');
    }

    @specify('a section opens with its title')
    $opensWithTitle(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.length > 0 && inside[0].type instanceof $TypeOfTitle,
            'a section opens with its title, and this one opens without one');
    }
}

export const Section = $($Section);
export const TypeOfSection = $($TypeOfSection);
