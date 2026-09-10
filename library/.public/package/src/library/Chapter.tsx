import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { html } from '@/utilities/Html';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Path, $TypeOfPath, Path as path } from '@/reference/Path';
import { $Document, $TypeOfDocument } from './Document';
import { $TypeOfReference } from '@/reference/Reference';

export interface $Chapter$ extends $Composition$ {
    $title: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    $title = '';

    override get classes(): string[] {
        const meant = this.book.searchFor<$Document>($TypeOfDocument)
            .find(document => html.text(document.title()?._block).trim() === this.$title.trim());

        return [...super.classes, ...(meant?.classes ?? [])];
    }

    $Chapter(block: $Block) {
        const Path = $(path);
        super.$Composition(this.addType(block, $TypeOfChapter)
            .concat($<$Path>(<Path>{'#' + this.$title.replace(/\s+/gu, '_')}</Path>)));
        this.removeClass('pd-reference');
    }

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>
            <a href={html.text(this.searchForOne<$Path>($TypeOfPath)?._block)}>{this.$title}</a>
            {content}
        </div>;
    }
}

export class $TypeOfChapter extends $TypeOfReference {
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
