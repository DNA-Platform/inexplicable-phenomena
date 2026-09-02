import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Table, TableTrait, Cell } from '@/writing/Table';
import { Sentence } from '@/writing/Sentence';
import { TypeOfParagraph } from '@/writing/Paragraph';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type, Trait } from '@/writing/Writing';

// A table is a section whose blank lines separate its rows — each row a
// paragraph, and no title owed, because a table opens with its rows.
export class $TableRowsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Table>{'first row\n\nsecond row'}</Table>
        );
    }
}

export const TableRowsSpec = $($TableRowsSpec);

// Writing told it is a Table stands as one, and the title law stands down the
// same way — the rule reads the carried type, not the class.
export class $TableWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>{'first row\n\nsecond row'}<Type>Table</Type></Writing>
        );
    }
}

export const TableWritingSpec = $($TableWritingSpec);

// A table of cells composes each cell one down from its level — a paragraph,
// for the default section-grade table.
export class $TableCellsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Table><Cell>first cell</Cell><Cell>second cell</Cell></Table>
        );
    }
}

export const TableCellsSpec = $($TableCellsSpec);

// An arrangement has no level: typed as a paragraph, the table composes
// sentences — the written type overrides the class default.
export class $TableTypedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Table><TypeOfParagraph />{'one two\nthree four'}</Table>
        );
    }
}

export const TableTypedSpec = $($TableTypedSpec);

// The trait says table and the type keeps the level: a sentence wearing Table
// reads as a word table.
export class $TableTraitSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word><Letter>h</Letter><Letter>i</Letter></Word>
                {' '}
                <Word><Letter>y</Letter><Letter>o</Letter></Word>
                <Trait>Table</Trait>
            </Sentence>
        );
    }
}

export const TableTraitSpec = $($TableTraitSpec);
