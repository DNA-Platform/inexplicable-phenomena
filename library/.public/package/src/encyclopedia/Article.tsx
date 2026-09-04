import { $, styled } from '@dna-platform/chemistry';
import { $Style } from '@/writing/Writing';

export class $Article extends $Style {
    selector = styled.article;
    margin = '0 0 2em';
    get color() { return this.theme.ink; }
}

export const Article = $($Article);
