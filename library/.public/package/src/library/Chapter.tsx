// CREATED 2026-09-09 · rating 2. THE FIRST RUNG OF THE SECOND LADDER.
//
// Doug: "Letter through Document define levels of a single document. Chapter is one type
// composition that is a part of a new hierarchy that that one lives inside. Book is then a
// composition of those." And, on how to build it: "Can you do chapter is a composition of chapters
// like Letter, same type of catalogue, and then book is a composition of chapters. Nothing fancy."
//
// SO IT IS THE ORDINARY FOUR DECLARATIONS and nothing else: the strong class, its catalogue twin,
// a type for each, a specification for each. What makes it the joint between the two ladders is not
// machinery — it is that a chapter's MEANING is a reference, so what a chapter stands for is a
// document, or another book, and the reference says which.
//
// AND THAT IS WHERE A BOOK OF BOOKS COMES FROM. Doug: "the way a book is a composition of books is
// both in the meaning side of reference and the filtering side of polymorphism (not all chapters
// but some). It is the story of things breaking out of their abstraction." A book composes
// chapters; SOME of those chapters mean books; asking for those is a filter and not a new kind.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Type } from '@/writing/Type';

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    $Chapter(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfChapter, '!')));
    }
}

export interface $$Chapter$ extends $Chapter$ { }

export class $$Chapter extends $Catalogue implements $$Chapter$ {
    $$Chapter(block: $Block) {
        super.$Catalogue($check(block, $Block, '!').concat($check($TypeOfChapter, '!')).concat($check($TypeOf$Chapter, '!')));
    }
}

export class $TypeOfChapter extends $Type {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();

    // A CHAPTER IS A COMPOSITION OF CHAPTERS, which is what makes a book's parts self-referring —
    // Doug: "at the book level the parts are self-referring." The document a chapter stands for is
    // not beneath it; it is what the chapter MEANS.
    override below(): new() => $TypeOfChapter { return $TypeOfChapter; }
}

export class ChapterSpecification extends WritingSpecification { }

export class $TypeOf$Chapter extends $Type {
    override name = '$Chapter';
    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class $ChapterSpecification extends WritingSpecification { }

export const Chapter = $($Chapter);
export const chaptered = $($$Chapter);
export const TypeOfChapter = $($TypeOfChapter);
export const TypeOf$Chapter = $($TypeOf$Chapter);
