// RESTORED 2026-09-08 · rating 1. It was deleted for waiving "a section opens with its heading",
// on the grounds that a waiver means the thing is not that kind and no demo quoted. BOTH REASONS
// WERE WRONG, and the base sheet said so: it carries a `blockquote` group, so the theme was already
// dressing a quotation — by ELEMENT, because there was no kind to dress. Deleting the kind did not
// remove the concept, it left the theme styling something the framework did not model.
//
// The waiver is the real finding and it points AT $Section, not here: a quotation has no heading,
// and a base that demands one of every section is the base overreaching. Left as a waiver until
// that is ruled, because the alternative is inventing a level between paragraph and section.
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
