import { ReactNode } from 'react';
import { $, $Block, $check, inert } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Reference, $TypeOfReference, ReferenceSpecification, Reference as reference } from '@/reference/Reference';
import type { $Document } from './Document';

export interface $Chapter$ extends $Composition$ {
    title(): string;
    read(): $Document | undefined;
}

// A CHAPTER IS A REFERENCE TO A DOCUMENT. Given a title it is a link to the document named that;
// bare, it looks like nothing; a subclass is its view, and the document that view writes tells the
// chapter it is there when it is drawn, so whoever needs it FOLLOWS the chapter with read().
export class $Chapter extends $Composition implements $Chapter$ {
    @inert() written?: $Document;

    // A CHAPTER'S BOOK IS ITS PARENT — Doug: "The chapter will always have a book as its parent."
    override get book(): $Writing { return reflection.writing(this.parent) ? this.parent : this; }

    title(): string {
        const named = html.text(this._block).trim();
        return named !== '' ? named : html.text(this.read()?.title()?._block).trim();
    }

    read(): $Document | undefined { return this.written; }

    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
        this.removeClass('pd-reference');
        const named = html.text(this._block).trim();
        if (named !== '' && reflection.meaning(this) === undefined) {
            const Reference = $(reference);
            this._block = this._block.concat($<$Reference>(<Reference>{`#${named.replace(/\s+/gu, '_')}`}</Reference>));
        }
    }

    view(): ReactNode {
        return html.text(this._block).trim() === '' ? null : super.view();
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

    // A CHAPTER NAMES A DOCUMENT OR WRITES ONE IN ITS VIEW — a reference's rule, said for a chapter.
    @specify('a chapter names a document, or is one in its view')
    override $carriesPath(writing: $Writing): boolean | void {
        $check(html.text(writing._block).trim() === '' || reflection.meaning(writing) !== undefined,
            'a chapter names a document, or is one in its view, and this one names a document it cannot reach');
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

export const Chapter = $($Chapter);
export const TypeOfChapter = $($TypeOfChapter);
