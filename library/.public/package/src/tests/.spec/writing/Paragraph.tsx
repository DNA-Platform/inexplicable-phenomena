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

export class $ParagraphDerivedSpecTitle extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Title>
                    A kind whose rule was derived
                </Title>
                <Writing>
                    He said it plainly.
                    <Type>Quotation</Type>
                </Writing>
                <Paragraph>
                    An ordinary paragraph, carrying no kind of its own.
                </Paragraph>
            </>
        );
    }
}

export const ParagraphDerivedSpecTitle = $($ParagraphDerivedSpecTitle);

export class $ParagraphSentencesSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>
                <Sentence>
                    <Word>A</Word>
                    <Word>paragraph</Word>
                    <Word>is</Word>
                    <Word>written</Word>
                    <Word>as</Word>
                    <Word>sentences</Word>
                </Sentence>
                <Sentence>
                    <Word>Each</Word>
                    <Word>one</Word>
                    <Word>stops</Word>
                    <Word>once</Word>
                </Sentence>
            </Paragraph>
        );
    }
}

export const ParagraphSentencesSpec = $($ParagraphSentencesSpec);

export class $ParagraphNestedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>
                <Paragraph>
                    <Sentence>
                        <Word>The</Word>
                        <Word>nested</Word>
                        <Word>contributes</Word>
                    </Sentence>
                </Paragraph>
                <Sentence>
                    <Word>its</Word>
                    <Word>parts</Word>
                    <Word>to</Word>
                    <Word>the</Word>
                    <Word>parts</Word>
                </Sentence>
            </Paragraph>
        );
    }
}

export const ParagraphNestedSpec = $($ParagraphNestedSpec);

export class $ParagraphTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>A paragraph may carry text.</Paragraph>
        );
    }
}

export const ParagraphTextSpec = $($ParagraphTextSpec);

export class $ParagraphWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>A paragraph, told.<Type>Paragraph</Type></Writing>
        );
    }
}

export const ParagraphWritingSpec = $($ParagraphWritingSpec);

export class $ParagraphReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>paragraph<Type>$Paragraph</Type><Path>Ph:0</Path></Writing>
        );
    }
}

export const ParagraphReferenceSpec = $($ParagraphReferenceSpec);
