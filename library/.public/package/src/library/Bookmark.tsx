import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $Chapter } from './Chapter';

export interface $Bookmark$ extends $Reference$ {
    chapter(): $Chapter | undefined;
}

export class $Bookmark extends $Reference implements $Bookmark$ {
    chapter(): $Chapter | undefined {
        for (let holding = this.parent; holding instanceof $Writing; holding = holding.parent) {
            if (holding instanceof $Chapter) return holding;
            if (holding.parent === holding) return undefined;
        }
        return undefined;
    }

    $Bookmark(block: $Block) {
        super.$Reference((block ?? new $Block()).concat($check(typeOfBookmark, '!')));
    }

    override async read(): Promise<$Writing> {
        const chapter = this.chapter();
        if (chapter) return chapter;
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
    @specify('a bookmark stands in a chapter, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.chapter() !== undefined) return false;
        return super.$carriesPath(writing);
    }

}

export const Bookmark = $($Bookmark);
export const TypeOfBookmark = $($TypeOfBookmark);
const typeOfBookmark = TypeOfBookmark;
