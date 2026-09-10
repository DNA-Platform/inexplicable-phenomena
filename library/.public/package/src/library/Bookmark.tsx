import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Fold$, $Fold, $TypeOfFold, FoldSpecification } from '@/reference/Fold';
import { reflection } from '@/utilities/Reflection';
import { $Document, $TypeOfDocument } from './Document';

export interface $Bookmark$ extends $Fold$ {
    document(): $Document | undefined;
}

export class $Bookmark extends $Fold implements $Bookmark$ {
    document(): $Document | undefined {
        for (let holding = this.parent; reflection.writing(holding); holding = holding.parent) {
            if (reflection.is<$Document>(holding, $TypeOfDocument)) return holding;
            if (holding.parent === holding) return undefined;
        }
        return undefined;
    }

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
