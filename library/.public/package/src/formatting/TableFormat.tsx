// IN PROGRESS · rating 2. The one format the base keeps: a table's grid by $columns is structure a sheet cannot say (T6). Whether it becomes an annotation or stays a wrapper is Q4.
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from './Format';

export class $TableFormat extends $Format {
    selector = styled.div;
    $columns = 1;
    display = 'grid';
    get gridTemplateColumns() { return `repeat(${this.$columns}, minmax(0, 1fr))`; }
    @select('> .pd-table') table_display = 'contents';
    @select('> .pd-table > .pd-heading') heading_gridColumn = '1 / -1';
}

export const TableFormat = $($TableFormat);
