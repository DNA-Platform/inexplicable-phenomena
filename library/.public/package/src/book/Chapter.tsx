import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, $Type, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Reference$, $Reference, $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $TypeOfSection } from '@/writing/Section';
import { ArticleFormat as article } from '@/encyclopedia/ArticleFormat';
import { OutputFormat as output } from '@/encyclopedia/OutputFormat';

export interface $Chapter$ extends $Composition$ { }

export interface $$Chapter$ extends $Reference$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    $Chapter(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfChapter)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfChapter, '!')];
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

export class $$Chapter extends $Reference implements $$Chapter$ {
    $$Chapter(block: $Block) {
        const held = block ?? new $Block();
        held.$elements = [...(held.$elements ?? []), $check(typeOf$Chapter, '!')];
        super.$Reference(held);
    }
}

export class $TypeOfChapter extends $Type {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();

    override below(): new() => $TypeOfSection { return $TypeOfSection; }
}

export class $TypeOf$Chapter extends $TypeOfReference {
    override name = '$Chapter';
    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class ChapterSpecification extends WritingSpecification {
}

export class $ChapterSpecification extends ReferenceSpecification {
}

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
const typeOfChapter = TypeOfChapter;
export const TypeOf$Chapter = $($TypeOf$Chapter);
const typeOf$Chapter = TypeOf$Chapter;
