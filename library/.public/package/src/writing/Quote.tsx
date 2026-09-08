// CREATED 2026-09-08 · rating 1 · shell. A passage quoted from elsewhere — <blockquote>. IT IS IN THE
// BASE AND NOT IN A BOOK TYPE because both demos quote: an encyclopedia article quotes its sources
// and a paper quotes its predecessors. THE EVIDENCE IT IS OWED: formatting/Theme already carries a
// quote_ group styling a kind that does not exist, which is a sheet dressing nothing.
//
// It is a section rather than a paragraph because a quotation can run to several, and it MEANS what
// it quotes — so the anchor a writing with a meaning writes is already the citation.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';

export interface $Quote$ extends $Section$ { }

export class $Quote extends $Composition implements $Quote$ {
    heading(): $Writing | undefined { return undefined; }

    $Quote(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfQuote, '!')));
    }

    // OWED: <blockquote class="pd-quote"> — and the attribution, which is the meaning it carries.
}

export class $TypeOfQuote extends $TypeOfSection {
    override name = 'Quote';
    protected override specification: Specification<$Writing> = new QuoteSpecification();
}

export class QuoteSpecification extends SectionSpecification {
    // A SECTION OPENS WITH ITS HEADING AND A QUOTATION HAS NONE. This waiver is the finding: either
    // a quote is not a section, or a section's heading is a demand only some sections carry.
    override $opensWithHeading(): boolean | void {
        return false;
    }
}

export const Quote = $($Quote);
export const TypeOfQuote = $($TypeOfQuote);
