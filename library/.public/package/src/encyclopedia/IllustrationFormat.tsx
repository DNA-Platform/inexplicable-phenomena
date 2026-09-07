import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $IllustrationFormat extends $Format {
    selector = styled.figure;
    float = 'right';
    clear = 'right';
    boxSizing = 'border-box';
    width = '17em';
    maxWidth = '100%';
    margin = '0.5em 0 1.3em 1.4em';
    padding = '3px';
    @select('@media (max-width: 45em)') narrow_float = 'none';
    @select('@media (max-width: 45em)') narrow_width = '100%';
    @select('@media (max-width: 45em)') narrow_margin = '0.5em 0 1.3em';
    @select('img') image_display = 'block';
    @select('img') image_width = '100%';
    @select('img') image_height = 'auto';
    get border() { return `1px solid ${this.theme.shade}`; }
    @select('figcaption') caption_fontSize = '0.875em';
    @select('figcaption') caption_lineHeight = '1.4';
    @select('figcaption') caption_padding = '0.4em 0.6em';
    @select('figcaption') get caption_fontFamily() { return this.theme.body; }
    @select('figcaption') get caption_color() { return this.theme.ink; }
    @select('figcaption') get caption_background() { return this.theme.quiet; }
    @select('figcaption') get caption_borderTop() { return `1px solid ${this.theme.shade}`; }
}

export const IllustrationFormat = $($IllustrationFormat);
