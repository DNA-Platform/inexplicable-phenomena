import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfReference } from '@/reference/Reference';
import { $Paragraph$, $TypeOfParagraph } from '@/writing/Paragraph';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfDocument } from './Document';
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
    get cover(): $Cover | undefined { return this.searchForOne<$Cover>($TypeOfCover); }
    get synopsis(): $Synopsis | undefined { return this.searchForOne<$Synopsis>($TypeOfSynopsis); }
    get table(): $TableOfContents | undefined { return this.searchForOne<$TableOfContents>($TypeOfTableOfContents); }
    get chapters(): $Chapter[] { return this.searchFor<$Chapter>($TypeOfChapter); }
    override get classes(): string[] { return super.classes.filter(name => name !== 'pd-reference'); }

    $Book(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfBook, '!')));
        if (this.searchFor($TypeOfTheme).length === 0) this._block = this._block.concat($check(theme, '!'));
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
        super.$Catalogue($check(block, $Block, '!').concat($check($TypeOfParagraph, '!')).concat($check($TypeOf$Book, '!')));
    }
}

export class $TypeOfBook extends $TypeOfReference {
    override name = 'Book';
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
    override name = '$Book';
    protected override specification: Specification<$Writing> = new $BookSpecification();
}

export class $BookSpecification extends WritingSpecification { }

export const Book = $($Book);
export const book = $($$Book);
export const TypeOf$Book = $($TypeOf$Book);
export const TypeOfBook = $($TypeOfBook);
