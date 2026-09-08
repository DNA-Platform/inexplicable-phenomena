// CREATED 2026-09-08 · rating 1 · shell. Code at paragraph grade: the code is the copy, the language a prop, drawn through a highlighting box as .archive did; parts() a line-based read on demand, never in the draw (PS3).
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $Code$ extends $Paragraph$ {
    language: string;
}

export class $Code extends $Paragraph implements $Code$ {
    $language = '';

    get language(): string { return this.$language; }

    $Code(block: $Block) {
        super.$Paragraph($check(block, $Block, '!').concat($check($TypeOfCode, '!')));
    }

    // OWED: <pre><code> through the highlighting box with this.language; the sheet dresses pre/code by the pd- class (U5/U6).
    // The default draw must NOT call parts() (PS3); a line-based parts() is a read on demand, added only when asked for.
    override view(): ReactNode {
        throw new Error('not implemented: $Code.view — the copy drawn through a highlighting code box, the language a prop');
    }
}

export class $TypeOfCode extends $TypeOfParagraph {
    override name = 'Code';
    protected override specification: Specification<$Writing> = new CodeSpecification();
}

export class CodeSpecification extends ParagraphSpecification {
    @specify('code is written a line at a time')
    override $noBlankLine(writing: $Writing): boolean | void {
        return false;
    }
}

export const Code = $($Code);
export const TypeOfCode = $($TypeOfCode);
