// CREATED 2026-09-08 · rating 1. WRITING BESIDE THE WRITING — <aside>. Doug's question was whether an
// infobox is really an encyclopedia's thing, and it is not: an infobox, a margin note, a pull quote
// and a sidebar are one shape under four names, and the shape is HTML's own word. So the abstract
// kind is here and the specific one inherits it — $Infobox extends $Aside.
//
// IT IS A SECTION, because an aside runs to several paragraphs and carries its own heading; and it
// is CANONICAL-NAMED the way $Letter is: a letter is the canonical character and an aside is the
// canonical thing standing beside the reading, whatever a domain calls its own.
// ===========================================================================================
// GREEN AS A PRIMITIVE — a note against this file, written 2026-09-08 and owed to Doug's test.
//
// If the primitives are red, yellow and blue and you meet green, adding green to the list because
// it tidies things up is the wrong move: the SEMANTICS OF COLOUR say green is a MIXTURE, and that
// orange and purple are coming. You complete the mixing rule, not the primitive list.
//
// THIS KIND IS GREEN. It is a level the framework already has, mixed with WHERE IT IS DRAWN — a
// dimension the framework never named. Five kinds are the same mixture and each was invented
// separately: $Aside (a section drawn beside), $Note (a paragraph drawn away), $Hatnote (a note
// drawn above), $Footnote (a note drawn at the foot), and $Margin, which was deleted for being
// nothing BUT that. Orange and purple are already visible: an endnote, a sidenote, an epigraph.
//
// The dimension is half-present and spelled three ways: `parenthetical` is a BOOLEAN saying not
// drawn HERE without saying where instead; $Book PLACES its cover, contents, index and footer by
// hand; and a format wraps a drawing to move it. One idea, three mechanisms, none of them named.
//
// IT EARNS ITS KEEP MEANWHILE — $Aside deleted four demo classes and two formats and the infobox
// now draws as a real <aside> — so it stands until the mixing rule exists, and this note is here
// so nobody mistakes it for a primitive.
// ===========================================================================================
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { $Section } from '@/writing/Section';

export interface $Aside$ extends $Section$ { }

export class $Aside extends $Section implements $Aside$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Aside(block: $Block) {
        super.$Section(this.addType(block, $TypeOfAside));
    }

    override print(content: ReactNode): ReactNode {
        return <aside className={this.className}>{content}</aside>;
    }
}

export class $TypeOfAside extends $TypeOfSection {

    // NO HEADING IS READ OUT OF IT. $TypeOfSection supplies one to any section opening without a
    // heading, which is right for a SECTION and wrong for everything that merely extends one — seen
    // on the probe page: this drew its own first sentence as a heading above itself, elided with an
    // ellipsis, and then said the whole thing again. $Quote met this first and the answer is the
    // same: the rule and the supply are two statements of one demand, and both have to be answered.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
    override name = 'Aside';
    protected override specification: Specification<$Writing> = new AsideSpecification();
}

export class AsideSpecification extends SectionSpecification {
}

export const Aside = $($Aside);
export const TypeOfAside = $($TypeOfAside);
