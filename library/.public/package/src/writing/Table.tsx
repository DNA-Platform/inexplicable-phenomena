import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { reflection } from '@/utilities/Reflection';
import { Table as tableStyle } from '@/encyclopedia/Table';

export class $Table extends $Composition implements $Composition$ {
    $columns?: number;

    $Table(block: $Block) {
        const TypeOfTable = $(typeOfTable);
        this.type ??= $(<TypeOfTable />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        const written = (this.block?.$elements ?? []).filter((writing): writing is $Writing => writing instanceof $Writing && !writing.parenthetical);
        const opening = written.find(one => reflection.is(one, $TypeOfHeading));
        const Opening = opening === undefined ? undefined : $(opening);
        const cells = written.filter(one => one !== opening);
        const per = this.$columns ?? 1;
        const rows: $Writing[][] = [];
        for (let at = 0; at < cells.length; at += per) rows.push(cells.slice(at, at + per));
        const TableStyle = $(tableStyle);

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

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new TableSpecification();
}

export class TableSpecification extends SectionSpecification {
    @specify('a table\'s columns divide its cells')
    $columnsDivideCells(writing: $Writing): void {
        if (!(writing instanceof $Table) || writing.$columns === undefined) return;
        const cells = writing.parts().filter(one => !reflection.is(one, $TypeOfHeading));
        $check(cells.length % writing.$columns === 0,
            'a table\'s columns divide its cells, and these do not');
    }
}

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
const typeOfTable = TypeOfTable;
