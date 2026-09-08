// CREATED 2026-09-08 · rating 3 · shell. The chrome above the writing — wordmark, account links, search — promoted from the demo's $Header, which both .wiki books declare identically. Open, and it is a question for the base: $Book already places masthead() and colophon(), so is a masthead a PLACE the book draws or a KIND written into it? Two mechanisms stand for one thing and only one should.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';
import { $TypeOfHeading } from '@/writing/Heading';

export interface $Masthead$ extends $Section$ { }

export class $Masthead extends $Composition implements $Masthead$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Masthead(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfMasthead, '!')));
    }

    // OWED: <header class="pd-masthead"> — the theme lays it out; nothing here says how it looks.
}

export class $TypeOfMasthead extends $TypeOfSection {
    override name = 'Masthead';
    protected override specification: Specification<$Writing> = new MastheadSpecification();
}

export class MastheadSpecification extends SectionSpecification {
    // OWED: a masthead's heading is the site's name and is not drawn — the demo hides it in CSS today, which is the theme saying what the rule should.
}

export const Masthead = $($Masthead);
export const TypeOfMasthead = $($TypeOfMasthead);
