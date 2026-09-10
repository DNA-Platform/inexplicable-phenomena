import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { html } from '@/utilities/Html';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Path, $TypeOfPath, Path as path } from '@/reference/Path';
import { $TypeOfReference } from '@/reference/Reference';

export interface $Chapter$ extends $Composition$ {
    $title: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    $title = '';

    $Chapter(block: $Block) {
        const Path = $(path);
        super.$Composition(this.addType(block, $TypeOfChapter)
            .concat(this.$title)
            .concat($<$Path>(<Path>{'#' + this.$title.replace(/\s+/gu, '_')}</Path>)));
    }

    override print(content: ReactNode): ReactNode {
        return <a href={html.text(this.searchForOne<$Path>($TypeOfPath)?._block)} className={this.className}>{content}</a>;
    }
}

export class $TypeOfChapter extends $TypeOfReference {
    override name = 'Chapter';
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class ChapterSpecification extends WritingSpecification { }

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
