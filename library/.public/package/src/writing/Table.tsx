import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Trait, $Type, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $$ } from '@/utilities/Lib';
import { html } from '@/utilities/Html';
import { $Composition } from './Composition';
import { $Paragraph } from './Paragraph';
import { $TypeOfSection, SectionSpecification } from './Section';
import * as dress from '@/encyclopedia/Table';

export class $Table extends $Composition<$Paragraph> {
    $Table(block: $Block) {
        super.$Composition(block);
        this._type = this.carried ?? $(<TypeOfTable />);
    }

    override view(): ReactNode {
        const rows = html.surface(this.block).split(/\n[^\S\n]*\n/u).filter(row => row.trim() !== '');
        return <dress.Table className={this.labels.join(' ')}><tbody>{rows.map((row, at) => <tr key={at}><dress.Cell>{row}</dress.Cell></tr>)}</tbody></dress.Table>;
    }
}

export class $TypeOfTable extends $TypeOfSection {
    override code = 'Tb';

    override get canonicalForm(): typeof $Writing { return $Table; }

    constructor() {
        super();
        this[cache]('Table');
    }

    protected override specification: Specification<$Writing> = new TableSpecification();
}

export class $TableTrait extends $Trait {
    override get canonicalForm(): typeof $Writing { return $Table; }

    constructor() {
        super();
        this[cache]('Table');
    }

    protected override specification: Specification<$Writing> = new TableTraitSpecification();
}

export class TableSpecification extends SectionSpecification {
    @specify('a table opens with its rows, and needs no title')
    override $opensWithTitle(writing: $Writing): boolean | void {
        if ($$(writing)($Table)) return false;
        return super.$opensWithTitle(writing);
    }

    @specify('a table arranges whatever level its type gives it')
    override $writtenAsParagraphs(writing: $Writing): boolean | void {
        if ($$(writing)($Table)) return false;
        return super.$writtenAsParagraphs(writing);
    }
}

export class TableTraitSpecification extends Specification<$Writing> {
    @specify('a table arranges a composition')
    $arrangesComposition(writing: $Writing): void {
        $check(writing instanceof $Composition, 'a table arranges a composition, and this writing is not one');
    }
}

export class $Cell extends $Composition<$Writing> {
    $Cell(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfCell />);
    }
}

export class $TypeOfCell extends $Type {
    override seated = true;

    override get canonicalForm(): typeof $Writing { return $Cell; }

    constructor() {
        super();
        this[cache]('Cell');
    }
}

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
export const TableTrait = $($TableTrait);

export const Cell = $($Cell);
export const TypeOfCell = $($TypeOfCell);
