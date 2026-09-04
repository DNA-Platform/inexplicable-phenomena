import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { Paragraph, $TypeOfParagraph } from './Paragraph';
import { $TypeOfTitle } from './Title';
import { parser } from '@/utilities/Parser';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { reflection } from '@/utilities/Reflection';

export class $Section extends $Composition implements $Composition$ {

    $Section(block: $Block) {
        const Asked = $(TypeOfSection);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

}

export class $$Section extends $Reference {
    $$Section(block: $Block) {
        const Asked = $(TypeOf$Section);
        this.type ??= $(<Asked />);
        super.$Reference(block);
    }
}

export class $TypeOfSection extends $Type {
    resolve = false;
    override name = 'Section';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new SectionSpecification();
}

export class $TypeOf$Section extends $TypeOfReference {
    override name = '$Section';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new $SectionSpecification();
}

export class SectionSpecification extends TypedSpecification<$Writing> {
    @specify('a section is written as paragraphs')
    $writtenAsParagraphs(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.every(one => reflection.is(one, $TypeOfParagraph) || reflection.is(one, $TypeOfSection)),
            'a section is written as paragraphs, and something in this one is not one');
    }

    @specify('a section opens with its title')
    $opensWithTitle(writing: $Writing): void {
        const inside = ((writing.block?.$elements ?? []) as unknown[])
            .filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(inside.length > 0 && inside[0].type instanceof $TypeOfTitle,
            'a section opens with its title, and this one opens without one');
    }
}

export class $SectionSpecification extends ReferenceSpecification {
    @specify('a reference to a section lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Sn:'),
            'a reference to a section lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || reflection.is(held, $TypeOfSection),
            'a reference to a section lands on one, and what it holds is not one');
    }
}

export const Section = $($Section);
parser.makes.set('Section', held => {
    const Asked = $(Section);
    return [$(<Asked>{parser.elements(held)}</Asked>) as $Writing];
});
export const TypeOfSection = $($TypeOfSection);
export const TypeOf$Section = $($TypeOf$Section);
prints.set('Sn', $($$Section));
