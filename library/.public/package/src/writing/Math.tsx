// CREATED 2026-09-08 · rating 1 · shell. Inline mathematics at phrase grade beside $Ref: the TeX is the copy, rendered once per string through utilities/Tex.
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
