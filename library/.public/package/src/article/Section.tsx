// CREATED 2026-09-08 · rating 3 · shell. A NUMBERED section — 1, 1.1, 1.1.1 — which is the one thing
// a paper's section has that the base's has not. THE FILE IS NAMED FOR THE KIND AND THE CLASS FOR
// THE DOMAIN, so a paper imports Section from its own door and gets this one (Doug: "EncyclopediaArticle
// exports as Article"). encyclopedia/Section.tsx says the same word and means Wikipedia's.
//
// OWED BY THE BASE, and it is the third kind asking for the same thing: the number is a READING over
// the sections that hold it, exactly as $Equation, $Theorem, $Citation and $Footnote each want one.
// Four kinds wanting one reading is a finding about the base, not four implementations.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $ArticleSection$ extends $Section$ {
    number(): string | undefined;
}

export class $ArticleSection extends $Section implements $ArticleSection$ {
    number(): string | undefined { throw new Error('not implemented: $ArticleSection.number — its position among the sections that hold it, dotted by depth'); }

    $ArticleSection(block: $Block) {
        super.$Section($check(block, $Block).concat($check($TypeOfArticleSection, '!')));
    }

    // OWED: the number stands before the heading and is not part of it, so a table of contents reads both.
}

export class $TypeOfArticleSection extends $TypeOfSection {
    override name = 'ArticleSection';
    protected override specification: Specification<$Writing> = new ArticleSectionSpecification();
}

export class ArticleSectionSpecification extends SectionSpecification {
}

export const Section = $($ArticleSection);
export const TypeOfSection = $($TypeOfArticleSection);
