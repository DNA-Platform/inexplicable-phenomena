import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { TableFormat as tableStyle } from '@/encyclopedia/TableFormat';
import { $Type } from './Type';

export interface $Table$ extends $Section$ {
    $columns?: number;
    cells(): $Writing[];
}

export class $Table extends $Composition implements $Table$ {
    $columns?: number;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    cells(): $Writing[] {
        return this.searchFor($Type).filter(part => reflection.composition(part.kind) && part !== this.heading());
    }

    $Table(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfTable, '!')));
    }

    override frame(drawn: ReactNode): ReactNode {
        const TableStyle = $(tableStyle);

        return <TableStyle columns={this.$columns ?? 1}>{super.frame(drawn)}</TableStyle>;
    }
}

export class $TypeOfTable extends $TypeOfSection {
    override name = 'Table';
    protected override specification: Specification<$Writing> = new TableSpecification();
}

export class TableSpecification extends SectionSpecification {
    @specify('a table\'s columns divide its cells')
    $columnsDivideCells(writing: $Writing): void {
        if (!(writing instanceof $Table) || writing.$columns === undefined) return;
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
