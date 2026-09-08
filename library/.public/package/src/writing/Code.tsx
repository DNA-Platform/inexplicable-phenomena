// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY: change freely. Built in the sprint after (Math, Equation, Code in the base).
// DEPENDS ON: $Composition (writing/Composition) and $TypeOfParagraph / ParagraphSpecification (writing/Paragraph) — a kind is a shell over its level (ch14 Shells Over Types): designed for it.
// DEPENDS ON, owed: prism-react-renderer's Highlight — the old demo's code box (.archive/app/src/sections/page/faces/faces.tsx, drawer.tsx) — a dependency, not a framework feature.
// DOUG 2026-09-08: "Code should be in the old demo, something that integrates with a codebox react control that supports syntax highlighting and formatting from many languages… the language is a prop I guess and the code is the writing. I would put it at the paragraph level and I might put a line-based parser in parts if anyone ever needs the parts. One day we would adapt the actual parse tree to our model."
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Code$ extends $Paragraph$ {
    language: string;
}

export class $Code extends $Composition implements $Code$ {
    $language = '';

    get language(): string { return this.$language; }

    $Code(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfCode, '!')));
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
