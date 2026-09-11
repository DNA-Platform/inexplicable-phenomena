import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Path, Path as path } from '@/reference/Path';
import { doc } from './Document';
import { $Type } from '@/writing/Type';

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    _document?: $Catalogue;

    override get document(): $Catalogue | undefined { return this._document; }

    override read(): Promise<$Writing> {
        if (this._document === undefined) throw new Error('a chapter is read for its document, and this one has none yet');
        return this._document.read();
    }

    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
        const Mention = $(doc);
        const Path = $(path);
        this._document = $<$Catalogue>(<Mention />, $<$Path>(<Path>0</Path>));
    }
}

export class $$Chapter extends $Catalogue { }

export class $TypeOfChapter extends $Type {
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class ChapterSpecification extends WritingSpecification {
    @specify('a chapter writes its document in print')
    override $saysSomething(): boolean | void {
        return false;
    }

    @specify('a chapter holds only annotations')
    $holdsOnlyAnnotations(writing: $Writing): void {
        $check(this.beside(writing).every(part => reflection.annotation(part)),
            'a chapter holds only annotations, and this one holds something else');
    }
}

export const Chapter = $($Chapter);
export const chapter = $($$Chapter);
export const TypeOfChapter = $($TypeOfChapter);
