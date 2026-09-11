import { $ } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { EncyclopediaTheme } from '@dna-platform/public/encyclopedia';

export default class $Article extends $Book { }

export const Article = $($Article);

$(Article, Theme)(EncyclopediaTheme);
