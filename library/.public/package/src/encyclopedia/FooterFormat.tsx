import { $, select } from '@dna-platform/chemistry';
import { $MarginFormat } from './MarginFormat';

export class $FooterFormat extends $MarginFormat {
    override $at = 'bottom';
    fontSize = '0.92em';
    @select('.pd-index') index_padding = '0.5em 1em';
    index_display = 'block';
    get index_background() { return this.theme.quiet; }
    get index_border() { return `1px solid ${this.theme.rule}`; }
}

export const FooterFormat = $($FooterFormat);
