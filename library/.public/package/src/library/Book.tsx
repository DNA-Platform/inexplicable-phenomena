import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Strict as strict, Closed as closed } from '@/writing/Composition';
import { $Reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';
import { $Title } from './Title';
import { $Cover, $Author, $Subject, $About } from './Cover';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';

export class $Book extends $Composition {
    specification = new BookSpecification();
    protected _bookmark?: string;
    get $bookmark(): string | undefined { return this._bookmark; }
    set $bookmark(value: string | undefined) {
        if (value === this._bookmark) return;
        this._bookmark = value;
        this.turn();
    }
    get cover(): $Chapter | undefined { return this.canonical; }
    get table(): $Chapter | undefined { return this.text.find($Chapter).find(chapter => chapter.is($TableOfContents)); }
    get title(): $Title | undefined { return this.canonical?.canonical; }
    get author(): $Author | undefined { return this.canonical?.annotations.expressed($Author); }
    get subject(): $Subject | undefined { return this.canonical?.annotations.expressed($Subject); }
    get about(): $About | undefined { return this.canonical?.annotations.expressed($About); }
    get means(): $Reference | undefined { return this.cover?.mention; }
    get synopsis(): $Chapter | undefined {
        const identifier = this.means?.identifier;
        if (identifier === undefined) return undefined;
        return this.text.find($Chapter).find(chapter => chapter.annotations.expressed($Synopsis)?.means?.identifier === identifier);
    }
    get bookmark(): $Chapter | undefined {
        if (this.$bookmark === undefined) return undefined;
        return this.text.find($Chapter).find(chapter => chapter.mention?.identifier === this.$bookmark);
    }
    override get $book(): $Book { return this; }
    override get canonical(): $Chapter | undefined {
        return this.text.find($Chapter).find(chapter => chapter.is($Cover));
    }

    $Book(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.$Bound();
        void this.next('mount').then(() => this.turn());
    }

    protected override $Define(): void {
        const Level = $(level);
        const Strict = $(strict);
        const Closed = $(closed);
        this.annotations.add(this,
            <Level>7</Level>,
            <Strict />,
            <Closed />
        );
    }

    protected turn(): void {
        const title = this.bookmark?.title;
        if (title === undefined) return;
        document.getElementById(String(title.id))?.scrollIntoView();
    }
}

export class BookSpecification extends CompositionSpecification {
    @specify('a book has one cover')
    $hasOneCover(book: $Book): void {
        $check(book.text.find($Chapter).filter(chapter => chapter.is($Cover)).length === 1,
            'a book has one cover, and this one does not');
    }

    @specify('a book has one synopsis of itself')
    $hasOneSynopsis(book: $Book): void {
        const identifier = book.means?.identifier;
        $check(book.text.find($Chapter).filter(chapter => chapter.annotations.expressed($Synopsis)?.means?.identifier === identifier).length === 1,
            'a book has one synopsis of itself, and this one does not');
    }

    @specify('a book has one table of contents')
    $hasOneTableOfContents(book: $Book): void {
        $check(book.text.find($Chapter).filter(chapter => chapter.is($TableOfContents)).length === 1,
            'a book has one table of contents, and this one does not');
    }
}

export const Book = $($Book);
