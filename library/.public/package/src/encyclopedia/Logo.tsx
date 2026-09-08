// CREATED 2026-09-08 · rating 3 · shell. A mark that stands as writing — the wordmark on a masthead, a project's logo on a card, the globe on the portal. Promoted from the demo's $Logo and $Wordmark, which are one kind written twice. Open: an illustration writes <figure><img><figcaption> and a logo wants the <img> alone, so this asks the base whether a caption is a separate kind or an absent part.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { html } from '@/utilities/Html';
import { $Illustration$, $TypeOfIllustration, IllustrationSpecification } from '@/writing/Illustration';

export interface $Logo$ extends $Illustration$ { }

export class $Logo extends $Composition implements $Logo$ {
    $source = '';

    get source(): string { return this.$source; }
    get caption(): string { return html.text(this._block); }

    $Logo(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfLogo, '!')));
    }

    // OWED: <img class="pd-logo" src alt> — an illustration draws its caption BENEATH, a logo draws the same copy AS the alt and nothing else. No width member: a theme sizes a logo, which is what the demo's width prop was standing in for.
}

export class $TypeOfLogo extends $TypeOfIllustration {
    override name = 'Logo';
    protected override specification: Specification<$Writing> = new LogoSpecification();
}

export class LogoSpecification extends IllustrationSpecification {
    // OWED: 'a logo says what it shows' — the alt text is the copy, and a logo with none is not admitted.
}

export const Logo = $($Logo);
export const TypeOfLogo = $($TypeOfLogo);
