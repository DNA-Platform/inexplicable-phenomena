// CREATED 2026-09-08 · rating 3 · shell. An article is a PART of a book beside the margin (Sprint 51 R1). Owed by the base: a part answering its own contents (U6) and a book enumerating its parts (U5).
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Part$, $Part, $TypeOfPart, PartSpecification } from '@/library/Part';

export interface $Article$ extends $Part$ { }

// IT EXTENDS THE CLASS, not $Composition, and that is the $ReferenceCard precedent: P11 forbids a
// class extending the LEVEL above it, and an article is not a level above a part — it IS one, the
// way a reference card is a reference. Extending $Composition made it COPY partitions, chapters and
// sections as empty fields, which reads as cruft and is not: $TypeOfPart.specifically fills all
// three, so they are the type being causal (P13). Extending the class inherits them filled.
export class $Article extends $Part implements $Article$ {
    $Article(block: $Block) {
        super.$Part($check(block, $Block, '!').concat($check($TypeOfArticle, '!')));
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
