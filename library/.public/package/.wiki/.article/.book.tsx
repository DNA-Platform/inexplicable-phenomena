import { $, select } from '@dna-platform/chemistry';
import { $Book } from '@dna-platform/public';
import { $HeaderFormat, HeaderFormat } from '@dna-platform/public/encyclopedia';

export default class $Article extends $Book { }

export class $ArticleHeaderFormat extends $HeaderFormat {
    @select('.pd-title .pd-reference') meaning_display = 'none';
}

export const Article = $($Article);
export const ArticleHeaderFormat = $($ArticleHeaderFormat);

$(Article, HeaderFormat)(ArticleHeaderFormat);
