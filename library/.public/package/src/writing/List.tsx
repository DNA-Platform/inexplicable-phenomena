// A LIST IS A PARAGRAPH THAT HOLDS ITEMS — Doug: "if the list has a type of item, it renders
// itself as a list, and item is a type of sentence." So the list's level below is $TypeOfItem, the
// parse makes the items, and the <li> is theirs.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { $Type } from '@/writing/Type';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $TypeOfItem } from './Item';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $List$ extends $Paragraph$ { }

export class $List extends $Paragraph implements $List$ {
    $List(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfList));
    }

    // A LIST DRAWS ITS PARTS, which is the reading $Section already takes. What stood here split
    // the list's own copy with a regex and built <li> elements out of the pieces, so the 54 list
    // items on /article were not writings at all — nothing could style one, nest one, reference one
    // or carry an operation on one, and the bullet that opened a line was copy rather than structure.
    override reading(): $Block {
        return reflection.wrapped(this);
    }

    override print(content: ReactNode): ReactNode {
        return <ul className={this.className}>{content}</ul>;
    }
}

export class $TypeOfList extends $TypeOfParagraph {
    override name = 'List';
    protected override specification: Specification<$Writing> = new ListSpecification();

    override below(): new() => $Type { return $TypeOfItem; }
}

export class ListSpecification extends ParagraphSpecification {
    @specify('a list is written a line at a time')
    override $noBlankLine(writing: $Writing): boolean | void {
        return false;
    }
}

export const List = $($List);
export const TypeOfList = $($TypeOfList);
