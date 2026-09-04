import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfSection, SectionSpecification } from './Section';
import { reflection } from '@/utilities/Reflection';
import { Table as Wikitable } from '@/encyclopedia/Table';

export class $Table extends $Composition implements $Composition$ {
    $columns?: number;

    $Table(block: $Block) {
        const Asked = $(TypeOfTable);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        const cells = (this.block?.$elements ?? []).filter((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        const per = this.$columns ?? 1;
        const rows: $Writing[][] = [];
        for (let at = 0; at < cells.length; at += per) rows.push(cells.slice(at, at + per));
        const Held = $(Wikitable);

        return <Held><tbody>{rows.map((row, at) => <tr key={at}>{row.map((one, seat) => {
            const Piece = $(one);
            return <td key={seat}><Piece /></td>;
        })}</tr>)}</tbody></Held>;
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
    @specify('a table opens with its cells, and needs no title')
    override $opensWithTitle(writing: $Writing): boolean | void {
        if (reflection.is(writing, $TypeOfTable)) return false;
        return super.$opensWithTitle(writing);
    }

    @specify('a table\'s columns divide its cells')
    $columnsDivideCells(writing: $Writing): void {
        if (!(writing instanceof $Table) || writing.$columns === undefined) return;
        $check(writing.parts().length % writing.$columns === 0,
            'a table\'s columns divide its cells, and these do not');
    }
}

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
