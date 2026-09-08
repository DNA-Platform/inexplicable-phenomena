// IN PROGRESS · rating 2. The first written format: a table's grid by its columns, which a sheet cannot say. Made in $Table's bond, it reads the table it stands in.
import { $, select } from '@dna-platform/chemistry';
import type { $Table } from '@/writing/Table';
import { $Format } from './Format';

export class $TableFormat extends $Format {
    $columns = 1;
    display = 'grid';
    get gridTemplateColumns() { return `repeat(${this.$columns}, minmax(0, 1fr))`; }
    @select('> .pd-table') table_display = 'contents';
    @select('> .pd-table > .pd-heading') heading_gridColumn = '1 / -1';

    protected override handed(): Record<string, unknown> {
        return { columns: (this.parent as $Table | undefined)?.$columns ?? 1 };
    }
}

export const TableFormat = $($TableFormat);
