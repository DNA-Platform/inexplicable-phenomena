import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Path, Path as path } from '@/reference/Path';
import { $TypeOfReference } from '@/reference/Reference';

export interface $Chapter$ extends $Composition$ {
    $title: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    $title = '';

    $Chapter(block: $Block) {
        const Path = $(path);
        super.$Composition($check(block, $Block, '!')
            .concat($check($TypeOfChapter, '!'))
            .concat($<$Path>(<Path>{'#' + this.$title}</Path>)));
    }
}

export class $TypeOfChapter extends $TypeOfReference {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class ChapterSpecification extends WritingSpecification {
    @specify('a piece of writing says something')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
