import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Format } from './Format';
import { $Composition, $Inline, $Block } from './Composition';
import { $Section } from './Section';
import { $Chapter } from '@/libraries/Chapter';

export class $Table extends $Format {
    $start?: number;
    $rows?: number;
    $columns?: number;
    specification = new TableSpecification();
    style: ElementType = selection.div<{ $columns: number }>`
        display: grid;
        grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
        column-gap: ${({ theme }) => theme.space};
        row-gap: calc(${({ theme }) => theme.space} / 2);
        & > .pd-container { grid-column: 1 / -1; }
        & .pa-row, & .pa-row > .pd-container { display: contents; }
        & .pa-col { padding-block: calc(${({ theme }) => theme.space} / 4); }
        & .pd-paragraph { margin-block: 0; }
        ${({ $columns }) => Array.from({ length: $columns }, (_, index) => index + 1).map(count => `
        & .pa-col-start-${count} { grid-column-start: ${count}; }
        & .pa-col-span-${count} { grid-column-end: span ${count}; }`).join('')}
    `;
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get start(): number { return this.$start ?? (this.composition instanceof $Section || this.composition instanceof $Chapter ? 1 : 0); }
    get rows(): $Composition[] { return this.composition?.parts.slice(this.start) ?? []; }
    get columns(): number { return this.$columns ?? Math.max(0, ...this.rows.map(row => row.parts.length)); }

    $Table(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        const Grid = this.style;
        this.style = (props: { children?: ReactNode }) => <Grid $columns={this.columns} {...props} />;
    }

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Inline || annotation instanceof $Block)
                writing.annotations.express(annotation, false);
        writing.classes.add(this, 'pa-table');
        writing.containers.replace(this, writing.containers.at(0)!, this.style);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
        super.erase(writing);
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
