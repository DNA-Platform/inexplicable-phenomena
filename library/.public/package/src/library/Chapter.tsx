import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Type } from '@/writing/Type';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $Reference, $TypeOfReference, ReferenceSpecification, Reference as reference } from '@/reference/Reference';

export interface $Chapter$ extends $Composition$ { }

export class $Chapter extends $Composition implements $Chapter$ {
    override get document(): $Catalogue | undefined { return undefined; }

    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
        const named = html.text(this._block).trim();
        if (named !== '' && reflection.meaning(this) === undefined) {
            const Reference = $(reference);
            this._block = this._block.concat($<$Reference>(<Reference>{`#${reflection.kebab(named)}`}</Reference>));
        }
    }

    view(): ReactNode {
        return html.text(this._block).trim() === '' ? null : super.view();
    }
}

export interface $$Chapter$ extends $Paragraph$ { }

export class $$Chapter extends $Catalogue implements $$Chapter$ {
    $$Chapter(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfParagraph, $TypeOf$Chapter));
    }
}

export class $TypeOfChapter extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class ChapterSpecification extends ReferenceSpecification {
    @specify('a piece of writing says something')
    override $saysSomething(writing: $Writing): boolean | void {
        return false;
    }

    @specify('a chapter names a document, or is one in its view')
    override $carriesPath(writing: $Writing): boolean | void {
        $check(html.text(writing._block).trim() === '' || reflection.meaning(writing) !== undefined,
            'a chapter names a document, or is one in its view, and this one does neither');
    }

    @specify('a chapter says nothing of its own')
    $saysNothing(writing: $Writing): void {
        $check(this.composed(writing).length === 0,
            'a chapter says nothing of its own, and this one composes writing');
    }

    @specify('a chapter holds only annotations')
    $holdsOnlyAnnotations(writing: $Writing): void {
        $check(this.beside(writing).every(part => reflection.annotation(part)),
            'a chapter holds only annotations, and this one holds something else');
    }
}

export class $TypeOf$Chapter extends $Type {
    protected override specification: Specification<$Writing> = new $ChapterSpecification();
}

export class $ChapterSpecification extends WritingSpecification { }

export const Chapter = $($Chapter);
export const chapter = $($$Chapter);
export const TypeOf$Chapter = $($TypeOf$Chapter);
export const TypeOfChapter = $($TypeOfChapter);
