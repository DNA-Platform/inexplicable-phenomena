import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Catalogue } from '@/reference/Catalogue';
import { $TypeOfLetter } from '@/writing/Letter';
import { $TypeOfWord } from '@/writing/Word';
import { $TypeOfSentence } from '@/writing/Sentence';
import { $TypeOfParagraph } from '@/writing/Paragraph';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $TypeOfReference } from '@/reference/Reference';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $TypeOfDocument } from './Document';
import { $Cover, $TypeOfCover } from './Cover';
import { $Author } from './Author';
import { $Subject } from './Subject';
import { $Chapter, $$Chapter, $TypeOfChapter, chapter } from './Chapter';
import { $TableOfContents, $TypeOfTableOfContents } from './TableOfContents';
import { $Title } from './Title';
import { $Path, Path as path } from '@/reference/Path';
import { $Scratchpad } from './Scratchpad';
import { $Theme, Theme } from '@/writing/Theme';

export interface $Book$ extends $Composition$ {
    readonly cover: $Chapter | undefined;
    readonly synopsis: $Chapter | undefined;
    readonly table: $Chapter | undefined;
    readonly tableOfContents: $TableOfContents | undefined;
    readonly chapters: $Chapter[];
    readonly scratchpad: $Scratchpad;
    readonly title: $Section | undefined;
    readonly name: string;
    readonly author: $Author | undefined;
    readonly subject: $Subject | undefined;
}

export class $Book extends $Composition implements $Book$ {
    definition = 'div';
    _scratchpad!: $Scratchpad;

    get cover(): $Chapter | undefined { return this.chapters[0]; }
    get synopsis(): $Chapter | undefined { return this.chapters[1]; }
    get table(): $Chapter | undefined { return this.chapters[2]; }
    get tableOfContents(): $TableOfContents | undefined { return this.table?.searchPartsForOne<$TableOfContents>($TypeOfTableOfContents); }
    get chapters(): $Chapter[] { return this.searchParts<$Chapter>($TypeOfChapter); }
    get scratchpad(): $Scratchpad { return this._scratchpad; }
    get title(): $Section | undefined { return this.cover?.title; }
    get name(): string { return this.cover?.name ?? ''; }
    get author(): $Author | undefined { return this.cover?.searchPartsForOne<$Cover>($TypeOfCover)?.author(); }
    get subject(): $Subject | undefined { return this.cover?.searchPartsForOne<$Cover>($TypeOfCover)?.subject(); }
    override get document(): $Catalogue | undefined { return this.cover?.mention; }

    $Book(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfBook));
        this._scratchpad = new $Scratchpad();
        const Mention = $(chapter);
        const Path = $(path);
        this.chapters.forEach((held, at) => { held._mention = $<$$Chapter>(<Mention />, $<$Path>(<Path>{String(at)}</Path>), held); });
    }

    header(): ReactNode { return undefined; }
    footer(): ReactNode { return undefined; }

    override view(): ReactNode {
        const Sheet = $(Theme);

        return <Sheet>{super.view()}</Sheet>;
    }

    override print(): ReactNode {
        return <>{this.header()}{super.print()}{this.footer()}</>;
    }

    static $register(): void {
        $Theme.$register(Book);
        reflection.knows({
            hierarchies: [$TypeOfBook, $TypeOfDocument],
            book: $TypeOfBook,
            chapter: $TypeOfChapter,
            levels: [
                [$TypeOfLetter, $TypeOfWord, $TypeOfSentence, $TypeOfParagraph, $TypeOfSection, $TypeOfDocument],
                [$TypeOfChapter, $TypeOfBook]
            ]
        });
    }
}

// A BOOK MENTION IS A PAGE, NOT A PLACE ON THIS ONE. Every other mention addresses something inside
// the book being read, so a fragment is right for it; a book is somewhere else entirely. Measured
// 2026-09-15 across Doug's library: every `<Book>MY Library Log</Book>` written in the prose
// rendered as `href="#my-library-log"`, an anchor to an id that is not on the page — a link that
// looks like a link and goes nowhere, which is worse than no link at all. Doug: "see that it doesn't
// have links? Bug in the writing."
export class $$Book extends $Catalogue { }

export class $TypeOfBook extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new BookSpecification();
}

export class BookSpecification extends WritingSpecification {
}

export const Book = $($Book);
export const book = $($$Book);
export const TypeOfBook = $($TypeOfBook);
