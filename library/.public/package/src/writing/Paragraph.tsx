import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { parser } from '@/utilities/Parser';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfSentence } from './Sentence';

export interface $Paragraph$ extends $Composition$ { }

export interface $$Paragraph$ extends $Reference$ { }

export class $Paragraph extends $Composition implements $Paragraph$ {
    $Paragraph(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfParagraph)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfParagraph, '!')];
    }
}

export class $$Paragraph extends $Reference implements $$Paragraph$ {
    $$Paragraph(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Paragraph, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfParagraph extends $Type {
    override name = 'Paragraph';
    protected override specification: Specification<$Writing> = new ParagraphSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Paragraph = $(paragraph);

        return [$(<Paragraph>{parser.elements(tokens)}</Paragraph>)];
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
const typeOfParagraph = TypeOfParagraph;
export const TypeOf$Paragraph = $($TypeOf$Paragraph);
const typeOf$Paragraph = TypeOf$Paragraph;
