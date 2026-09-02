import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Writing, Writing, Type } from '@/writing/Writing';
import { ParagraphSpecification, $TypeOfParagraph, $Paragraph, Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Specification } from '@/utilities/Specification';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Path } from '@/reference/Path';

// ROUTE ONE — SUBCLASS the specification. The framework's own $Title is the worked
// instance: $TitleSpecification extends ParagraphSpecification and adds one rule,
// so $unbroken runs without $Title naming it and nothing can be repealed by
// forgetting to call up. See writing/Title.tsx.

// ROUTE TWO — DECORATE one. A quoted kind adapts ANY specification by holding it
// as its parent, without inheriting from it. The same paragraph rules run.
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
    override get canonicalForm(): typeof $Writing { return $Paragraph; }

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

// A paragraph is written as sentences.
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

// A paragraph may hold text where a section may not. Dividing it into sentences is not built.
export class $ParagraphTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>A paragraph may carry text.</Paragraph>
        );
    }
}

export const ParagraphTextSpec = $($ParagraphTextSpec);

// Writing told it is a Paragraph reads as one.
export class $ParagraphWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>A paragraph, told.<Type>Paragraph</Type></Writing>
        );
    }
}

export const ParagraphWritingSpec = $($ParagraphWritingSpec);

// A reference to a paragraph stands one meta-level up: writing carrying
// <Type>$Paragraph</Type> whose path must land on a paragraph.
export class $ParagraphReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>paragraph<Type>$Paragraph</Type><Path>Ph:0</Path></Writing>
        );
    }
}

export const ParagraphReferenceSpec = $($ParagraphReferenceSpec);
