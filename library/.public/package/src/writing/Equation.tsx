// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the sprint after.
// An Equation is DISPLAY mathematics at PARAGRAPH grade — $Math one level up, the way the levels chapter's "$Code whose inline boolean moves its level" was asked for; with the fixed hierarchy that is two kinds, and Doug gave both names.
// NUMBERED BY A READING, never a field: its number is its index among the equations of its chapter (Sprint 34: position encodes canonicality; the index is a number related to the composition). That reading runs ABOVE the paragraph and is affordable (PS1–PS3).
// DEPENDS ON: $Composition, $TypeOfParagraph / ParagraphSpecification — designed for it. DEPENDS ON, owed: utilities/Tex (display mode), and a chapter-level reading of equations (which the chapter must be designed to answer — a possible base finding).
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
        super.$Composition($check(block, $Block).concat($check($TypeOfEquation, '!')));
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
