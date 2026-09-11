import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfLetter } from '@/writing/Letter';
import { $TypeOfWord } from '@/writing/Word';
import { $TypeOfSentence } from '@/writing/Sentence';
import { $TypeOfParagraph } from '@/writing/Paragraph';
import { $TypeOfSection } from '@/writing/Section';
import { $TypeOfReference } from '@/reference/Reference';
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
    definition = 'div';

    get cover(): $Cover | undefined { return this.documents().find((held): held is $Cover => reflection.is(held, $TypeOfCover)); }
    get synopsis(): $Synopsis | undefined { return this.documents().find((held): held is $Synopsis => reflection.is(held, $TypeOfSynopsis)); }
    get table(): $TableOfContents | undefined { return this.documents().find((held): held is $TableOfContents => reflection.is(held, $TypeOfTableOfContents)); }
    get chapters(): $Chapter[] { return this.parts().filter((part): part is $Chapter => reflection.is(part, $TypeOfChapter)); }
    override get document(): $Catalogue | undefined { return this.cover?.mention; }

    $Book(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfBook));
        if (this.searchFor($TypeOfTheme).length === 0) this._block = this._block.concat($check(theme, '!'));
    }

    protected documents(): $Document[] {
        return this.searchFor<$Document>($TypeOfDocument);
    }

    header(): ReactNode { return undefined; }
    footer(): ReactNode { return undefined; }

    override print(): ReactNode {
        return <>{this.header()}{super.print()}{this.footer()}</>;
    }

    static $register(): void {
        reflection.knows({
            hierarchies: [$TypeOfBook, $TypeOfDocument],
            levels: [
                [$TypeOfLetter, $TypeOfWord, $TypeOfSentence, $TypeOfParagraph, $TypeOfSection, $TypeOfDocument],
                [$TypeOfChapter, $TypeOfBook]
            ]
        });
    }
}

export class $$Book extends $Catalogue { }

export class $TypeOfBook extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new BookSpecification();
}

export class BookSpecification extends WritingSpecification {
    @specify('a book is drawn in one theme')
    $isDrawnInATheme(writing: $Writing): void {
        const worn = writing.searchFor($TypeOfTheme).length;
        $check(worn === 1, `a book is drawn in one theme, and this one is drawn in ${worn}`);
    }
}

export const Book = $($Book);
export const book = $($$Book);
export const TypeOfBook = $($TypeOfBook);
