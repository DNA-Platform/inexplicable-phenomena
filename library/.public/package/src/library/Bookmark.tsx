import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Fold$, $Fold, $TypeOfFold, FoldSpecification } from '@/reference/Fold';
import { reflection } from '@/utilities/Reflection';
import { $Document, $TypeOfDocument } from './Document';

export interface $Bookmark$ extends $Fold$ { }

export class $Bookmark extends $Fold implements $Bookmark$ {
    $Bookmark(block: $Block) {
        super.$Fold((block ?? new $Block()).concat($check(TypeOfBookmark, '!')));
    }
}

export class $TypeOfBookmark extends $TypeOfFold {
    protected override specification: Specification<$Writing> = new BookmarkSpecification();

    override specifically(bookmark: $Bookmark): void {
        bookmark.persist = true;
        super.specifically(bookmark);
    }
}

export class BookmarkSpecification extends FoldSpecification { }

export const Bookmark = $($Bookmark);
export const TypeOfBookmark = $($TypeOfBookmark);
