import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Table } from '@/writing/Table';
import { Paragraph } from '@/writing/Paragraph';
import { Sentence } from '@/writing/Sentence';
import { TypeOfParagraph } from '@/writing/Paragraph';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type, Trait } from '@/writing/Writing';

// A table is a section whose blank lines separate its rows — each row a
// paragraph, and no title owed, because a table opens with its rows.
export class $TableRowsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Table><Paragraph>first row</Paragraph><Paragraph>second row</Paragraph></Table>
        );
    }
}

export const TableRowsExample = $($TableRowsExample);

// Writing told it is a Table stands as one, and the title law stands down the
// same way — the rule reads the carried type, not the class.
export class $TableWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing><Paragraph>first row</Paragraph><Paragraph>second row</Paragraph><Type>Table</Type></Writing>
        );
    }
}

export const TableWritingExample = $($TableWritingExample);

// A table of cells composes each cell one down from its level — a paragraph,
// for the default section-grade table.
export class $TableCellsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Table><Paragraph>first cell</Paragraph><Paragraph>second cell</Paragraph></Table>
        );
    }
}

export const TableCellsExample = $($TableCellsExample);

// An arrangement has no level: typed as a paragraph, the table composes
// sentences — the written type overrides the class default.
export class $TableTypedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Table><TypeOfParagraph />{'one two\nthree four'}</Table>
        );
    }
}

export const TableTypedExample = $($TableTypedExample);

// The trait says table and the type keeps the level: a sentence wearing Table
// reads as a word table.
export class $TableTraitExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                hi yo
                <Trait>Table</Trait>
            </Sentence>
        );
    }
}

export const TableTraitExample = $($TableTraitExample);
