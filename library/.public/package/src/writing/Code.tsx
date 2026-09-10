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
        super.$Paragraph(this.addType(block, $TypeOfCode));
    }

    // CODE IS A <pre> HOLDING A <code>, which is the only markup HTML has for it and the one every
    // sheet already styles — latex.css and github-markdown-css both, without being asked. The
    // language rides as `language-x`, which is the class every highlighter in the world looks for,
    // so a highlighting box can be added later without this changing.
    //
    // IT IS print(), NOT view(). The throw that stood here overrode view, which is the shape this
    // library has spent a sprint removing: overriding view means $Writing.view never runs, so the
    // element gets neither its pd- classes nor reflection.formatted and no format can ever reach it.
    // A kind writes its element in print, in one line, and gets everything else for free.
    override print(content: ReactNode): ReactNode {
        return <pre className={this.className}><code className={this.language === '' ? undefined : `language-${this.language}`}>{content}</code></pre>;
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
