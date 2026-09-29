import { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';
import { $Composition } from './Composition';
import { $Section } from './Section';
import { $Chapter } from '@/libraries/Chapter';

export class $Table extends $Annotation {
    $start?: number;
    $rows?: number;
    $columns?: number;
    specification = new TableSpecification();
    style = createGlobalStyle`
        .pa-table {
            display: grid;
        }
        .pa-row {
            display: contents;
        }
        ${Array.from({ length: this.limit }, (_, index) => index + 1).map(count => `
        .pa-table.pa-cols-${count} { grid-template-columns: repeat(${count}, minmax(0, 1fr)); }
        .pa-col-start-${count} { grid-column-start: ${count}; }
        .pa-col-span-${count} { grid-column-end: span ${count}; }`).join('')}
    `;
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get start(): number { return this.$start ?? (this.composition instanceof $Section || this.composition instanceof $Chapter ? 1 : 0); }
    get rows(): $Composition[] { return this.composition?.parts.slice(this.start) ?? []; }
    get columns(): number { return this.$columns ?? Math.max(0, ...this.rows.map(row => row.parts.length)); }
    protected get limit(): number { return 12; }

    override note(): ReactNode { return <this.style />; }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-table', `pa-cols-${this.columns}`);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        for (const [index, row] of this.rows.entries()) {
            row.classes.add(this, 'pa-row', `pa-row-start-${index + 1}`);
            for (const [column, cell] of row.parts.entries()) {
                cell.classes.add(this, 'pa-col', `pa-col-start-${column + 1}`);
                if (column === row.parts.length - 1 && column + 1 < this.columns)
                    cell.classes.add(this, `pa-col-span-${this.columns - column}`);
            }
        }
        super.$Bound();
    }
}

export class TableSpecification extends AnnotationSpecification {
    @specify('a table is said of a composition')
    $saidOfAComposition(writing: $Writing): void {
        $check(writing instanceof $Composition, 'a table is said of a composition, and this is not one');
    }

    @specify('a table has the rows it says')
    $hasTheRowsItSays(writing: $Writing): void {
        const table = writing.annotations.expressed($Table);
        $check(table?.$rows === undefined || table.rows.length === table.$rows,
            'a table has the rows it says, and this one has another number');
    }

    @specify('a table has the columns it says')
    $hasTheColumnsItSays(writing: $Writing): void {
        const table = writing.annotations.expressed($Table);
        $check(table?.$columns === undefined || table.rows.every(row => row.parts.length <= table.$columns!),
            'a table has the columns it says, and one of its rows has more');
    }
}

export const Table = $($Table);
