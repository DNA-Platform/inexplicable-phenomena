import { $, select } from '@dna-platform/chemistry';
import { $MarginFormat } from './MarginFormat';

export class $HeaderFormat extends $MarginFormat {
    @select('article') article_marginBottom = '1em';
    @select('.pd-title h2') title_fontSize = '1.8em';
    title_borderBottom = 'none';
    title_lineHeight = '1.375';
    title_margin = '0';
    @select('.pd-title a, .pd-author a, .pd-subject a') cover_color = 'inherit';
    cover_cursor = 'text';
    @select('.pd-title a:hover, .pd-author a:hover, .pd-subject a:hover') coverHover_textDecoration = 'none';
    @select('.pd-author, .pd-subject') byline_display = 'block';
    byline_marginTop = '0.5em';
    @select('.pd-author h2, .pd-subject h2') bylineHeading_fontSize = '0.875em';
    bylineHeading_border = 'none';
    bylineHeading_margin = '0';
    @select('.pd-subject h2') get subject_color() { return this.theme.pale; }
    @select('.pd-synopsis h2') description_display = 'none';
    get bylineHeading_fontFamily() { return this.theme.body; }
    @select('.pd-author h2') get author_color() { return this.theme.ink; }
}

export const HeaderFormat = $($HeaderFormat);
