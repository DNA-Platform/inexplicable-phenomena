import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference } from '@/reference/Reference';
import { $Chapter, $TypeOf$Chapter, $ChapterSpecification } from './Chapter';

export interface $Bookmark$ extends $Reference$ {
    chapter(): $Chapter | undefined;
}

export class $Bookmark extends $Reference implements $Bookmark$ {
    chapter(): $Chapter | undefined {
        for (let at = this.parent; at instanceof $Writing; at = at.parent) {
            if (at instanceof $Chapter) return at;
            if (at.parent === at) return undefined;
        }
        return undefined;
    }

    $Bookmark(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOfBookmark, '!')];
        super.$Reference(held);
    }

    override async read(): Promise<$Writing> {
        const chapter = this.chapter();
        if (chapter) return chapter;
        return super.read();
    }
}

export class $TypeOfBookmark extends $TypeOf$Chapter {
    override name = 'Bookmark';
    protected override specification: Specification<$Writing> = new BookmarkSpecification();

    override specifically(bookmark: $Writing): void {
        bookmark.persist = true;
        super.specifically(bookmark);
    }
}

export class BookmarkSpecification extends $ChapterSpecification {
    @specify('a bookmark stands in a chapter, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.chapter() !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a bookmark lands on the chapter it stands in, or where its path lands')
    override $landsOnIt(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.chapter() !== undefined && writing.path() === undefined) return false;
        return super.$landsOnIt(writing);
    }
}

export const Bookmark = $($Bookmark);
export const TypeOfBookmark = $($TypeOfBookmark);
const typeOfBookmark = TypeOfBookmark;
