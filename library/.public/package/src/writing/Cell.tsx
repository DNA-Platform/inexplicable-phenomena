// A CELL IS A PIECE OF WRITING THAT STANDS IN A TABLE. Doug, 2026-09-10: "a cell is a kind." Before
// it, a table's cells were "every composition that is not the heading" — a positional rule of the
// sort this library deletes — and the base sheet reached them as `th, td`, elements no kind here
// writes, because a table is a GRID by Doug's own ruling and not a <table>.
import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';

export interface $Cell$ extends $Paragraph$ { }

export class $Cell extends $Paragraph implements $Cell$ {
    definition = 'div';
    $Cell(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfCell));
    }
}

export class $TypeOfCell extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new CellSpecification();
}

export class CellSpecification extends ParagraphSpecification { }

export const Cell = $($Cell);
export const TypeOfCell = $($TypeOfCell);
