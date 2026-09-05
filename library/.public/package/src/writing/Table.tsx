import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { TableFormat as tableStyle } from '@/encyclopedia/TableFormat';

export interface $Table$ extends $Section$ {
    $columns?: number;
    cells(): $Writing[];
}

export class $Table extends $Composition implements $Table$ {
    $columns?: number;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    cells(): $Writing[] {
        return this.searchFor($Type).filter(part => reflection.composition(part.type()) && part !== this.heading());
    }

    $Table(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfTable)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfTable, '!')];
    }

    override view(): ReactNode {
        const heading = this.heading();
        const Opening = heading === undefined ? undefined : $(heading);
        const TableStyle = $(tableStyle);
        const cells = this.cells();
        const per = this.$columns ?? 1;
        const rows: $Writing[][] = [];
        for (let at = 0; at < cells.length; at += per) rows.push(cells.slice(at, at + per));

        return (
            <>
                {Opening && <Opening />}
                <TableStyle>
                    <tbody>
                        {rows.map((row, at) => (
                            <tr key={at}>
                                {row.map((cell, seat) => {
                                    const Cell = $(cell);

                                    return (
                                        <td key={seat}>
                                            <Cell />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </TableStyle>
            </>
        );
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
const typeOfTable = TypeOfTable;
