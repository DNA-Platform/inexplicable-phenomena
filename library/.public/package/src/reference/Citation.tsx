// CREATED 2026-09-08, RE-PARENTED 2026-09-09 · rating 3. LaTeX's \cite and Wikipedia's [1] are one
// kind: a mark IN THE PROSE pointing at an entry. It extended $Reference and drew NOTHING on the
// paper — measured — because a $Reference is an ANNOTATION, and reflection.content strips
// annotations from what a writing draws. Nor could format() save it: formatted() reduces over the
// HOLDER's annotations, so the mark would land at the end of the paragraph instead of where the
// citation stands. $Ref already is this shape and draws correctly — a $Phrase standing in the text
// that writes an anchor — so a citation IS a ref, and $Reference is the other thing that shares
// the word: the annotation that carries a writing's meaning.
// STILL OWED: the number is the ENTRY's position, so a citation must read the bibliography that
// holds it — the inverse of pointing, which nothing here computes. number() answers its position
// among the book's citations, which agrees only while a paper cites in order.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Ref$, $Ref, $TypeOfRef, RefSpecification } from './Ref';

export interface $Citation$ extends $Ref$ {
    number(): number | undefined;
}

export class $Citation extends $Ref implements $Citation$ {
    // ACROSS THE BOOK, because a citation's number is the same wherever in the text it stands.
    number(): number | undefined { return reflection.numbered(this, reflection.holding(this) ?? this); }

    $Citation(block: $Block) {
        super.$Ref(this.addType(block, $TypeOfCitation));
    }

}

export class $TypeOfCitation extends $TypeOfRef {
    protected override specification: Specification<$Writing> = new CitationSpecification();
}

export class CitationSpecification extends RefSpecification {
    // OWED: 'a citation means an entry its bibliography holds' — a citation of nothing is not admitted, which is what makes the number answerable.
}

export const Citation = $($Citation);
export const TypeOfCitation = $($TypeOfCitation);
