// CREATED 2026-09-08 · rating 1 · shell. Display mathematics at paragraph grade, numbered by a reading over its document — never a field.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { tex } from '@/utilities/Tex';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $Equation$ extends $Paragraph$ {
    tex(): string;
    number(): number | undefined;
}

export class $Equation extends $Paragraph implements $Equation$ {
    tex(): string { return html.text(this._block); }

    // ACROSS THE BOOK, the same reading $Theorem, $Citation and $Footnote each take. It was written
    // here as "over the document"; a book is the holder the base can always answer, and a paper that
    // numbers per document passes its document instead — which is why the holder is an argument.
    number(): number | undefined { return reflection.numbered(this, this.book); }

    $Equation(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfEquation));
    }

    // The number is DRAWN AS AN ATTRIBUTE and not as words, so a theme places it — LaTeX puts it
    // right in parentheses, a web page might put it anywhere — and the reading stays a reading.
    override print(): ReactNode {
        return <div className={this.className} data-number={this.number()} dangerouslySetInnerHTML={{ __html: tex.display(this.tex()) }} />;
    }
}

export class $TypeOfEquation extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new EquationSpecification();
}

export class EquationSpecification extends ParagraphSpecification {
}

export const Equation = $($Equation);
export const TypeOfEquation = $($TypeOfEquation);
