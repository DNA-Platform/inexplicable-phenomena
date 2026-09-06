import { $, select } from '@dna-platform/chemistry';
import { $MarginFormat } from './MarginFormat';

export class $HeaderFormat extends $MarginFormat {
    @select('article') article_marginBottom = '1em';
    @select('.pd-title h2') title_fontSize = '1.8em';
    @select('.pd-title h2') title_lineHeight = '1.375';
    @select('.pd-title h2') title_margin = '0';
    @select('.pd-title a, .pd-author a, .pd-subject a') cover_color = 'inherit';
    @select('.pd-title a, .pd-author a, .pd-subject a') cover_cursor = 'text';
    @select('.pd-title a:hover, .pd-author a:hover, .pd-subject a:hover') cover_textDecoration = 'none';
    @select('.pd-author, .pd-subject') byline_display = 'block';
    @select('.pd-author, .pd-subject') byline_marginTop = '0.5em';
    @select('.pd-author h2, .pd-subject h2') byline_fontSize = '0.875em';
    @select('.pd-author h2, .pd-subject h2') byline_border = 'none';
    @select('.pd-author h2, .pd-subject h2') byline_margin = '0';
    @select('.pd-subject h2') subject_color = '#54595d';
    @select('.pd-synopsis h2') description_display = 'none';
    @select('.pd-author h2, .pd-subject h2') get byline_fontFamily() { return this.theme.body; }
    @select('.pd-author h2') get author_color() { return this.theme.ink; }
}

export const HeaderFormat = $($HeaderFormat);
