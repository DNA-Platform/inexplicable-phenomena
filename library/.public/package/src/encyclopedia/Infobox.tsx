// CREATED 2026-09-08 · rating 3. THE INFOBOX IS AN ASIDE — Doug asked whether it is really an
// encyclopedia's thing and it is not; what is Wikipedia's is the NAME and the fixed vocabulary of
// labelled lines, not the standing-beside. So the shape moved to writing/Aside and this inherits it,
// which is why it draws <aside> without saying so. Open: an index card's title must MEAN something
// and a line's does not, so a line is a labelled paragraph here rather than a card.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Title, $TypeOfTitle } from '@/library/Title';
import { $Aside$, $Aside, $TypeOfAside, AsideSpecification } from '@/writing/Aside';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification, $Paragraph } from '@/writing/Paragraph';

export interface $Infobox$ extends $Aside$ { }

export class $Infobox extends $Aside implements $Infobox$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $Infobox(block: $Block) {
        super.$Aside(this.addType(block, $TypeOfInfobox));
    }

    // The <aside> comes from $Aside; the encyclopedia theme floats it right by its pd-infobox class.
}

export class $TypeOfInfobox extends $TypeOfAside {
    protected override specification: Specification<$Writing> = new InfoboxSpecification();
}

export class InfoboxSpecification extends AsideSpecification {
}

export interface $Line$ extends $Paragraph$ {
    label: string;
}

// A LINE IS A LABELLED PARAGRAPH — the demo's $Line, promoted. Whether it should be an $IndexCard instead (ch18's "exact" fit) is the open question above.
export class $Line extends $Paragraph implements $Line$ {
    $label = '';

    get label(): string { return this.$label; }

    $Line(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfLine));
    }

    override view(): ReactNode {
        return reflection.formatted(this, <p className={this.className} data-label={this.label}>{this.print()}</p>);
    }
}

export class $TypeOfLine extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new LineSpecification();
}

export class LineSpecification extends ParagraphSpecification {
}

export const Infobox = $($Infobox);
export const TypeOfInfobox = $($TypeOfInfobox);
export const Line = $($Line);
export const TypeOfLine = $($TypeOfLine);
