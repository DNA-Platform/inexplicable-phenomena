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
    narrow_width = '100%';
    narrow_margin = '0.5em 0 1.3em';
    @select('img') image_display = 'block';
    image_width = '100%';
    image_height = 'auto';
    get border() { return `1px solid ${this.theme.shade}`; }
    @select('figcaption') caption_fontSize = '0.875em';
    caption_lineHeight = '1.4';
    caption_padding = '0.4em 0.6em';
    get caption_fontFamily() { return this.theme.body; }
    get caption_color() { return this.theme.ink; }
    get caption_background() { return this.theme.quiet; }
    get caption_borderTop() { return `1px solid ${this.theme.shade}`; }
}

export const IllustrationFormat = $($IllustrationFormat);
