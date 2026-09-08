// CREATED 2026-09-08 · rating 1 · shell. Display mathematics at paragraph grade, numbered by a reading over its chapter — never a field.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Equation$ extends $Paragraph$ {
    tex(): string;
    number(): number | undefined;
}

export class $Equation extends $Composition implements $Equation$ {
    tex(): string {
        throw new Error('not implemented: $Equation.tex — the copy, which IS the TeX');
    }

    // OWED: 1 + the count of equations standing before this one in the same chapter — read through the parent chain (reflection.nearest) and the chapter's parts.
    number(): number | undefined {
        throw new Error('not implemented: $Equation.number — a reading over the chapter, never stored');
    }

    $Equation(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfEquation, '!')));
    }

    // OWED: <div class="pd-equation"> holding tex.display(this.tex()) and its number; the LaTeX theme right-aligns the number in parentheses, the base sheet only centres.
    override view(): ReactNode {
        throw new Error('not implemented: $Equation.view — display TeX rendered once per copy, numbered');
    }
}

export class $TypeOfEquation extends $TypeOfParagraph {
    override name = 'Equation';
    protected override specification: Specification<$Writing> = new EquationSpecification();
}

export class EquationSpecification extends ParagraphSpecification {
}

export const Equation = $($Equation);
export const TypeOfEquation = $($TypeOfEquation);
