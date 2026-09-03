import { ReactNode } from 'react';
import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $$ } from '@/utilities/Lib';
import { $Section, $TypeOfSection, SectionSpecification } from './Section';
import { html } from '@/utilities/Html';
import { Wikitable, Cell } from '@/encyclopedia/Wikitable';

export class $Table extends $Section {
    $Table(block: $Block) {
        super.$Section(block);
        this._type = $(<TypeOfTable />);
    }

    override view(): ReactNode {
        const rows = html.text(this.block).split(/\n[^\S\n]*\n/u).filter(row => row.trim() !== '');
        return <Wikitable><tbody>{rows.map((row, at) => <tr key={at}><Cell>{row}</Cell></tr>)}</tbody></Wikitable>;
    }
}

export class $TypeOfTable extends $TypeOfSection {
    override get canonicalForm(): typeof $Writing { return $Table; }

    constructor() {
        super();
        this[cache]('Table');
    }

    protected override specification: Specification<$Writing> = new TableSpecification();
}

export class TableSpecification extends SectionSpecification {
    @specify('a table opens with its rows, and needs no title')
    override $opensWithTitle(writing: $Writing): boolean | void {
        if ($$(writing)($Table)) return false;
        return super.$opensWithTitle(writing);
    }
}

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
