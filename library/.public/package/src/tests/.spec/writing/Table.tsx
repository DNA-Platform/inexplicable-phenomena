import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Table } from '@/writing/Table';
import { Writing, Type } from '@/writing/Writing';

// A table is a section whose blank lines separate its rows — each paragraph a
// row, and no title is owed, because a table opens with its rows.
export class $TableRowsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Table>{'first row\n\nsecond row'}</Table>
        );
    }
}

export const TableRowsSpec = $($TableRowsSpec);

// Writing told it is a Table stands as one, and the section's title law stands
// down for it the same way — the rule reads the carried type, not the class.
export class $TableWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>{'first row\n\nsecond row'}<Type>Table</Type></Writing>
        );
    }
}

export const TableWritingSpec = $($TableWritingSpec);
