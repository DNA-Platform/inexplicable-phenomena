import { $, select } from '@dna-platform/chemistry';
import { $BoxFormat } from './BoxFormat';

export class $InfoboxFormat extends $BoxFormat {
    float = 'right';
    clear = 'right';
    width = '22em';
    maxWidth = '100%';
    override margin = '0 0 1em 1.4em';

    @select('> .pd-line') line_display = 'grid';
    line_gridTemplateColumns = 'minmax(0, 6.5em) minmax(0, 1fr)';
    line_gap = '0 0.6em';
    line_margin = '0';
    line_padding = '0.35em 0.5em';
    line_alignItems = 'baseline';
    get line_borderTop() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-line::before') label_content = 'attr(data-label)';
    label_fontWeight = '700';
}

export const InfoboxFormat = $($InfoboxFormat);
