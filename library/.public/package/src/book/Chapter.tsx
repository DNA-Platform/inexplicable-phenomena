import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfSection } from '@/writing/Section';
import { ArticleFormat as article } from '@/encyclopedia/ArticleFormat';
import { OutputFormat as output } from '@/encyclopedia/OutputFormat';

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    $Chapter(block: $Block) {
        super.$Composition(block);
        this.addType($TypeOfChapter);
    }

    override frame(): ReactNode {
        const Article = $(article);
        const Output = $(output);

        return (
            <Article>
                <Output>{super.frame()}</Output>
            </Article>
        );
    }
}

export class $TypeOfChapter extends $Type {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();

    override below(): new() => $TypeOfSection { return $TypeOfSection; }
}

export class ChapterSpecification extends WritingSpecification {
    @specify('a chapter is written in sections')
    $writtenInSections(writing: $Writing): void {
        $check(this.composed(writing).every(part => reflection.instanceOf(part, $TypeOfSection)),
            'a chapter is written in sections, and this one holds something else');
    }
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
