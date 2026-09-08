// CREATED 2026-09-08 · rating 3 · shell. The chrome above the writing — logo, account links, search — promoted from the demo's $Header, declared identically in both .wiki books. It is the counterpart of library/Footer, which already exists and writes <footer>. OPEN, and it is a question for the base: $Book places masthead() and colophon(), so is a header a PLACE the book draws or a KIND written into it? Two mechanisms stand for one thing and only one should — and if the kind wins, those two places want renaming to header() and footer().
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';

export interface $Header$ extends $Section$ { }

export class $Header extends $Composition implements $Header$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Header(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfHeader, '!')));
    }

    // OWED: <header class="pd-masthead"> — the theme lays it out; nothing here says how it looks.
}

export class $TypeOfHeader extends $TypeOfSection {
    override name = 'Header';
    protected override specification: Specification<$Writing> = new HeaderSpecification();
}

export class HeaderSpecification extends SectionSpecification {
    // OWED: a masthead's heading is the site's name and is not drawn — the demo hides it in CSS today, which is the theme saying what the rule should.
}

export const Header = $($Header);
export const TypeOfHeader = $($TypeOfHeader);
