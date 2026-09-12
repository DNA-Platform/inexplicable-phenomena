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
import { $TypeOfDocument } from './Document';
import { $Chapter, $$Chapter, $TypeOfChapter, chapter } from './Chapter';
import { $Path, Path as path } from '@/reference/Path';
import { $Scratchpad } from './Scratchpad';
import { $Theme } from '@/writing/Theme';

export interface $Book$ extends $Composition$ {
    readonly cover: $Chapter | undefined;
    readonly synopsis: $Chapter | undefined;
    readonly table: $Chapter | undefined;
    readonly chapters: $Chapter[];
    readonly scratchpad: $Scratchpad;
}

export class $Book extends $Composition implements $Book$ {
    definition = 'div';
    _scratchpad!: $Scratchpad;

    get cover(): $Chapter | undefined { return this.chapters[0]; }
    get synopsis(): $Chapter | undefined { return this.chapters[1]; }
    get table(): $Chapter | undefined { return this.chapters[2]; }
    get chapters(): $Chapter[] { return this.parts().filter((part): part is $Chapter => reflection.is(part, $TypeOfChapter)); }
    get scratchpad(): $Scratchpad { return this._scratchpad; }
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

export class $$Book extends $Catalogue { }

export class $TypeOfBook extends $TypeOfReference {
    protected override specification: Specification<$Writing> = new BookSpecification();
}

export class BookSpecification extends WritingSpecification {
    @specify('a book is drawn in the theme its scope answers')
    $isDrawnInATheme(writing: $Writing): void {
        $check(writing.theme instanceof $Theme, 'a book is drawn in a theme, and this one asked and got none');
    }
}

export const Book = $($Book);
export const book = $($$Book);
export const TypeOfBook = $($TypeOfBook);
