// CREATED 2026-09-08 · rating 1. WRITING BESIDE THE WRITING — <aside>. Doug's question was whether an
// infobox is really an encyclopedia's thing, and it is not: an infobox, a margin note, a pull quote
// and a sidebar are one shape under four names, and the shape is HTML's own word. So the abstract
// kind is here and the specific one inherits it — $Infobox extends $Aside.
//
// IT IS A SECTION, because an aside runs to several paragraphs and carries its own heading; and it
// is CANONICAL-NAMED the way $Letter is: a letter is the canonical character and an aside is the
// canonical thing standing beside the reading, whatever a domain calls its own.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';

export interface $Aside$ extends $Section$ { }

export class $Aside extends $Composition implements $Aside$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Aside(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfAside, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <aside className={this.className}>{content}</aside>;
    }
}

export class $TypeOfAside extends $TypeOfSection {
    override name = 'Aside';
    protected override specification: Specification<$Writing> = new AsideSpecification();
}

export class AsideSpecification extends SectionSpecification {
}

export const Aside = $($Aside);
export const TypeOfAside = $($TypeOfAside);
