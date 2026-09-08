// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the encyclopedia sprint.
// THE INFOBOX IS A CATALOGUE CARD (ch18 The Wikipedia Fit: "a fixed vocabulary of labelled facts about one subject, set beside the opening of the writing, where every field is optional and the card is whatever survives"; Sprint 51 R9: "the infobox draws from $CatalogueCard with $IndexCard rows, every field optional"). Today it lives in the DEMO as $Sidebar/$Line (.wiki/.article/.sidebar.tsx) — a section of paragraphs with a $label prop drawn through attr(label); this is that, promoted to a kind the encyclopedia ships.
// DEPENDS ON: $Composition and $TypeOfCatalogueCard (book/CatalogueCard) for the box, $TypeOfIndexCard (reference/IndexCard) for a line — designed for it per ch18's fit table ("exact"). UNCLEAR: an index card carries a title that MEANS something ($titleMeansSomething), and an infobox line ("Born · 23 June 1912") means nothing — the rule may be too narrow for a line, which is a BASE finding to raise, not a slot to add.
// The label (`$label`) is drawable without an element (Sprint 51: `content: attr(label)`) — "a keeper and belongs in the framework as it stands".
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Title, $TypeOfTitle } from '@/library/Title';
import { $CatalogueCard$, $TypeOfCatalogueCard, CatalogueCardSpecification } from '@/library/CatalogueCard';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';

export interface $Infobox$ extends $CatalogueCard$ { }

export class $Infobox extends $Composition implements $Infobox$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $Infobox(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfInfobox, '!')));
    }

    // OWED: <aside class="pd-infobox"> — the kind writes its element (T5); the encyclopedia theme floats it right.
}

export class $TypeOfInfobox extends $TypeOfCatalogueCard {
    override name = 'Infobox';
    protected override specification: Specification<$Writing> = new InfoboxSpecification();
}

export class InfoboxSpecification extends CatalogueCardSpecification {
}

export interface $Line$ extends $Paragraph$ {
    label: string;
}

// A LINE IS A LABELLED PARAGRAPH — the demo's $Line, promoted. Whether it should be an $IndexCard instead (ch18's "exact" fit) is the open question above.
export class $Line extends $Composition implements $Line$ {
    $label = '';

    get label(): string { return this.$label; }

    $Line(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfLine, '!')));
    }

    // OWED: <p class="pd-line" label={this.label}> — the theme draws the label with ::before { content: attr(label) }.
}

export class $TypeOfLine extends $TypeOfParagraph {
    override name = 'Line';
    protected override specification: Specification<$Writing> = new LineSpecification();
}

export class LineSpecification extends ParagraphSpecification {
}

export const Infobox = $($Infobox);
export const TypeOfInfobox = $($TypeOfInfobox);
export const Line = $($Line);
export const TypeOfLine = $($TypeOfLine);
