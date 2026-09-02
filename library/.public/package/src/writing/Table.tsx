import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Trait, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $$ } from '@/utilities/Lib';
import { $Composition } from './Composition';
import { $Section, $TypeOfSection, SectionSpecification } from './Section';
import * as dress from '@/encyclopedia/Table';

export class $Table extends $Section {
    $Table(block: $Block) {
        super.$Section(block);
        this._type = this.carried ?? $(<TypeOfTable />);
    }

    override view(): ReactNode {
        const parts = this.parts();
        return <dress.Table><tbody>{parts.map((part, at) => {
            const Part = $(part);
            return <tr key={at}><dress.Cell><Part /></dress.Cell></tr>;
        })}</tbody></dress.Table>;
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

export const Table = $($Table);
export const TypeOfTable = $($TypeOfTable);
export const TableTrait = $($TableTrait);
