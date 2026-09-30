import { $, $check, $Chemical, next } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Strict as strict, Closed as closed, Block as block } from '@/writing/Composition';
import { $Reference } from '@/writing/Reference';
import { $Theme, Theme as theme } from '@/writing/Theme';
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
    get theme(): $Theme {
        const theme = this.annotations.expressed($Theme);
        if (theme === undefined) throw new Error('a book always has a theme, and this one has none');
        return theme;
    }
    override get book(): $Book { return this; }
    override get canonical(): $Chapter | undefined {
        return this.text.find($Chapter).find(chapter => chapter.is($Cover));
    }

    $Book(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.$Bound();
        void this[next]('mount').then(() => this.turn());
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-book');
        const Level = $(level);
        const Strict = $(strict);
        const Closed = $(closed);
        const Block = $(block);
        const Theme = $(theme);
        this.annotations.add(this,
            <Level>7</Level>,
            <Strict />,
            <Closed />,
            <Block />,
            <Theme />
        );
    }

    protected turn(): void {
        const title = this.bookmark?.title;
        if (title === undefined) return;
        const element = document.getElementById(String(title.id));
        (element?.closest('.pd-chapter') ?? element)?.scrollIntoView();
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

    @specify('a book has one theme')
    $hasOneTheme(book: $Book): void {
        $check(book.annotations.containsOne($Theme), 'a book has one theme, and this one does not');
    }
}

export const Book = $($Book);
