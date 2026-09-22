import { $, $Block } from '@dna-platform/chemistry';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';

// WHERE A CHAPTER'S OWN FILE STANDS ON ITS PAGE, written explicitly and resolved by the binder.
//
//     <Resource>.ts</Resource>
//
// IT RESOLVES AT BUILD AND NOT AT DRAW — Doug, 2026-09-16: "Has to explicitly be somewhere, and the
// binder needs to find and replace it too." The binder knows every file standing beside every
// chapter before a page is drawn, so what belongs here is put here then, and a file that is missing
// fails the BUILD rather than leaving a hole in a page nobody notices.
//
// AND ASKING FOR IT AT DRAW COST US A LIBRARY. The first version reached up for its chapter while
// that chapter's own parts were being computed, so the walk re-entered the parse it was standing in.
// Measured 2026-09-16 by the session binding next door: `specify` on this one book ran 291 seconds
// and died on a 4GB heap — allocating on every turn rather than merely re-entering — and because
// every book extends the library's own .book, one book took the whole of .me down with it. Worse,
// the gate had been reporting green: `specify` was answering "6 unchanged" from its cache and never
// reading the book at all, so the fault was older than any number that had been quoted about it.
//
// A RESOURCE IS A BUILD-TIME FACT. There is no disk at draw time and there was never anything to
// walk for. Until the binder's replacement lands this draws nothing, deliberately — an annotation is
// carried by the writing and put on no page, which is the safe state for a marker whose whole job is
// to be found and swapped.
export interface $Resource$ extends $Annotation$ { }

export class $Resource extends $Annotation implements $Resource$ {
    $Resource(block: $Block) {
        super.$Writing(this.addType(block, $TypeOfResource));
    }
}

export class $TypeOfResource extends $Type { }

export const Resource = $($Resource);
export const TypeOfResource = $($TypeOfResource);
