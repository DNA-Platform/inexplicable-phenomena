import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Strict as strict, Closed as closed } from '@/writing/Composition';
import { $Chapter } from './Chapter';
import { $Title } from './Title';
import { $Cover, $Author, $Subject, $About } from './Cover';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';

export class $Book extends $Composition {
    specification = new BookSpecification();
    get cover(): $Chapter | undefined { return this.canonical; }
    get synopsis(): $Chapter | undefined { return this.contents.find($Chapter).find(chapter => chapter.is($Synopsis)); }
    get table(): $Chapter | undefined { return this.contents.find($Chapter).find(chapter => chapter.is($TableOfContents)); }
    get title(): $Title | undefined { return this.canonical?.canonical; }
    get author(): $Author | undefined { return this.canonical?.annotations.expressed($Author); }
    get subject(): $Subject | undefined { return this.canonical?.annotations.expressed($Subject); }
    get about(): $About | undefined { return this.canonical?.annotations.expressed($About); }
    override get canonical(): $Chapter | undefined {
        return this.contents.find($Chapter).find(chapter => chapter.is($Cover));
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
}

export class BookSpecification extends CompositionSpecification {
    @specify('a book has one cover')
    $hasOneCover(book: $Book): void {
        $check(book.contents.find($Chapter).filter(chapter => chapter.is($Cover)).length === 1,
            'a book has one cover, and this one does not');
    }

    @specify('a book has one synopsis')
    $hasOneSynopsis(book: $Book): void {
        $check(book.contents.find($Chapter).filter(chapter => chapter.is($Synopsis)).length === 1,
            'a book has one synopsis, and this one does not');
    }

    @specify('a book has one table of contents')
    $hasOneTableOfContents(book: $Book): void {
        $check(book.contents.find($Chapter).filter(chapter => chapter.is($TableOfContents)).length === 1,
            'a book has one table of contents, and this one does not');
    }
}

export const Book = $($Book);
