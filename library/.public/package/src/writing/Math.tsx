// CREATED 2026-09-08 · rating 1 · shell. Inline mathematics at phrase grade beside $Ref: the TeX is the copy, rendered once per string through utilities/Tex.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { html } from '@/utilities/Html';
import { tex } from '@/utilities/Tex';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification } from './Phrase';

export interface $Math$ extends $Phrase$ {
    tex(): string;
}

export class $Math extends $Composition implements $Math$ {
    tex(): string { return html.text(this._block); }

    $Math(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfMath, '!')));
    }

    // IT WRITES ITS ELEMENT LIKE EVERY OTHER KIND, through print rather than view — katex answers
    // markup, so this is the one place the framework hands HTML straight to the DOM, and it is safe
    // because the string it renders is the author's own copy. The sheet dresses nothing here: katex
    // ships its own CSS, which is an application's concern and not the base's.
    override print(): ReactNode {
        return <span className={this.className} dangerouslySetInnerHTML={{ __html: tex.inline(this.tex()) }} />;
    }
}

export class $TypeOfMath extends $TypeOfPhrase {
    override name = 'Math';
    protected override specification: Specification<$Writing> = new MathSpecification();
}

export class MathSpecification extends PhraseSpecification {}

export const Math = $($Math);
export const TypeOfMath = $($TypeOfMath);
