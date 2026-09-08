// CREATED 2026-09-08 · rating 3. THE INFOBOX IS AN ASIDE — Doug asked whether it is really an
// encyclopedia's thing and it is not; what is Wikipedia's is the NAME and the fixed vocabulary of
// labelled lines, not the standing-beside. So the shape moved to writing/Aside and this inherits it,
// which is why it draws <aside> without saying so. Open: an index card's title must MEAN something
// and a line's does not, so a line is a labelled paragraph here rather than a card.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Title, $TypeOfTitle } from '@/library/Title';
import { $Aside$, $Aside, $TypeOfAside, AsideSpecification } from '@/writing/Aside';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';

export interface $Infobox$ extends $Aside$ { }

export class $Infobox extends $Aside implements $Infobox$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }

    $Infobox(block: $Block) {
        super.$Aside($check(block, $Block, '!').concat($check($TypeOfInfobox, '!')));
    }

    // The <aside> comes from $Aside; the encyclopedia theme floats it right by its pd-infobox class.
}

export class $TypeOfInfobox extends $TypeOfAside {
    override name = 'Infobox';
    protected override specification: Specification<$Writing> = new InfoboxSpecification();
}

export class InfoboxSpecification extends AsideSpecification {
}

export interface $Line$ extends $Paragraph$ {
    label: string;
}

// A LINE IS A LABELLED PARAGRAPH — the demo's $Line, promoted. Whether it should be an $IndexCard instead (ch18's "exact" fit) is the open question above.
export class $Line extends $Composition implements $Line$ {
    $label = '';

    get label(): string { return this.$label; }

    $Line(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfLine, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <p className={this.className} data-label={this.label}>{content}</p>;
    }
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
