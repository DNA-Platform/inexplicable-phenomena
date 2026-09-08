// CREATED 2026-09-08 · rating 3 · shell. An article is a PART of a book beside the margin (Sprint 51 R1). Owed by the base: a part answering its own contents (U6) and a book enumerating its parts (U5).
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Part$, $TypeOfPart, PartSpecification } from '@/library/Part';

export interface $Article$ extends $Part$ { }

export class $Article extends $Composition implements $Article$ {
    partitions = [];
    chapters = [];
    sections = [];

    $Article(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfArticle, '!')));
    }

    // OWED: the article's cover read from its canonical section (Sprint 51 R3/R4: "canonical is a property, not a position"); its contents.
}

export class $TypeOfArticle extends $TypeOfPart {
    override name = 'Article';
    protected override specification: Specification<$Writing> = new ArticleSpecification();
}

export class ArticleSpecification extends PartSpecification {
    // OWED: 'an article opens with its title block' — the LaTeX title, authors, abstract — as a rule the article carries and the book no longer does for it.
}

export const Article = $($Article);
export const TypeOfArticle = $($TypeOfArticle);
