// RESTORED 2026-09-08 · rating 1. It was deleted for waiving "a section opens with its heading",
// on the grounds that a waiver means the thing is not that kind and no demo quoted. BOTH REASONS
// WERE WRONG, and the base sheet said so: it carries a `blockquote` group, so the theme was already
// styling a quotation — by ELEMENT, because there was no kind to style. Deleting the kind did not
// remove the concept, it left the theme styling something the framework did not model.
//
// The waiver is the real finding and it points AT $Section, not here: a quotation has no heading,
// and a base that demands one of every section is the base overreaching. Left as a waiver until
// that is ruled, because the alternative is inventing a level between paragraph and section.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { ReactNode } from 'react';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from './Section';

export interface $Quote$ extends $Section$ { }

export class $Quote extends $Section implements $Quote$ {
    // A QUOTATION HAS NO HEADING, and it writes HTML's own word for itself rather than a section's.
    // This is the one kind in the sweep that could not simply inherit its element: everything else
    // draws what its type says it is, and a quote is a section that draws a blockquote.
    override print(content: ReactNode): ReactNode {
        return <blockquote className={this.className}>{content}</blockquote>;
    }

    $Quote(block: $Block) {
        super.$Section(this.addType(block, $TypeOfQuote));
    }

    // OWED: <blockquote class="pd-quote"> — and the attribution, which is the meaning it carries.
}

export class $TypeOfQuote extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new QuoteSpecification();

    // A QUOTATION HAS NO HEADING, AND WAIVING THE RULE WAS NOT ENOUGH — seen on the paper: the quote
    // drew its own first sentence as a heading ABOVE itself and then said the whole thing again,
    // because $TypeOfSection SUPPLIES a heading to any section that opens without one. The rule and
    // the supply are two statements of the same demand and both have to be answered.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
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
