import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing$, $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $$Paragraph, $TypeOfParagraph } from './Paragraph';
import { $TypeOfHeading } from './Heading';

export interface $Section$ extends $Composition$ {
    heading(): $Writing$ | undefined;
}

export class $Section extends $Composition implements $Section$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Section(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfSection);
        const Representation = $($$Paragraph);
        for (const written of this.searchFor($TypeOfParagraph))
            written.mention ??= $<$$Paragraph>(<Representation />, written);
    }
}

export class $TypeOfSection extends $Type {
    override name = 'Section';
    protected override specification: Specification<$Writing> = new SectionSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Section = $(section);

        return [$<$Section>(<Section>{parser.elements(tokens)}</Section>)];
    }

    override below(): new() => $TypeOfParagraph { return $TypeOfParagraph; }
}

export class SectionSpecification extends WritingSpecification {
    @specify('a section is written in paragraphs')
    $writtenInParagraphs(writing: $Writing): void {
        $check(this.composed(writing).every(part => reflection.instanceOf(part, $TypeOfParagraph)),
            'a section is written in paragraphs, and this one holds something else');
    }

    @specify('a section opens with its heading')
    $opensWithHeading(writing: $Writing): void {
        $check(writing.searchFor($TypeOfHeading).length > 0,
            'a section opens with its heading, and this one opens without one');
    }
}

export const Section = $($Section);
const section = Section;
export const TypeOfSection = $($TypeOfSection);
