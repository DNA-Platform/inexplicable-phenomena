import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';


export interface $PageFold$ extends $Reference$ {
    key(): string;
}

// A PAGE FOLD IS AN ARBITRARY PLACE IN WRITING, DENOTED SO IT CAN BE REFERRED TO. Doug: "a page
// fold is a great metaphor for an arbitrary place in writing, that can be denoted and referred to…
// Nothing paper about a page on the web." It does not bend: folding is the act and the page is
// incidental to it. A BOOKMARK is document-grained — it answers document() — and a fold is
// point-grained, which is a distinction the two classes already carried before either was used.
//
// AND IT IS THE INVERSE OF ITS PARENT. A $Reference gives its holder a MEANING, and a writing with
// one is drawn inside <a href>; a fold gives its holder a KEY, and a writing with one is drawn
// inside <a id>. One points, the other is pointable. That is why reflection.meaning() now steps
// over a fold: it matches anything typed Reference, so a folded writing was being drawn as a LINK
// TO ITSELF before this.
export class $PageFold extends $Reference implements $PageFold$ {
    location = 0;

    // THE KEY IS WHAT IT HOLDS. $Reference only makes a $Path when its copy adstyles something,
    // so `cook` never became one — a key is not a URL and does not have to look like one.
    key(): string { return html.text(this._block).trim(); }

    $PageFold(block: $Block) {
        super.$Reference((block ?? new $Block()).concat($check(TypeOfPageFold, '!')));
    }
}

export class $TypeOfPageFold extends $TypeOfReference {
    override name = 'PageFold';
    protected override specification: Specification<$Writing> = new PageFoldSpecification();

    override specifically(fold: $PageFold): void {
        fold.persist = true;
        super.specifically(fold);
    }
}

export class PageFoldSpecification extends ReferenceSpecification {
}

export const PageFold = $($PageFold);
export const TypeOfPageFold = $($TypeOfPageFold);
