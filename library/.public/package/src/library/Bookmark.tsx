import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $Document } from './Document';

export interface $Bookmark$ extends $Reference$ {
    document(): $Document | undefined;
}

export class $Bookmark extends $Reference implements $Bookmark$ {
    document(): $Document | undefined {
        for (let holding = this.parent; holding instanceof $Writing; holding = holding.parent) {
            if (holding instanceof $Document) return holding;
            if (holding.parent === holding) return undefined;
        }
        return undefined;
    }

    $Bookmark(block: $Block) {
        super.$Reference((block ?? new $Block()).concat($check(TypeOfBookmark, '!')));
    }

    override async read(): Promise<$Writing> {
        const document = this.document();
        if (document) return document;
        return super.read();
    }
}

export class $TypeOfBookmark extends $TypeOfReference {
    override name = 'Bookmark';
    protected override specification: Specification<$Writing> = new BookmarkSpecification();

    override specifically(bookmark: $Bookmark): void {
        bookmark.persist = true;
        super.specifically(bookmark);
    }
}

export class BookmarkSpecification extends ReferenceSpecification {
    @specify('a bookmark stands in a document, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.document() !== undefined) return false;
        return super.$carriesPath(writing);
    }

}

export const Bookmark = $($Bookmark);
export const TypeOfBookmark = $($TypeOfBookmark);
