import { $Block, $, cache } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Chapter, $$Chapter, $TypeOf$Chapter, $ChapterSpecification } from './Chapter';
import { $PageFold } from './PageFold';

export class $Bookmark extends $$Chapter {
    pageFold?: $PageFold;

    get chapter(): $Chapter | undefined {
        for (let at = this.parent; at instanceof $Writing; at = at.parent) {
            if (at instanceof $Chapter) return at;
            if (at.parent === at) return undefined;
        }
        return undefined;
    }

    $Bookmark(block: $Block) {
        super.$$Chapter(block);
        this._type = $(<TypeOfBookmark />);
    }

    override async read(): Promise<$Chapter> {
        const chapter = this.chapter;
        if (chapter) return chapter;
        return super.read();
    }
}

export class $TypeOfBookmark extends $TypeOf$Chapter {
    override get canonicalForm(): typeof $Writing { return $Bookmark; }

    constructor() {
        super();
        this[cache]('Bookmark');
    }

    protected override specification: Specification<$Writing> = new BookmarkSpecification();
}

export class BookmarkSpecification extends $ChapterSpecification {
    @specify('a bookmark stands in a chapter, or carries a path')
    override $carriesPath(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.chapter !== undefined) return false;
        return super.$carriesPath(writing);
    }

    @specify('a bookmark lands on the chapter it stands in, or where its path lands')
    override $landsOnIt(writing: $Writing): boolean | void {
        if (writing instanceof $Bookmark && writing.chapter !== undefined && writing.path === undefined) return false;
        return super.$landsOnIt(writing);
    }
}

export const Bookmark = $($Bookmark);
export const TypeOfBookmark = $($TypeOfBookmark);
