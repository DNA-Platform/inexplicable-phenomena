import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue, $TypeOfCatalogue } from '@/reference/Catalogue';
import { $Type } from '@/writing/Type';
import { $Document, $TypeOfDocument } from './Document';
import { $Section } from '@/writing/Section';

export interface $Chapter$ extends $Composition$ {
    readonly title: $Section | undefined;
    readonly name: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    get title(): $Section | undefined { return this.parts().find((part): part is $Document => reflection.is(part, $TypeOfDocument))?.title(); }
    get name(): string { return reflection.slug(html.text(this.title?.heading()?._block)); }

    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
    }

    // A CHAPTER HOLDS ONLY ANNOTATIONS AND WRITES ITS DOCUMENT IN PRINT, its own specification says,
    // so its parts are the one writing it prints.
    override parts(): $Writing[] { return reflection.printed(this); }
}

export class $$Chapter extends $Catalogue {
    $$Chapter(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfChapterMention));
    }
}

export class $TypeOfChapter extends $Type {
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class $TypeOfChapterMention extends $TypeOfCatalogue { }

export class ChapterSpecification extends WritingSpecification {
    @specify('a chapter writes its document in print')
    override $saysSomething(): boolean | void {
        return false;
    }

    @specify('the document a chapter prints specifies')
    override $holdsSpecifiedParts(writing: $Writing): void {
        this.specified(reflection.printed(writing));
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
export const TypeOfChapterMention = $($TypeOfChapterMention);
