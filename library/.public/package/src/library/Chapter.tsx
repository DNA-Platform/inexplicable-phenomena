import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Ref, Ref as ref } from '@/reference/Ref';
import { $TypeOfReference } from '@/reference/Reference';

export interface $Chapter$ extends $Composition$ {
    $title: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    $title = '';

    // THE LINK IS A PIECE OF WRITING. It was a hand-written <a> carrying no class, so the one
    // element a sheet most wants to address — the contents row's link — was the one it could not
    // reach: measured, 65 of the paper's 80 anchors and 32 of /turing's 60. A $Ref is already this
    // shape, and it carries the target too, so the chapter no longer holds a separate path.
    $Chapter(block: $Block) {
        const Link = $(ref);
        const named = $<$Ref>(<Link>{`[${this.$title}](#${this.$title.replace(/\s+/gu, '_')})`}</Link>);
        super.$Composition(this.addType(block, $TypeOfChapter));
        const held = this._block.$elements ?? [];
        this._block = this._block.filter(() => false).concat(named, ...held);
        this.removeClass('pd-reference');
    }

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>{content}</div>;
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
