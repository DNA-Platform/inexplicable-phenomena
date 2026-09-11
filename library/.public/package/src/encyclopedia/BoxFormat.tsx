import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/formatting/Format';

export class $BoxFormat extends $Format {
    override selector: any = styled.aside;
    boxSizing = 'border-box';
    margin = '1em 0';
    padding = '0';
    fontSize = '0.88em';
    lineHeight = '1.5';
    get background() { return this.theme.paper; }
    get border() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-heading') name_display = 'block';
    name_margin = '0';
    name_padding = '0.4em 0.8em';
    name_textAlign = 'center';
    name_fontSize = '1.15em';
    name_fontWeight = '700';
    name_border = 'none';
    get name_background() { return this.theme.quiet; }
    get name_fontFamily() { return this.theme.body; }

    @select('> .pd-section, > .pd-paragraph') row_display = 'grid';
    row_gridTemplateColumns = 'minmax(0, 8em) minmax(0, 1fr)';
    row_gap = '0 0.8em';
    row_margin = '0';
    row_padding = '0.35em 0.8em';
    row_alignItems = 'baseline';
    get row_borderTop() { return `1px solid ${this.theme.shade}`; }

    @select('> .pd-section > .pd-heading') label_display = 'block';
    label_margin = '0';
    label_padding = '0';
    label_fontSize = '1em';
    label_fontWeight = '700';
    label_border = 'none';
    get label_fontFamily() { return this.theme.body; }

    @select('> .pd-section > .pd-paragraph') list_margin = '0';
    list_padding = '0';

    @select('.pd-ref + .pd-ref::before') between_content = "' \\00b7 '";

    @select('@media (max-width: 640px) {\n            & > .pd-section {') narrow_gridTemplateColumns = 'minmax(0, 1fr)';
    narrow_gap = '0';
}

export const BoxFormat = $($BoxFormat);
