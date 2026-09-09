import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section$, $TypeOfSection, SectionSpecification } from './Section';
import { $TypeOfHeading } from './Heading';
import { TableFormat as tableStyle } from '@/formatting/TableFormat';
import { $Type } from './Type';
import { $Section } from '@/writing/Section';

export interface $Table$ extends $Section$ {
    $columns?: number;
    cells(): $Writing[];
}

export class $Table extends $Section implements $Table$ {
    $columns?: number;

    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    cells(): $Writing[] {
        return this.searchFor($Type).filter(part => reflection.composition(part.kind) && part !== this.heading());
    }

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>{content}</div>;
    }

    $Table(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check($TypeOfTable, '!')).concat($check(tableStyle, '!')));
    }
}

export class $TypeOfTable extends $TypeOfSection {

    // NO HEADING IS READ OUT OF IT. $TypeOfSection supplies one to any section opening without a
    // heading, which is right for a SECTION and wrong for everything that merely extends one — seen
    // on the probe page: this drew its own first sentence as a heading above itself, elided with an
    // ellipsis, and then said the whole thing again. $Quote met this first and the answer is the
    // same: the rule and the supply are two statements of one demand, and both have to be answered.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        return parts;
    }
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
