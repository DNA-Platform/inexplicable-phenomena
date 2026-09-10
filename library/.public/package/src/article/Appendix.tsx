// CREATED 2026-09-08 · rating 3 · shell. A document after the body, lettered rather than numbered — LaTeX's \appendix. It is a document in every way but where it stands and what it is called, which is exactly what a type is for.
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document$, $Document, $TypeOfDocument, DocumentSpecification } from '@/library/Document';

export interface $Appendix$ extends $Document$ {
    letter(): string | undefined;
}

export class $Appendix extends $Document implements $Appendix$ {
    letter(): string | undefined {
        throw new Error('not implemented: $Appendix.letter — a reading over the book\u2019s appendices in the order it holds them');
    }

    $Appendix(block: $Block) {
        super.$Document(this.addType(block, $TypeOfAppendix));
    }
}

export class $TypeOfAppendix extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new AppendixSpecification();
}

export class AppendixSpecification extends DocumentSpecification {
    // OWED: 'an appendix stands after the body' — the book's placement already says where the cover, synopsis, contents and index stand; this is one more.
}

export const Appendix = $($Appendix);
export const TypeOfAppendix = $($TypeOfAppendix);
