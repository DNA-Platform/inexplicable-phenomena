import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Type } from '@/writing/Type';

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
    }

    // A CHAPTER HOLDS ONLY ANNOTATIONS AND WRITES ITS DOCUMENT IN PRINT, its own specification says,
    // so its parts are the one writing it prints.
    override parts(): $Writing[] { return reflection.printed(this); }
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
