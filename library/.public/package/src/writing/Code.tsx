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
    definition = 'pre';
    $language = '';

    get language(): string { return this.$language; }

    $Code(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfCode));
    }

    override print(): ReactNode {
        return <code className={this.language === '' ? undefined : `language-${this.language}`}>{super.print()}</code>;
    }
}

export class $TypeOfCode extends $TypeOfParagraph {
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
