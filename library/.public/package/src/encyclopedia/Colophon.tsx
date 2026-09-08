// CREATED 2026-09-08 · rating 3 · shell. The note on the terms a text is available under — licence, terms, privacy — promoted from the demo's $Footer, declared identically in both .wiki books. A colophon is the library's own word for the note at the end of a book about how it was made. Same open question as Masthead: $Book.colophon() is a place, this is a kind.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';

export interface $Colophon$ extends $Chapter$ { }

export class $Colophon extends $Composition implements $Colophon$ {
    $Colophon(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfColophon, '!')));
    }

    // OWED: <footer class="pd-colophon"> — and it is the LAST chapter, which the book's placement already knows how to say.
}

export class $TypeOfColophon extends $TypeOfChapter {
    override name = 'Colophon';
    protected override specification: Specification<$Writing> = new ColophonSpecification();
}

export class ColophonSpecification extends ChapterSpecification {
}

export const Colophon = $($Colophon);
export const TypeOfColophon = $($TypeOfColophon);
