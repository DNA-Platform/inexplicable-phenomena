import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfSentence } from './Sentence';
import { $Phrase$, $TypeOfPhrase } from './Phrase';
import { $Type } from './Type';

export interface $Paragraph$ extends $Composition$ { }

export class $Paragraph extends $Composition implements $Paragraph$ {
    $Paragraph(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfParagraph, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <p className={this.className}>{content}</p>;
    }
}

export interface $$Paragraph$ extends $Phrase$ {
    parts(): $Writing[];
}

export class $$Paragraph extends $Catalogue implements $$Paragraph$ {
    $$Paragraph(block: $Block) {
        super.$Catalogue($check(block, $Block, '!').concat($check($TypeOfPhrase, '!')).concat($check($TypeOf$Paragraph, '!')));
    }
}

export class $TypeOfParagraph extends $Type {
    override name = 'Paragraph';
    protected override specification: Specification<$Writing> = new ParagraphSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Paragraph);
        const Representation = $($$Paragraph);
        const written = $<$Paragraph>(<Made>{parser.elements(tokens)}</Made>);
        written.mention = $<$$Paragraph>(<Representation />, written);

        return [written];
    }

    override below(): new() => $TypeOfSentence { return $TypeOfSentence; }
}

export class $TypeOf$Paragraph extends $Type {
    override name = '$Paragraph';
    protected override specification: Specification<$Writing> = new $ParagraphSpecification();
}

export class ParagraphSpecification extends WritingSpecification {
}

export class $ParagraphSpecification extends WritingSpecification {
}

export const Paragraph = $($Paragraph);
export const TypeOfParagraph = $($TypeOfParagraph);
export const TypeOf$Paragraph = $($TypeOf$Paragraph);
