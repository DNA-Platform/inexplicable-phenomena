import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Writing, Writing, Type } from '@/writing/Writing';
import { ParagraphSpecification, $TypeOfParagraph, $Paragraph, Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Specification } from '@/utilities/Specification';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Path } from '@/reference/Path';

export class ParagraphQuotedSpecification extends Specification<$Writing> {
    constructor(within: Specification<$Writing>) {
        super();
        this.parent = within;
    }

    $quoted(writing: $Writing): void {
        $check(writing.copy.trim() !== '', 'a quotation says something, and this one is empty');
    }
}

export class $ParagraphTypeOfQuotation extends $TypeOfParagraph {
    override name = 'DerivedTitle';

    constructor() {
        super();
        this[cache]('Quotation');
    }

    protected override specification: Specification<$Writing> = new ParagraphQuotedSpecification(new ParagraphSpecification());
}

$($ParagraphTypeOfQuotation);

export class $ParagraphDerivedTitleExample extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Title>A kind whose rule was derived</Title>
                <Writing>
                    He said it plainly.
                    <Type>Quotation</Type>
                </Writing>
                <Paragraph>{'An ordinary paragraph, carrying no kind of its own.\nIt says three things.\nEach sentence is one of them.'}</Paragraph>
            </>
        );
    }
}

export const ParagraphDerivedTitleExample = $($ParagraphDerivedTitleExample);

export class $ParagraphSentencesExample extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>
                <Sentence>A paragraph is written as sentences.</Sentence>
                <Sentence>Each one stops once.</Sentence>
                <Sentence>A third one closes the set.</Sentence>
            </Paragraph>
        );
    }
}

export const ParagraphSentencesExample = $($ParagraphSentencesExample);

export class $ParagraphNestedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>
                <Paragraph>The nested contributes.</Paragraph>
                <Sentence>its parts to the parts.</Sentence>
            </Paragraph>
        );
    }
}

export const ParagraphNestedExample = $($ParagraphNestedExample);

export class $ParagraphTextExample extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>{'A paragraph may carry text.\nThe parser divides it into sentences.\nEach sentence keeps its own line.'}</Paragraph>
        );
    }
}

export const ParagraphTextExample = $($ParagraphTextExample);

export class $ParagraphWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                {'A paragraph, told.\nIt divides the same.\nThe type does the telling.'}
                <Type>Paragraph</Type>
            </Writing>
        );
    }
}

export const ParagraphWritingExample = $($ParagraphWritingExample);

export class $ParagraphReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>paragraph<Type>$Paragraph</Type><Path>Ph:0</Path></Writing>
        );
    }
}

export const ParagraphReferenceExample = $($ParagraphReferenceExample);
