// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the sprint after.
// Math is INLINE mathematics at PHRASE grade, beside $Ref (reference/Ref) — the same place in the levels a link stands. Its display sibling is $Equation at paragraph grade.
// DEPENDS ON: $Composition, $TypeOfPhrase / PhraseSpecification (writing/Phrase) — designed for it: Phrase exists for "a word that contributes multiple words", which TeX in a sentence is.
// DEPENDS ON, owed: utilities/Tex — one memoised render per copy through katex (declared in package.json, imported by nothing yet). Never per draw: every chemical draws three times (PS4).
// DOUG 2026-09-08: "basic math should work without [the theme] and you'll need a latex processing method that is efficient in components that represent equations."
// OPEN (ch02 Markdown with LaTeX): whether `math` is an intrinsic content kind beside string and block — "a framework conversation". This scaffold treats the TeX as the copy and the rendering as the drawing.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification } from './Phrase';

export interface $Math$ extends $Phrase$ {
    tex(): string;
}

export class $Math extends $Composition implements $Math$ {
    tex(): string {
        throw new Error('not implemented: $Math.tex — the copy, which IS the TeX');
    }

    $Math(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfMath, '!')));
    }

    // OWED: <span class="pd-math"> holding tex.inline(this.tex()) — the sheet dresses nothing here; katex ships its own CSS (a demo/app concern, not the base's).
    override view(): ReactNode {
        throw new Error('not implemented: $Math.view — inline TeX rendered once per copy');
    }
}

export class $TypeOfMath extends $TypeOfPhrase {
    override name = 'Math';
    protected override specification: Specification<$Writing> = new MathSpecification();
}

export class MathSpecification extends PhraseSpecification {
    // TeX is not prose: a stop inside it is not the end of a sentence — the same waiver $Ref carries.
    @specify('mathematics is not prose, and stops nowhere')
    override $stopsAtItsEnd(writing: $Writing): boolean | void {
        return false;
    }
}

export const Math = $($Math);
export const TypeOfMath = $($TypeOfMath);
