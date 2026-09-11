import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $TypeOfSentence } from './Sentence';
import { $Type } from './Type';

export interface $Paragraph$ extends $Composition$ { }

export class $Paragraph extends $Composition implements $Paragraph$ {
    definition = 'p';
    $Paragraph(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfParagraph));
    }
}

export class $$Paragraph extends $Catalogue { }

export class $TypeOfParagraph extends $Type {
    protected override specification: Specification<$Writing> = new ParagraphSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Paragraph);
        const Representation = $($$Paragraph);
        const written = $<$Paragraph>(<Made />, ...tokens as never[]);
        written._mention = $<$$Paragraph>(<Representation />, written);

        return [written];
    }
}

export class ParagraphSpecification extends WritingSpecification {
}

export const Paragraph = $($Paragraph);
export const paragraph = $($$Paragraph);
export const TypeOfParagraph = $($TypeOfParagraph);
