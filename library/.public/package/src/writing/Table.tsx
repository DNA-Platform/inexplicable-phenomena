import { $, $check, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Composition } from './Composition';
import { $Format } from './Format';
import { $Section } from './Section';
import { $Chapter } from '@/libraries/Chapter';

export class $Table extends $Format {
    $start?: number;
    $rows?: number;
    $columns?: number;
    specification = new TableSpecification();
    style = selection.div`
        .pa-table { display: grid; grid-auto-columns: minmax(0, 1fr); column-gap: ${({ theme }) => theme.space}; row-gap: calc(${({ theme }) => theme.space} / 2); }
        .pa-table > .pd-heading, .pa-table > .pa-self-reference { grid-column: 1 / -1; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-row, .pa-row > .pa-reference { display: contents; }
        .pa-col { padding-block: calc(${({ theme }) => theme.space} / 4); }
        ${Array.from({ length: 12 }, (_, index) => `.pa-col-start-${index + 1} { grid-column-start: ${index + 1}; } .pa-col-span-${index + 1} { grid-column-end: span ${index + 1}; }`).join(' ')}
        .pa-table .pa-row:first-child .pa-col { font-weight: bold; border-block-end: 1px solid ${({ theme }) => theme.ink}; }
    `;
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get start(): number { return this.$start ?? (this.composition instanceof $Section || this.composition instanceof $Chapter ? 1 : 0); }
    get rows(): $Composition[] { return this.composition?.parts.slice(this.start) ?? []; }
    get columns(): number { return this.$columns ?? Math.max(0, ...this.rows.map(row => row.parts.length)); }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-table');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        const columns = this.columns;
        for (const [index, row] of this.rows.entries()) {
            row.classes.add(this, 'pa-row', `pa-row-start-${index + 1}`);
            for (const [column, cell] of row.parts.entries()) {
                cell.classes.add(this, 'pa-col', `pa-col-start-${column + 1}`);
                if (column === row.parts.length - 1 && column + 1 < columns)
                    cell.classes.add(this, `pa-col-span-${columns - column}`);
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
