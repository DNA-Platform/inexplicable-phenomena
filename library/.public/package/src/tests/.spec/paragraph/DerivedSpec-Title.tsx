import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Writing, Writing } from '@/writing/Writing';
import { ParagraphSpecification, $TypeOfParagraph, $Paragraph, Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Specification } from '@/notation/Specification';
import { Type } from '@/notation/Type';

// ROUTE ONE — SUBCLASS the specification. The framework's own $Title is the worked
// instance: $TitleSpecification extends ParagraphSpecification and adds one rule,
// so $unbroken runs without $Title naming it and nothing can be repealed by
// forgetting to call up. See writing/Title.tsx.

// ROUTE TWO — DECORATE one. A quoted kind adapts ANY specification by holding it
// as its parent, without inheriting from it. The same paragraph rules run.
export class QuotedSpecification extends Specification<$Writing> {
    constructor(within: Specification<$Writing>) {
        super();
        this.parent = within;
    }

    $quoted(writing: $Writing): void {
        $check(writing.copy.trim() !== '', 'a quotation says something, and this one is empty');
    }
}

export class $TypeOfQuotation extends $TypeOfParagraph {
    override get canonicalForm(): typeof $Writing { return $Paragraph; }

    constructor() {
        super();
        this[cache]('Quotation');
    }

    protected override specification: Specification<$Writing> = new QuotedSpecification(new ParagraphSpecification());
}

$($TypeOfQuotation);

export class $DerivedSpecTitle extends $Chemical {
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

export const DerivedSpecTitle = $($DerivedSpecTitle);
