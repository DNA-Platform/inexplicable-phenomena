// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the article sprint.
// THE ARTICLE IS A PART, NOT A BOOK (Sprint 51 R1, Doug: "Maybe since we have Parts, Article is a type of Part") — one part of a book beside the margin, holding the cover, the chapters (h2) with partitions for h3/h4, and its own table of contents.
// /article IS the LaTeX article as a book type (Doug 2026-09-08): its kinds live here and its optional theme is article/Theme; the base sheet must stand under it wherever the theme says nothing.
// DEPENDS ON: $Composition, $TypeOfPart / PartSpecification (book/Part) — designed for it: Part exists to group and to style a group ("we offer the Part as the way to style that"). DEPENDS ON, owed: a part answering its OWN table of contents (Sprint 51 U6, design owed) and $Book enumerating its parts (Sprint 51 U5 — the one-level searchFor cannot see chapters inside a part: a BASE finding).
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
