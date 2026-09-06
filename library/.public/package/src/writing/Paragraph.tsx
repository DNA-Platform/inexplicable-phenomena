import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { ProseFormat as prose } from '@/encyclopedia/ProseFormat';
import { html } from '@/utilities/Html';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfSentence } from './Sentence';
import { $Phrase$, $TypeOfPhrase } from './Phrase';

export interface $Paragraph$ extends $Composition$ { }

export interface $$Paragraph$ extends $Phrase$ {
    parts(): $Writing[];
}

export class $Paragraph extends $Composition implements $Paragraph$ {
    $Paragraph(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfParagraph);
    }

    override frame(): ReactNode {
        const Prose = $(prose);

        return <Prose>{super.frame()}</Prose>;
    }
}

export class $$Paragraph extends $Composition implements $$Paragraph$ {
    parts(): $Writing[] {
        const paragraph = this.searchForOne<$Paragraph>($TypeOfParagraph);

        return paragraph === undefined ? [] : paragraph.parts()
            .filter((part): part is $Composition => part instanceof $Composition)
            .map(part => part.mention);
    }

    $$Paragraph(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfPhrase);
        this.addType($TypeOf$Paragraph);
    }
}

export class $TypeOfParagraph extends $Type {
    override name = 'Paragraph';
    protected override specification: Specification<$Writing> = new ParagraphSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Paragraph = $(paragraph);
        const Representation = $($$Paragraph);
        const written = $<$Paragraph>(<Paragraph>{parser.elements(tokens)}</Paragraph>);
        written.mention = $<$$Paragraph>(<Representation />, written);

        return [written];
    }

    override below(): new() => $TypeOfSentence { return $TypeOfSentence; }
}

export class $TypeOf$Paragraph extends $TypeOfReference {
    override name = '$Paragraph';
    protected override specification: Specification<$Writing> = new $ParagraphSpecification();
}

export class ParagraphSpecification extends WritingSpecification {
    protected patterns = {
        divided: /\n[^\S\n]*\n/u
    };

    @specify('a paragraph is unbroken by a blank line')
    $noBlankLine(writing: $Writing): void {
        $check(!this.patterns.divided.test(html.text(writing._block)),
            'a paragraph is unbroken by a blank line, and this one carries one');
    }
}

export class $ParagraphSpecification extends ReferenceSpecification {
}

export const Paragraph = $($Paragraph);
const paragraph = Paragraph;
export const TypeOfParagraph = $($TypeOfParagraph);
export const TypeOf$Paragraph = $($TypeOf$Paragraph);
