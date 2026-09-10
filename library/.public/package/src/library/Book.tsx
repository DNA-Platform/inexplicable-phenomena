import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfReference } from '@/reference/Reference';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Document, $TypeOfDocument } from './Document';
import { $Chapter, $TypeOfChapter } from './Chapter';
import { $Cover, $TypeOfCover } from './Cover';
import { $Synopsis, $TypeOfSynopsis } from './Synopsis';
import { $TableOfContents, $TypeOfTableOfContents } from './TableOfContents';
import { $TypeOfTheme, Theme as theme } from '@/formatting/Theme';

export interface $Book$ extends $Composition$ {
    readonly cover: $Cover | undefined;
    readonly synopsis: $Synopsis | undefined;
    readonly table: $TableOfContents | undefined;
    readonly chapters: $Chapter[];
}

export class $Book extends $Composition implements $Book$ {
    // THE APPARATUS ARE DOCUMENTS THE BOOK'S CHAPTERS WRITE, followed through the chapters once drawn.
    get cover(): $Cover | undefined { return this.documents().find((held): held is $Cover => reflection.is(held, $TypeOfCover)); }
    get synopsis(): $Synopsis | undefined { return this.documents().find((held): held is $Synopsis => reflection.is(held, $TypeOfSynopsis)); }
    get table(): $TableOfContents | undefined { return this.documents().find((held): held is $TableOfContents => reflection.is(held, $TypeOfTableOfContents)); }
    // A BOOK COMPOSES CHAPTERS — its parts, which below() already says.
    get chapters(): $Chapter[] { return this.parts().filter((part): part is $Chapter => reflection.is(part, $TypeOfChapter)); }

    $Book(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfBook));
        if (this.searchFor($TypeOfTheme).length === 0) this._block = this._block.concat($check(theme, '!'));
        this.removeClass('pd-reference');
        const held: $Writing[] = [this];
        for (let at = 0; at < held.length; at++) {
            if (held[at].book !== this) held[at].book = this;
            for (const part of held[at]._block.$elements ?? []) if (reflection.writing(part)) held.push(part);
        }
    }

    protected documents(): $Document[] {
        return [...this.searchFor<$Document>($TypeOfDocument), ...this.chapters.map(chapter => chapter.read())]
            .filter((held): held is $Document => held !== undefined);
    }

    header(): ReactNode { return undefined; }
    footer(): ReactNode { return undefined; }

    override print(content: ReactNode): ReactNode {
        return <div className={this.className}>
            {this.header()}{content}{this.footer()}
        </div>;
    }

    static $register(): void {
        reflection.knows({ hierarchies: [$TypeOfBook, $TypeOfDocument] });
    }
}

export interface $$Book$ extends $Paragraph$ { }

export class $$Book extends $Catalogue implements $$Book$ {
    $$Book(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfParagraph, $TypeOf$Book));
    }
}

export class $TypeOfBook extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new BookSpecification();

    override below(): new() => $Type { return $TypeOfChapter; }
}

export class BookSpecification extends WritingSpecification {
    @specify('a book is drawn in one theme')
    $isDrawnInATheme(writing: $Writing): void {
        const worn = writing.searchFor($TypeOfTheme).length;
        $check(worn === 1, `a book is drawn in one theme, and this one is drawn in ${worn}`);
    }
}

export class $TypeOf$Book extends $Type {
    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class $BookSpecification extends WritingSpecification { }

export const Book = $($Book);
export const book = $($$Book);
export const TypeOf$Book = $($TypeOf$Book);
export const TypeOfBook = $($TypeOfBook);
