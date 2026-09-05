import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing$, $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfParagraph } from './Paragraph';
import { $TypeOfHeading } from './Heading';

export interface $Section$ extends $Composition$ {
    heading(): $Writing$ | undefined;
}

export interface $$Section$ extends $Reference$ { }

export class $Section extends $Composition implements $Section$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Section(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfSection)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfSection, '!')];
    }
}

export class $$Section extends $Reference implements $$Section$ {
    $$Section(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Section, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfSection extends $Type {
    override name = 'Section';
    protected override specification: Specification<$Writing> = new SectionSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Section = $(section);

        return [$(<Section>{parser.elements(tokens)}</Section>)];
    }

    override below(): new() => $TypeOfParagraph { return $TypeOfParagraph; }
}

export class $TypeOf$Section extends $TypeOfReference {
    override name = '$Section';
    protected override specification: Specification<$Writing> = new $SectionSpecification();
}

export class SectionSpecification extends WritingSpecification {
    @specify('a section opens with its heading')
    $opensWithHeading(writing: $Writing): void {
        $check(writing.searchFor($TypeOfHeading).length > 0,
            'a section opens with its heading, and this one opens without one');
    }
}

export class $SectionSpecification extends ReferenceSpecification {
}

export const Section = $($Section);
const section = Section;
export const TypeOfSection = $($TypeOfSection);
const typeOfSection = TypeOfSection;
export const TypeOf$Section = $($TypeOf$Section);
const typeOf$Section = TypeOf$Section;
