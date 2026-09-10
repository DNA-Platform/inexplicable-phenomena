import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { $Cell, $TypeOfCell } from './Cell';
import { TableFormat as tableStyle } from '@/formatting/TableFormat';
import { $Section } from '@/writing/Section';

export interface $Table$ extends $Section$ {
    $columns?: number;
    cells(): $Writing[];
}

export class $Table extends $Section implements $Table$ {
    definition = 'div';
    $columns?: number;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    cells(): $Cell[] { return this.searchFor<$Cell>($TypeOfCell); }

    $Table(block: $Block) {
        super.$Section(this.addType(block, $TypeOfTable).concat($check(tableStyle, '!')));
    }
}

export class $TypeOfTable extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new TableSpecification();

    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
}

export class TableSpecification extends SectionSpecification {
    @specify('a table\'s columns divide its cells')
    $columnsDivideCells(writing: $Writing): void {
        if (!reflection.is<$Table>(writing, $TypeOfTable) || writing.$columns === undefined) return;
        $check(writing.cells().length % writing.$columns === 0,
            'a table\'s columns divide its cells, and these do not');
    }

    @specify('a table stands without a heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }
}

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
