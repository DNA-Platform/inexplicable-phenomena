// CREATED 2026-09-08 · rating 3 · shell. The infobox is a catalogue card of labelled lines (ch18; Sprint 51 R9), promoted from the demo's Sidebar/Line. Open: an index card's title must MEAN something and a line's does not.
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
