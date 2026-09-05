import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $TableFormat extends $Format {
    selector = styled.table;
    borderCollapse = 'collapse';
    margin = '1em 0';
    @select('td, th') padding = '0.2em 0.4em';
    @select('th') textAlign = 'center';
    @select('th') fontWeight = 'bold';
    get background() { return this.theme.quiet; }
    get color() { return this.theme.ink; }
    @select('td, th') get border() { return `1px solid ${this.theme.rule}`; }
    @select('th') get head_background() { return this.theme.shade; }
}

export const TableFormat = $($TableFormat);
