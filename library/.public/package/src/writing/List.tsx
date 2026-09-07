import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { BulletsFormat as bullets } from '@/encyclopedia/BulletsFormat';

export interface $List$ extends $Paragraph$ { }

export class $List extends $Composition implements $List$ {
    $List(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfList, '!')));
    }

    override view(): ReactNode {
        const lines = html.text(this._block).split(/\n|(?:^|\s)-\s+/u).map(line => line.trim()).filter(line => line !== '');
        const Bullets = $(bullets);

        return (
            <Bullets>
                {lines.map((line, at) => <li key={at}>{line}</li>)}
            </Bullets>
        );
    }
}

export class $TypeOfList extends $TypeOfParagraph {
    override name = 'List';
    protected override specification: Specification<$Writing> = new ListSpecification();
}

export class ListSpecification extends ParagraphSpecification {
    @specify('a list is written a line at a time')
    override $noBlankLine(writing: $Writing): boolean | void {
        return false;
    }
}

export const List = $($List);
export const TypeOfList = $($TypeOfList);
