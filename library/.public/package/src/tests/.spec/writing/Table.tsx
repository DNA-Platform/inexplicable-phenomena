import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Table } from '@/writing/Table';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';
import { Sentence } from '@/writing/Sentence';
import { TypeOfParagraph } from '@/writing/Paragraph';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';

// A table is a section, so it opens with a heading like any other, and its
// blank lines separate its rows — each row a paragraph.
export class $TableRowsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Table><Heading>The first table</Heading><Paragraph>first row</Paragraph><Paragraph>second row</Paragraph></Table>
        );
    }
}

export const TableRowsExample = $($TableRowsExample);

// Writing told it is a Table stands as one, and opens with a heading the same
// way — the rule reads the carried type, not the class.
export class $TableWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing><Heading>A written table</Heading><Paragraph>first row</Paragraph><Paragraph>second row</Paragraph><Type>Table</Type></Writing>
        );
    }
}

export const TableWritingExample = $($TableWritingExample);

// A table of cells composes each cell one down from its level — a paragraph,
// for the default section-grade table.
export class $TableCellsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Table><Heading>The cells</Heading><Paragraph>first cell</Paragraph><Paragraph>second cell</Paragraph></Table>
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

// The label says table and the level stays the sentence: writing labelled Table
// reads as a word table. Rooted in Writing so it is DRAWN — a type only stands
// for something once the walk has substituted it.
export class $TableTraitExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Heading>A labelled table</Heading>
                hi yo
                <Type>Table</Type>
            </Writing>
        );
    }
}

export const TableTraitExample = $($TableTraitExample);
