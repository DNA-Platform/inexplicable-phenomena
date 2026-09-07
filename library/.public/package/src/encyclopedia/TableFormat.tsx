import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $TableFormat extends $Format {
    selector = styled.div;
    $columns = 1;
    display = 'grid';
    margin = '1em 0';
    get gridTemplateColumns() { return `repeat(${this.$columns}, minmax(0, 1fr))`; }
    get background() { return this.theme.quiet; }
    get color() { return this.theme.ink; }
    get border() { return `1px solid ${this.theme.rule}`; }
    @select('> .pd-table') table_display = 'contents';
    @select('> .pd-table > .pd-heading') heading_gridColumn = '1 / -1';
    @select('> .pd-table > *') cell_padding = '0.2em 0.4em';
    get cell_border() { return `1px solid ${this.theme.rule}`; }
}

export const TableFormat = $($TableFormat);
