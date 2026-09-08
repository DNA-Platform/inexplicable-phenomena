// MOVED 2026-09-08 from library/ · rating 3. AN ABSTRACT IS A PAPER'S, NOT A BOOK'S — an
// encyclopedia article has none, and it sat in library/ only because Wikipedia was once the default
// look. Doug: "does anything get moved from writing or book into either of those?" This is the one.
// ITS parenthetical = true IS THE SAME MISTAKE IN ANOTHER FORM: it makes an <Abstract> VANISH, which
// is right for a book's back matter and wrong for the first thing a reader of a paper reads.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification } from '@/library/Chapter';

export interface $Abstract$ extends $Chapter$ { }

export class $Abstract extends $Composition implements $Abstract$ {
    override parenthetical = true;

    $Abstract(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfAbstract, '!')));
    }
}

export class $TypeOfAbstract extends $TypeOfChapter {
    override name = 'Abstract';
    protected override specification: Specification<$Writing> = new AbstractSpecification();
}

export class AbstractSpecification extends ChapterSpecification {
}

export const Abstract = $($Abstract);
export const TypeOfAbstract = $($TypeOfAbstract);
