import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { TypeOfItem } from './Item';
import { TypeOfSentence } from './Sentence';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $List$ extends $Paragraph$ { }

export class $List extends $Paragraph implements $List$ {
    definition = 'ul';
    $List(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfList));
    }

    override print(): ReactNode {
        const Parts = $(reflection.wrapped(this));
        return <Parts />;
    }
}

export class $TypeOfList extends $TypeOfParagraph {
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

$(List, TypeOfSentence)(TypeOfItem);
