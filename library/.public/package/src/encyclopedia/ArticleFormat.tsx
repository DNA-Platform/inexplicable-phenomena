import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $ArticleFormat extends $Format {
    selector = styled.article;
    margin = '0 0 2em';
    get color() { return this.theme.ink; }
}

export const ArticleFormat = $($ArticleFormat);
