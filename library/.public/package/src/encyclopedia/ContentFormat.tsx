import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $ContentFormat extends $Format {
    selector = styled.div;
    gridArea = 'main';
    minWidth = '0';

    get maxWidth() { return this.theme.measure; }
    @select('article') chapter_margin = '0';
    @select('article h2') heading_padding = '0.5em 0 0.17em';
    @select('article h2') heading_margin = '0.25em 0';
    @select('article h2') heading_lineHeight = '1.375';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') sub_fontSize = '1.2em';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') sub_fontWeight = '700';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') sub_lineHeight = '1.6';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') sub_padding = '0.5em 0 0';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') sub_borderBottom = 'none';
    @select('article .pd-section:not(:first-child):not(.pd-index-card) h2') get sub_fontFamily() { return this.theme.body; }
}

export const ContentFormat = $($ContentFormat);
