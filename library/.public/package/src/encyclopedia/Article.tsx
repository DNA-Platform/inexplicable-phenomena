// CREATED 2026-09-13 · rating 2. A CHAPTER THAT IS PART OF THE ARTICLE — one logical part of what
// the page SAYS, as against the apparatus a book carries. Book is layout; chapters are logical
// parts, and a chapter says which part it is by the type it carries, never by where it stands.
// THE NAME IS A PROXY, flagged for Doug.
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Chapter$, $Chapter, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';

export interface $Article$ extends $Chapter$ { }

export class $Article extends $Chapter implements $Article$ {
    $Article(block: $Block) {
        super.$Chapter(this.addType(block, $TypeOfArticle));
    }
}

export class $TypeOfArticle extends $TypeOfChapter {
    protected override specification: Specification<$Writing> = new ArticleSpecification();
}

export class ArticleSpecification extends ChapterSpecification {
}

export const Article = $($Article);
export const TypeOfArticle = $($TypeOfArticle);
